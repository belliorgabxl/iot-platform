"use client";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

type DonutProps = {
  value: number[];
  valueLabel:string[];
  bgcolor:string[];
  chartName: string;
};

export default function DonutChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [dirtValue, setDirtValue] = useState<string>("");

  const chartA = 50;
  const chartB = 0;
  const chartC = 50;
  // if (dirtValue.startsWith("value")){
  //   Dvalue = dirtValue.split(": ")[1];
  //   chartB = parseInt(Dvalue, 10);
  // }
  const data = [
    {
      label: "air",
      value: chartA - (chartB - 20),
      color: "rgba(83, 217, 217, 1)",
      cutout: "50%",
    },
    {
      label: "ค่าความชื้น",
      value: chartB * 0.4,
      color: "rgba(0, 103, 160, 1)",
      cutout: "50%",
    },
    {
      label: "dirt",
      value: chartC - chartA * 0.05,
      color: "rgba(0, 43, 73, 1)",
      cutout: "50%",
    },
  ];

  const options: any = {
    plugins: {
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };
  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };
  return (
    <div className="lg:w-[270px] w-[200px] rounded-md  py-5 lg:h-[280px] h-[250px] grid place-items-center bg-black ">
      <Doughnut data={finalData} options={options} />
    </div>
  );
}
