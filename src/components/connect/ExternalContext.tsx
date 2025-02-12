"use client";

import React, { createContext, useEffect, useState, ReactNode, FC } from "react";
import mqtt, { MqttClient } from "mqtt";

interface ExternalProps {
  client: MqttClient | null;
  connectionStatus: "Connected" | "Disconnected" | "Reconnecting";
  lastMessage: string | null; 
  deviceStatus:string | null;
}

const ExternalMqttContext = createContext<ExternalProps>({
  client: null,
  connectionStatus: "Disconnected",
  lastMessage: null,
  deviceStatus:null,
});

interface MqttProviderProps {
  children: ReactNode;
  topic_device: string; 
  broker:string;
  connectPath:string,
  username:string,
  password:string
}


export const ExternalMqttProvider: FC<MqttProviderProps> = ({ children, topic_device,broker , connectPath , username , password }) => {
  const [topic_devices , setTopic] = useState<string>(topic_device)


  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "Connected" | "Disconnected" | "Reconnecting"
  >("Disconnected");
  const [deviceStatus , setDeviceStatus] = useState <string|null>(null)
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(
        connectPath,
      {
        username: username,
        password: password,
        protocol: "wss",
      }
    );
    mqttClient.on("error", (err) => {
        console.error("Connection error HiveMQ: ", err.message);
        console.log("Username:", username);
        console.log("Password:", password);
        console.error("Details: ", err);
        mqttClient.end();
      });
  
    let timeout: NodeJS.Timeout;
  
    mqttClient.on("connect", () => {
      setConnectionStatus("Connected");
      mqttClient.subscribe(topic_devices, (err) => {
        if (err) {
          console.error("Failed to subscribe to topic", err);
        }
      });
    });
  
    mqttClient.on("message", (topic, message) => {
      if (topic == topic_devices) {
        const statusMessage = message.toString();
        console.log("log test at line 50 : ",statusMessage);
        if (statusMessage === "online") {
          console.log("set success")
          setConnectionStatus("Connected");
          setDeviceStatus("online")
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            // setConnectionStatus("Disconnected");
            setDeviceStatus("Disconnect")
          }, 4000); 
        }
      }
    });
  
    mqttClient.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });
  
    setClient(mqttClient);
  
    return () => {
      clearTimeout(timeout);
      mqttClient.end();
    };
  }, []);

  return (
    <ExternalMqttContext.Provider value={{ client, connectionStatus, lastMessage ,deviceStatus}}>
      {children}
    </ExternalMqttContext.Provider>
  );
};

export default ExternalMqttContext;
