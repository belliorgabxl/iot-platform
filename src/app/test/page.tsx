'use client'
import React, { useState } from "react";
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
} from 'chart.js';

// Register Chart.js components
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

type SensorData = {
  value: number;
};

export default function Page() {
  const [sensorData, setSensorData] = useState<SensorData[]>([
    { value: 10 },
    { value: 30 },
    { value: 30 },
    { value: 20 },
    { value: 5 },
    { value: 55 },
    { value: 5 },
    { value: 45 },
    { value: 5 },
    { value: 25 },
    { value: 15 },
  ]);

  // Generate dynamic labels and sensor values
  const labels = sensorData.map((_, index) => `Day ${index + 1}`);
  const sensorValues = sensorData.map(data => data.value);

  // Data for Bar Chart
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sensor Value (Bar)',
        data: sensorValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'ESP32 Sensor Bar Chart',
      },
    },
  };

  // Data for Line Chart
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sensor Value (Line)',
        data: sensorValues,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'ESP32 Sensor Line Chart',
      },
    },
  };

  // Simulate receiving a new sensor value
  const updateSensorValue = () => {
    const newValue = Math.floor(Math.random() * 101);
    setSensorData(prev => [...prev, { value: newValue }]);
  };

  return (
    <div className="py-20 px-5 bg-white">
      <h1 className="text-center text-2xl font-bold mb-6">ESP32 Sensor Value</h1>
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            onClick={updateSensorValue}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Sensor Value
          </button>
        </div>
      </div>
    </div>
  );
}
