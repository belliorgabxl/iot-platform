'use client'
import React from "react";
import FadeInOnScroll from "../FadInScroll";

type CardProps = {
  lable: string;
  imgURL: string;
};

export default function CardImageHomepage(props: CardProps) {
  return (
    <div className="group w-full overflow-hidden">
      <FadeInOnScroll>
      <div className="relative flex items-center justify-center sm:w-[400px] sm:h-[400px] lg:w-[100%] lg:h-[500px] w-full h-[220px] overflow-hidden">
        <img
          src={props.imgURL}
          alt={props.lable}
          className="absolute lg:w-[100%] lg:h-[500px] sm:w-[400px] sm:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[115%]"
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-gray-900/80 to-gray-900/30"></div>
        <div className="absolute text-white text-6xl lg:text-8xl font-bold">
          {props.lable}
        </div>
      </div></FadeInOnScroll>
    </div>
  );
}
