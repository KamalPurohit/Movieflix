import React, { useState } from "react";
import pfp from "../assets/pfp.png";
import { Link } from "react-router-dom";
import {SideShadow} from './'


function Starring(cast) {
  const [shadow,setShadow] = useState(true);
  const  hideShadow = (e) =>{
      setShadow(e.target.scrollLeft > 10? false : true);
  }

  return (
    <div className="cast relative flex flex-col mt-[2%] gap-5 px-10  max-sm:px-[30px]">
      <h2 className="font-bold text-white text-3xl max-sm:text-2xl">Starring :</h2>
      <div className="scrollable flex overflow-x-scroll flex flex-row text-white gap-5 pb-[2%] relative" onScroll={(e)=> hideShadow(e)}>
        {cast.cast.map((item, idx) => {
          return (
            <div
              className=" min-w-[150px] flex flex-col rounded-xl overflow-hidden"
              key={idx}
            >
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : pfp
                }
                className=" w-[150px]"
                alt=""
                lazyloading="true"
              />
              <div className="bg-bgS h-full p-2">
                <Link to={`/artist/${item.id}`} className="text-gray-100 text-sm text-ellipsis truncate underline underline-offset-1 cursor-pointer">
                  {" "}
                  {item.name}
                </Link>
                <p className="text-gray-400 text-xs text-ellipsis truncate w-[125px] z-10">
                  {" "}
                  {item.character}
                </p>
              </div>
            </div>
          );
        })}
        <SideShadow shadow={shadow}/>
      </div>
    </div>
  );
}

export default Starring;
