import React from 'react'

function SideShadow(props) {
  return (
    <div className={`absolute h-[100%] bg-gradient-to-r from-transparent via-[#121212] via-80%  to-bg w-[150px] top-0 right-[-40px] transition-all ease-in-out duration-300 touch-none	pointer-events-none ${props.shadow ? 'opacity-100': 'opacity-0'}  `} ></div>
  )
}

export default SideShadow
