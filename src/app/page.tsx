"use client";
import GetstartButton from "@/components/article/getstartButton";
import Homepage_article from "@/components/article/homePageDetail";
import CardImageHomepage from "@/components/card/cardImageHomepage";
import CLShomepage from "@/components/CLS/CLShomepage";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading , setIsLoaded] = useState<boolean>(false)
  useEffect(()=>{
    setIsLoaded(true)
  },[])
  return (
    <div className=" w-full pb-40 bg-gradient-to-tr from-gray-800 via-gray-500 to-gray-900 ">
      <div className="flex justify-center">
        <div className="bg-gray-800">
          <CLShomepage />
        </div>
      </div>
      <div className={` ${isLoading? 'animate-fadeStep1 opacity-100':'opacity-0'} w-full grid place-items-center`}>
        <h1 className="my-4 text-2xl lg:text-6xl text-white font-extrabold">
          IoT Device Management Platform
        </h1>
        <div className="px-4 text-sm text-center lg:text-2xl text-white w-full ">
          &nbsp;&nbsp;&nbsp;&nbsp; A Customizable Web Interface for Seamless Control and Monitoriing
          <br />
          Manage IoT Devices anytime and anywhere in the wolrd
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <GetstartButton isLoading={isLoading} />
      </div>
        <div className="mt-3 lg:mt-8 grid w-full place-items-center">
               <div className="w-fit grid grid-cols-2 place-items-center gap-0">
               <CardImageHomepage lable="Welcom" imgURL="/aboutus/aboutus_gabel.jpg"/>
               <CardImageHomepage lable="To" imgURL="/aboutus/aboutus_bam.jpg"/>
               <CardImageHomepage lable="ToT" imgURL="/aboutus/aboutus_por.jpg"/>
               <CardImageHomepage lable="Platform" imgURL="/aboutus/watid.jpg"/>
             </div>
        </div>
      <Homepage_article />
    </div>
  );
}
