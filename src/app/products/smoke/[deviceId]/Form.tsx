"use client";
import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DeviceModel, WifiModel, ChartModel } from "@/resource/model";
import React from "react";
import CircleMonitor from "@/components/chart/circleMonitor";
import PopUpAddChart from "./AddChartPopUp";
import CircleChartDirt from "@/components/chart/circleChartDirt";
import WifiPopUp from "@/components/popup/WifiPopUp";
import Panel from "./Panel";
import DonutChartSmoke from "@/components/chart/donutChartSmoke";

ChartJS.register(ArcElement, Tooltip, Legend);
type Props = {
  device_id: string;
};

const fetchDeviceId = async (deviceId: string) => {
  const response = await fetch(`http://localhost:3000/api/devices/${deviceId}`);
  return response.json();
};

const fetchWifiId = async (wifiId: string) => {
  const ressponse = await fetch(`http://localhost:3000/api/wifi/${wifiId}`);
  return ressponse.json();
};

const fetchChart = async (id: string) => {
  const response = await fetch(`/api/chart/${id}`);
  return response.json();
};

export default function Form({ device_id }: Props) {
  const deviceId = device_id;
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [returnedLog, setReturnedLog] = useState<string>("");
  const [hover, setHover] = useState(false);
  const [popUp_click, setPopUpClick] = useState<boolean>();
  const [wifiData, setWifiData] = useState<WifiModel>();
  const [deviceData, setDeviceData] = useState<DeviceModel>();
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  const [charts, setChart] = useState<ChartModel[]>([]);

  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [value3, setValue3] = useState<string | null>(null);
  const [value4, setValue4] = useState<string | null>(null);
  const [value5, setValue5] = useState<string | null>(null);

  useEffect(() => {
    fetchDeviceId(deviceId).then((item: DeviceModel) => {
      setDeviceData(item);
      setLoading(true);
      setTopic(item?.topic);
    });
    fetchChart(deviceId).then((item: any) => {
      setChart(item);
    });
    setLoading(true);
    const client = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
    client.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to HiveMQ broker over WebSocket");
    });
    client.on("error", (err) => {
      console.error("Connection error: ", err.message);
      console.error("Details: ", err);
      client.end();
    });
    setClient(client);
    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);
  useEffect(() => {
    console.log("Listen Event Start...");
    const client = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
    console.log("is connecting...");
    client.on("connect", () => {
      if (topic != null) {
        client.subscribe(topic, (err) => {
          if (!err) {
            console.log("Subscribed to Connected Message");
          }
        });
      } else {
        console.log("none topic");
      }
    });
    client.on("message", (topic, message) => {
      console.log(`Received message on ${topic}: ${message}`);
    
      const msgStr = message.toString();
      
      // Use regex to extract values by matching "valueX:number"
      const regex = /value1:(\d+(\.\d+)?),\s*value2:(\d+(\.\d+)?),\s*value3:(\d+(\.\d+)?),\s*value4:(\d+(\.\d+)?),\s*value5:(\d+(\.\d+)?)/;
      const match = msgStr.match(regex);
    
      if (match) {
        setValue1(match[1] || null);
        setValue2(match[3] || null);
        setValue3(match[5] || null);
        setValue4(match[7] || null);
        setValue5(match[9] || null);
      }
    });
    return () => {
      console.log("Cleaning up MQTT connection...");
      client.unsubscribe(topic);
      client.end();
    };
  }, [topic]);

  const getLogReturned = (data: string) => {
    setReturnedLog(data);
  };

  const onClickPopUp = async () => {
    setPopUpClick(true);
    if (deviceData?.wifiId) {
      await fetchWifiId(deviceData?.wifiId).then((item) => {
        setWifiData(item);
      });
    }
  };

  const [popup_chart, setPopUpChart] = useState<boolean>(false);
  return (
    <div className={`bg-gray-700 pb-10 px-5`}>
      <div className="w-full py-2 ">
        <div className="my-3 lg:flex lg:justify-between gap-3 grid place-items-center">
          <div className="lg:mx-10 lg:block hidden"></div>
          <h1
            className={`duration-1000 py-3 ${
              isLoading
                ? "px-14 text-3xl text-white  bg-gray-800 rounded-2xl"
                : "px-0 text-gray-700 "
            } line-clamp-1 h-fit`}
          >
            Smoke Detector
          </h1>
          <button
            className={`flex justify-center gap-4  mx-3 w-fit h-fit  py-2 text-lg rounded-3xl  shadow-sm shadow-gray-800 active:shadow-inner active:shadow-black   hover:bg-blue-400 hover:text-black ${
              isLoading
                ? "px-5 text-white bg-blue-600"
                : "px-0 bg-blue-300 text-blue-300"
            } `}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
              onClickPopUp();
            }}
          >
            <img
              src={
                hover
                  ? "/general/wifiBlack_icon.png"
                  : "/general/wifiWhite_icon.png"
              }
              alt="icon"
              className={`w-7 h-7 ${
                isLoading ? "animate-fadeIn" : "opacity-0"
              } `}
            />
            Wi-fi setting
          </button>
        </div>

        <div className=" grid gap-4 lg:gap-8 place-items-center px-2 lg:px-10 lg:flex lg:justify-center md:flex md:justify-center items-start   border-2 border-dashed border-gray-400 shadow-md shadow-gray-800 py-5 rounded-md lg:h-fit">
          <div className="lg:flex md:flex justify-center  w-full lg:w-fit lg:py-0">
            {topic && (
              <Panel
                isConnected={isConnected}
                client={client}
                topic={topic}
                isLoading={isLoading}
                device_id={deviceId}
                device_log={returnedLog}
                device_connect={deviceConnected}
                smokeValue={value1 || "0"}
                value2={value2||"0"}
                value3={value3||"0"}
                value4={value4||"0"}
                value5={value5||"0"}
              />
            )}
          </div>

          <div className="grid gap-4  lg:h-fit lg:px-10 lg:py-0 w-fit">
            <div className=" grid lg:flex gap-4 items-center">
              <button
                className="lg:px-10 px-4 py-2 text-sm rounded-2xl bg-white text-blue-600 h-fit w-fit hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  setPopUpChart(true);
                }}
              >
                Add Monitor
              </button>
            </div>
            {charts.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-2">
                {charts.map((item: any) => (
                  <div key={item.id}>
                    {item.type == "donut" ? (
                      <div className="animate-fastFade grid place-items-center w-full">
                        <DonutChartSmoke value={value1 || "0"} />
                      </div>
                    ) : item.type == "circle" ? (
                      <div className="animate-fastFade grid place-items-center w-full">
                        <CircleChartDirt value={value1 || "0"} />
                      </div>
                    ) : item.type == "monitorcircle" ? (
                      <div className="grid place-items-center">
                        <CircleMonitor
                          bgcolor={item.bgcolor}
                          fgcolor={item.fgcolor}
                          unit={item.unit}
                          value={value1 || "0"}
                        />
                      </div>
                    ) : (
                      <div>Error</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-dashed border-2 border-white grid place-items-center px-20 py-10 text-2xl text-white">
                Not Available.
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
      {popup_chart && (
        <PopUpAddChart
          setPopUpChart={() => {
            setPopUpChart(!popup_chart);
          }}
          deviceId={deviceId}
          setChart={setChart}
        />
      )}
      {popUp_click && wifiData?.wifiId && (
        <WifiPopUp
          onClosePopUp={setPopUpClick}
          wifiID={wifiData?.wifiId}
          client={client}
          isConnected={isConnected}
          topic={topic}
        />
      )}
    </div>
  );
}
