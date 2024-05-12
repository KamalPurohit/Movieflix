import React, { useCallback,useRef } from "react";
import Skeleton from "react-loading-skeleton";

import { Link } from "react-router-dom";

function Movie(props) {
  let date = new Date(props.release_date || props.first_air_date);
  
 
  return (
    <div
      ref={props.lastMovieElementRef}
      key={props.id}
      className="flex flex-col rounded-xl w-[180px] "
      onMouseOver={props.onMouseOver}
      onTouchEndCapture={props.onMouseOver}
    >
      <div className=" relative cursor-pointer min-h-[270px]">
        <div className="w-[180px] overflow-hidden rounded-xl 	 ">
          <Link to={`/${props.contentType}/${props.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
              className=" object-contain  text-white rounded-xl hover:scale-110 transtion-all ease-in-out  duration-300   "
              alt={props.title}
              lazyloading="true"
            />
          </Link>
        </div>
        <p
          className="absolute bottom-[-10px]  shadow-xl left-3 bg-bgS h-10 w-10 font-bold flex items-center justify-center rounded-full text-xs "
          style={{ color: `${getColor(props.vote_average)}` }}
        >
          {parseInt(props.vote_average * 10)}%
        </p>
      </div>
      <div className="py-2 mx-2 cursor-pointer">
        <Link to={`/${props.contentType}/${props.id}`}>
          <p className="text-sm text-white font-bold hover:text-blue-400 ">
            {props.title || props.name}
          </p>
        </Link>
        <p className="font-semibold text-xs text-gray-400">
          {date.toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
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

export default Movie;
