import React from "react";
import { Link } from "react-router-dom";
function MovieSimple({ item }) {
  return (
    <div
      key={item.id}
      className="flex flex-col gap-2 rounded-xl w-[180px] bg-bg"
    >
      <div className="rounded-xl relative hover:shadow-inner transition-all cursor-pointer min-h-[195px] ">
        <Link
          to={`/${item.media_type || `movie`}/${item.id}`}
          className="object-contain max-h-[195px] "
        >
          {
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              className="min-w-[130px] rounded-xl min-h-[195px] text-white"
              alt={"not Found"}
              lazyloading="true"
            />
          }
        </Link>
      </div>
      <div className=" cursor-pointer">
        <Link to={`/${item.media_type || `movie`}/${item.id}`}>
          <p className="text-sm text-white font-bold hover:text-blue-400 w-[130px] truncate ">
            {item.original_title || item.original_name}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default MovieSimple;
