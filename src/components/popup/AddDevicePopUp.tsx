"use client";
import { useState } from "react";

type AddDevicePopUpProps = {
  onClosePopUp: (value: boolean) => void;
  loading_state: boolean;
  onSave: (name: string, id: string) => void;
};

const AddDevicePopUp = ({
  onClosePopUp,
  loading_state,
  onSave,
}: AddDevicePopUpProps) => {
  const [device_name, setName] = useState<string>("");
  const [product_id, setProductId] = useState<string>("");
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const Save = () => {
    onSave(device_name, product_id);
  };
  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-gray-800   rounded-lg w-[80%] md:w-[450px] sm:w-[70%]  lg:w-[500px] z-100 shadow-lg shadow-gray-950 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-gray-950 rounded-t-md py-2 text-white lg:text-xl text-lg text-center">
          Add You Device
        </div>
        <div className="px-5  py-5 grid place-items-center  gap-3">
          <div className="lg:flex items-center md:flex grid lg:gap-2 md:gap-2  ">
            <label className="lg:text-lg  py-2 h-fit line-clamp-1 lg:w-[140px] text-white ">
              Device IoT :
            </label>
            <select className="px-2 lg:w-[200px] w-[150px] py-1 rounded-sm bg-gray-500 text-white">
              <option value="none">Select Device</option>
              <option value="none">Robot Car</option>
              <option value="none">Robotic Arm</option>
              <option value="none">Pump</option>
              <option value="none">Smoke Detector</option>
            </select>
          </div>
          <div className="lg:flex items-center md:flex grid lg:gap-2 md:gap-2  ">
            <label className="lg:text-lg  py-2 h-fit line-clamp-1 lg:w-[140px] text-white ">
               Action Type :
            </label>
            <select className="px-2 lg:w-[200px] w-[150px] py-1 rounded-sm bg-gray-500 text-white">
              <option value="none">Select Type</option>
              <option value="none">Receiver</option>
              <option value="none">Transmitter</option>
            </select>
          </div>
          <div className="lg:flex items-center md:flex grid lg:gap-2 md:gap-2  ">
            <label className="lg:text-lg  py-2 h-fit line-clamp-1 lg:w-[140px] text-white ">
              Device Name :
            </label>
            <input
              type="text"
              onChange={handleChangeName}
              value={device_name}
              className=" text-sm h-fit  text-white lg:w-[200px] bg-gray-500 rounded-md py-1 px-2 w-[150px]"
            />
          </div>
          <div className=" lg:flex items-center md:flex  grid lg:gap-2 md:gap-2 ">
            <label className="lg:text-lg text-white py-2  lg:w-[140px]">
              Serial ID :
            </label>
            <input
              type="text"
              onChange={(e) => setProductId(e.target.value)}
              value={product_id}
              className=" text-sm h-fit text-white lg:w-[200px] bg-gray-500 rounded-md py-1 px-2 w-[150px]"
            />
          </div>
          <div className="flex gap-2 w-fit justify-start  ">
            {loading_state == false ? (
              <button
                onClick={() => {
                  Save();
                }}
                disabled={!device_name || !product_id}
                className="enabled:bg-opacity-100 bg-blue-600 enabled:hover:bg-blue-900 bg-opacity-70  text-white text-lg px-5 py-1 h-fit rounded-md lg:mx-10"
              >
                Submit
              </button>
            ) : (
              <div className="">
                <button
                  disabled
                  className="bg-blue-600 hover:bg-blue-900 text-white text-lg px-6 py-1 rounded-md items-center h-fit lg:mx-10 flex"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="pl-2">Submit</span>
                </button>
              </div>
            )}

            <button
              className="bg-red-500 h-fit hover:bg-red-700 lg:mx-10 text-white text-lg px-5 py-1 rounded-md"
              onClick={() => onClosePopUp(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDevicePopUp;
