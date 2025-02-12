'use client';

import ExternalMqttContext, {ExternalMqttProvider}from '@/components/connect/ExternalContext';
import ExternalBrokerStatus from '@/components/statusconnect/ExternalBrokerStatus';
import ExternalDeviceStatus from '@/components/statusconnect/ExternalDeviceStatus';
import { MqttClient } from 'mqtt';
import React, { useContext } from 'react'


type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  device_log: string;
  device_connect: boolean;
  broker:string;
  connectPath:string,
  username:string,
  password:string,
  deviceName:string
};

export default function Panel({ isLoading, topic, device_log ,broker , connectPath , username , password,deviceName }: Props) {
    const { connectionStatus, deviceStatus } = useContext(ExternalMqttContext)
  return (
      <div
          className={`duration-1000 gap-2  shadow-md  bg-gradient-to-tr px-5 w-full from-blue-950 to-gray-800 rounded-lg ${
            isLoading ? " py-5 " : "py-0"
          }`}
        >
          <div
            className={` ${
              isLoading ? "animate-fadeIn" : "opacity-0"
            } flex justify-center items-center `}
          >
            <h1 className=" text-5xl font-extrabold text-gray-900 ">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600  from-sky-400 line-clamp-1 ">
                {deviceName}
              </span>
            </h1>
          </div>
          <div
            className={`my-5 grid lg:flex justify-between ${
              isLoading ? "animate-fadeIn " : "opacity-0"
            }`}
          >
            <span className="lg:text-xl text-white my-1">Action Type : </span>
            <span className="bg-gray-600  shadow-gray-950 text-center  lg:text-xl rounded-3xl text-white h-fit line-clamp-1 px-10 py-1 ">
              Transmitter
            </span>
          </div>
    
          <div
            className={`my-2 lg:flex justify-between md:flex grid gap-2  ${
              isLoading ? "animate-fadeIn" : "opacity-0"
            }`}
          >
            <div className="lg:text-xl text-white my-1 h-fit line-clamp-1">
              Cloud Connection :
            </div>
            {topic && (
              <ExternalMqttProvider topic_device={topic} broker={broker} connectPath= {connectPath} username={username} password={password}>
                <ExternalBrokerStatus />
              </ExternalMqttProvider>
            )}
          </div>
          <div
            className={`my-4 grid lg:flex justify-between ${
              isLoading ? "animate-fadeIn " : "opacity-0"
            }`}
          >
            <span className="lg:text-xl text-white my-1">Device Status : </span>
            {topic && (
              <ExternalMqttProvider topic_device={topic} broker={broker} connectPath= {connectPath} username={username} password={password}>
                <ExternalDeviceStatus />
              </ExternalMqttProvider>
            )}
          </div>
          <div
            className={`my-5 w-full lg:gap-3 grid lg:flex justify-between ${
              isLoading ? "animate-fadeIn " : "opacity-0"
            }`}
          >
            <span className="lg:text-xl text-white my-1">Topic : </span>
            <span className="bg-gray-600   shadow-gray-950 text-center  lg:text-xl rounded-3xl text-white  px-10 py-1">
              {topic}
            </span>
          </div>
          <hr className={`my-8 ${isLoading ? "animate-fadeIn " : "opacity-0"}`} />
          <div className={` ${isLoading ? "animate-fadeIn " : "opacity-0"}`}>
            <div className="lg:text-xl text-white my-1">Console log</div>
            <div className="bg-black border-2  flex shadow-gray-950  lg:text-xl rounded-lg text-white px-3 pt-2 pb-10 text-start">
              <p className=" duration-75 animate-pulse ">&gt;_&nbsp;&nbsp;&nbsp;</p>
              {device_log}
            </div>
          </div>
        </div>
  )
}
