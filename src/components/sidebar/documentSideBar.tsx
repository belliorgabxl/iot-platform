"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type sideProp = {
  title: string;
  link: string;
};

export default function DocumentSideBar() {
  const [isVisible, setIsVisible] = useState(true);

  const sideBarLink = [
    {
      title: "Introductions",
      link: "/documents",
    },
    {
      title: "Get Started",
      link: "/documents",
    },
    {
      title: "Adding Devices",
      link: "/documents",
    },
    {
      title: "Setting Wi-fi",
      link: "/documents",
    },
    {
      title: "Import Devices",
      link: "/documents",
    },
    {
      title: "EPS32 Source Code",
      link: "/documents",
    },
    {
      title: "Waiting for Update...",
      link: "/documents",
    },
    {
      title: "Waiting for Update...",
      link: "/documents",
    },
    {
      title: "Waiting for Update...",
      link: "/documents",
    },
    {
      title: "Waiting for Update...",
      link: "/documents",
    },
  ];

  return (
    <div className="relative">
      <motion.div
        animate={isVisible ? { x: 250, opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-14 w-fit  text-white "
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`py-5 px-0 translate-y-1  bg-white/20 backdrop-blur-md text-white rounded-md`}
        >
          <ChevronRight
            style={{ width: "2.0rem", height: "2.0rem" }}
            className={` ${
              isVisible ? "rotate-180 " : ""
            } text-white duration-700`}
          />
        </button>
      </motion.div>
      <motion.div
        animate={isVisible ? { x: 0, opacity: 1 } : { x: -250, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-14 left-0 h-full w-64 bg-gray-900 z-10 text-white shadow-lg px-2 py-4"
      >
        <div className="grid gap-2">
          {sideBarLink.map((item) => (
            <Link
              href={item.link}
              className="lg:text-xl text-sm text-white text-start py-1 px-5 w-full hover:bg-gray-700 rounded-md"
            >
              {item.title}
            </Link> 
          ))}
        </div>
      </motion.div>
    </div>
  );
}
