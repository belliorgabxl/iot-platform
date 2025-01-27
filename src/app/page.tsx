"use client";
import GetstartButton from "@/components/article/getstartButton";
import Homepage_article from "@/components/article/homePageDetail";
import CardImageHomepage from "@/components/card/cardImageHomepage";
import CardIotHomepage from "@/components/card/cardIotHomepage";
import CLShomepage from "@/components/CLS/CLShomepage";
import FadeInOnScroll from "@/components/FadInScroll";
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
        <h1 className="my-4 text-2xl lg:text-6xl text-white font-extrabold">
          IoT Device Management Platform
        </h1>
        <div className="px-4 text-sm text-center lg:text-2xl text-white w-full ">
          &nbsp;&nbsp;&nbsp;&nbsp; A Customizable Web Interface for Seamless
          Control and Monitoriing
          <br />
          Manage IoT Devices anytime and anywhere in the wolrd
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <GetstartButton isLoading={isLoading} />
      </div>
      <div
        className={` ${
          isLoading ? "animate-fadeStep1 opacity-100" : "opacity-0"
        } mt-3 lg:mt-8 grid w-full place-items-center overflow-hidden`}
      >
        <FadeInOnScroll>
          <div className="w-fit  grid lg:grid-cols-2 md:grid-cols-2 place-items-center gap-0">
            <CardImageHomepage lable="Welcom" imgURL="/aboutus/gabel.jpg" />
            <CardImageHomepage lable="To" imgURL="/aboutus/bam.jpg" />
            <CardImageHomepage lable="IoT" imgURL="/aboutus/por.jpg" />
            <CardImageHomepage lable="Platform" imgURL="/aboutus/watid.jpg" />
          </div>
        </FadeInOnScroll>
      </div>
      <FadeInOnScroll>
        <div className="grid my-5 lg:my-10 gap-0 lg:grid-cols-[45%_55%]">
          <div className="grid gap-16 place-items-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-white text-center">
              What is this Device
              <br />
              Management IoT Platform
            </h1>
            <img src="/homepage/iot.png" className="w-[400px] h-[400px]" />
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-4  border border-white">
          <CardIotHomepage
          imgURL="/aboutus/gabel.jpg"
          topic="jalfjlajfldjfajfa;jfajfadjf"
          content="jal;fjaljfldjafljadlghajd;fjdalfhadkjfhdlajfadjf;aljfdlahflhdfk"
          />
          </div>
        </div>
      </FadeInOnScroll>
      <Homepage_article />
    </div>
  );
}
