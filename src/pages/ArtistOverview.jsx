import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Movie, ArtistSkeleton, MovieSimple } from "../components";
import { FilmIcon } from "@heroicons/react/24/outline";
function ArtistOverview() {
  const artistId = useParams().artistId;
  const [bioHidden, setBioHidden] = useState(true)
  const [isLoading,setIsLoading] = useState(true)
  const [artistData, setArtistData] = useState({
    biography: "sadas",
    combined_credits: {
      cast: [],
    },
  });

  window.scrollTo(0, 0)
  useEffect(function () {
    setIsLoading(true)
    axios
      .get(
        `https://api.themoviedb.org/3/person/${artistId}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=combined_credits`
      )
      .then(function (response) {
        setArtistData(response.data);
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [artistId]);

  console.log(artistData);
  return (
    isLoading ? <ArtistSkeleton/> :
    <div className="grid grid-cols-3 min-h-screen p-10 px-20 w-fit gap-10 max-sm:px-5 max-sm:place-content-center">
      {/*-----Profile path----- */}
      <div className="flex flex-col gap-5 max-sm:items-center col-span-1 max-sm:col-span-3">
        <div className="overflow-hidden ">
          <img
            src={`https://image.tmdb.org/t/p/original/${artistData.profile_path}`}
            alt={artistData.name}
            className="rounded-xl w-[350px] "
          />
        </div>
        <div className="flex flex-col gap-2 w-full self-left">
          <span className="font-bold text-white text-base ">
            Personal Info{" "}
          </span>{" "}
          <p className="text-gray-300 text-sm max-w-full  bio relative">
            <span className="font-semibold text-white text-sm ">
              Place of Birth{" "}
            </span>{" "}
            <br/>
            {artistData.place_of_birth}
          </p>
          <p className="text-gray-300 text-sm max-w-full  bio relative">
            <span className="font-semibold text-white text-sm ">
              Date of Birth{" "}
            </span>{" "}
            <br/>
            {artistData.birthday} {"("}{new Date().getFullYear() - new Date(artistData.birthday).getFullYear() +` Years old)`}
          </p>
          {artistData.deathday && 
          <p className="text-gray-300 text-sm max-w-full  bio relative">
            <span className="font-semibold text-white text-sm ">
              Date of Death{" "}
            </span>{" "}
            <br/>
            {artistData.deathday} 
          </p>}
        </div>
      </div>
      {/*-----Bio and more----- */}
      <div className="flex flex-col gap-5 col-span-2 text-white max-sm:col-span-3">
        <h2 className="text-white font-bold text-4xl">{artistData.name}</h2>
        <div className="text-gray-300 text-sm max-w-full  bio relative">
          {" "}
          <span className="font-bold text-white text-base ">
            Biography{" "}
          </span>{" "}
          <br />
          <p className={bioHidden ? `max-h-[200px] overflow-hidden` : `h-full`}>
            {artistData.biography}
          </p>
          <span
            className="absolute bottom-[-20px] left-[40%] text-blue-500 font-bold cursor-pointer"
            onClick={() => setBioHidden((prev) => !prev)}
          >
            {bioHidden ? `Show more` : "Hide"}{" "}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white">Known For </span> <br />
          <div className="overflow-x-scroll flex gap-5 ">
            {isLoading && <MovieSkeleton cards={5} h={195} w={130} count={1}/>}
            {artistData.combined_credits.cast.map((item, idx) => {
              return (
                item.poster_path && !(item.adult) && (
                  <MovieSimple item={item}/>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistOverview;
