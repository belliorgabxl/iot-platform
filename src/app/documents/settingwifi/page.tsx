"use client";

import DocumentSideBar from "@/components/sidebar/documentSideBar";
import React, { useState, useEffect } from "react";

export default function Settingwifi () {
    const [isLoading, setLoading] = useState<boolean>(false);
      useEffect(() => {
        setLoading(true);
      }, []);
    return(
        <div className={`duration-1000  bg-gray-700 ${
            isLoading ? "grid   w-full " : "flex "
          }`}>
            <div className="grid  w-full  lg:grid-cols-[15%_85%] ">
                <DocumentSideBar/>
                <div className=" grid place-items-center  px-3  pb-20">
                  <div
                    className={`flex justify-center lg:text-4xl md:text-4xl text-2xl py-6 text-center gap-4 duration-1000  ${
                      isLoading
                       ? "rounded-lg text-white lg:px-32 px-20 bg-gray-900 my-5"
                       : "opacity-0 px-0"
                    }`}>
                      Setting Wi-Fi
                  </div>
                  <div className="bg-gray-950 w-full lg:px-5 px-3 rounded-2xl grid place-items-center">
                    <div 
                      className={`my-10 w-full ${
                        isLoading ? "animate-fadeIn" : "opacity-0"
                      }`}
                    >
                      <li className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-5 font-semibold">
                        Setting Wi-Fi steps
                        <br /> 
                        <br /> 
                        <div className="flex justify-center">
                          <img src="/general/wifisetup3.png" alt="doc_icon" className="h-50 rounded-3xl" />
                        </div>
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Setting Wi-Fi
                          </span>
                          : When a user logs in to the system, before they can access the WiFi 
                          settings page, they must add a device first. 
                        </div>                       
                        <br /> 

                        <div className="flex justify-center">
                          <img src="/general/wifisetup4.png" alt="doc_icon" className="h-50 rounded-3xl" />
                        </div>
                        <br />
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Setting Wi-Fi
                          </span>
                          : When the user logs in, add a device by pressing the add device button
                           and filling out the device registration form.
                        </div>
                        <br />

                        <div className="flex justify-center">
                          <img src="/general/wifisetup5.png" alt="doc_icon" className="h-50 rounded-3xl " />
                        </div>
                        <br />
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Setting Wi-Fi
                          </span>
                          : Click to select the device that the user added.
                        </div>
                        <br />

                        <div className="flex justify-center">
                          <img src="/general/wifisetup6.png" alt="doc_icon" className="h-50 rounded-3xl " />
                        </div>
                        <br />
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Setting Wi-Fi
                          </span>
                          : When pressed, it will display the device control button screen.
                           If you look at the top right corner of the screen, you will see the WiFi setting button.
                        </div>
                        <br />

                        <div className="flex justify-center">
                          <img src="/general/wifisetup1.png" alt="doc_icon" className="h-50 rounded-3xl" />
                        </div>
                        <br />
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Setting Wi-Fi
                          </span>
                          : Press Wi-Fi setup. The screen will display the default WiFi Name 
                          and password. 
                        </div>
                        <br />

                        <div className="flex justify-center">
                          <img src="/general/wifisetup2.png" alt="doc_icon" className="h-50 rounded-3xl" />
                        </div>
                        <br />
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Setting Wi-Fi
                          </span>
                          : Change the WiFi name and passeord as desired , then press change. 
                        </div>
                        <br />
                      </li>

                      <hr
                        className={`w-5/6 my-5 mx-auto transition-opacity duration-1000 ${
                        isLoading ? "opacity-100" : "opacity-0"
                         }`}
                      />
                      <br />
                      <br />


                      <li className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-5 font-semibold">
                        Connect to Wi-Fi
                        <br /> 
                        <br /> 
                        <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                          <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Connect to WiFi 
                          </span>
                          : This code is used to connect the ESP32 to a WiFi network by setting 
                          your desired SSID and password. Simply replace 'yourSSID' and 'yourPassword'
                           with your network credentials before uploading the code to the ESP32. 
                           <br /> 
                           <br />
                           Here is a code example :
                           <br /> 
                           <br />
                           <div className="flex justify-center">
                             <img src="/general/connect.png" alt="doc_icon" className="h-50 rounded-3xl" />
                           </div>

                        </div>
                      </li>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}