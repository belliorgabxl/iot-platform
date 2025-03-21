"use client";

type DeviceData = {
  name: string;
  topic: string;
  status: string;
  value: string;
};

import Link from "next/link";
import React, { useEffect, useState } from "react";

const sendEmailAlert = async (item: DeviceData) => {
  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        value: item.value,
        email: "64011224@kmitl.ac.th",
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log("✅ Email sent successfully");
    } else {
      console.error("❌ Error sending email:", data.error);
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
  }
};

export default function Main() {
  const [devices, setDevice] = useState<DeviceData[]>([
    {
      name: "Sensor 1",
      topic: "esp32/smoke/1043",
      status: "online",
      value: "55",
    },
    {
      name: "Sensor 2",
      topic: "esp32/smoke/1044",
      status: "offline",
      value: "80",
    },
    {
      name: "Sensor 3",
      topic: "esp32/smoke/1045",
      status: "online",
      value: "45",
    },
    {
      name: "Sensor 4",
      topic: "esp32/smoke/1046",
      status: "online",
      value: "90",
    },
    {
      name: "Sensor 5",
      topic: "esp32/smoke/1047",
      status: "offline",
      value: "35",
    },
  ]);
  const [sentAlerts, setSentAlerts] = useState(new Set());

  useEffect(() => {
    devices.forEach((item) => {
      if (Number(item.value) > 70 && !sentAlerts.has(item.name)) {
        sendEmailAlert(item);
        setSentAlerts((prev) => new Set(prev).add(item.name));
      }
    });
  }, [devices]);
  return (
    <div className="py-5 px-10 bg-gray-700">
      <div className="w-full flex justify-center">
        <div className="px-10 text-white lg:text-3xl py-2 font-bold rounded-3xl bg-gray-800">
          Fire - Detector
        </div>
      </div>

      <div className="w-full py-4">
        <div className="px-10 py-1 bg-gray-800 rounded-md w-fit text-white text-lg">
          Fire Sensor in Faculty of Engineering in KMITL
        </div>
      </div>
      <div className="w-full border-2 border-dashed border-white py-4 px-4">
        {devices.length > 0 ? (
          <div className="w-full grid grid-cols-4 gap-3 py-4 px-4">
            {devices.map((item) => (
              <Link
                key={item.name}
                href="/products/pm-detect/d256bf5b-d85c-459d-8f69-f691dbb71141"
                className={`${
                  Number(item.value) > 80
                    ? "bg-red-700"
                    : Number(item.value) >= 60
                    ? "bg-yellow-400"
                    : "bg-sky-400"
                } text-white px-5 py-4 hover:scale-105 duration-500 rounded-sm`}
              >
                <div className="flex items-center gap-2">
                  <div className="px-4 py-1 rounded-md bg-white text-black">
                    {item.name} :{" "}
                  </div>
                  <div className="text-[18px] font-semibold">
                    {item.value} C
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full grid place-items-center py-10 text-3xl text-white font-semibold ">
            No Device
          </div>
        )}
      </div>
    </div>
  );
}
