import React from "react";


type CardProps = {
  lable:string;
  imgURL:string;
}

export default function CardImageHomepage(props:CardProps) {
  return (
    <div className="group">
      <div className="relative  items-center justify-center flex sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] w-[190px] h-[190px] overflow-hidden">
        <img
          src={props.imgURL}
          className="absolute lg:w-[500px] lg:h-[500px] sm:w-[300px] sm:h-[300px] w-[190px] h-[190px]  object-cover transition-transform duration-1000  group-hover:scale-[115%]"
        />
        <div className="relative w-full h-full bg-gradient-to-t from-gray-900/70 to-gray-900/30"></div>
        <div className="absolute text-white text-4xl lg:text-8xl font-bold">{props.lable}</div>
      </div>
    </div>
  );
}
