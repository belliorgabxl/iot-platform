"use client";

import React from "react";
import FadeInHorizontal from "../FadInHorizontal";
import { motion } from "framer-motion";

export default function documentSideBar() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }} 
      animate={isVisible ? { opacity: 1, x: 0 } : {}} 
      transition={{ duration: 1.2, ease: "easeOut" }} 
    >
      <div>
        <div>Sidebar</div>
      </div>
    </motion.div>
  );
}
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
