import { ButtonModel, CustomizeButtonModel } from "@/resource/model";
import React, { useState } from "react";
import { toast } from "react-toastify";

type PopUpBtnProps = {
  setPopUpBtn: (value: boolean) => void;
  setButtons: React.Dispatch<React.SetStateAction<ButtonModel[]>>;
  deviceId: string;
};

const PopUpAddButton = ({
  setPopUpBtn,
  setButtons,
  deviceId,
}: PopUpBtnProps) => {
  const [category, setButtonCategory] = React.useState<string>("");
  const [label, setButtonLabel] = React.useState<string>("");
  const [command, setButtonCommand] = React.useState<string>("");
  const [type, setButtonType] = React.useState<string>("");
  const customizeBtn: CustomizeButtonModel = {
    transmitter: {
      press: {
        label: [
          { label: "Dot", icon: "⚫" },
          { label: "Up", icon: "⬆" },
          { label: "Down", icon: "⬇" },
          { label: "Left", icon: "⬅" },
          { label: "Right", icon: "➡" },
        ],
      },
      toggle: {
        label: [
          { label: "Forward", icon: "⬆" },
          { label: "Backward", icon: "⬇" },
          { label: "Up", icon: "⬆" },
          { label: "Down", icon: "⬇" },
          { label: "Left", icon: "⬅" },
          { label: "Right", icon: "➡" },
          { label: "ON", icon: "⏻" },
          { label: "Alarm", icon: "🔔" },
          { label: "Locked", icon: "🔒" },
          { label: "Warning", icon: "🚨" },
          { label: "Record", icon: "⏺" },
          { label: "Sound ON", icon: "🔊" },
        ],
      },
      joy: { label: ["normol joy stick"] },
    },
    reciever: {
      chart: ["donut", "candle"],
    },
  };
  const [selectedType, setSelectedType] = useState<
    keyof CustomizeButtonModel | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as keyof CustomizeButtonModel);
    setButtonType(event.target.value as keyof CustomizeButtonModel);
    setSelectedCategory(null);
    setSelectedLabel(null);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setButtonCategory(event.target.value);
    setSelectedLabel(null);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
    setButtonLabel(event.target.value);
  };

  const getCategoryOptions = (): string[] => {
    if (!selectedType) return [];
    return Object.keys(customizeBtn[selectedType]) as string[];
  };

  const getLabelOptions = (): string[] => {
    if (!selectedType || !selectedCategory) return [];

    let selectedData: string[] | { label: string[] } | undefined;

    if (selectedType in customizeBtn) {
      const selectedTypeData =
        customizeBtn[selectedType as keyof CustomizeButtonModel];

      if (
        selectedType === "transmitter" &&
        selectedCategory in selectedTypeData
      ) {
        selectedData =
          selectedTypeData[selectedCategory as keyof typeof selectedTypeData];
      } else if (
        selectedType === "reciever" &&
        selectedCategory in selectedTypeData
      ) {
        selectedData =
          selectedTypeData[selectedCategory as keyof typeof selectedTypeData];
      }
    }

    return Array.isArray(selectedData)
      ? selectedData
      : selectedData?.label || [];
  };
  const id = Date.now();
  const handleSave = async () => {
    const newButton: ButtonModel = {
      id,
      type,
      category,
      label,
      command,
      deviceId,
    };

    const resAddButton = await fetch("/api/button", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        type,
        category,
        label,
        command,
        deviceId,
      }),
    });
    if (resAddButton.ok) {
      toast.success("Add buttom success");
      window.location.reload()
    } else {
      toast.error("Failed");
    }

    setButtons((prevButtons) => [...prevButtons, newButton]);
    setButtonCategory("");
    setButtonLabel("");
    setButtonCommand("");
    setButtonType("");
    setPopUpBtn(false);
  };

  const [config_cmd, setConfigCMD] = useState<boolean>(false);

  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-800 bg-opacity-45"
      onClick={() => setPopUpBtn(false)}
    >
      <div
        className="z-100 w-full sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 rounded-md bg-gray-600 px-4 sm:px-8 md:px-16 pt-10 pb-5 grid place-items-start m-4 sm:m-8 md:m-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap my-2 gap-4">
          <select
            className="px-4 py-1 border rounded mb-2"
            value={selectedType || ""}
            onChange={handleTypeChange}
          >
            <option value="">--Type--</option>
            {Object.keys(customizeBtn).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-1 border rounded mb-2"
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            disabled={!selectedType}
          >
            <option value="">--Category--</option>
            {getCategoryOptions().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-1 border rounded mb-2"
            value={label || ""}
            onChange={handleLabelChange}
            disabled={!selectedCategory}
          >
            <option value="">--Label--</option>
            {getLabelOptions().map((option: any) => (
              <option
                key={option.label || option}
                value={option.label || option}
              >
                {option.icon ? `${option.icon} ${option.label}` : option}
              </option>
            ))}
          </select>
        </div>
        <div
          className={` ${
            selectedType == "transmitter" ? "animate-fastFade" : "hidden"
          } lg:flex  grid my-2 w-full  gap-5  `}
        >
          <button
            className={`${selectedType == "transmitter" ? "flex" : "hidden"} ${
              config_cmd
                ? " bg-blue-700 hover:bg-blue-600 text-white"
                : " hover:bg-gray-400 bg-white "
            } py-1 px-6 text-black rounded-lg shadow-md shadow-gray-700  hover:text-white line-clamp-1 h-fit `}
            onClick={() => setConfigCMD(!config_cmd)}
          >
            {config_cmd ? (
              <div>Config Command</div>
            ) : (
              <div>Default Command</div>
            )}
          </button>
          <div
            className={` ${
              !config_cmd && selectedType == "transmitter"
                ? "animate-fastFade"
                : "hidden"
            }`}
          >
            <select
              className="px-2 py-1 rounded-md bg-gray-500 text-white"
              onChange={(e) => setButtonCommand(e.target.value)}
            >
              <option defaultValue={"None"}>select-command</option>
              <option value={"on"}>On</option>
              <option value={"off"}>Off</option>
              <option value={"up"}>Up</option>
              <option value={"down"}>Down</option>
              <option value={"left"}>Left</option>
              <option value={"right"}>Right</option>
              <option value={"forward"}>Forward</option>
              <option value={"backward"}>Backward</option>
            </select>
          </div>
        </div>

        <div
          className={` ${
            config_cmd ? "animate-fastFade" : "hidden"
          } flex my-2 w-full justify-start gap-2`}
        >
          <label className="text-white">Command: </label>
          <input
            type="text"
            className="py-1 lg:w-[120px] bg-black text-green-400  w-[120px] rounded-sm  px-4"
            placeholder=">/"
            value={command}
            onChange={(e) => setButtonCommand(e.target.value)}
          />
        </div>
        <div className="my-4 w-full lg:flex grid lg:justify-center gap-2 items-start">
          <button
            className="px-8 py-1  enabled:opacity-100 opacity-60
              bg-blue-600 rounded-md text-white enabled:hover:opacity-80"
            onClick={handleSave}
            disabled={!category && !label && !command && !type}
          >
            Save
          </button>
          <button
            className="px-8 py-1 bg-red-500 rounded-md text-white hover:opacity-80"
            onClick={() => setPopUpBtn(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopUpAddButton;
