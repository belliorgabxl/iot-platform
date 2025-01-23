"use client";

import React, { createContext, useEffect, useState, ReactNode, FC } from "react";
import mqtt, { MqttClient } from "mqtt";

interface MqttContextProps {
  client: MqttClient | null;
  connectionStatus: "Connected" | "Disconnected" | "Reconnecting";
  lastMessage: string | null;
  deviceStatus: string | null;
}

const MqttContext = createContext<MqttContextProps>({
  client: null,
  connectionStatus: "Disconnected",
  lastMessage: null,
  deviceStatus: null,
});

interface MqttProviderProps {
  children: ReactNode;
  topic_device: string;
}

export const MqttProvider: FC<MqttProviderProps> = ({ children, topic_device }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "Connected" | "Disconnected" | "Reconnecting"
  >("Disconnected");
  const [deviceStatus, setDeviceStatus] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );

    let disconnectTimeout: NodeJS.Timeout | null = null;

    const handleMessage = (topic: string, message: Buffer) => {
      if (topic === topic_device) {
        const statusMessage = message.toString();
        setLastMessage(statusMessage);

        if (statusMessage === "online") {
          setConnectionStatus("Connected");
          setDeviceStatus(statusMessage);
          if (disconnectTimeout) clearTimeout(disconnectTimeout);
          disconnectTimeout = setTimeout(() => {
            setConnectionStatus("Disconnected");
            setDeviceStatus("Disconnected");
          }, 4000);
        }
      }
    };

    mqttClient.on("connect", () => {
      setConnectionStatus("Connected");

      if (mqttClient.connected) {
        mqttClient.subscribe(topic_device, (err) => {
          if (err) {
            console.error("Failed to subscribe to topic:", err);
          } else {
            console.log(`Successfully subscribed to topic: ${topic_device}`);
          }
        });
      }
    });

    mqttClient.on("message", handleMessage);

    mqttClient.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    setClient(mqttClient);

    return () => {
      if (disconnectTimeout) clearTimeout(disconnectTimeout);
      mqttClient.end(true); 
    };
  }, [topic_device]);

  return (
    <MqttContext.Provider
      value={{ client, connectionStatus, lastMessage, deviceStatus }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export default MqttContext;
