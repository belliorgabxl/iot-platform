"use client";

import DocumentSideBar from "@/components/sidebar/documentSideBar";
import React, { useState, useEffect } from "react";

export default function Addingdevices () {
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
                      Adding devices
                  </div>

                  <div className="bg-gray-950  w-full lg:px-5 px-3 rounded-2xl grid place-items-center">
                    <div
                      className={`my-10 w-full ${
                        isLoading ? "animate-fadeIn" : "opacity-0"
                      }`}
                    >
                                              
                        <li className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-5 font-semibold">
                           Adding device steps 
                           <br />
                           <br />
                          <div className="flex justify-center">
                            <img src="/general/add1.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Adding device
                            </span>
                            : When the user logs in, it will bounce to the devices page.
                             Look at the top right corner, there will be an add device button. Press add device.
                          </div>
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add2.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Adding device
                            </span>
                            : When you press add device, a form will appear for you to fill in 
                            your device information.
                          </div>
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add3.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Adding device
                            </span>
                            : User must select the correct type of IoT device , including
                            robot car , mechanical arm , watering pot and smoke detector.
                          </div>
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add4.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Adding device
                            </span>
                            : Then the user must select the type of operation of the device ,
                            whether it is a transmitter , a receiver or a device that can 
                            send and receive commands.
                          </div>
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add2.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Adding device
                            </span>
                            : Next step , you have to name the device every time you add a device.
                            Then enter the serial ID , which is the serial number og each device. 
                            each device has a unique serial number. press submit to confirm adding the device.
                          </div>
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/add5.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                            Adding device
                            </span>
                            : Once you have filled in the information, the device you have 
                            added will be displayed on the screen.
                          </div>
                          
                        </li>

                        <li className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-5 font-semibold">
                           Add device page
                           <br /> 
                           <br />                     
                          <div className="flex justify-center">
                              <img src="/general/add2.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                          <br />
                          <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                            &nbsp;&nbsp;&nbsp;&nbsp;This is the add device page :
                            <br />
                            <br />                           
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                               Device IoT
                            </span>
                            : Types of IoT device in the system include robot car , mechanical arm , 
                            watering pot and smoke detector
                            <br />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                               Action Type
                            </span>
                            : Type of operation of the device , whether it is a device that sends
                            commmands ( Transmitter ) , a device that receives commands ( Receiver )
                            or a device that can send and receive commands.
                            <br />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                               Device Name
                            </span>
                            : Name of the device that the user adds the device. The device Name
                            must be specified every time. 
                            <br />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                               Serial ID
                            </span>
                            : It is the identification number of each device. Each device has aunique
                            identification number.
                            <br />
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                          <br />
                        </li>
                    </div>
                  </div>

                </div>
            </div>
        </div>
    )
}