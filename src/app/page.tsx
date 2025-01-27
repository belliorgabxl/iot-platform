"use client";
import Homepage_article from "@/components/article/homePageDetail";
import CLShomepage from "@/components/CLS/CLShomepage";

export default function Home() {
  return (
    <div className=" w-full pb-40 bg-gradient-to-tr from-gray-800 via-gray-500 to-gray-900 ">
      <div className="flex justify-center">
        <div className="bg-gray-800">
          <CLShomepage />
        </div>
      </div>
      <div className="  w-full grid place-items-center">
        <h1 className="my-4 text-2xl lg:text-6xl text-white font-extrabold">
          IoT Device Management Platform
        </h1>
        <div className=" text-sm text-center lg:text-2xl text-white">A Customizable Web Interface for Seamless Control and Monitoriing<br/>
        Manage IoT Devices anytime and anywhere in the wolrd</div>
        
      </div>
      <Homepage_article />
    </div>
  );
}
