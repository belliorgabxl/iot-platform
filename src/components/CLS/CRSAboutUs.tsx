"use client";
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";
type Props = {
  isLoading: boolean;
};
export default function CRSAboutUs({ isLoading }: Props) {
  return (
    <div
      className={`transition-opacity duration-1000 ${
        isLoading ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <Carousel
        autoPlay={true}
        interval={4000}
        width="full"
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        dynamicHeight={false}
        swipeable={false}
      >
        <div>
          <Image alt="image" src="aboutus/telecom.jpg" />
          <p className="legend">Telecommunication Engineering</p>
        </div>
        <div>
          <Image alt="image" src="aboutus/kmitl.jpg" />
          <p className="legend">king is mongkut institute of Ladkrabang</p>
        </div>
        <div>
          <Image alt="image" src="aboutus/coding.jpg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <Image alt="image" src="aboutus/development01.jpg" />
          <p className="legend">Develop moment</p>
        </div>
        <div>
          <Image alt="image" src="aboutus/development02.jpg" />
          <p className="legend">Develop moment</p>
        </div>
      </Carousel>
    </div>
  );
}
