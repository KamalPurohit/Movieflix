import React from "react";
import Skeleton from "react-loading-skeleton";
import {MovieSkeleton} from "../components"
function ArtistSkeleton() {
  return (
    <div className="grid grid-cols-3 min-h-screen p-10 px-20 w-fit gap-10 max-sm:px-5 max-sm:place-content-center w-full">
      <div className="flex flex-col gap-5 max-sm:items-center col-span-1 max-sm:col-span-3">
        <div className="overflow-hidden ">
          <Skeleton className="rounded-xl max-w-[350px] w-full min-w-[200px] aspect-[2/3]  " />
        </div>
        <div className="flex flex-col gap-2 min-w-[200px] max-w-[350px]  self-left">
          <Skeleton />

          <Skeleton count={2} />
          <Skeleton count={2} />
        </div>
      </div>
      {/*-----Bio and more----- */}
      <div className="flex flex-col gap-5 col-span-2 text-white max-sm:col-span-3">
        <Skeleton className="text-white font-bold text-4xl"/>
        <div className="text-gray-300 text-sm max-w-full h-[200px]  bio relative">
          {" "}
          <Skeleton className="font-bold text-white text-base "/>
        
          <br />
          <Skeleton className= 'h-full '/>
           
          
            
        </div>
        <div className="flex flex-col">
          <Skeleton className="font-bold text-white"/> <br />
          <div className="overflow-x-scroll flex gap-5 ">
            <MovieSkeleton cards={5} h={195} w={130} count={1} />
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistSkeleton;
