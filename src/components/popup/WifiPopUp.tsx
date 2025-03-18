"use client";

import { WifiModel } from "@/resource/model";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MqttClient } from "mqtt";

const fetchWifiId = async (wifiId: string) => {
  const ressponse = await fetch(`/api/wifi/${wifiId}`);
  return ressponse.json();
};

interface WifiProps {
  onClosePopUp: (value: boolean) => void;
  wifiID: string;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
}

export default function WifiPopUp({
  onClosePopUp,
  wifiID,
  client,
  isConnected,
  topic,
}: WifiProps) {
  const [popUp_clearWifi, setPopUpclearWifi] = useState<boolean>(false);
  const [wifis, setWifis] = useState<WifiModel>();

  const [wifiName, setWifiName] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");

  useEffect(() => {
    fetchWifiId(wifiID).then((item: WifiModel) => {
      setWifis(item);
      setWifiName(item.wifiName);
      setWifiPassword(item.wifiPassword);
    });
  }, []);
  console.log("wifi ID :", wifiID);
  console.log("wifi Data :", wifis);
  const handleClearDefaultWifi = async () => {
    if (client && isConnected) {
      client.publish(topic, `defaultwifi`);
      try {
        const newWifiName = "Default";
        const newWifiPassword = "12345678";
        const newStatus = "none";
        const response = await fetch(
          `/api/wifi/${wifis?._id}`,
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
          setWifiPassword("12345678");
          onClosePopUp(false);
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
      if (wifiName && wifiPassword) {
        const wfn = wifiName;
        const wfp = wifiPassword;
        console.log(`wfn:${wfn},wfp:${wfp}`);
        client.publish(topic, `wfn:${wfn},wfp:${wfp}`);
        try {
          const newWifiName = wifiName;
          const newWifiPassword = wifiPassword;
          const newStatus = "Change";
          const response = await fetch(
            `http://localhost:3000/api/wifi/${wifis?._id}`,
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
            onClosePopUp(false);
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
  return (
    <div
      className="fixed inset-0 flex items-center duration-1000 animate-appearance-in justify-center bg-gray-200 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      {wifis && (
        <div
          className="bg-gray-800 shadow-lg shadow-gray-950 py-5    rounded-lg lg:w-[500px] w-[300px] z-100 grid place-items-center duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-white text-3xl text-center  bg-gray-900 rounded-lg px-10 py-1 w-fit">
            Wi-fi Setup
          </h1>
          <div className="px-5 py-5 place-items-center grid space-y-5">
            <div className="lg:flex grid gap-4">
              <label className="text-white text-lg lg:w-[120px] ">
                Wi-fi Name :{" "}
              </label>
              <input
                type="text"
                className="px-4 w-[150px] py-1 rounded-md bg-gray-500 text-white text-lg"
                name="wf_name"
                onChange={(e) => {
                  setWifiName(e.target.value);
                }}
                value={wifiName || "none"}
              />
            </div>
            <div className="lg:flex grid gap-4">
              <label className="text-white text-lg lg:w-[120px] ">
                Password :{" "}
              </label>
              <input
                name="wf_pw"
                type="text"
                className="px-4 w-[150px] py-1 rounded-md bg-gray-500 text-white text-lg"
                onChange={(e) => {
                  setWifiPassword(e.target.value);
                }}
                value={wifiPassword || "none"}
              />
            </div>

            {wifis?.status == "Change" && (
              <div className="flex justify-center">
                <button
                  className="bg-gray-200 text-black text-lg px-5 py-2 rounded-md hover:bg-red-500 hover:text-white duration-500"
                  onClick={() =>
                    setPopUpclearWifi((popUp_clearWifi) => !popUp_clearWifi)
                  }
                >
                  Clear to default Wi-fi
                </button>
              </div>
            )}
          </div>
          <div className="lg:flex justify-center grid gap-3 w-full lg:gap-5">
            <button
              onClick={handleWifiEdit}
              className="text-white w-[150px]  bg-blue-600 px-8 py-1 rounded-md hover:bg-gray-200 hover:text-black text-lg duration-1000"
            >
              Change
            </button>
            <button
              onClick={() => onClosePopUp(false)}
              className="bg-gray-600 w-[150px] px-8 hover:bg-gray-800 py-1 rounded-md  text-white font-bold text-lg duration-1000 "
            >
              Cancel
            </button>
          </div>
          {popUp_clearWifi == true && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-35"
              onClick={() =>
                setPopUpclearWifi((popUp_clearWifi) => !popUp_clearWifi)
              }
            >
              <div
                className="bg-gray-800 px-5 py-5 rounded-lg w-[300px] z-110 duration-500  shadow-lg shadow-gray-950 "
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-center text-white lg:text-2xl text-lg py-4">
                  Confirm set to default Wi-Fi
                </h1>
                <div className="flex justify-center w-full my-3 gap-5">
                  <button
                    onClick={handleClearDefaultWifi}
                    className="text-white  bg-blue-600 px-6 py-1 rounded-md hover:bg-gray-200 shadow-md w-[100px]  text-lg hover:text-black shadow-gray-900 duration-1000"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setPopUpclearWifi(false)}
                    className="bg-gray-600 shadow-md px-6 hover:bg-gray-800 py-1 rounded-md shadow-gray-900 w-[100px]  text-white  text-lg duration-1000"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
