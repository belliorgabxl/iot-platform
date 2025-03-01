"use client";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useRouter } from "next/navigation";
interface PMMarkerProps {
  id: number;
  lat: number;
  lng: number;
  pm: string;
  deviceId: string;
}
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
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
    ">${pmValue}</div>`,
    className: "custom-icon",
    iconSize: [40, 40],
  });
};

const PMMarker: React.FC<PMMarkerProps> = ({ id, lat, lng, pm, deviceId }) => {
  const router = useRouter();
  return (
    <Marker position={[lat, lng]} icon={createCustomIcon(Number(pm))}>
      <Popup>
        <button
          onClick={() => {
            router.push(`/products/pm-detect/${deviceId}`);
          }}
          className="text-center grid hover:scale-110 duration-500"
        >
          <div className="font-bold bg-gray-600 text-white px-4 rounded-md text-xl">
            IoT Device {id}
          </div>
          {deviceId}
          <div className="flex gap-2 justify-center">
            <p className="text-[16px] bg-blue-500 text-white font-semibold px-2 py-1 rounded-sm">
              PM : {pm}
            </p>
          </div>
        </button>
      </Popup>
    </Marker>
  );
};

export default PMMarker;
