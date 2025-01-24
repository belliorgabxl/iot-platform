"use client";
import CRSAboutUs from "@/components/CLS/CRSAboutUs";

import React, { useEffect, useState } from "react";
import AboutUsDetail from "./aboutUsDetail";
import AboutUsPage_article from "@/components/article/aboutusPageDetail";

export default function AboutUsForm() {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div className="w-full   bg-gray-700">
      <div className="grid w-full place-items-center ">
        <div className="flex justify-center">
          <CRSAboutUs isLoading={isLoading} />
        </div>

        <div className="w-full flex text-center lg:text-start">
          <h1
            className={`text-3xl font-bold w-full my-5 duration-1000 text-white py-4  rounded-sm bg-gray-900  ${
              isLoading ? "lg:pl-10" : "px-4 bg-gray-950"
            }`}
          >
            <span className="text-transparent  bg-clip-text bg-gradient-to-r to-blue-500 via-blue-200 from-blue-400">
              Developer
            </span>
          </h1>
        </div>
        <AboutUsDetail isLoading={isLoading} />
        <div className="w-full flex text-center">
          <h1
            className={`text-3xl font-bold w-full my-5 duration-1000 text-white py-4  rounded-sm bg-gray-900  ${
              isLoading ? "" : " bg-gray-950"
            }`}
          >
            <span className="text-transparent  bg-clip-text bg-gradient-to-r to-blue-500 via-blue-200 from-blue-400">
              Advisor
            </span>
          </h1>
        </div>
        <div className="grid lg:place-items-center">
          <div
            className={`duration-1000 bg-gray-900 w-fit flex h-fit  group  hover:scale-[102%] rounded-lg ${
              isLoading ? "" : "opacity-0  px-0"
            }`}
          >
            <div className=" space-y-1  text-white px-2 lg:px-10 lg:py-5 py-3  duration-1000 ">
              <p className=" text-sm lg:text-2xl">
                Assoc.Prof.Dr. Watid Phakphisut
              </p>
              <p className="text-sm lg:text-3xl mt-2">รศ.ดร.เวธิต ภาคย์พิสุทธิ์</p>
              <hr className="" />
              <p className="text-sm lg:text-lg line-clamp-1">Telecommunication</p>
              <p className="text-sm lg:text-lg">Faculty Of Engineering</p>
            </div>
            <img
              src="/aboutus/watid.jpg"

              alt="watid"
              className="rounded-r-lg  lg:w-[220px] w-[170px] object-cover group-hover:opacity-80 lg:h-auto "
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <h1
            className={`text-lg lg:text-3xl duration-1000 text-white py-4  rounded-lg bg-gray-900   ${
              isLoading ? "px-10 lg:px-20" : "px-4 bg-gray-950"
            }`}
          >
            Telecommunication
          </h1>
        </div>
        <AboutUsPage_article isLoading={isLoading} />
      </div>
    </div>
  );
}
