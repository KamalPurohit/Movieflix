import React from 'react'
import mdb from '../assets/blue_long.svg'
function Footer() {
  return (
    <footer className='h-fit bg-black box-border flex p-5 justify-between px-5 items-center max-sm:flex-col gap-5'>
        <p className='font-semibold text-xs text-white'>Created by <a href="https://kamalpurohit.netlify.app" target='_blank' className='underline'>Kamal Purohit</a> </p>
        <div className='font-semibold text-xs items-center text-white flex gap-10 max-sm:flex-col max-sm:gap-2'>  <p>React Js</p> <p>TheMovieDB API</p> <p>Tailwind</p></div>
        <p className='font-semibold text-xs text-white flex items-center gap-2 max-md:flex-col'>Powered by <a href="https://www.themoviedb.org/" target='_blank' className='items-center flex'><img src={mdb} className='h-2' alt="the movieDB" /></a> </p>
    </footer>
  )
}

export default Footer
