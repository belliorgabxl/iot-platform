"use client"; 
import React from "react";
import { useRouter } from "next/navigation"; 
export default function HelpPage() {
  const router = useRouter(); 

  return (
    <div className="min-h-screen bg-black text-white py-10 px-5 lg:px-20">
      <div className="w-full flex justify-center">
        <h1 className="text-4xl font-bold text-center px-10 py-2">
          Help & Support
        </h1>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {helpTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => router.push("/documents")} 
          >
            <h2 className="text-xl font-semibold text-blue-400">{topic.title}</h2>
            <p className="mt-2 text-gray-300 text-sm">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


const helpTopics = [
  {
    title: "Documentation",
    description: "View the user manual for devices and applications."
  },
  {
    title: "Change Wi-Fi Network",
    description: "Guide on how to change your device’s Wi-Fi network."
  },
  {
    title: "Connection Status",
    description: "Check your device's connection status and troubleshooting tips."
  },
  {
    title: "What is Serial ID?",
    description: "Learn about Serial ID and how to use it."
  },
  {
    title: "How to Connect a Device to the Web Application",
    description: "Step-by-step instructions on connecting your device."
  },
  {
    title: "Unable to Control the Device?",
    description: "Troubleshooting guide if you're unable to control your device."
  }
];