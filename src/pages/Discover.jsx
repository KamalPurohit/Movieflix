import React, { useCallback } from "react";
import { Movie } from "../components";
import { useEffect, useState, useRef } from "react";
import MovieSkeleton from "../components/MovieSkeleton";
import { Link } from "react-router-dom";
import {
  ChevronUpIcon
} from "@heroicons/react/24/outline";

function Home(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [options, setoptions] = useState([
    { name: "Popular", url: "popular" },
    { name: "Top Rated", url: "top_rated" },
    { name: "On Air", url: "on_the_air" },
  ]);

  const opt = {
    tv: [
      { name: "Popular", url: "popular" },
      { name: "Top Rated", url: "top_rated" },
      { name: "On Air", url: "on_the_air" },
    ],
    movie: [
      { name: "Popular", url: "popular" },
      { name: "Top Rated", url: "top_rated" },
      { name: "Now Playing", url: "now_playing" },
      { name: "Upcoming", url: "upcoming" },
    ],
  };

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  useEffect(() => {
    setPage(1);
    setData([]);
    window.scrollTo(0, 0);
  }, [props]);

  const getDiscoverContentAPI = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${props.contentType}/${
          props.contentSortBy
        }?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`
      );
      const temp = { page: response.data.results };
      setData((prev) => {
        const arr = prev;
        arr.push(temp);
        return arr;
      });
      setIsLoading(false);
      props.contentType === "movie"
        ? setoptions(opt.movie)
        : setoptions(opt.tv);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDiscoverContentAPI();
  }, [props, page]);
  console.log(data);
  let content =
    props.contentType == "movie"
      ? opt.movie.filter((item) => item.url.match(props.contentSortBy))
      : opt.tv.filter((item) => item.url.match(props.contentSortBy));

  return (
    <div className="w-full min-h-screen p-5 flex flex-col relative">
      <div className="flex flex-row max-sm:flex-col max-sm:mb-5 justify-between w-full ">
        <h2 className="pb-5 text-white font-bold text-2xl max-sm:text-l max-sm:self-center">
          {content[0].name}{" "}
          {props.contentType === "movie" ? "Movies" : "Tv Series"}
        </h2>
        {/* Dropdown */}
        <div className="relative inline-block text-left w-fit max-sm:self-end">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-bgS px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-bg hover:bg-bgS"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setDropdown((prev) => !prev)}
            >
              {content[0].name}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={
              dropdown
                ? `transition-all ease-in-out absolute right-0 z-[2] mt-2 w-56 origin-top-right rounded-md bg-bgS shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`
                : `hidden`
            }
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {options.map((item, i) => {
                return (
                  <Link
                    key={i}
                    to={`/${props.contentType}`}
                    className="text-white block px-4 py-2 text-sm hover:bg-bg m-2 rounded"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => {
                      setDropdown(false);
                      props.contentSortChange(item.url);
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {data.map((pages, idx) => {
        return (
          <div className="w-full h-fill movies min-h-screen gap-5 ">
            {pages.page.map((item, i) => {
              if (data.length === idx + 1 && pages.page.length === i + 1) {
                return (
                  <Movie
                    lastMovieElementRef={lastMovieElementRef}
                    {...item}
                    contentType={props.contentType}
                    key={i}
                  />
                );
              } else {
                return (
                  <Movie {...item} contentType={props.contentType} key={i} />
                );
              }
            })}
          </div>
        );
      })}
      {isLoading && (
        <div className="w-full h-fill movies min-h-screen gap-5 ">
          <MovieSkeleton cards={20} count={2} h={270} w={180} />
        </div>
      )}

      <div className="scrollToTop text-white sticky font-extrabold bottom-[10px] left-[100%] bg-[#004a4e] w-fit p-2 rounded-xl shadow-lg cursor-pointer" onClick={()=> window.scroll(0,0)}>
      <ChevronUpIcon className="h-5 " />
      </div>
    </div>
  );
}

export default Home;
