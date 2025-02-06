"use client";
import React from "react";
import { useState, useEffect } from "react";
import { DeviceModel } from "@/resource/model";
import { ChevronRight, Link, Settings } from "lucide-react";
import DeviceStatus from "@/components/statusconnect/DeviceStatus";
import { MqttProvider } from "@/components/connect/MqttContext";
import { useRouter } from "next/navigation";
import AddDevicePopUp from "@/components/popup/AddDevicePopUp";

const getExternalDevice = async () => {};

export default function Body() {
  const router = useRouter();
  const [devices, setDevices] = useState<DeviceModel[] | null>();
  const [broker, setBroker] = useState<string | null>();
  const [openImport, setOpenImport] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const onCancelImport = () => {
    setOpenImport(false);
    setBroker(null);
  };
  return (
    <div className="w-full bg-gray-700">
      <div className="w-full grid place-items-center ">
        <h1 className="py-2 bg-gray-800 px-10 text-3xl rounded-3xl text-white my-2">
          Import External Device
        </h1>
      </div>
      <div className="w-full mt-4 flex justify-start px-2 lg:px-5 gap-5">
        <button
          className="flex text-white items-center gap-2 px-8 py-2 rounded-3xl bg-blue-600 hover:bg-blue-500"
          onClick={() => setOpenImport(!openImport)}
        >
          Import Device
          <ChevronRight
            style={{ width: "1.5rem", height: "1.5rem" }}
            className={` ${
              openImport ? "rotate-90" : ""
            } duration-200 relative translate-y-0.5`}
          />
        </button>
        <button
          className="flex text-white items-center gap-2 px-8 py-2 rounded-3xl bg-blue-600 hover:bg-blue-500"
          onClick={()=>{
            router.push("/documents/example")
          }}
        >
          .ino Source-Code
          <ChevronRight
            style={{ width: "1.5rem", height: "1.5rem" }}
            className={` duration-200 relative translate-y-0.5`}
          />
        </button>
      </div>

      {openImport && (
        <div className="animate-fastFade lg:flex grid gap-2 lg:gap-5 my-2 px-5">
          <div className=" py-5  rounded-md grid gap-4  bg-gray-800 w-fit px-4">
            <div className="grid gap-4">
              <h1 className="text-white text-lg font-semibold px-5 bg-gray-900 py-1 w-fit  rounded-md">
                Select Broker
              </h1>
              <div className="flex gap-4 ">
                <div className="flex gap-2 items-center">
                  <label className="text-lg text-white ">HIVE MQ</label>
                  <input
                    type="radio"
                    name="broker"
                    onChange={(e) => setBroker(e.target.value)}
                    value="hivemq"
                    className="w-4 h-4 shadow-none"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="text-lg text-white ">Ada-fruite</label>
                  <input
                    type="radio"
                    name="broker"
                    onChange={(e) => setBroker(e.target.value)}
                    value="adafruite"
                    defaultValue={broker || ""}
                    className="w-4 h-4 shadow-none"
                  />
                </div>
              </div>
              <hr className="w-full text-white" />
              {broker == "hivemq" ? (
                <div className="grid gap-2">
                  <h1 className="font-semibold text-blue-500 text-lg">
                    Hive-MQ Connection
                  </h1>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">MQTT End point :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[300px] md:w-[300px] text-gray-800 w-full px-2"
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Username :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Password :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                    />
                  </div>
                  <hr className="w-full mt-2 text-white" />
                </div>
              ) : broker == "adafruite" ? (
                <div className="grid gap-2">
                  <h1 className="font-semibold text-blue-500  text-lg">
                    Ada-Fruite Connection
                  </h1>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">MQTT Broker :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[300px] md:w-[300px]  text-gray-800 px-2"
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Username :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Key :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                    />
                  </div>
                  <hr className="w-full mt-2 text-white" />
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
            <div className="grid lg:flex gap-2 text-white">
              <label className="lg:w-[100px] ">Topic :</label>
              <input
                type="text"
                className=" px-3 bg-gray-600 lg:w-full w-[80%] rounded-sm"
              />
            </div>
            {/* <hr className="w-full text-white"/> */}
            <div className="grid lg:flex gap-2 text-white">
              <label className="w-[100px] ">Port No :</label>
              <input
                type="text"
                className=" px-3 bg-gray-600 lg:w-full w-[80%]  rounded-sm"
              />
            </div>
            <div className="grid lg:flex justify-center items-center  w-full  gap-4 text-white">
              <label className="w-fit text-lg ">Your Device Name </label>
              <input
                type="text"
                className=" px-3 py-1 lg:w-full w-[80%]  bg-gray-900 text-blue-600 rounded-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-10 bg-blue-500 h-fit rounded-md py-1 text-white  hover:bg-blue-600">
              Add
            </button>
            <button
              className="px-10 bg-white h-fit text-gray-800 rounded-md py-1  hover:bg-gray-600 hover:text-white"
              onClick={onCancelImport}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid place-items-center lg:px-5 px-2 w-full py-2">
        {devices && isLoading == true ? (
          <div className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 gap-4 lg:w-11/12  lg:px-10 px-4 py-10 md:w-9/12 sm:w-9/12 w-11/12 sm:px-10 bg-gray-700 border-2 border-dotted border-gray-500">
            {devices?.map((item: DeviceModel) => (
              <div
                key={item.deviceId}
                className="px-5 lg:px-7 lg:py-5 py-3 bg-gradient-to-tl from-gray-800 via-indigo-900 to-blue-600 text-white rounded-2xl shadow-lg shadow-gray-800 duration-500  hover:bg-blue-800 hover:shadow-gray-900 hover:shadow-xl hover:scale-[101%] lg:w-full md:w-full sm:w-full w-fit group "
              >
                <div
                  className="absolute w-12 h-12 rounded-full z-10 right-0 -top-5 shadow-md shadow-black bg-gray-300 animate-fastFade hidden group-hover:block hover:bg-gray-500 "
                  //  onClick={() => {
                  //    onClickEditPopUp(item._id, item.deviceId);
                  //  }}
                >
                  <button className=" w-full h-full grid place-items-center ">
                    <Settings
                      style={{ width: "2.0rem", height: "2.5rem" }}
                      className="text-black hover:scale-[105%] hover:text-white transition-colors"
                    />
                  </button>
                </div>
                <Link
                  className=""
                  href={"/products/" + item.type + "/" + item.deviceId}
                >
                  <div className="w-full flex justify-center">
                    <div className="text-2xl  font-bold bg-gray-800 rounded-xl shadow-sm px-5 py-2 w-4/5 text-center text-slate-300">
                      {item.type.toUpperCase()}
                    </div>
                  </div>

                  <div className="lg:my-4 my-2 lg:gap-4 flex">
                    <span className="w-[80px] font-bold lg:text-xl text-lg text-white">
                      Name :
                    </span>
                    <span className="text-white  bg-gray-500 rounded-md py-1 lg:text-xl text-sm px-6">
                      {item.name ?? "Loading..."}
                    </span>
                  </div>
                  <div className=" flex my-2 lg:gap-4    lg:my-4">
                    <span className="font-bold lg:text-xl w-[80px] text-white ">
                      IoT ID :
                    </span>
                    <span className="text-white bg-gray-500 rounded-md  h-fit py-1  lg:text-xl w-[180px] lg:w-[250px] line-clamp-1 px-6">
                      {item.deviceId ?? "Loading"}
                    </span>
                  </div>
                  <div className=" flex items-center lg:my-4 my-2">
                    <span className="font-bold lg:text-xl w-[100px] text-white ">
                      Status :
                    </span>
                    <MqttProvider topic_device={item.topic}>
                      <DeviceStatus />
                    </MqttProvider>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : isLoading == true ? (
          <div className="grid text-white text-3xl  place-items-center w-full  py-20 bg-gray-700 mb-20 border-2 border-dashed border-gray-500">
            No Devices
          </div>
        ) : (
          <div className="grid text-white text-3xl  place-items-center w-full  py-20 bg-gray-700 mb-20 border-2 animate-pulse t border-dashed border-gray-500">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}


type externalImport = {
  broker : string;
  topic:string;
  endPoint:string
  name:string

}

const ImportExternalPopup = ()=>{

  return (
    <div>
      <div>

      </div>
    </div>
  )
}