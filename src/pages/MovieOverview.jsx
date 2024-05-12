import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pfp from "../assets/pfp.png";
import {
  Trailer,
  Starring,
  OverviewSkeleton,
  MovieSkeleton,
  MovieSimple,
  SideShadow,
} from "../components";

import "react-loading-skeleton/dist/skeleton.css";

function MovieOverview(props) {
  const params = useParams();
  const movieId = params.movieId;
  const [isLoading, setisLoading] = useState(true);
  const [movieData, setMovieData] = useState({
    backdrop_path: ``,
    title: "",
    adult: false,
    genres: [{ name: "" }],
    credits: {
      cast: [],
    },
    videos: {
      results: [
        {
          name: "Official Trailer",
          key: "",
        },
      ],
    },
    seasons: [],
    similar: {
      results: [],
    },
  });

  const [shadow, setShadow] = useState(true);
  const hideShadow = (e) => {
    setShadow(e.target.scrollLeft > 10 ? false : true);
  };

  useEffect(
    function () {
      setisLoading(true);
      window.scrollTo(0, 0);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }&append_to_response=credits,videos,similar,media_type`
        )
        .then(function (response) {
          setMovieData(response.data);
          setisLoading(false);
          window.scrollTo(0, 0);
          document.title = `The MovieFlix - ${response.data.title} `;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    },
    [props, movieId]
  );
  const date = new Date(movieData.release_date || movieData.last_air_date);
  console.log(movieData);

  const trailer = movieData.videos.results.filter(
    (item) => item.type === "Trailer"
  );
  return (
    <div className="w-full min-h-screen">
      {isLoading ? (
        <OverviewSkeleton />
      ) : (
        <div className=" relative">
          <div className="relative w-full aspect-video object-fill my-[-2%]">
            <img
              src={`https://image.tmdb.org/t/p/original/${
                movieData.backdrop_path || movieData.poster_path
              }`}
              className="w-full  object-cover aspect-video pl-[5%] max-sm:pl-[0]"
            />
            <div className=" bg-gradient-to-t h-[100px] absolute bottom-0 from-bg from-10% w-full"></div>
          </div>

          <div className="h-20 w-full absolute max-sm:static top-0 h-full bg-gradient-to-r from-bg from-10% flex flex-col p-20 max-md:p-4 gap-5 justify-center">
            <h2 className="text-white text-[30px] font-semibold max-sm:text-[22px]">
              {movieData.title}
            </h2>
            <h5 className="text-gray-300 text-sm">
              {date.getFullYear()} |
              <span>
                {" "}
                {parseInt(movieData.runtime / 60)} h{" "}
                {movieData.runtime - parseInt(movieData.runtime / 60) * 60}mins
                |
              </span>
              <span className="border p-[.5px] px-1 box-border text-sm border-gray-300 mx-1">
                U/A {movieData.adult ? `18` : `13`}+
              </span>
              {movieData.genres.map((item) => `| ${item.name} `)}
            </h5>
            <h5 className="text-white text-sm w-[40%] max-sm:w-[100%] max-md:w-[90%] max-md:max-h-[200px]  max-sm:max-h-full max-md:overflow-hidden max-sm:overflow-visible">
              {movieData.overview}
            </h5>
            <h5 className="text-gray-400">
              Starring:{" "}
              <span className="text-white">
                {movieData.credits.cast.slice(0, 3).map((item, idx) => {
                  return( `${item.name}`)+ (idx === 2 ? '. ': ' , ')
                })}
              </span>
            </h5>
            <div className="flex flex-row gap-2">
              {/* <a
                href={`https://netfilm.app/watch/movie/${movieId}`}
                className="bg-white w-fit px-5 py-2 rounded font-bold hover:bg-bgS hover:text-white transition-all ease-in-out hover:underline delay-100 max-sm:text-sm"
                target="_blank"
              >
                Watch Now
              </a> */}
              {trailer.length !== 0 && (
                <a
                  href="#trailer"
                  className="bg-white w-fit px-5 py-2 rounded font-bold hover:bg-red-700 hover:text-white transition-all ease-in-out hover:underline delay-100 max-sm:text-sm"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/*----- Cast Starring map-------*/}
      {movieData.credits.cast.length && (
        <Starring cast={movieData.credits.cast} />
      )}
      {/*-----Trailers----- */}
      {trailer.length !== 0 && <Trailer trailer={trailer} />}
      {/*-----You may also Like----- */}
      <div className="flex flex-col ">
        <h2 className="font-bold text-white text-3xl m-5 max-sm:text-2xl">
          You may also like :
        </h2>
        <div
          className="flex flex-row overflow-x-scroll gap-5 mx-10 my-5  relative"
          onScroll={(e) => hideShadow(e)}
        >
          {movieData.similar.results.map((item, idx) => {
            return (
              item.poster_path && (
                <MovieSimple item={item} key={idx} route={"movie"} />
              )
            );
          })}
          <SideShadow shadow={shadow} />
        </div>
      </div>
    </div>
  );
}

export default MovieOverview;
