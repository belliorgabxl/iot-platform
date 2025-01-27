"use cleint";
import React from "react";

type CircleMonitorProps = {
  bgcolor: string;
  fgcolor: string;
  value: string;
  unit: string;
};

export default function CircleMonitor({
  bgcolor,
  fgcolor,
  value,
  unit,
}: CircleMonitorProps) {
  return (
    <div
      className={`lg:w-[250px] w-[150px] lg:h-[250px] h-[150px] rounded-full overflow-hidden line-clamp-1 px-4 grid place-items-center ${bgcolor}`}
    >
      <div className={`text-center ${fgcolor} text-xl lg:text-3xl  font-bold`}>
        {value}&nbsp;{unit}
      </div>
    </div>
  );
}
