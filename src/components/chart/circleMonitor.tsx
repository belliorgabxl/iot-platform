"use cleint";
import React, { useEffect, useState } from "react";

type CircleMonitorProps = {
  bgcolor: string;
  fgcolor: string;
  value: string;
  unit: string;
};

export default function CircleMonitor(props: CircleMonitorProps) {
  const [water, setWater] = useState<number>(0);
    useEffect(()=>{
      const part =  props.value.split(":");
      if (part.length === 2 && part[0] === "value1" ){
          const waterValue =  parseInt(part[1] , 10);
          if(!isNaN(waterValue)){
              setWater(waterValue);
          }
      }
    },[props.value]);
  return (
    <div
      className={`lg:w-[250px] w-[150px] lg:h-[250px] h-[150px] rounded-full overflow-hidden line-clamp-1 px-4 grid place-items-center ${props.bgcolor}`}
    >
      <div className={`text-center ${props.fgcolor} text-xl lg:text-3xl  font-bold`}>
        {water*5}&nbsp;{props.unit}
      </div>
    </div>
  );
}
