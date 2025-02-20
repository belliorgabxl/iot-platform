"use client";

import DocumentSideBar from "@/components/sidebar/documentSideBar";
import React, { useState, useEffect } from "react";

export default function Getstarted () {
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
                      Get started
                  </div>

                  <div className="bg-gray-950 w-full lg:px-5 px-3 rounded-2xl grid place-items-center">
                    <div
                      className={`my-10 w-full ${
                        isLoading ? "animate-fadeIn" : "opacity-0"
                      }`}
                    >
                      
                      <div className=" px-5 py-10  text-white lg:text-2xl">
                        <span className="text-blue-600 px-2 lg:text-3xl font-semibold mr-1">
                          Get started with IoT Device Management Platform                          
                        </span> 
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                          Get started This page is created to introduce how to access the website correctly,
                          starting from registration to login. Users will benefit from this platform by learning 
                          about the working process of the platform and connecting devices via WiFi to remotely control 
                          devices via a web page.
                        <br />
                        <br />
                        <span className="text-blue-600 px-2 lg:text-3xl font-semibold mr-1">
                          Benefits of IoT Device Management Platform                         
                        </span> 
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        - can control IoT device via the web remotely
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        - can apply the web to the IoT devices that need to be controlled
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        - stable in use
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        - open for free trial
                        <br />
                        <br />
                        <span className="text-blue-600 px-2 lg:text-3xl font-semibold mr-1">
                          The start-up process consists of 2 steps as follows:                       
                        </span> 
                      </div>
                      <li className="lg:text-3xl text-xl text-white mb-5 font-semibold">
                        Register
                          <br />
                          <br />
                          <div className="flex justify-center">
                            <img src="/general/register.png" alt="doc_icon" className="h-50 rounded-3xl" />
                          </div>
                      </li>
                      <div className="bg-gray-950 px-5 py-10  text-white lg:text-2xl">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-blue-600 px-2 lg:text-2xl font-semibold mr-1">
                          Register
                        </span>
                        : New user can register by filling in their information to create an account.
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
                            <img src="/general/login.png" alt="doc_icon" className="h-50 rounded-3xl" />
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

                  </div>
                </div>
            </div>
        </div>
    )
}