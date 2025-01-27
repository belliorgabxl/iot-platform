import { ChartModel, CustomizeChartPumpModel } from "@/resource/model";
import React, { useState } from "react";
import { toast } from "react-toastify";

type PopUpChartProps = {
  setPopUpChart: (value: boolean) => void;
  setChart: React.Dispatch<React.SetStateAction<ChartModel[]>>;
  deviceId: string;
};

const PopUpAddChart = ({
  setPopUpChart,
  setChart,
  deviceId,
}: PopUpChartProps) => {
  const [customizeType, setCustomizeType] = useState<string | null>();
  const [unit, setUnit] = useState<string>("");
  const [bgcolor, setBGcolor] = useState<string>("");
  const [fgcolor, setFGcolor] = useState<string>("");

  const onSaveChart = async () => {
    if (customizeType) {
      const id = Date.now();
      const newChart: ChartModel = {
        id,
        type: customizeType,
        unit,
        bgcolor,
        fgcolor,
        label: "",
        deviceId,
      };
      const res = await fetch("/api/chart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          type: customizeType,
          unit,
          bgcolor,
          fgcolor,
          label: "",
          deviceId,
        }),
      });
      if (res.ok) {
        setChart((prevChart) => [...prevChart, newChart]);
        setUnit("");
        setCustomizeType("");
        setBGcolor("");
        setFGcolor("");
        setPopUpChart(false);
        toast.success("Create Success");
      } else {
        toast.error("Failed");
      }
    }
  };
  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-800 bg-opacity-45"
      onClick={() => setPopUpChart(false)}
    >
      <div
        className="z-100 w-2/5  rounded-lg bg-gray-600  grid place-items-start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full text-center py-2 lg:text-xl font-semibold bg-gray-900 text-white rounded-t-lg">
          Create your Monitor
        </div>
        <div className="py-5 px-5">
          <div className="flex gap-5">
            <button
              className={` ${
                customizeType == "donut" ? "bg-green-400" : "bg-gray-500"
              } px-4 py-1 text-white  rounded-2xl hover:opacity-75`}
              onClick={() => setCustomizeType("donut")}
            >
              Donut Chart
            </button>
            <button
              className={` ${
                customizeType == "monitorcircle"
                  ? "bg-green-400"
                  : "bg-gray-500"
              } px-4 py-1 text-white bg-blue-500 rounded-2xl hover:opacity-75`}
              onClick={() => setCustomizeType("monitorcircle")}
            >
              Circle Display
            </button>
          </div>
          {customizeType == "donut" ? (
            <div className="py-2 px-10 text-white">
              <div className="flex items-center lg:gap-4">
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md enabled:bg-blue-500 disabled:bg-blue-400 enabled:hover:opacity-75 "
                  onClick={() => {
                    onSaveChart();
                  }}
                >
                  Save
                </button>
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md bg-gray-500 hover:opacity-75 "
                  onClick={() => setPopUpChart(false)}
                >
                  Cancal
                </button>
              </div>
            </div>
          ) : customizeType == "monitorcircle" ? (
            <div className="py-2 px-10 text-white">
              <div className="text-lg font-semibold px-4 bg-gray-700 rounded-md text-center my-4">
                Monitor Adjust
              </div>
              <div className="grid lg:flex items-center  gap-2 ">
                <label>BG-Color :</label>
                <select
                  className="px-2 text-white py-1 text-center rounded-md bg-gray-500"
                  onChange={(e) => setBGcolor(e.target.value)}
                >
                  <option className="bg-white text-black" value="">
                    -select-
                  </option>
                  <option
                    className="bg-[#00ccff] text-center font-semibold"
                    value="bg-[#00ccff]"
                  >
                    sky
                  </option>
                  <option
                    className="bg-[#ff0d0d] text-center font-semibold"
                    value="bg-[#ff0d0d]"
                  >
                    <p>red</p>
                  </option>
                  <option
                    className="bg-[#ffdd00] text-center font-semibold"
                    value="bg-[#ffdd00]"
                  >
                    yellow
                  </option>
                  <option
                    className="bg-[#17fc03] text-center font-semibold"
                    value="bg-[#17fc03]"
                  >
                    green
                  </option>
                  <option
                    className="bg-[#3300ff] text-center font-semibold"
                    value="bg-[#3300ff]"
                  >
                    blue
                  </option>
                  <option
                    className="bg-[#ff0082] text-center font-semibold"
                    value="bg-[#ff0082]"
                  >
                    pink
                  </option>
                  <option
                    className="bg-[#ff00ff] text-center font-semibold"
                    value="bg-[#ff00ff]"
                  >
                    purpul
                  </option>
                </select>
                <label className="ml-4">Font-Color : </label>
                <select
                  className="px-2 text-white py-1 text-center rounded-md bg-gray-500"
                  onChange={(e) => setFGcolor(e.target.value)}
                >
                  <option className="bg-white text-black" value="">
                    -select-
                  </option>
                  <option className="bg-black text-white" value="text-white">
                    white
                  </option>
                  <option className="bg-white text-black" value="text-black">
                    black
                  </option>
                </select>
              </div>
              <div className="flex items-center gap-2 my-2">
                <label className="text-white">Unit :</label>
                <input
                  className="bg-gray-500 text-white w-[200px] rounded-md px-2 py-1 "
                  type="text"
                  onChange={(e) => setUnit(e.target.value)}
                  value={unit}
                />
              </div>
              <div className="flex items-center lg:gap-4">
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md enabled:bg-blue-500 disabled:bg-blue-400 enabled:hover:opacity-75 "
                  disabled={!unit || !bgcolor || !fgcolor}
                  onClick={() => {
                    onSaveChart();
                  }}
                >
                  Save
                </button>
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md bg-gray-500 hover:opacity-75 "
                  onClick={() => setPopUpChart(false)}
                >
                  Cancal
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PopUpAddChart;
