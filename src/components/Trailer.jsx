import React from "react";

function Trailer(trailer) {
  return (
    <div className="cast relative flex flex-col mt-[30px] gap-5 px-10  max-sm:px-[30px]" id="trailer">
      <h2 className="font-bold text-white text-3xl max-sm:text-2xl">Trailers :</h2>
      <div className="flex overflow-x-scroll flex flex-row text-white gap-5 pb-[2%]">
        {trailer.trailer.map((item,idx) => {
          return (
            <iframe key={idx}
              className=" min-w-[600px] max-sm:min-w-[300px] aspect-video rounded-2xl"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen" 
              msallowfullscreen="msallowfullscreen" 
              oallowfullscreen="oallowfullscreen" 
              webkitallowfullscreen="webkitallowfullscreen"
            ></iframe>
          );
        })}
      </div>
    </div>
  );
}

export default Trailer;
