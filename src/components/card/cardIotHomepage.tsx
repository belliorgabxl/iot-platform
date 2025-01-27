import React from "react";
import FadeInOnScroll from "../FadInScroll";

type CardProps = {
  topic: string;
  content: string;
  imgURL: string;
};

export default function CardIotHomepage(props: CardProps) {
  return (
    <FadeInOnScroll>
      <div className="group grid lg:w-[300px] w-[300px] rounded-md lg:h-[280px] bg-white gap-0 px-4 py-3 text-black overflow-hidden">
        <p className="w-full line-clamp-2 lg:text-xl text-lg h-fit font-semibold">{props.topic}</p>
        <p className="w-full text-sm text-gray-600 line-clamp-4 h-fit overflow-hidden">
          &nbsp;&nbsp;&nbsp;&nbsp;{props.content}
        </p>
        <div className="grid place-items-center">
          <img
            src={props.imgURL}
            className="h-[100px] w-[120px] object-cover group-hover:scale-[105%] duration-1000"
          />
        </div>
      </div>
    </FadeInOnScroll>
  );
}
