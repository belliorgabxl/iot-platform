import React from "react";
import FormPage from "./Form";
const fetchDeviceId = async (deviceId: string) => {
  const response = await fetch(`http://localhost:3000/api/devices/${deviceId}`);
  return response.json();
};

const fetchWifiId = async (wifiId: string) => {
  const ressponse = await fetch(`http://localhost:3000/api/wifi/${wifiId}`);
  return ressponse.json();
};

const fetchButton = async (id: string) => {
  const response = await fetch(`/api/button/${id}`);
  return response.json();
};

export default function page({ params }: { params: { deviceId: string } }) {
  return (
    <div>
      <FormPage device_id={params.deviceId} />
    </div>
  );
}
