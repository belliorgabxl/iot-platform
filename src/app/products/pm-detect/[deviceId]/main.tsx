"use client";
import WifiPopUp from "@/components/popup/WifiPopUp";
import { DeviceModel, WifiModel } from "@/resource/model";
import mqtt, { MqttClient } from "mqtt";
import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  device_id: string;
};

const fetchDeviceId = async (deviceId: string) => {
  const response = await fetch(`http://localhost:3000/api/devices/${deviceId}`);
  return response.json();
};

const fetchWifiId = async (wifiId: string) => {
  const ressponse = await fetch(`http://localhost:3000/api/wifi/${wifiId}`);
  return ressponse.json();
};

const fetchStorageValue = async (deviceId: string) => {
  try {
    const ressponse = await fetch(
      `http://localhost:3000/api/storageValue/${deviceId}`
    );
    return ressponse.json();
  } catch (err) {}
};

const updateSensorValue = async (deviceId: string, newValue: number) => {
    try {
      const response = await fetch(`/api/storageValue/${deviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newValue }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update sensor value: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Updated storage value:", data);
      return data;
    } catch (error) {
      console.error("Error updating storage value:", error);
    }
  };
  
export default function Main({ device_id }: Props) {
  const deviceId = device_id;
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const [popUp_click, setPopUpClick] = useState<boolean>();
  const [wifiData, setWifiData] = useState<WifiModel>();
  const [deviceData, setDeviceData] = useState<DeviceModel>();
  const [deviceConnected, setDeviceConnected] = useState<boolean>(false);

  useEffect(() => {
    fetchStorageValue(deviceId)
      .then((item: any) => {
        console.log("Fetched Data:", item);

        if (item && Array.isArray(item.value)) {
          setSensorData([...item.value]);
        } else {
          console.error("Invalid data format:", item);
        }
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  }, [deviceId]);
  const [sensorData, setSensorData] = useState<number[]>([]);
  const labels = sensorData.map((_, index) => `${index + 1}`);
  const sensorValues = sensorData.map((data) => data);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "PM(ppm)",
        data: sensorValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "ESP32 Sensor Bar Chart",
      },
    },
  };

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Sensor Value (Line)",
        data: sensorValues,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "ESP32 Sensor Line Chart",
      },
    },
  };
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    fetchDeviceId(deviceId).then((item: DeviceModel) => {
      setDeviceData(item);
      setLoading(true);
      setTopic(item?.topic);
      setDeviceName(item?.name);
    });
    setLoading(true);
    const client = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
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
  }, []);
  useEffect(() => {
    console.log("Listen Event Start...");
    const client = mqtt.connect(
      "wss://4cff082ff4a746da91e5ff64e35e8674.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "admin",
        password: "Bam1234!",
        protocol: "wss",
      }
    );
    console.log("is connecting...");
    client.on("connect", () => {
      if (topic != null) {
        client.subscribe(topic, (err) => {
          if (!err) {
            console.log("Subscribed to Connected Message");
          }
        });
      } else {
        console.log("none topic");
      }
    });
    client.on("message", async (topic, message) => {
      console.log(`Received message on ${topic}: ${message}`);

      const msgStr = message.toString();

      const regex =
        /value1:(\d+(\.\d+)?),\s*value2:(\d+(\.\d+)?),\s*value3:(\d+(\.\d+)?),\s*value4:(\d+(\.\d+)?),\s*value5:(\d+(\.\d+)?)/;
      const match = msgStr.match(regex);

      if (match) {
        const newValue = parseFloat(match[5]);
        if (isNaN(newValue)) {
          setValue(newValue.toString() || null);
          setSensorData((prev) => [...prev, newValue]);
          await updateSensorValue(deviceId, newValue);
        }
      }
    });
    return () => {
      console.log("Cleaning up MQTT connection...");
      client.unsubscribe(topic);
      client.end();
    };
  }, [topic]);

  const onClickPopUp = async () => {
    setPopUpClick(true);
    if (deviceData?.wifiId) {
      await fetchWifiId(deviceData?.wifiId).then((item) => {
        setWifiData(item);
      });
    }
  };

  return (
    <div className={`bg-gray-700 pb-10 px-5`}>
      <div className="py-5 lg:flex lg:justify-between gap-3 grid place-items-center">
        <div className="lg:mx-10 lg:block hidden"></div>
        <h1
          className={`duration-1000 py-3 ${
            isLoading
              ? "px-14 text-3xl text-white  bg-gray-800 rounded-2xl"
              : "px-0 text-gray-700 "
          } line-clamp-1 h-fit`}
        >
          PM-Detector
        </h1>
        <button
          className={`flex justify-center gap-4  mx-3 w-fit h-fit  py-2 text-lg rounded-3xl  shadow-sm shadow-gray-800 active:shadow-inner active:shadow-black   hover:bg-blue-400 hover:text-black ${
            isLoading
              ? "px-5 text-white bg-blue-600"
              : "px-0 bg-blue-300 text-blue-300"
          } `}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            onClickPopUp();
          }}
        >
          <img
            src={
              hover
                ? "/general/wifiBlack_icon.png"
                : "/general/wifiWhite_icon.png"
            }
            alt="icon"
            className={`w-7 h-7 ${isLoading ? "animate-fadeIn" : "opacity-0"} `}
          />
          Wi-fi setting
        </button>
      </div>
      <div className="flex gap-5 justify-center ">
        <div className="h-fit w-[500px]">
          {topic && deviceName && (
            <Panel
              isConnected={isConnected}
              client={client}
              topic={topic}
              deviceName={deviceName}
              isLoading={isLoading}
              device_id={deviceId}
              device_log={""}
              device_connect={deviceConnected}
              smokeValue={value || "-"}
            />
          )}
        </div>
        <div className="w-[400px]">
         
          <div className="flex justify-center py-5">
            <p className="text-lg text-white px-10 bg-gray-800 rounded-3xl py-2  ">
              lat : 13.7276, lng : 100.7761
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-5 space-y-5">
        <div className="bg-white px-5 py-5 rounded-md">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="bg-white px-5 py-5 rounded-md">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={()=>{
                window.location.reload()
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Sensor Value
          </button>
        </div>
      </div>

      {popUp_click && wifiData?.wifiId && (
        <WifiPopUp
          onClosePopUp={setPopUpClick}
          wifiID={wifiData?.wifiId}
          client={client}
          isConnected={isConnected}
          topic={topic}
        />
      )}
    </div>
  );
}
