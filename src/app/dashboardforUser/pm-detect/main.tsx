"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import PMMarker from "@/components/map/PMMark"; 

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

export default function Main() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      lat: 13.7276,
      lng: 100.7761,
      pm: "94",
      deviceId: "d256bf5b-d85c-459d-8f69-f691dbb71141",
      topice: "esp32/smoke/1043",
    },
    {
      id: 2,
      lat: 13.7275,
      lng: 100.7775,
      pm: "102",
      deviceId: "d256bf5b-d85c-459d-8f69-f691dbb71141",
      topice: "esp32/smoke/1043",
    },
    {
      id: 3,
      lat: 13.72715,
      lng: 100.7765,
      pm: "103",
      deviceId: "",
      topice: "esp32/smoke/1043",
    },
    {
      id: 4,
      lat: 13.7275,
      lng: 100.7756,
      pm: "105",
      deviceId: "",
      topice: "esp32/smoke/1043",
    },
  ]);

  const [icons, setIcons] = useState<{ [key: number]: L.DivIcon }>({});
  


  return (
    <div className="py-5 px-10 bg-gray-700">
      <div className="w-full flex justify-center">
        <div className="px-10 text-white lg:text-3xl py-2 font-bold rounded-3xl bg-gray-800">
          PM2.5 - Detector
        </div>
      </div>
      <div className="px-40 pt-4">
        <p className="px-10 text-xl py-1 rounded-md bg-gray-500 w-fit text-white">
          The area around KMITL
        </p>
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
              <PMMarker
                key={device.id}
                id={device.id}
                lat={device.lat}
                lng={device.lng}
                pm={device.pm}
                deviceId={device.deviceId}
              />
            ))}
          </MapContainer>
        </div>
      </div>
      <div className="pb-5 lg:flex justify-center gap-5">
        <div className="h-fit lg:w-[500px] bg-gray-800 rounded-md px-5 py-4 ">
          <p className="text-xl font-semibold py-2 text-white text-start">
            Applications of IoT-Enabled PM Detectors
          </p>
          <p className="text-start text-white text-[16px]">
            The integration of IoT technology in PM detectors is transforming
            environmental monitoring by offering smarter, real-time, and more
            reliable air quality assessments. With continuous innovation, these
            devices will play a critical role in mitigating pollution-related
            health risks and contributing to a sustainable future.
          </p>
        </div>
        <div className="h-fit lg:w-[580px] bg-gray-800 rounded-md px-5 py-4 ">
          <div className="text-xl text-white font-semibold">
            Challenges and Future Prospects
          </div>
          <p className="text-[16px] text-white">
            Despite the advancements, challenges such as sensor calibration,
            data accuracy, and network reliability need to be addressed. Future
            innovations may include:
          </p>
          <li className="text-[16px] text-white">
            AI-enhanced self-calibrating sensors for improved precision.
          </li>
          <li className="text-[16px] text-white">
            Blockchain for secure data sharing in pollution monitoring networks.
          </li>
          <li className="text-[16px] text-white">
            Integration with satellite data for large-scale air quality
            assessments.
          </li>
        </div>
      </div>
    </div>
  );
}
