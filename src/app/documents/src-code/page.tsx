"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="py-5 px-5 bg-gray-700">
      <div className=" grid place-items-center py-5">
        <div className="text-white lg:text-3xl text-xl bg-gray-800 px-10 rounded-3xl py-1">
          Example Code
        </div>

        <div className="w-full h-fit flex py-5  justify-center">
          <div className="grid text-lg grid-cols-4 w-fit h-fit lg:gap-8 gap-4">
            <Link href={"/documents/src-code/ep1"}  className="py-2 px-5 bg-blue-700 hover:bg-blue-400 text-white rounded-md text-center">
              how to connect ESP-32 with platform
            </Link >
            <Link href={"/documents/src-code/ep1"}  className="py-2 px-5 bg-blue-700 hover:bg-blue-400 text-white rounded-md text-center">
              Customize ESP-32 command
            </Link >
            <Link href={"/documents/src-code/ep1"}  className="py-2 px-5 bg-blue-700 hover:bg-blue-400 text-white rounded-md text-center">
              Change wi-fi setting
            </Link >
            <Link href={"/documents/src-code/ep1"}  className="py-2 px-5 bg-blue-700 hover:bg-blue-400 text-white rounded-md text-center">
                Send sensor value from ESP-32
            </Link >
            <Link href={"/documents/src-code/ep1"}  className="py-2 px-5 bg-blue-700 hover:bg-blue-400 text-white rounded-md text-center">
              Select Your Broker
            </Link >
            <Link href={"/documents/src-code/ep1"}  className="py-2 px-5 bg-blue-700 hover:bg-blue-400 text-white rounded-md text-center">
              Configuration Command
            </Link >
            
          </div>
        </div>
      </div>
    </div>
  );
}
