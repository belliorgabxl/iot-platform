"use client";

import React, { createContext, useEffect, useState, ReactNode, FC } from "react";
import mqtt, { MqttClient } from "mqtt";

interface MqttContextProps {
  client: MqttClient | null;
  connectionStatus: "Connected" | "Disconnected" | "Reconnecting";
  lastMessage: string | null;
  deviceStatus: string | null;
  smokeValue: number | null;
}

const LogValueContext = createContext<MqttContextProps>({
  client: null,
  connectionStatus: "Disconnected",
  lastMessage: null,
  deviceStatus: null,
  smokeValue: null,
});

interface MqttProviderProps {
  children: ReactNode;
  topic_device: string; 
  topic_smoke: string;  
}

export const LogProvider: FC<MqttProviderProps> = ({ children, topic_device, topic_smoke }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"Connected" | "Disconnected" | "Reconnecting">("Disconnected");
  const [deviceStatus, setDeviceStatus] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [smokeValue, setSmokeValue] = useState<number | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );

    mqttClient.on("connect", () => {
      setConnectionStatus("Connected");
      mqttClient.subscribe([topic_device, topic_smoke], (err) => {
        if (err) {
          console.error("Failed to subscribe to topics", err);
        }
      });
    });

    mqttClient.on("message", (topic, message) => {
      const msg = message.toString();

      if (topic === topic_device) {
        if (msg === "online") {
          setDeviceStatus("Connected");
        } else {
          setDeviceStatus("Disconnected");
        }
      } else if (topic === topic_smoke) {
        const value = parseInt(msg, 10);
        if (!isNaN(value)) {
          setSmokeValue(value);
        }
      }
    });

    mqttClient.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, [topic_device, topic_smoke]);

  return (
    <LogValueContext.Provider value={{ client, connectionStatus, lastMessage, deviceStatus, smokeValue }}>
      {children}
    </LogValueContext.Provider>
  );
};

export default LogValueContext;