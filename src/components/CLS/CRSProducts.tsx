"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";

type Props = {
  isLoading: boolean;
};

export default function CRSProducts({ isLoading }: Props) {
  return (
    <div
      className={`transition-opacity duration-1000 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <Carousel
        autoPlay={true}
        interval={2800}
        width="90%"
        infiniteLoop={true}
        showArrows={true}
        showThumbs={true}
        dynamicHeight={false}
        swipeable={false}
        
      >
        <div>
          <img alt="image" src="/cls/slideProduct01.jpg" className="rounded-lg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <img alt="image" src="/cls/slideProduct02.jpg" className="rounded-lg " />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <img alt="image" src="/cls/slideProduct03.jpg" className="rounded-lg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <img alt="image" src="/cls/slideProduct04.jpg" className="rounded-lg" />
          <p className="legend">Develop moment</p>
        </div>
      </Carousel>
    </div>
  );
}
