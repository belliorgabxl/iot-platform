"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

type LineChartProps = {
  value: number[];
  valueLabel: string[];
  bgcolor: string;
  chartName: string;
};

export default function LineChart({
  value,
  valueLabel,
  bgcolor,
  chartName,
}: LineChartProps) {
  ChartJS.register(
    LineElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement
  );

  if (!value || value.length === 0) {
    return <div className="text-white text-center p-4">No Data Available</div>;
  }

  const finalData = {
    labels: valueLabel,
    datasets: [
      {
        label: chartName,
        data: value.map((item) => Math.round(item)),
        borderColor: bgcolor,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: bgcolor,
        pointBorderColor: "#fff",
        pointRadius: 5,
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
        <Line data={finalData} options={options} />
      </div>
    </div>
  );
}
