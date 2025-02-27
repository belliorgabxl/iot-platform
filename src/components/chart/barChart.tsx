"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

type BarChartProps = {
  value: number[];      
  valueLabel: string[];  
  bgcolor: string[];     
  chartName: string;     
};

export default function BarChart({ value, valueLabel, bgcolor, chartName }: BarChartProps) {
  ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

  if (!value || value.length === 0) {
    return <div className="text-white text-center p-4">No Data Available</div>;
  }

  const finalData = {
    labels: valueLabel,
    datasets: [
      {
        data: value.map((item) => Math.round(item)),  
        backgroundColor: bgcolor, 
        borderColor: bgcolor.map(color => color),
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
    },
  };

  return (
    <div className="lg:w-[300px] w-[250px] rounded-md py-5 lg:h-[280px] h-[250px] flex flex-col items-center bg-black">
      <h3 className="text-white text-sm mb-3">{chartName}</h3>
      <div className="w-[220px] h-[180px] lg:w-[270px] lg:h-[200px]">
        <Bar data={finalData} options={options} />
      </div>
    </div>
  );
}
