"use client";
import GetstartButton from "@/components/article/getstartButton";
import Homepage_article from "@/components/article/homePageDetail";
import CardImageHomepage from "@/components/card/cardImageHomepage";
import CardIotHomepage from "@/components/card/cardIotHomepage";
import CLShomepage from "@/components/CLS/CLShomepage";
import FadeInOnScroll from "@/components/FadInScroll";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className=" w-full pb-40 bg-gradient-to-tr from-gray-900 via-gray-500 to-gray-900 ">
      <div className="flex justify-center">
        <div className="bg-gray-800">
          <CLShomepage />
        </div>
      </div>
      <div
        className={` ${
          isLoading ? "animate-fadeStep1 opacity-100" : "opacity-0"
        } w-full grid place-items-center`}
      >
        <h1 className="my-5 lg:my-6 sm:text-5xl text-4xl lg:text-6xl text-center text-white font-extrabold">
          IoT Device<br className="lg:hidden md:hidden sm:block block"/> Management Platform
        </h1>
        <div className="px-4  lg:my-4 text-lg font-semibold text-center lg:text-2xl text-white w-full ">
          &nbsp;&nbsp;&nbsp;&nbsp; A Customizable Web Interface for Seamless
          Control and Monitoriing
          <br className="hidden lg:block" />
          Manage IoT Devices anytime and anywhere in the wolrd
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <GetstartButton isLoading={isLoading} />
      </div>
      <div
        className={` ${
          isLoading ? "animate-fadeStep1 opacity-100" : "opacity-0"
        } mt-5 lg:mt-8 grid w-full place-items-center overflow-hidden`}
      >
          <div className="w-full  grid lg:grid-cols-2 md:grid-cols-2 place-items-center gap-0 overflow-hidden">
       
            <CardImageHomepage lable="Welcom" imgURL="/aboutus/gabel.jpg" />
            <CardImageHomepage lable="To" imgURL="/aboutus/bam.jpg" />
            <CardImageHomepage lable="IoT" imgURL="/aboutus/por.jpg" />
            <CardImageHomepage lable="Platform" imgURL="/aboutus/watid.jpg" />
          </div>
      </div>

      <div className="grid place-items-center my-5 lg:mt-10 mb-5 gap-0 lg:bg-none md:grid-cols-1 lg:grid-cols-[45%_55%]">
        <div className="grid sm:gap-10 gap-8 lg:gap-16 place-items-center h-fit">
          <FadeInOnScroll>
            <Link
              href={"/documents"}
              className="text-3xl hover:text-blue-600 lg:text-5xl md:text-5xl font-bold text-white grid place-items-center text-center duration-700"
            >
              What is this Device
              <br />
              Management IoT Platform
            </Link>
          </FadeInOnScroll>
          <FadeInOnScroll>
            <img src="/homepage/iot.png" className="w-[400px] h-[400px]" />
          </FadeInOnScroll>
        </div>
        <div className=" grid  lg:grid-cols-2 lg:w-fit w-full gap-2  place-items-center  lg:gap-4  ">
          <CardIotHomepage
            imgURL="/homepage/dashboard.png"
            topic="Efficient Control and Monitoring"
            content="The platform allows users to control and monitor IoT devices with minimal delays,ensuring smooth and responsive interaction with connected device."
          />
          <CardIotHomepage
            imgURL="/homepage/remote-access.png"
            topic="Remote Accessibility"
            content="Users can access manage IoT devices from anywhere in the world via a web application, ensuring convenience and flexibility."
          />
          <CardIotHomepage
            imgURL="/homepage/wifi-color.png"
            topic="Dynamic Network Configuration"
            content="The system allows seamless Wi-Fi network changes without the need to modify code or restart devices, enchancing ease of use."
          />
          <CardIotHomepage
            imgURL="/homepage/custom.png"
            topic="Customizable Interface"
            content="Feature a user-friendly web interface with customizable control buttons tailored to specific device types for enhanced useability."
          />
          <CardIotHomepage
            imgURL="/homepage/mqtt.png"
            topic="Efficient Communication Protocols"
            content="Utilizes MQTT and WebSocket protocols for reliable and efficient communication between device and the web application."
          />
          <CardIotHomepage
            imgURL="/homepage/microcontroller.png"
            topic="Hardware Integration"
            content="Leverage the ESP32 microcontroller for efficient device management and connectivity ensureing compatibility with various IoT devices."
          />
        </div>
      </div>
      <Homepage_article />
    </div>
  );
}
