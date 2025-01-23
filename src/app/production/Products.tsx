"use client";

import CRSProducts from "@/components/CLS/CRSProducts";
import ProductHeader from "./Header";
import React, { useEffect, useState } from "react";
import ProductDetail from "./productDetail";
import RotateImage from "@/components/Effect/RotateImage";
import CRSProducts2 from "@/components/CLS/CLSProducts2";

export default function Products() {
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="w-full bg-gray-700 py-10">
      <div className="flex justify-center  w-full mb-5">
        <ProductHeader isLoading={isLoading} />
      </div>
      {/* for the product */}
      <RotateImage/>
      <div className="px-4 lg:grid-cols-[40%_60%] gap-1 grid lg:gap-5 w-full  my-5">
        <div>
          <ProductDetail isLoading={isLoading} />
        </div>
        
        <div className="lg:px-10 px-4 py-5 bg-gray-600 w-full  rounded-lg  ">
          <div className="lg:flex md:flex justify-center hidden ">
            <CRSProducts isLoading={isLoading} />
          </div>
          <div className="flex justify-center lg:hidden md:hidden ">
            <CRSProducts2 isLoading={isLoading} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
