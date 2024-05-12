import React, { useState, useEffect } from "react";
import "./App.css";
import {Navbar,Footer} from "./components"
import { Route, Routes } from "react-router-dom";
import MovieOverview from "./pages/MovieOverview";
import TvOverview from "./pages/TvOverview";
import ArtistOverview from "./pages/ArtistOverview";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
function App() {
  const [contentType,setContentType] = useState("movie") ;
  const [contentSortBy,setContentSortBy] = useState("popular");
  function contentChange(type){
    setContentType(type);
    setContentSortBy("popular");
  }
  function contentSortChange(type){
    setContentSortBy(type);
  }
  console.log(contentSortBy);
  return (
    <div className="w-full bg-bg h-fit relative">
      <Navbar onContentChange={contentChange} contentSortBy={contentSortBy} contentType={contentType}/>
      <Routes >
        <Route path="/" element={<Home contentType={contentType} contentSortBy={contentSortBy}/>} />
        <Route path="/movie/" element={<Discover contentType={contentType} contentSortBy={contentSortBy} contentSortChange={contentSortChange}/>} />
        <Route path="/tv/" element={<Discover contentType={contentType} contentSortBy={contentSortBy} contentSortChange={contentSortChange}/>} />
        <Route path="/movie/:movieId" element={<MovieOverview contentType={contentType} />} />
        <Route path="/tv/:movieId" element={<TvOverview contentType={contentType} />} />
        <Route path="/artist/:artistId" element={<ArtistOverview />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
