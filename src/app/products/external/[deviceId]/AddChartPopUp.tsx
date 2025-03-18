import { ChartModel, CustomizeChartPumpModel } from "@/resource/model";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type PopUpChartProps = {
  setPopUpChart: (value: boolean) => void;
  setChart: React.Dispatch<React.SetStateAction<ChartModel[]>>;
  deviceId: string;
};

type BtnData = {
  label: string[];
  value: string[];
  fgcolor: string[];
  bgcolor: string[];
};

type InputField = {
  value: string;
  color: string;
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
  const [addValueBtn, setAddValueBtn] = useState<boolean>(false);
  const [valueAmount, setValueAmount] = useState<BtnData[]>([]);

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
        window.location.reload()
      } else {
        toast.error("Failed");
      }
    }
  };

  const [inputs, setInputs] = useState([{ value: "", color: "" }]);

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { value: "", color: "" }]);
    }
  };

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleInputChange = (
    index: number,
    field: keyof InputField,
    value: string
  ) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const onSaveDonut = async () => {
    try {
      const response = await fetch("/api/externalChart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "donut",
          label: inputs.map((input) => input.value),
          bgcolor: inputs.map((input) => input.color),
          fgcolor: Array(inputs.length).fill("#FFFFFF"),
          deviceId: deviceId,
        }),
      });

      if (response.ok) {
        setPopUpChart(false);
        toast.success("Add DonutChart Success");
        window.location.reload();
      } else {
        console.error("Failed to save data", await response.text());
      }
    } catch (err) {
      console.error("Error saving data", err);
    }
  };
  const onSaveLine = async () => {
    try {
      const response = await fetch("/api/externalChart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "line",
          label: inputs.map((input) => input.value),
          bgcolor: inputs.map((input) => input.color),
          fgcolor: Array(inputs.length).fill("#FFFFFF"),
          deviceId: deviceId,
        }),
      });

      if (response.ok) {
        setPopUpChart(false);
        toast.success("Add DonutChart Success");
        window.location.reload();
      } else {
        console.error("Failed to save data", await response.text());
      }
    } catch (err) {
      console.error("Error saving data", err);
    }
  };
  const onSaveBar = async () => {
    try {
      const response = await fetch("/api/externalChart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "bar",
          label: inputs.map((input) => input.value),
          bgcolor: inputs.map((input) => input.color),
          fgcolor: Array(inputs.length).fill("#FFFFFF"),
          deviceId: deviceId,
        }),
      });

      if (response.ok) {
        setPopUpChart(false);
        toast.success("Add DonutChart Success");
        window.location.reload();
      } else {
        console.error("Failed to save data", await response.text());
      }
    } catch (err) {
      console.error("Error saving data", err);
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-800 bg-opacity-45"
      onClick={() => setPopUpChart(false)}
    >
      <div
        className="z-100 w-3/5  rounded-lg bg-gray-600  grid place-items-start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full text-center py-2 lg:text-xl font-semibold bg-gray-900 text-white rounded-t-lg">
          Create your Monitor
        </div>
        <div className="py-5 px-5">
          <div className="flex gap-5">
            <button
              className={` ${
                customizeType == "bar" ? "bg-green-400" : "bg-gray-500"
              } px-4 py-1 text-white bg-blue-500 rounded-2xl hover:opacity-75`}
              onClick={() => setCustomizeType("bar")}
            >
              Bar graph
            </button>
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
                customizeType == "line" ? "bg-green-400" : "bg-gray-500"
              } px-4 py-1 text-white bg-blue-500 rounded-2xl hover:opacity-75`}
              onClick={() => setCustomizeType("line")}
            >
              Line graph
            </button>
            <button
              className={` ${
                customizeType == "circle" ? "bg-green-400" : "bg-gray-500"
              } px-4 py-1 text-white  rounded-2xl hover:opacity-75`}
              onClick={() => setCustomizeType("circle")}
            >
              Circle Chart
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
          {customizeType == "bar" ? (
            <div className="py-2 px-4 text-white">
              <div className="flex gap-2 py-1 ">
                <div>Title</div>
                <input
                  type="text"
                  placeholder="name"
                  className="rounded-md bg-gray-400 text-white px-2 w-[180px]"
                />
              </div>
              <div className="py-2 ">
                <button
                  className={`px-4 py-1 ${
                    inputs.length < 5
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white rounded-md`}
                  onClick={addInput}
                  disabled={inputs.length >= 5}
                >
                  Add Value
                </button>
              </div>
              <div className="py-2">
                {inputs.map((input, index) => (
                  <div key={index} className="flex gap-2 py-2 items-center">
                    <div>{index + 1}</div>
                    <input
                      type="text"
                      className="w-[120px] bg-gray-400 rounded-md text-white placeholder:text-gray-300 px-4"
                      value={input.value}
                      placeholder="Symbol"
                      onChange={(e) =>
                        handleInputChange(index, "value", e.target.value)
                      }
                    />

                    <select
                      className="px-4 text-white rounded-sm py-0.5 justify-center items-center bg-gray-400"
                      value={input.color}
                      onChange={(e) =>
                        handleInputChange(index, "color", e.target.value)
                      }
                      style={{ backgroundColor: input.color }}
                    >
                      <option className="bg-white text-black" value="">
                        -select-
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#FF6384"
                        style={{ backgroundColor: "#FF6384" }}
                      >
                        Pink
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#36A2EB"
                        style={{ backgroundColor: "#36A2EB" }}
                      >
                        Sky
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#4BC0C0"
                        style={{ backgroundColor: "#4BC0C0" }}
                      >
                        Tongoue
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#9966FF"
                        style={{ backgroundColor: "#9966FF" }}
                      >
                        Purple
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#3300ff"
                        style={{ backgroundColor: "#3300ff" }}
                      >
                        Blue
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#FFF83E"
                        style={{ backgroundColor: "#FFF83E" }}
                      >
                        Yellow
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#8DFF7C"
                        style={{ backgroundColor: "#8DFF7C" }}
                      >
                        Green
                      </option>
                    </select>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 rounded-md"
                      onClick={() => removeInput(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center lg:gap-4">
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md enabled:bg-blue-500 disabled:bg-blue-400 enabled:hover:opacity-75 "
                  onClick={() => {
                    onSaveBar();
                  }}
                >
                  Save
                </button>
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md bg-gray-500 hover:opacity-75 "
                  onClick={() => setPopUpChart(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : customizeType == "line" ? (
            <div className="py-2 px-4 text-white">
              <div className="flex gap-2 py-1 ">
                <div>Title</div>
                <input
                  type="text"
                  placeholder="name"
                  className="rounded-md bg-gray-400 text-white px-2 w-[180px]"
                />
              </div>
              <div className="py-2 ">
                <button
                  className={`px-4 py-1 ${
                    inputs.length < 5
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white rounded-md`}
                  onClick={addInput}
                  disabled={inputs.length >= 5}
                >
                  Add Value
                </button>
              </div>
              <div className="py-2">
                {inputs.map((input, index) => (
                  <div key={index} className="flex gap-2 py-2 items-center">
                    <div>{index + 1}</div>
                    <input
                      type="text"
                      className="w-[120px] bg-gray-400 rounded-md text-white placeholder:text-gray-300 px-4"
                      value={input.value}
                      placeholder="Symbol"
                      onChange={(e) =>
                        handleInputChange(index, "value", e.target.value)
                      }
                    />

                    <select
                      className="px-4 text-white rounded-sm py-0.5 justify-center items-center bg-gray-400"
                      value={input.color}
                      onChange={(e) =>
                        handleInputChange(index, "color", e.target.value)
                      }
                      style={{ backgroundColor: input.color }}
                    >
                      <option className="bg-white text-black" value="">
                        -select-
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#FF6384"
                        style={{ backgroundColor: "#FF6384" }}
                      >
                        Pink
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#36A2EB"
                        style={{ backgroundColor: "#36A2EB" }}
                      >
                        Sky
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#4BC0C0"
                        style={{ backgroundColor: "#4BC0C0" }}
                      >
                        Tongoue
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#9966FF"
                        style={{ backgroundColor: "#9966FF" }}
                      >
                        Purple
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#3300ff"
                        style={{ backgroundColor: "#3300ff" }}
                      >
                        Blue
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#FFF83E"
                        style={{ backgroundColor: "#FFF83E" }}
                      >
                        Yellow
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#8DFF7C"
                        style={{ backgroundColor: "#8DFF7C" }}
                      >
                        Green
                      </option>
                    </select>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 rounded-md"
                      onClick={() => removeInput(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center lg:gap-4">
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md enabled:bg-blue-500 disabled:bg-blue-400 enabled:hover:opacity-75 "
                  onClick={() => {
                    onSaveLine();
                  }}
                >
                  Save
                </button>
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md bg-gray-500 hover:opacity-75 "
                  onClick={() => setPopUpChart(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : customizeType == "donut" ? (
            <div className="py-2 px-4 text-white">
              <div className="flex gap-2 py-1 ">
                <div>Title</div>
                <input
                  type="text"
                  placeholder="name"
                  className="rounded-md bg-gray-400 text-white px-2 w-[180px]"
                />
              </div>
              <div className="py-2 ">
                <button
                  className={`px-4 py-1 ${
                    inputs.length < 5
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white rounded-md`}
                  onClick={addInput}
                  disabled={inputs.length >= 5}
                >
                  Add Value
                </button>
              </div>
              <div className="py-2">
                {inputs.map((input, index) => (
                  <div key={index} className="flex gap-2 py-2 items-center">
                    <div>{index + 1}</div>
                    <input
                      type="text"
                      className="w-[120px] bg-gray-400 rounded-md text-white placeholder:text-gray-300 px-4"
                      value={input.value}
                      placeholder="Symbol"
                      onChange={(e) =>
                        handleInputChange(index, "value", e.target.value)
                      }
                    />

                    <select
                      className="px-4 text-white rounded-sm py-0.5 justify-center items-center bg-gray-400"
                      value={input.color}
                      onChange={(e) =>
                        handleInputChange(index, "color", e.target.value)
                      }
                      style={{ backgroundColor: input.color }}
                    >
                      <option className="bg-white text-black" value="">
                        -select-
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#FF6384"
                        style={{ backgroundColor: "#FF6384" }}
                      >
                        Pink
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#36A2EB"
                        style={{ backgroundColor: "#36A2EB" }}
                      >
                        Sky
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#4BC0C0"
                        style={{ backgroundColor: "#4BC0C0" }}
                      >
                        Tongoue
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#9966FF"
                        style={{ backgroundColor: "#9966FF" }}
                      >
                        Purple
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#3300ff"
                        style={{ backgroundColor: "#3300ff" }}
                      >
                        Blue
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#FFF83E"
                        style={{ backgroundColor: "#FFF83E" }}
                      >
                        Yellow
                      </option>
                      <option
                        className="text-center font-semibold"
                        value="#8DFF7C"
                        style={{ backgroundColor: "#8DFF7C" }}
                      >
                        Green
                      </option>
                    </select>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 rounded-md"
                      onClick={() => removeInput(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center lg:gap-4">
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md enabled:bg-blue-500 disabled:bg-blue-400 enabled:hover:opacity-75 "
                  onClick={() => {
                    onSaveDonut();
                  }}
                >
                  Save
                </button>
                <button
                  className="text-lg text-white lg:px-10 px-4 py-1 rounded-md bg-gray-500 hover:opacity-75 "
                  onClick={() => setPopUpChart(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : customizeType == "circle" ? (
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
                  Cancel
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
                  Cancel
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
