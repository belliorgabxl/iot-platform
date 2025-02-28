"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mqtt from "mqtt";
import Link from "next/link";

const createCustomIcon = (pmValue: number) => {
  return L.divIcon({
    html: `<div style="
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${pmValue > 100 ? "red" : "green"};
      color: white;
      font-size: 14px;
      font-weight: bold;
      border-radius: 50%;
      border: 2px solid white;
    ">${pmValue}</div>`,
    className: "custom-icon",
    iconSize: [40, 40],
  });
};

export default function Main() {
  const [devices, setDevices] = useState([
    { id: 1, lat: 13.7276, lng: 100.7761, pm: "94" },
    { id: 2, lat: 13.7275, lng: 100.7775, pm: "102" },
    { id: 3, lat: 13.72715, lng: 100.7765, pm: "103" },
    { id: 4, lat: 13.7275, lng: 100.7756, pm: "105" },
  ]);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      devices.forEach((device) => {
        client.subscribe(`iot/pm/${device.id}`);
      });
    });

    client.on("message", (topic, message) => {
      const pmValue = message.toString();
      const deviceId = parseInt(topic.split("/")[2]);

      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId ? { ...device, pm: pmValue } : device
        )
      );
    });

    return () => {
      client.end();
    };
  }, [devices]);

  return (
    <div className="py-5 px-10 bg-gray-700">
      <div className="w-full flex justify-center">
        <div className="px-10 text-white lg:text-3xl py-2 font-bold rounded-3xl bg-gray-800">
          PM - Detector
        </div>
      </div>

      <div className="flex justify-center py-5">
        <div className="w-[1100px] rounded-lg overflow-hidden h-[500px]">
          <MapContainer
            center={[13.72768, 100.7761]}
            zoom={18}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {devices.map((device) => (
              <Marker
                key={device.id}
                position={[device.lat, device.lng]}
                icon={createCustomIcon(Number(device.pm))}
              >
                <Popup>
                  <Link
                    href={"/products/pm-detect"}
                    className="text-center grid "
                  >
                    <div className="font-bold bg-gray-600 text-white px-4 rounded-md text-xl">
                      IoT Device {device.id}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <p className="text-[16px] bg-blue-500 text-white font-semibold px-2 py-1 rounded-sm">
                        PM : {device.pm}
                      </p>
                    </div>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
