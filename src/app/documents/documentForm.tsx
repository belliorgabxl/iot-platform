"use client";

import DocumentSideBar from "@/components/sidebar/documentSideBar";
import React, { useState, useEffect } from "react";

export default function documentform () {
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
                      Documentation
                  </div>

                  <div className="bg-gray-800 w-full lg:px-5 px-3 rounded-2xl grid place-items-center">
                    <div
                      className={`my-10 w-full ${
                        isLoading ? "animate-fadeIn" : "opacity-0"
                      }`}
                    >
                      <br />
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                         Register
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/register.png" alt="doc_icon" className="h-50" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Register
                        </span>
                        : New users can register by filling in their information to create an account.
                         Once all required fields are completed, click 'Submit' to finalize the registration process.
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
                      <br />
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                        Login
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/login.png" alt="doc_icon" className="h-[50px])" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Login
                        </span>
                        : Once registered, users can log in by entering their username 
                        and password to gain access to the web application.
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
                      <br />
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                        Add Device or lmport
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add-or-lm.png" alt="doc_icon" className="h-[700px]) w-[700px]" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                         Add Device or lmport
                        </span>
                        : If you're using the developer's device, press 'Add Device.' 
                        To use a different device, press 'Import.'
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
                      <br />
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                        Add Device
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add1.png" alt="doc_icon" className="h-50" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Add Device
                        </span>
                        : Press 'Add Device' to open the device registration form. 
                        Fill in the required information and select the device type. Once completed, press 'Submit.'
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/add5.png" alt="doc_icon" className="h-50" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Add Devices
                        </span>
                        : When you add a device, it will be displayed on the screen.
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/control2.png" alt="doc_icon" className="h-50" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Custom Button
                        </span>
                        : Press into the device you added, connect WiFi to the device,
                         then custom the control button and control the device. 
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/control1.png" alt="doc_icon" className="h-50" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Control Device
                        </span>
                        : To use the basic control buttons, press default and control device.
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
                      <br />
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                        Broker
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/broker1.png" alt="doc_icon" className="h-[400px] w-[400px]" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Broker
                        </span>
                        : Click sign up and fill in the information to register
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/broker2.png" alt="doc_icon" className="h-[50]" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Broker
                        </span>
                        : Press create serverless cluster and press manage cluster.
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/broker3.png" alt="doc_icon" className="h-[50]" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Broker
                        </span>
                        : Select access management , press edit and press add credentials
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/broker4.png" alt="doc_icon" className="h-[50]" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Broker
                        </span>
                        : Set a password and fill in the infomation. Select the type of device
                        you want to import subscribe only , publish only , publish and subscribe
                        , then press save
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/broker5.png" alt="doc_icon" className="h-[50]" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        Broker
                        </span>
                        : URL, Port, Username and password. These 4 things must be entered into
                        the ESP32 code of the device and these data must be entered into the Import
                        device form.
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
                      <br />
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                        lmport Device
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/import1.png" alt="doc_icon" className="h-[700px]) w-[700px]" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                         lmport Device
                        </span>
                        : Press lmport, the Import device screen will appear. Press Import device.
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/import2.png" alt="doc_icon" className="h-[700px]) w-[700px]" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        lmport Device
                      </span>
                      : Press lmport, the Import device screen will appear. Press Import device.
                      </div>
                      <br />
                      <br />
                      <div className="flex justify-center">
                        <img src="/general/import4.png" alt="doc_icon" className="h-[50]" />
                      </div>
                      <br />
                      <br />
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                        lmport Device
                      </span>
                      : When the device import is complete, the imported device will be displayed on the screen. 
                      The following operations are the same as the operations after adding the device.
                      </div>
                    </div>


                    

                  </div>
                </div>
            </div>
        </div>
    )
}