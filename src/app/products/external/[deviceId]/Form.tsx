"use client";
import { ExternalDeviceModel } from "@/resource/model";
import mqtt, { MqttClient } from "mqtt";
import React, { useEffect, useState } from "react";

type Props = {
  device_id: string;
};
const fetchDeviceId = async (deviceId: string) => {
  const response = await fetch(`/api/importDeviceBydeviceId/${deviceId}`);
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

export default function Form({ device_id }: Props) {
  const deviceId = device_id;
  const [broker, setBroker] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [deviceData, setDeviceData] = useState<ExternalDeviceModel>();
  useEffect(() => {
    fetchDeviceId(deviceId).then((item: any) => {
      setDeviceData(item);
      setLoading(true);
      setTopic(item.topic);
      setBroker(item.broker);
      setUsername(item.username);
      setPassword(item.password);
      setEndPoint(item.endPiont);
    });
    setLoading(true);
  }, []);

  useEffect(() => {
    if (broker == "hivemq") {
      const client = mqtt.connect(`${endPoint}`, {
        username: `${username}`,
        password: `${password}`,
        protocol: "wss",
      });
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
    } else if (broker == "adafruit") {
      const client = mqtt.connect(`${endPoint}`, {
        username: `${username}`,
        key: `${password}`,
        protocol: "wss",
      });
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
    }
  }, [broker]);

  return <div></div>;
}
