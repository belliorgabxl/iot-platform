"use client";
import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";
import { toast } from "react-toastify";
import PumpJoyStick from "./Controller";
import PumpPanel from "./Panel";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DeviceModel, WifiModel, ChartModel } from "@/resource/model";
import React from "react";
import DonutChartDirt from "@/components/chart/donutChartDirt";
import CircleMonitor from "@/components/chart/circleMonitor";
import PopUpAddChart from "./AddChartPopUp";
import CircleChartDirt from "@/components/chart/circleChartDirt";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  device_id: string;
};

const fetchDeviceId = async (deviceId: string) => {
  const response = await fetch(`/api/devices/${deviceId}`);
  return response.json();
};

const fetchWifiId = async (wifiId: string) => {
  const ressponse = await fetch(`/api/wifi/${wifiId}`);
  return ressponse.json();
};

const fetchChart = async (id: string) => {
  const response = await fetch(`/api/chart/${id}`);
  return response.json();
};

export default function FormPage({ device_id }: Props) {
  const deviceId = device_id;
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [returnedLog, setReturnedLog] = useState<string>("");
  const [hover, setHover] = useState(false);
  const [popUp_click, setPopUpClick] = useState<boolean>();
  const [wifiName, setWifiName] = useState<string>();
  const [wifiPW, setWifiPW] = useState<string>();
  const [wifiData, setWifiData] = useState<WifiModel>();
  const [popUp_clearWifi, setPopUpclearWifi] = useState<boolean>();
  const [deviceData, setDeviceData] = useState<DeviceModel>();
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  const [charts, setChart] = useState<ChartModel[]>([]);

  const [value1, setValue1] = useState<string | null>();
  const [value2, setValue2] = useState<string | null>();
  const [value3, setValue3] = useState<string | null>();

  useEffect(() => {
    fetchDeviceId(deviceId).then((item: any) => {
      setDeviceData(item);
      setLoading(true);
      setTopic(item.topic);
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
      if (message.toString() == "connected") {
        setDeviceConnected(true);
        console.log("Device is connected. Cleaning up...");
        client.unsubscribe(topic);
        client.end();
      } else if (message.toString().startsWith("value1")) {
        setValue1(message.toString());
      } else if (message.toString().startsWith("value2")) {
        setValue2(message.toString());
      } else if (message.toString().startsWith("value3")) {
        setValue3(message.toString());
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
  const onClosePopUp = () => {
    setPopUpClick(false);
  };

  const handleClearDefaultWifi = async () => {
    if (client && isConnected) {
      client.publish(topic, `defaultwifi`);
      try {
        const newWifiName = "Default";
        const newWifiPassword = "12345678";
        const newStatus = "none";
        const response = await fetch(
          `http://localhost:3000/api/wifi/${wifiData?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              newWifiName,
              newWifiPassword,
              newStatus,
            }),
          }
        );
        if (response.ok) {
          toast.success("wi-fi Cleared !!");
          setWifiName("Default");
          setWifiPW("12345678");
          onClosePopUp();
          setPopUpclearWifi((popUp_clearWifi) => !popUp_clearWifi);
        } else {
          toast.error("something went wrong.");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Lost Connect...");
    }
  };
  const handleWifiEdit = async () => {
    if (client && isConnected) {
      if (wifiName && wifiPW) {
        const wfn = wifiName;
        const wfp = wifiPW;
        console.log(`wfn:${wfn},wfp:${wfp}`);
        client.publish(topic, `wfn:${wfn},wfp:${wfp}`);
        try {
          const newWifiName = wifiName;
          const newWifiPassword = wifiPW;
          const newStatus = "Change";
          const response = await fetch(
            `http://localhost:3000/api/wifi/${wifiData?._id}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                newWifiName,
                newWifiPassword,
                newStatus,
              }),
            }
          );
          if (response.ok) {
            toast.success("wi-fi changed.");
            onClosePopUp();
          } else {
            toast.error("something went wrong.");
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        toast.error("Please Change wi-fi name & password.");
      }
    } else {
      toast.error("wait to connecting...");
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
            Auto Pump
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
              <PumpPanel
                isConnected={isConnected}
                client={client}
                topic={topic}
                isLoading={isLoading}
                device_id={deviceId}
                device_log={returnedLog}
                device_connect={deviceConnected}
                dirtValue={value1 || "0"}
              />
            )}
          </div>

          <div className="grid gap-4  lg:h-fit lg:px-10 lg:py-0 w-fit">
            <div className=" grid lg:flex gap-4 items-center">
              <PumpJoyStick
                isConnected={isConnected}
                client={client}
                topic={topic}
                isLoading={isLoading}
                device_id={deviceId}
                onLogReturn={getLogReturned}
              />
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
                {charts.map((item) => (
                  <div key={item.id}>
                    {item.type == "donut" ? (
                      <div className="animate-fastFade grid place-items-center w-full">
                        <DonutChartDirt value={value1 || '0'} />
                      </div>
                    ) : item.type == "circle" ? (
                      <div className="animate-fastFade grid place-items-center w-full">
                        <CircleChartDirt value={value1 || '0'} />
                      </div>
                    ) : item.type == "monitorcircle" ? (
                      <div className="grid place-items-center">
                        <CircleMonitor
                          bgcolor={item.bgcolor}
                          fgcolor={item.fgcolor}
                          unit={item.unit}
                          value={value1 || '0'}
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
          <div>
            {popUp_click == true && (
              <div
                className="fixed inset-0 flex items-center duration-1000 animate-appearance-in justify-center bg-gray-200 bg-opacity-45"
                onClick={onClosePopUp}
              >
                <div
                  className="bg-gray-800 shadow-lg shadow-gray-950  px-12 py-10 rounded-lg w-3/10 z-100 grid place-items-center duration-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1 className="text-white text-3xl text-center shadow-md shadow-black bg-gray-900 rounded-lg px-10 py-2 w-3/5">
                    Wi-fi Setup
                  </h1>
                  <div className="px-5 pt-10 grid space-y-10 w-4/5">
                    <div className="grid grid-cols-2">
                      <label className="text-white text-xl ">
                        Wi-fi Name :{" "}
                      </label>
                      <input
                        type="text"
                        className="pl-2 py-1 rounded-lg shadow-inner shadow-black bg-gray-500 text-white text-xl"
                        name="wf_name"
                        defaultValue={wifiData?.wifiName}
                        onChange={(e) => {
                          setWifiName(e.target.value);
                        }}
                        value={wifiName}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <label className="text-white text-xl">Password : </label>
                      <input
                        name="wf_pw"
                        type="text"
                        className="pl-2 py-1 shadow-inner shadow-black rounded-lg bg-gray-500 text-white text-xl"
                        defaultValue={wifiData?.wifiPassword}
                        onChange={(e) => {
                          setWifiPW(e.target.value);
                        }}
                        value={wifiPW}
                      />
                    </div>
                    <div className="flex justify-center w-full gap-5">
                      <button
                        onClick={handleWifiEdit}
                        className="text-white bg-blue-600 px-14 py-2 rounded-md hover:bg-gray-200 hover:text-black shadow-md  text-xl shadow-gray-900 duration-1000"
                      >
                        Change
                      </button>
                      <button
                        onClick={onClosePopUp}
                        className="bg-gray-600 shadow-md px-14 hover:bg-gray-800 py-2 rounded-md shadow-gray-900 text-white font-bold text-xl duration-1000 "
                      >
                        Cancel
                      </button>
                    </div>
                    {wifiData?.status == "Change" && (
                      <div className="flex justify-center">
                        <button
                          className="bg-gray-200 text-black text-lg px-5 py-2 rounded-md hover:bg-red-500 hover:text-white duration-500"
                          onClick={() =>
                            setPopUpclearWifi(
                              (popUp_clearWifi) => !popUp_clearWifi
                            )
                          }
                        >
                          Clear to default Wi-fi
                        </button>
                      </div>
                    )}
                  </div>
                  {popUp_clearWifi == true && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-35"
                      onClick={() =>
                        setPopUpclearWifi((popUp_clearWifi) => !popUp_clearWifi)
                      }
                    >
                      <div
                        className="bg-gray-800 px-12 py-5 rounded-lg w-1/5 z-110 duration-500  shadow-lg shadow-gray-950 "
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h1 className="text-center text-white text-2xl py-4">
                          Confirm set to default Wi-Fi
                        </h1>
                        <div className="flex justify-center w-full my-3 gap-5">
                          <button
                            onClick={handleClearDefaultWifi}
                            className="text-white  bg-blue-600 px-6 py-2 rounded-md hover:bg-gray-200 shadow-md  text-xl hover:text-black shadow-gray-900 duration-1000"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() =>
                              setPopUpclearWifi(
                                (popUp_clearWifi) => !popUp_clearWifi
                              )
                            }
                            className="bg-gray-600 shadow-md px-6 hover:bg-gray-800 py-2 rounded-md shadow-gray-900 text-white  text-xl duration-1000"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
    </div>
  );
}
