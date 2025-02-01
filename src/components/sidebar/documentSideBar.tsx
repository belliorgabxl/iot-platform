"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function DocumentSideBar() {
  const [isVisible, setIsVisible] = useState(true);

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
        className="fixed top-14 py-5 left-0 h-full w-64 bg-gray-900 z-10 text-white shadow-lg p-4"
      >
        <div className="px-10 w-full hover:bg-gray-500">
          <h2 className="text-xl text-white text-center py-1">Sidebar</h2>
        </div>
      </motion.div>
    </div>
  );
}
