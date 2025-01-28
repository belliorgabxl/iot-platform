import React from "react";
import FadeInOnScroll from "../FadInScroll";

type CardProps = {
  topic: string;
  content: string;
  imgURL: string;
};

export default function CardIotHomepage(props: CardProps) {
  return (
    <div className="lg:px-0 md:px-0 sm:px-5 px-5">
    <FadeInOnScroll>
      <div className="group grid lg:w-[280px] lg:h-[280px] md:w-[280px] md:h-[280px] w-full     rounded-md  bg-white gap-0 px-4 py-3 text-black overflow-hidden">
        <p className="w-full line-clamp-2 lg:text-xl text-lg h-fit font-semibold">{props.topic}</p>
        <p className="w-full text-sm text-gray-600 line-clamp-4 h-fit overflow-hidden">
          &nbsp;&nbsp;&nbsp;&nbsp;{props.content}
        </p>
        <div className="grid place-items-center">
          <img
            src={props.imgURL}
            className="h-[100px] lg:h-[120px]  w-[120px] object-cover group-hover:scale-[105%] duration-1000"
          />
        </div>
      </div>
    </FadeInOnScroll></div>
  );
}
