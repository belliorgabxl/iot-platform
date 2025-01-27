import CircleMonitor from "@/components/chart/circleMonitor";
import DonutChart from "@/components/chart/donutChart";
import DonutChartDirt from "@/components/chart/donutChartDirt";
import React from "react";

export default function page() {
  return (
    <div className="py-10 px-5">
      <div className="grid place-items-center">
        <h1 className="px-10 py-2 w-fit rounded-md bg-blue-500 text-white text-2xl">
          Test-Page
        </h1>
      </div>
      <div className="grid my-4 grid-cols-3 gap-4 bg-gray-600 px-5 py-5 rounded-md">
        <DonutChart />
        
        <CircleMonitor 
        bgcolor="bg-[#3300ff]"
        fgcolor="text-black"
        value="200"
        unit="%"
        />
        <CircleMonitor 
        bgcolor="bg-blue-500"
        fgcolor="text-black"
        value="560"
        unit="Fe"
        />
        <DonutChartDirt value="value1:25"/>
      </div>
    </div>
  );
}
