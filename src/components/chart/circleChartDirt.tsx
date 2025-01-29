"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

type DonutProps = {
  value: string;
};

export default function CircleChartDirt(props:DonutProps) {
  ChartJS.register(ArcElement, Tooltip, Legend);



  const [water, setWater] = useState<number>(0);
  const [waterRGB , setWaterRGB] = useState<string>('')
  const air = 25;
  const dirt = 45;
  const minerals = 5;

  useEffect(()=>{
    const part =  props.value.split(":");
    if (part.length === 2 && part[0] === "value1" ){
        const waterValue =  parseInt(part[1] , 10) * 5;
        if(!isNaN(waterValue)){
            setWater(waterValue);
        }
    }
  },[props.value]);

  useEffect(() => {
    if (water <= 25) {
      setWaterRGB("rgba(0, 53, 186)");
    } else {
      setWaterRGB("rgba(255, 0, 38)");
    }
  }, [water]);

  const data = [
    {
      label: "air",
      value: air,
      color: "rgba(164, 248, 252)",
      cutout: "0%",
    },
    {
      label: "ค่าความชื้น",
      value: water,
      color: waterRGB,
      cutout: "0%",
    },
    {
      label: "dirt",
      value: dirt,
      color: "rgba(82, 18, 0)",
      cutout: "0%",
    },
    {
      label: "Minerals",
      value: minerals,
      color: "rgba(186, 168, 0)",
      cutout: "0%",
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
    <div className="lg:w-[270px] w-[220px] rounded-md  py-5 lg:h-[280px] h-[250px] grid place-items-center bg-black ">
      <Doughnut data={finalData} options={options} />
    </div>
  );
}
