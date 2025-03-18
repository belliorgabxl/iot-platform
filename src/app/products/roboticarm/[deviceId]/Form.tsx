"use client";
import mqtt, { MqttClient } from "mqtt";
import { useEffect, useState } from "react";
import ArmJoyStick from "./armJoyStick";
import { toast } from "react-toastify";
import Panel from "./Panel";
import { ButtonModel, DeviceModel, WifiModel } from "@/resource/model";
import ToggelButton from "@/components/button/toggleButton";
import PressButton from "@/components/button/pressButton";
import ToggleRecieve from "@/components/button/toggleRecieve";
import { CirclePlus, RefreshCw, Settings, Trash, Wrench } from "lucide-react";
import PopUpAddButton from "./AddButtonPopUp";
import WifiPopUp from "@/components/popup/WifiPopUp";

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

const fetchButton = async (id: string) => {
  const response = await fetch(`/api/button/${id}`);
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
  const [wifiData, setWifiData] = useState<WifiModel>();
  const [deviceData, setDeviceData] = useState<DeviceModel>();
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);
  const [buttons, setButtons] = useState<ButtonModel[]>([]);
  useEffect(() => {
    fetchDeviceId(deviceId).then((item: any) => {
      setDeviceData(item);
      setLoading(true);
      setTopic(item.topic);
    });

    fetchButton(deviceId).then((item: any) => {
      setButtons(item);
      setAdjust(item.length > 0);
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
      }
    });
    return () => {
      console.log("Cleaning up MQTT connection...");
      client.unsubscribe(topic);
      client.end();
    };
  }, [topic]);
  const RefreshConnect = () => {
    window.location.reload();
  };
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

  const [adjust, setAdjust] = useState<boolean>(false);
  const [popup_btn, setPopUpBtn] = useState<boolean>(false);
  const handleChangeAdjust = () => {
    setAdjust(!adjust);
  };

  return (
    <div className={`bg-gray-700 pb-10 `}>
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
            Robotic-Arm DashBoard
          </h1>
          <button
            className={`flex justify-center gap-4  mx-3 w-fit h-fit  py-1 text-sm items-center rounded-3xl shadow-sm shadow-gray-800 active:shadow-inner active:shadow-black   hover:bg-blue-400 hover:text-black ${
              isLoading
                ? "px-5 text-white bg-blue-600"
                : "px-0 bg-blue-300 text-blue-300"
            } `}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClickPopUp}
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

        <div className=" grid gap-10 place-items-center px-1 lg:px-10 lg:flex lg:justify-center md:flex md:justify-center items-start   border-2 border-dashed border-gray-400 shadow-md shadow-gray-800 py-5 rounded-md lg:h-fit">
          <div className="lg:flex md:flex justify-center    w-full lg:w-fit lg:py-5">
          <div className="px-5 grid h-fit gap-4">
              <button
                className="px-5 h-fit bg-green-500 hover:bg-green-600 flex justify-center items-center gap-3 py-1 text-white rounded-md "
                onClick={() => {
                  RefreshConnect();
                }}
              >
                Refresh <RefreshCw className="w-5 h-5" />
              </button>
              <button
                className="px-5 bg-blue-500 hover:bg-blue-600 flex justify-center items-center gap-3 py-1 text-white rounded-md "
                onClick={() => {
                  RefreshConnect();
                }}
              >
                Settings <Settings className="w-5 h-5" />
              </button>
              <button
                className="px-5 bg-red-400 hover:bg-red-600 flex justify-center items-center gap-3 py-1 text-white rounded-md "
                onClick={() => {
                  RefreshConnect();
                }}
              >
                Delete <Trash className="w-5 h-5" />
              </button>
            </div>
            {topic && (
              <Panel
                isConnected={isConnected}
                client={client}
                topic={topic}
                isLoading={isLoading}
                device_id={deviceId}
                device_log={returnedLog}
                device_connect={deviceConnected}
              />
            )}
          </div>
          <div className="grid gap-2 lg:gap-4  place-items-center  lg:h-fit px-1 lg:px-10 lg:py-5 w-fit">
            <div className="lg:flex w-full grid place-items-center lg:justify-start gap-3">
              <button
                className={`${
                  adjust
                    ? "shadow-md  bg-blue-700  shadow-black   text-white"
                    : "bg-white font-semibold text-blue-800 "
                } h-fit text-xl   w-[150px] shadow-md hover:bg-gray-500 shadow-gray-700  px-5 py-1 rounded-2xl`}
                onClick={handleChangeAdjust}
              >
                {adjust ? (
                  <div className="">Default</div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Wrench
                      style={{ width: "1.4rem", height: "1.4rem" }}
                      className="mt-1"
                    />
                    Custom
                  </div>
                )}
              </button>
              <button
                className={` ${
                  adjust ? "block animate-fastFade" : "hidden"
                } bg-white text-blue-700 font-semibold px-5 w-[150px] h-fit line-clamp-1 overflow-hidden text-lg shadow-md shadow-gray-700  hover:bg-gray-500 hover:text-white py-1 justify-end rounded-2xl`}
                onClick={() => setPopUpBtn(!popup_btn)}
              >
                <CirclePlus
                  style={{ width: "1.4rem", height: "1.4rem" }}
                  className="absolute -translate-x-2 translate-y-[3px]"
                />
                <div className="translate-x-3">Add Button</div>
              </button>
            </div>
            {!adjust ? (
              <ArmJoyStick
                isConnected={isConnected}
                client={client}
                topic={topic}
                isLoading={isLoading}
                onLogReturn={getLogReturned}
                device_id={deviceId}
              />
            ) : (
              <div className="animate-fastFade w-full">
                {buttons.length > 0 ? (
                  <div className="border-2 border-dashed grid grid-cols-2 px1 lg:px-10 py-5 rounded-lg gap-2  w-full ">
                    {buttons.map((item) => (
                      <div key={item.id}>
                        {item.type == "transmitter" ? (
                          <div className="animate-fastFade grid place-items-center w-full">
                            {item.category == "press" ? (
                              <PressButton
                                category={item.category}
                                cmd={item.command}
                                label={item.label}
                                type={item.type}
                                isConnected={isConnected}
                                client={client}
                                topic={topic}
                                onLogReturn={getLogReturned}
                              />
                            ) : (
                              <ToggelButton
                                category={item.category}
                                cmd={item.command}
                                label={item.label}
                                type={item.type}
                                isConnected={isConnected}
                                client={client}
                                topic={topic}
                                onLogReturn={getLogReturned}
                              />
                            )}
                          </div>
                        ) : (
                          <div className="grid place-items-center w-full">
                            <ToggleRecieve
                              category={item.category}
                              cmd={item.command}
                              label={item.label}
                              type={item.type}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed grid place-items-center py-5 rounded-lg text-white lg:text-[18px] text-sm w-full h-[250px]">
                    Customize you button !
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {popup_btn && (
        <PopUpAddButton
          setPopUpBtn={() => {
            setPopUpBtn(!popup_btn);
          }}
          deviceId={deviceId}
          setButtons={setButtons}
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
