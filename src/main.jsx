import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
ReactDOM.createRoot(document.getElementById("root")).render(


    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SkeletonTheme>
  
);
