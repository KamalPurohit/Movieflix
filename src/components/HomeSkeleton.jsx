import React from "react";
import Skeleton from "react-loading-skeleton";
import MovieSkeleton from "./MovieSkeleton";

function HomeSkeleton() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="relative w-full h-[600px] overflow-hidden aspect-video object-fill my-[-2%]">
        <Skeleton className="w-full aspect-video pl-[5%] max-sm:pl-[0] min-h-[600px] object-top" />
      </div>
      <div className="h-20 w-full absolute top-0 h-[600px] bg-gradient-to-r from-bg from-10% flex flex-col p-20 max-md:p-4 gap-2 justify-end">
        <Skeleton
          className="text-white  w-[200px]"
        />
        <Skeleton/>
        <Skeleton className="text-white text-2xl font-bold mb-10"/>

      </div>
      <div className="flex flex-col mt-[60px]">
          <div className=" max-sm:mx-5 mx-10 max-sm:mx-5 flex w-[100] items-center ">
            <Skeleton className="text-white text-2xl font-bold"/>

          </div>
          <div className="flex gap-5 m-5 mx-10 max-sm:mx-5 overflow-x-scroll realtive end-shadow relative "  onScroll={(e)=> hideShadow1(e)}>
            <MovieSkeleton cards={10} count={2} h={270} w={180}/>
            
          </div>
        </div>
    </div>
  );
}

export default HomeSkeleton;
