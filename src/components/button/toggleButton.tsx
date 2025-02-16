"use client";

import { MqttClient } from "mqtt";
import { useState } from "react";

interface ButtonProps {
  label: string;
  type: string;
  category: string;
  cmd: string;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  onLogReturn: (data: string) => void;
}

const ToggelButton = ({
  label,
  type,
  category,
  cmd,
  client,
  isConnected,
  topic,
  onLogReturn,
}: ButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const Control = async (cmd: string) => {
    if (client && isConnected) {
      if (!toggle) {
        client.publish(topic, `ctrl/${cmd}`);
        console.log(`Command : ${cmd.toUpperCase()}`);
        onLogReturn(`Command : ${cmd.toUpperCase()}`);
      } else {
        client.publish(topic, `ctrl/stop`);
        console.log("Command : STOP");
        onLogReturn("Command : STOP");
      }
      setToggle(!toggle);
    }
  };

  return (
    <button
      onClick={() => Control(cmd)}
      className={`${
        toggle
          ? "bg-pink-300 border-2 border-pink-500 text-black shadow-black shadow-inner scale-[95%]"
          : "bg-pink-600 border-2 border-pink-500 shadow-md shadow-black text-white"
      } rounded-xl px-3 py-3 text-center hover:opacity-90`}
    >
      {label === "Up" || label === "Forward" ? (
        <img
          src={`${
            toggle ? "/png_icon/forwardblack.png" : "/png_icon/forwardwhite.png"
          }`}
          width={50}
          height={50}
        />
      ) : label === "Down" || label === "Backward" ? (
        <img
          src={`${
            toggle ? "/png_icon/backblack.png" : "/png_icon/backwhite.png"
          }`}
          width={50}
          height={50}
        />
      ) : label === "Left" ? (
        <img
          src={`${
            toggle ? "/png_icon/leftblack.png" : "/png_icon/leftwhite.png"
          }`}
          width={50}
          height={50}
        />
      ) : label === "Right" ? (
        <img
          src={`${
            toggle ? "/png_icon/rightblack.png" : "/png_icon/rightwhite.png"
          }`}
          width={50}
          height={50}
        />
      ) : label == "ON" ? (
        <img
          src={`${toggle ? "/png_icon/ongreen.png" : "/png_icon/offwhite.png"}`}
          width={50}
          height={50}
        />
      ) : label === "Alarm" ? (
        <img
          src={`${toggle ? "/png_icon/bellon.png" : "/png_icon/belloff.png"}`}
          width={50}
          height={50}
        />
      ) : label == "Locked" ? (
        <img
          src={`${toggle ? "/png_icon/lock.png" : "/png_icon/unlock.png"}`}
          width={50}
          height={50}
        />
      ) : label === "Warning" ? (
        <img
          src={`${
            toggle ? "/png_icon/warning.png" : "/png_icon/warningoff.png"
          }`}
          width={50}
          height={50}
        />
      ) : label === "Record" ? (
        <img
          src={`${
            toggle ? "/png_icon/recodeon.png" : "/png_icon/recodeoff.png"
          }`}
          width={50}
          height={50}
        />
      ) : label === "Sound ON" ? (
        <img
          src={`${toggle ? "/png_icon/soundoff.png" : "/png_icon/soundon.png"}`}
          width={50}
          height={50}
        />
      ) : (
        <div>None : {label}</div>
      )}
    </button>
  );
};

export default ToggelButton;
