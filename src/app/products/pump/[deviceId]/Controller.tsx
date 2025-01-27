"use client";
import { MqttClient } from "mqtt";
type Props = {
  device_id: string;
  isLoading: boolean;
  client: MqttClient | null;
  isConnected: boolean;
  topic: string;
  onLogReturn: (data: string) => void;
};

import React, { useState } from "react";

export default function PumpJoyStick({
  isLoading,
  onLogReturn,
  client,
  isConnected,
  topic,
}: Props) {
  const [pump_state, setPumpState] = useState(false);

  const onPump = async () => {
    if (client && isConnected) {
      client.publish(topic, "ctrl/on");
      console.log("on");
      onLogReturn("ON");
    }
  };
  return (
    <div className="h-fit w-fit">
      <div className="bg-gray-800 flex justify-between items-center px-10 py-4 rounded-md ">
        <div
          className={`grid place-items-center px-10 w-fit py-1 items-center cursor-pointer bg-blue-500 shadow-md shadow-gray-950 text-white text-xl font-semibold active:bg-blue-500 active:shadow-inner active:shadow-black   rounded-full duration-300 ${
            isLoading ? "animate-fadeIn" : "opacity-0"
          } `}
          onClick={onPump}
        >
          Active
        </div>
      </div>
    </div>
  );
}
