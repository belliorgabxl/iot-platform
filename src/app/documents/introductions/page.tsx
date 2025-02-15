"use client";

import DocumentSideBar from "@/components/sidebar/documentSideBar";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div
      className={`duration-1000  bg-gray-700 ${
        isLoading ? "grid   w-full " : "flex "
      }`}
    >
      <div className="grid  w-full  lg:grid-cols-[15%_85%] ">
        <DocumentSideBar/>
        <div className=" grid place-items-center  px-3  pb-20">
          <div
            className={`flex justify-center lg:text-4xl md:text-4xl text-2xl py-6 text-center gap-4 duration-1000  ${
              isLoading
                ? "rounded-lg text-white lg:px-32 px-20 bg-gray-900 my-5"
                : "opacity-0 px-0"
            }`}
          >
            Introduction
            
          </div>

          <div className="bg-gray-800 w-full lg:px-5 px-3 rounded-2xl grid place-items-center">
            <div
              className={`my-10 w-full ${
                isLoading ? "animate-fadeIn" : "opacity-0"
              }`}
            >
              <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                 IoT PlatForm
              </li>
              <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  This IoT PlatForm
                </span>
                : a web application that can control and command Internet of Thing 
                devices via the internet over a distance. and the web application
                can manage multiple internet of thing device via MQTT protocol.
              </div>
            </div>

            <hr
              className={`w-5/6 my-5 ${
                isLoading ? "animate-fadeIn" : "opacity-0"
              }`}
            />

            <div
              className={`my-10 w-full lg:px-5 ${
                isLoading ? "animate-fadeIn" : "opacity-0"
              }`}
            >
              <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                Main Features
              </li>
              <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                &nbsp;&nbsp;&nbsp;&nbsp;The main features of this web
                application are as follows:
                <br />
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  Instant Device Control via Web Application
                </span>
                : User can control IoT devices diretly through the web application's 
                interface without the need for additional tools or software. This enables
                quick and convenient control.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  Wi-Fi Configuration Without Reuploading Code
                </span>
                : The system supports configuring and changing Wi-Fi network setting via 
                the web application interface without reuiring code to be reuploaded to the ESP32 .
                This reduces setup steps and enhances flexibility.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  Add device as Needed with Diverse Options
                </span>
                : User can easily add new IoT devices to the system , with a variety 
                of device typse to choose from , ensuring compatibility with specifically 
                needs such controlling , sound , motors or sensors.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  Customizable Control Buttons and Display
                </span>
                : The system alloes users to customiza device control buttons as needed 
                , including changing their position , color and commands. Additionally 
                , users can adjust the device status display to suit their specific use case.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  Integrate User-Developed Devices with the Web Application
                </span>
                : User can add their own developed devices to the system by using the provides 
                base code , making it simple to configure and connect them.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                  Support for User-Preferred MQTT Broker 
                </span>
                : Users have the flexibility to select their own MQTT broker , enhancing system
                management and data communication between devices.
              </div>
            </div>

            <div
              className={`my-10 w-full lg:px-5 ${
                isLoading ? "animate-fadeIn" : "opacity-0"
              }`}
            >
              <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                Devices
              </li>
              <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                &nbsp;&nbsp;&nbsp;&nbsp;The devices in this web application are
                categorized into three types:
                <br />
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;1.
                <span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 lg:text-2xl font-semibold mx-2">
                  Car
                </span>{" "}
                that are remotely controlled via a web application, allowing users to control 
                their movement and change Wi-Fi connection settings as needed. This device is ideal for demonstrating 
                functionality and connectivity,
                and is an educational tool for children to learn through hands-on experience.
                <br />
                <br />
                <div className="my-3"></div>
                &nbsp;&nbsp;&nbsp;&nbsp;2.
                <span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 lg:text-2xl font-semibold mx-2 ">
                  Robotic Arm
                </span>{" "}
                that can be controlled via a web application, following user commands, 
                with precise control and the flexibility to switch Wi-Fi connections as needed. Like cars, 
                this device is designed to demonstrate functionality and connectivity, and serves as a useful
                teaching tool for children.
                <br />
                <br />
                <div className="my-3"></div>
                &nbsp;&nbsp;&nbsp;&nbsp;3.
                <span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 lg:text-2xl font-semibold mx-2 ">
                  Smart Plane Pot
                </span>{" "}
                that integrate IoT technology to automatically water based on soil moisture levels.
                Plants can be watered automatically or manually via a web application. 
                Users can also check soil moisture levels and access watering statistics for further
                analysis. This device improves plant care efficiency through automation and 
                data-driven insights.
                <br />
                <br />
                <div className="my-3"></div>
                &nbsp;&nbsp;&nbsp;&nbsp;4.
                <span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 lg:text-2xl font-semibold mx-2">
                  Smoke and Temperature Detector
                </span>{" "}
                that work via a web application can alert when excessive smoke or temperature is detected,
                which could cause a fire. The data is displayed on the screen as a pie chart showing
                the detected waste. This device reduces the risk of fire.
                <br />
                <br />
                <div className="my-3"></div>
                &nbsp;&nbsp;&nbsp;&nbsp;5.
                <span className="text-green-500 bg-gray-800 shadow-inner shadow-gray-950 px-3 py-1 lg:text-2xl font-semibold mx-2">
                  LPG Gas Detector
                </span>{" "}
                that work via a web application It can alert when LPG gas is detected.
                The data will be displayed on the screen as a pie chart showing the detected data. 
                This device is useful in reducing the risk of fires.             
              </div>
            </div>
           
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
