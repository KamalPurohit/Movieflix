import React from 'react'
import Skeleton from 'react-loading-skeleton'
function OverviewSkeleton() {
  return (
    <div className=" relative">
          <div className="relative w-full aspect-video object-fill my-[-2%]">
            <Skeleton
              className="w-full  object-cover aspect-video pl-[5%] max-sm:pl-[0]"
            />
            
          </div>

          <div className="h-20 w-full absolute max-sm:static top-0 h-full bg-gradient-to-r from-bg from-10% flex flex-col p-20 max-sm:p-4 gap-5 justify-center">
            <Skeleton className="text-white text-[30px] font-semibold max-sm:text-[22px]">
              
            </Skeleton>
            <Skeleton className="text-gray-300 text-sm">
        
            </Skeleton>
            <Skeleton className="text-white text-sm w-[40%] max-sm:w-[100%] max-md:w-[70%]">
              
            </Skeleton>
            <Skeleton className="text-gray-400" count={4}>
              
            </Skeleton>
            <div className="flex flex-row gap-2">
              <Skeleton
                className=" w-[100px] px-5 py-2 rounded font-bold hover:bg-bgS hover:text-white transition-all ease-in-out hover:underline delay-100 max-sm:text-sm"
            
              />
              
            </div>
          </div>
        </div>
  )
}

export default OverviewSkeleton
