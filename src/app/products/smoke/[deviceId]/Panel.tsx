"use client";
import { MqttProvider } from "@/components/connect/MqttContext";
import ConnectBrokerStatus from "@/components/statusconnect/ConnectBrokerStatus";
import ConnectDeviceStatus from "@/components/statusconnect/ConnectDeviceStatus";
import mqtt, { MqttClient } from "mqtt";
import React, { useEffect, useState } from "react";

type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  device_log: string;
  device_connect: boolean;
  smokeValue: string | null;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
};
export default function Panel({
  isLoading,
  topic,
  device_log,
  device_connect,
  smokeValue,
  value2,
  value3,
  value4,
  value5,
}: Props) {
  const [water, setWater] = useState<number>(0);
  useEffect(() => {
    if (smokeValue) {
      const part = smokeValue.split(":");
      if (part.length === 2 && part[0] === "value1") {
        const waterValue = parseInt(part[1], 10);
        if (!isNaN(waterValue)) {
          setWater(waterValue);
        }
      }
    }
  }, [smokeValue]);
  return (
    <div
      className={`duration-1000 gap-2  shadow-md bg-gradient-to-tr px-5 w-full from-blue-950 to-gray-800 rounded-lg ${
        isLoading ? " py-5 " : "py-0"
      }`}
    >
      <div
        className={` ${
          isLoading ? "animate-fadeIn" : "opacity-0"
        } flex justify-center items-center `}
      >
        <h1 className=" text-xl font-bold text-gray-900 ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600  from-sky-400 line-clamp-1 text-3xl">
            Smoke Detector
          </span>
        </h1>
      </div>
      <div
        className={`my-2 lg:flex  justify-between items-center grid gap-2  ${
          isLoading ? "animate-fadeIn" : "opacity-0"
        }`}
      >
        <div className="lg:text-xl text-white my-1 h-fit line-clamp-1">
          Action Type :
        </div>{" "}
        <p className="px-10 bg-gray-600  rounded-3xl flex items-center h-fit py-1 text-white">Receiver</p>
      </div>
      <div
        className={`my-2 lg:flex  justify-between  grid gap-2  ${
          isLoading ? "animate-fadeIn" : "opacity-0"
        }`}
      >
        <div className="lg:text-xl text-white my-1 h-fit line-clamp-1">
          Cloud Connection :
        </div>
        {topic && (
          <MqttProvider topic_device={topic}>
            <ConnectBrokerStatus />
          </MqttProvider>
        )}
      </div>
      <div
        className={`lg:my-4 grid lg:flex justify-between ${
          isLoading ? "animate-fadeIn " : "opacity-0"
        }`}
      >
        <span className="lg:text-xl text-white my-1">Device Status : </span>
        {topic && (
          <MqttProvider topic_device={topic}>
            <ConnectDeviceStatus />
          </MqttProvider>
        )}
      </div>
      <div
        className={`lg:my-5 w-full gap-1 lg:gap-3 grid lg:flex justify-between ${
          isLoading ? "animate-fadeIn " : "opacity-0"
        }`}
      >
        <span className="lg:text-xl text-white my-1">Topic : </span>
        <span className="bg-gray-600   shadow-gray-950 text-center  lg:text-xl rounded-3xl text-white  px-10 py-1">
          {topic}
        </span>
      </div>
      <hr className={`my-2 ${isLoading ? "animate-fadeIn " : "opacity-0"}`} />
      <div className={`mb-2 ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <div className=" grid place-items-center lg:text-xl rounded-sm gap-2 text-black font-semibold px-3 py-1 ">
          <p className="py-1 bg-white rounded-3xl px-4 text-blue-700 line-clamp-1 w-[250px] align-middle">
            LPG : {smokeValue} ppm
          </p>
          <p className="py-1 bg-white rounded-3xl px-4 text-blue-700 line-clamp-1 w-[250px] align-middle">
            CO : {value2} ppm
          </p>
          <p className="py-1 bg-white rounded-3xl px-4 text-blue-700 line-clamp-1 w-[250px] align-middle">
            Smoke : {value3} ppm
          </p>
          <p className="py-1 bg-white rounded-3xl px-4 text-blue-700 line-clamp-1 w-[250px] align-middle">
            Temperature : {value4} C
          </p>
          <p className="py-1 bg-white rounded-3xl px-4 text-blue-700 line-clamp-1 w-[250px] align-middle">
            Humidity : {value5} %RH
          </p>
        </div>
      </div>
      <div className={` ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
        <div className="lg:text-xl text-white my-1">Console log</div>
        <div className="bg-black   flex   text-xl rounded-sm text-white px-3 py-2  text-start">
          <p className=" duration-75 animate-pulse ">&gt;_&nbsp;&nbsp;&nbsp;</p>
          {device_log}
        </div>
      </div>
    </div>
  );
}
