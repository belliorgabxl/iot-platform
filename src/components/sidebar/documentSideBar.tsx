"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function DocumentSideBar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={isVisible ? { x: 250, opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-14 w-fit  text-white "
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`py-5 px-1 bg-blue-500 text-white rounded-md`}
        >
         <ChevronRight style={{width:"2.0rem" , height:"2.0rem"}} className={` ${isVisible ? 'rotate-180 ':''} text-white duration-1000`}/>
        </button>
      </motion.div>
      <motion.div
        initial={{ x: -250, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : { x: -250, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-14 py-5 left-0 h-full w-64 bg-gray-800 z-10 text-white shadow-lg p-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-white text-center">Sidebar</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-xl bg-green-500 px-10 py-2 "
          >
            ×
          </button>
        </div>
      </motion.div>
    </div>
  );
}
