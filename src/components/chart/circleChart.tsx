"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

type CircleChart = {
  value: number[];       
  valueLabel: string[];  
  bgcolor: string[];     
  chartName: string;    
};

export default function CircleChart({ value, valueLabel, bgcolor, chartName }: CircleChart) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  if (!value || value.length === 0) {
    return <div className="text-white text-center p-4">No Data Available</div>;
  }

  const finalData = {
    labels: valueLabel,
    datasets: [
      {
        data: value.map((item) => Math.round(item)),  
        backgroundColor: bgcolor, 
        borderColor: bgcolor,
        borderWidth: 1,
      },
    ],
  };
  
  const options: any = {
    plugins: {
      legend: {
        display: true, 
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: "0%",
  };

  return (
    <div className="lg:w-[270px] w-[200px] rounded-md py-5 lg:h-[280px] h-[250px] flex flex-col items-center bg-black">
      <h3 className="text-white text-sm mb-3">{chartName}</h3>
      <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]">
        <Doughnut data={finalData} options={options} />
      </div>
    </div>
  );
}
