import React from "react";


type CardProps = {
  lable:string;
  imgURL:string;
}

export default function CardImageHomepage(props:CardProps) {
  return (
    <div className="group">
      <div className="relative  items-center justify-center flex lg:w-[400px] lg:h-[400px] w-[150px] h-[150px] overflow-hidden">
        <img
          src={props.imgURL}
          className="absolute lg:w-[400px] lg:h-[400px] w-[150px] h-[150px]  object-cover transition-transform duration-1000  group-hover:scale-[115%]"
        />
        <div className="relative w-full h-full bg-gradient-to-t from-gray-900/70 to-gray-900/30"></div>
        <div className="absolute text-white text-3xl lg:text-6xl font-bold">{props.lable}</div>
      </div>
    </div>
  );
}
