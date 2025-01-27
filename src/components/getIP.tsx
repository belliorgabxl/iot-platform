"use client";
import { useEffect } from "react";

const GetIPComponent = () => {
  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        document.getElementById(
          "ip"
        )!.innerText = `Your IP Address: ${data.ip}`;
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    getIP();
  }, []);

  return <div id="ip">Loading your IP Address...</div>;
};

export default GetIPComponent;
