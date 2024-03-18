"use client";
import { Link } from "react-router-dom";
import React from "react";
import img1 from "./assets/Vector.png";
import img2 from "./assets/Saly-2.png";
import icon from "./assets/icon.png";

export default function Layout() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full bg-[#D87555] lg:w-1/2">
        <img className="mt-4 ml-4" src={icon}></img>
        <img className="hidden lg:block ml-28 mt-12" src={img1}></img>
      </div>
      <div className="hidden lg:flex items-center ml-60">
        <img src={img2}></img>
      </div>
    </div>
  );
}
