import React from "react";
import Skeleton from "react-loading-skeleton";

function MovieSkeleton(props) {
 
  return Array(props.cards).fill(0).map((_,i)=> (
    <div key={i} className={`flex flex-col rounded-xl w-[${props.w}px]  bg-bg`}>
      <div className={`rounded-xl relative h-[${props.h}px]`}>
        <Skeleton className={`w-[${props.w}px] rounded-xl min-h-[270px]`}  />
        
      </div>
      <div className="py-2 mx-2 cursor-pointer">
        <Skeleton  count={props.count}/>
        
      </div>
    </div>
  ));
}




export default MovieSkeleton;
