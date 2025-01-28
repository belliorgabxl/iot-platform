"use client"
import React from "react";
import FadeInOnScroll from "../FadInScroll";
import FadeInHorizontal from "../FadInHorizontal";
import FadeInVHorizontal from "../FadInVHorizontal";
import Link from "next/link";

export default function CardMainImgHomepage() {
  return (
    <div className="relative group overflow-hidden  w-full h-[500px] flex  items-center justify-center">
      <img
        className="absolute object-cover w-full h-[500px] group-hover:scale-[105%] duration-1000"
        src="/homepage/circuit.jpg"
      />
      <div className="absolute w-full h-full bg-gradient-to-t from-gray-950/95 to-gray-900/50"></div>

      <div className="absolute space-y-10">
        <FadeInOnScroll>
          <p className="sm:text-5xl text-4xl lg:text-6xl text-center text-white font-extrabold">
            IoT Devices
            <br className="lg:hidden md:hidden sm:block block" /> Management
            Platform
          </p>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <p className=" text-lg lg:px-0 md:px-0 px-5 font-semibold text-center lg:text-3xl md:text-2xl text-white w-full ">
            &nbsp;&nbsp;&nbsp;&nbsp; A Customizable Web Interface for Seamless
            Control and Monitoriing
            <br className="hidden lg:block md:block" />
            Manage IoT Devices anytime and anywhere in the wolrd
          </p>
        </FadeInOnScroll>
        <div className="lg:flex md:flex grid lg:gap-10 md:gap-10 gap-5 w-full lg:justify-center md:justify-center place-items-center">
          <FadeInHorizontal>
            <Link href={'/devices'} className="px-5 hover:scale-[105%] duration-500 hover:opacity-80 py-1.5 rounded-md bg-black text-white  lg:text-2xl md:text-2xl text-lg shadow-md shadow-gray-800 lg:w-[180px] md:w-[180px] w-[150px]">
              Get Started
            </Link>
          </FadeInHorizontal>
          <FadeInVHorizontal>
            <Link href={'/documents'} className="px-5  hover:scale-[105%] duration-500 hover:opacity-80 py-1.5 rounded-md bg-white text-black lg:text-2xl md:text-2xl shadow-md shadow-gray-800 text-lg lg:w-[180px] md:w-[180px] w-[150px]">
              Document
            </Link>
          </FadeInVHorizontal>
        </div>
      </div>
    </div>
  );
}
