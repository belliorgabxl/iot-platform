import React from "react";

type CardProps = {
  topic: string;
  content: string;
  imgURL: string;
};

export default function CardIotHomepage(props: CardProps) {
  return (
    <div className="grid lg:w-[300px] rounded-md lg:h-[200px] bg-white gap-0 px-4 py-5 text-black overflow-hidden">
      <div className="w-full">{props.topic}</div>
      <div className="w-full line-clamp-3">{props.content}</div>
      <img src={props.imgURL} className="h-[80px] w-[120px] object-cover" />
    </div>
  );
}
