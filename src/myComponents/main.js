import React from "react";
import "../App.css";
import { Routes, Route, useNavigate,useLocation } from "react-router-dom";
import Textmain from "./textmain.js";
import Filemain from "./filemain.js";
import Feedbackform from "./feedbackform.js";


export default function Main() {
  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation();

  return (
    <>
      <div className="maincard">
        <div className="card-sidebar">
          <div className="image1">
            <i
              onClick={() => {
                navigate("/");
              }}
              className="fa-solid fa-paperclip fa-2xl"
              style={{ color: `${location.pathname === "/" ? "blue" : "black"}`, cursor: "pointer" }}
            ></i>
          </div>
          <div className="image2">
            <i
              onClick={() => {
                navigate("/files");
              }}
              className="fa-solid fa-file fa-2xl"
              style={{ color: `${location.pathname === "/files" ? "blue" : "black"}`, cursor: "pointer" }}
            ></i>
          </div>
        </div>
        <div className="card-container">
          <Routes>
            <Route path="/" element={
              <Textmain />
              } />
            <Route path="/files" element={
              <Filemain/>
              
              } />
            <Route path="/feedback" element={
              <Feedbackform/>
              } />

          </Routes>
        </div>
      </div>
    </>
  );
}
