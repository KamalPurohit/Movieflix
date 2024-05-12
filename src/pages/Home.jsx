import React, { useState, useEffect } from "react";
import { Movie, MovieSkeleton, HomeSkeleton, SideShadow } from "../components";
import { Link } from "react-router-dom";
import { XMarkIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

function Home(props) {
  const [heroMovie, setHeroMovie] = useState({
    backdrop_path: "",
    title: "",
    vote_average: 2,
  });
  const [discover, setDiscover] = useState([]);
  const [discoverTv, setDiscoverTv] = useState([
    {
      backdrop_path: "a",
      title: "",
      vote_average: 2,
    },
  ]);
  const [discoverGenre, setDiscoverGenre] = useState([
    {
      backdrop_path: "",
      title: "",
      vote_average: 2,
    },
  ]);
  const [random, setRandom] = useState(0);
  const slideBg = discoverTv[random];
  const [isLoading, setIsLoading] = useState(true);
  const [isGenreLoading, setIsGenreLoading] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const gerne = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 53,
      name: "Thriller",
    },
  ];
  const [selectedGenre, setSelectedGenre] = useState([10749]);
  const addGenre = (gerneId) => {
    if (!selectedGenre.includes(gerneId)) {
      selectedGenre.push(gerneId);
    }
  };
  const removeGenre = (gerneId) => {
    let i = selectedGenre.indexOf(gerneId);
    selectedGenre.splice(i, 1);
    console.log(selectedGenre);
  };

  //shadows for Horizontal scrollable element
  const [shadow, setShadow] = useState(true);
  const hideShadow = (e) => {
    setShadow(e.target.scrollLeft > 10 ? false : true);
  };

  const [shadow1, setShadow1] = useState(true);
  const hideShadow1 = (e) => {
    setShadow1(e.target.scrollLeft > 10 ? false : true);
  };

  async function getData() {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?page=1&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log(res);
      setDiscover(res.data.results);
      document.title = `The MovieFlix`;
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (discover.length > 0) {
      setHeroMovie(discover[Math.floor(Math.random() * 19)]);
    }
  }, [discover]);

  async function getGenreData() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&with_genres=${
        !selectedGenre.length ? "" : selectedGenre.map((i) => i)
      }&api_key=${import.meta.env.VITE_API_KEY}`
    );
    return await res;
  }
  useEffect(
    function () {
      setIsGenreLoading(true);
      getGenreData()
        .then((res) => {
          setDiscoverGenre(res.data.results);
          setIsGenreLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    },
    [selectedGenre.length]
  );

  useEffect(function () {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/trending/tv/day?page=1&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then(function (response) {
        setDiscoverTv(response.data.results);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return isLoading ? (
    <HomeSkeleton />
  ) : (
    <div className="flex flex-col min-h-screen relative">
      <div className="relative w-full h-[600px] overflow-hidden aspect-video object-fill my-[-2%]">
        <img
          src={`https://image.tmdb.org/t/p/original/${heroMovie.backdrop_path}`}
          className="w-full  object-cover aspect-video pl-[5%] max-sm:pl-[0] min-h-[600px] object-top"
        />
        <div className=" bg-gradient-to-t h-[100px] absolute bottom-0 right-0 from-bg from-10% w-full"></div>
      </div>
      <div className="h-20 w-full absolute top-0 h-[600px] bg-gradient-to-r from-bg from-10% flex flex-col p-20 max-md:p-4 gap-2 justify-end">
        <Link
          to={`/movie/${heroMovie.id}`}
          className="text-white max-sm:text-3xl text-4xl font-bold hover:underline hover:underline-offset-4 w-fit"
        >
          {heroMovie.title}
        </Link>
        <p className="text-white italic">Movie</p>
        <h5 className="text-white text-2xl font-bold mb-10">
          {" "}
          <span
            className="text-3xl "
            style={{ color: `${getColor(heroMovie.vote_average)}` }}
          >
            {parseInt(heroMovie.vote_average)}
          </span>
          /10
        </h5>
      </div>
      {/* Discover Movies */}
      <div className="flex flex-col mt-[60px]">
        <div className=" max-sm:mx-5 mx-10 max-sm:mx-5 flex w-[100] items-center justify-between">
          <h2 className="text-white text-2xl font-bold">Discover Movies</h2>
          <Link to={`/movie`}>
            {" "}
            <ArrowLongRightIcon className="h-10 w-10 font-bold text-white hover:scale-125 transition-all duration-[500ms] ease-in-out" />{" "}
          </Link>
        </div>
        <div
          className="flex gap-5 m-5 mx-10 max-sm:mx-5 overflow-x-scroll realtive end-shadow relative "
          onScroll={(e) => hideShadow1(e)}
        >
          {discover.map((item, i) => {
            let date = new Date(item.release_date || item.first_air_date);
            return <Movie {...item} contentType="movie" />;
          })}
          <SideShadow shadow={shadow1} />
        </div>
      </div>

      {/* Discover Tv */}
      <div className="flex flex-col relative h-[500px] w-full  overflow-hidden tv_discover">
        <div className="relative h-[500px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${slideBg.backdrop_path}`}
            className="object-cover  w-full max-md:h-[500px] object-center transition-all duration-[500ms] ease-in-out"
          />
        </div>
        <div
          className="absolute flex flex-col items-center h-[500px] w-[100vw] justify-center z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.200)" }}
        >
          <div className=" top-0 left-0 max-sm:mx-5 mx-10 flex  w-full py-5 px-10 items-center justify-between">
            <h2 className="text-white text-2xl font-bold ">
              Discover tv series
            </h2>
            <Link to={`/tv`}>
              <ArrowLongRightIcon className="h-10 w-10 font-bold text-white hover:scale-125 " />{" "}
            </Link>
          </div>
          <div className="flex gap-5 flex-1 mt-5 w-[100vw] overflow-x-scroll w-full px-10 ">
            {discoverTv.map((item, i) => {
              let date = new Date(item.release_date || item.first_air_date);
              return (
                <Movie
                  {...item}
                  contentType="tv"
                  onMouseOver={() => setRandom(i)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* {Genre} */}
      <div className="flex flex-col mt-[60px]">
        <div className=" max-sm:mx-5 mx-10 flex w-[100] items-center justify-between  ">
          <h2 className="text-white text-2xl font-bold max-sm:text-xl">
            Discover By Genres
          </h2>{" "}
          {/* dropdown gerne */}
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
                Select Genre
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
                  ? `transition-all ease-in-out absolute right-0 z-[2] mt-2 w-56 origin-top-right rounded-md bg-bgS shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow`
                  : `hidden`
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1 h-[200px] overflow-y-scroll" role="none">
                {gerne.map((item, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        selectedGenre.includes(item.id)
                          ? "text-white flex items-center justify-between w-[200px] px-4 py-2 text-sm text-left bg-bg m-2 rounded"
                          : "text-white flex items-center justify-between w-[200px] px-4 py-2 text-sm hover:bg-bg m-2 rounded"
                      }
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      <span
                        className="flex-1 text-left"
                        onClick={() => {
                          addGenre(item.id);
                          setDropdown(false);
                        }}
                      >
                        {" "}
                        {item.name}
                      </span>
                      {selectedGenre.includes(item.id) && (
                        <XMarkIcon
                          className="h-4"
                          onClick={() => {
                            removeGenre(item.id);
                            setDropdown(false);
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex gap-5 m-5 mx-10 max-sm:mx-5 overflow-x-scroll relative"
          onScroll={(e) => hideShadow(e)}
        >
          {isGenreLoading ? (
            <MovieSkeleton cards={20} count={2} h={270} w={180} />
          ) : (
            discoverGenre.map((item, i) => {
              let date = new Date(item.release_date || item.first_air_date);
              return <Movie {...item} contentType="movie" />;
            })
          )}
          <SideShadow shadow={shadow} />
        </div>
      </div>
    </div>
  );
}
function getColor(col) {
  if (col >= 7.5) {
    return "#21d07a";
  } else if (col >= 5) {
    return "yellow";
  } else if (col >= 2.5) {
    return "orange";
  } else {
    return "red";
  }
}
export default Home;
