import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FilmIcon,
  TvIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import pfp from "../assets/pfp.png";

export default function Navbar(props) {
  const [navIsOpen, SetNavIsOpen] = useState(false);
  const [serch, setSerch] = useState("");
  const [showResult, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      setIsLoading(true);
      let cancel;
      axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/multi",
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        params: { query: serch, api_key: import.meta.env.VITE_API_KEY },
      })
        .then(function (response) {
          // handle success
          setResults(response.data.results);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return () => cancel();
    },
    [serch]
  );

  function handleSerch(e) {
    setSerch(e.target.value);
  }
  console.log(results);
  return (
    <nav className="relative bg-black  border-gray-200 sticky top-0 z-20 ">
      <div className=" max-w-screen flex flex-wrap items-center justify-between   sm:px-10 p-4">
        <div className="flex flex-row max-md:w-screen justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          >
            <p className="font-bold text-2xl  text-transparent bg-clip-text  bg-gradient-to-r from-cyan-700 to-teal-400">
              The MovieFlix
            </p>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => SetNavIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5 navbar "
              aria-hidden="true"
              xmlns=""
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="relative max-md:w-screen max-md:mt-2 box-border flex justify-center">
          <input
            type={serch}
            onChange={handleSerch}
            value={serch}
            className="bg-bg text-gray-200 text-sm border  p-2 border-bgS border-2 focus:border-gray-500 focus:border-2 rounded-full px-10 p-1 w-full outline-none transtion-all ease-in-out"
            placeholder="Serch Movies / Actor / Tv"
            onFocus={() => setShowResults(true)}
          />
          {showResult && (
            <XMarkIcon
              className="h-5 text-gray-200 absolute  right-3 top-[25%] cursor-pointer"
              onClick={() => {
                setSerch("");
                setShowResults(false);
              }}
            />
          )}

          <MagnifyingGlassIcon className="h-5 text-gray-200 absolute  left-3 top-[25%] cursor-pointer" />
        </div>
        <div
          className={
            navIsOpen
              ? ` w-full md:block md:w-fit transition-all ease-in-out`
              : `w-full md:block md:w-auto transition-all ease-in-out max-md:hidden`
          }
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col  p-4 md:p-0 mt-4 rounded-lg  md:flex-row md:space-x-8  md:mt-0 md:border-0 md:navbar  ">
            <li onClick={() => props.onContentChange("tv")}>
              <Link
                to="/"
                className="block py-2 px-3 text-white font-light rounded  md:border-0 md:hover:text-teal-500 md:p-0  flex  flex-row items-center gap-2"
              >
                <HomeIcon height={20} />
                Home
              </Link>
            </li>
            <li onClick={() => props.onContentChange("movie")}>
              <Link
                to="/movie"
                className="  py-2 px-3 text-white font-light rounded   md:hover:text-cyan-700 md:p-0  flex  flex-row items-center gap-2"
                aria-current="page"
              >
                <FilmIcon height={20} />
                <p>Movie</p>
              </Link>
            </li>
            <li onClick={() => props.onContentChange("tv")}>
              <Link
                to="/tv"
                className="block py-2 px-3 text-white rounded font-light  md:border-0 md:hover:text-teal-500 md:p-0  flex  flex-row items-center gap-2"
              >
                <TvIcon height={20} />
                Tv Series
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/*serch results */}
      {showResult && (
        <div className="absolute max-h-[400px] h-fit w-full flex justify-center text-white  ">
          <div className="bg-gray-500 border-bg border-2 rounded-xl sm:translate-x-[-5%] w-[400px] p-2 shadow-lg shadow-black mx-5 overflow-y-scroll flex flex-col gap-2 serch">
            {results.map((item) => {
              return (
                <Link
                  to={
                    item.media_type == "person"
                      ? `artist/${item.id}`
                      : `${item.media_type}/${item.id}`
                  }
                  className="w-full bg-bg rounded-xl p-2  flex flex-row gap-5"
                  onClick={() => {
                    setSerch("");
                    setShowResults(false);
                  }}
                >
                  <img
                    src={
                      item.poster_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${
                            item.poster_path || item.profile_path
                          }`
                        : pfp
                    }
                    className="rounded w-[50px] h-[75px] object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h5 className="text-white  max-sm:line-clamp-3 text-xs max-sm:max-w-[125px] ">
                      {item.name || item.title}
                    </h5>
                    <h5 className="text-xs max-sm:max-w-[125px] text-gray-500">
                      {(item.gender == 2 && `Male`) ||
                        (item.gender == 1 && `Female`) ||
                        item.first_air_date ||
                        item.release_date}
                    </h5>
                    <h5 className="text-white    text-xs max-sm:max-w-[125px] ">
                      {item.media_type}
                    </h5>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
