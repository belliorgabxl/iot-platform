"use client";
import { ExternalDeviceModel } from "@/resource/model";
import { Pencil, Trash, X } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
interface EditDevicePopUpProps {
  onClosePopUp: (value: boolean) => void;
  id: string | null;
  deviceId: string;
}

const getDevice = async (deviceId: string) => {
  try {
    const response = await fetch(`/api/importDeviceBydeviceId/${deviceId}`);
    return await response.json();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error");
  }
};

export default function EditExternalDevicePopUp({
  onClosePopUp,
  id,
  deviceId,
}: EditDevicePopUpProps) {
  const [name, setName] = useState<string>("");
  const [devices , setDevices] = useState<ExternalDeviceModel>()
  const [wifiId, setWifiId] = useState<string>("");
  const [enable_edit, setEnableEdit] = useState<boolean>(false);
  const [confirmDeletePopUp, setComfirmDeletePopUp] = useState<boolean>(false);

  useEffect(() => {
    getDevice(deviceId).then((item: any) => {
      setName(item.name);
      setDevices(item);
      setWifiId(item.wifiId);
    });
  }, [deviceId]);
  const reloadPage = () => {
    window.location.reload();
  };
  console.log(devices)
  const onDeleteDevice = async () => {
    try {
      const response1 = await fetch(`api/importDeviceBydeviceId/${deviceId}`, {
        method: "DELETE",
      });
      const response3 = await fetch(`api/wifi/${wifiId}`, {
        method: "DELETE",
      });
      if (response1.ok && response3.ok) {
        toast.success("Delete Device");
        setComfirmDeletePopUp(false);
        onClosePopUp(false);
        reloadPage()
      } else {
        toast.error("Failed to Delete");
      }
    } catch (error: any) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      toast.error("Delete failed");
    }
  };

  const onEditDeviceName = async () => {
    try {
    //   const response = await fetch(`api/deviceEditName/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       ContentType: "application/json",
    //     },
    //     body: JSON.stringify({
    //       name,
    //     }),
    //   });
    //   if (response.ok){
    //     toast.success("Edit Name Success")
    //     reloadPage()

    //   }else{
    //     toast.error("Edit failed");
    //   }
      onClosePopUp(false)
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      toast.error("Edit failed");
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-gray-800  rounded-lg rounded-t-xl lg:w-[400px] md:w-3/5 sm:w-3/5  z-100 shadow-lg shadow-gray-950 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white text-2xl bg-gray-900 font-bold text-center w-full rounded-t-xl py-1">
          Edit Device {name} this
        </div>
        <div className="px-10 py-5">
          <div className="flex gap-2 items-center ">
            <label className="text-white text-lg ">Device Name</label>
            <input
              type="text"
              className="w-[120px] bg-gray-500 px-2 py-1 text-white rounded-md"
              disabled={!enable_edit}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {enable_edit ? (
              <div
                className="px-2 py-2 rounded-md hover:bg-gray-300 bg-gray-400"
                onClick={() => setEnableEdit(false)}
              >
                <X
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  className="text-white"
                />
              </div>
            ) : (
              <div
                className="px-2 py-2 rounded-md hover:bg-blue-400 bg-blue-500"
                onClick={() => setEnableEdit(true)}
              >
                <Pencil
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  className="text-white"
                />
              </div>
            )}
          </div>
          <div className="my-2 py-2"></div>
          <div className="mt-4 flex gap-2 items-center">
            <button
              className="flex items-center justify-center gap-2 px-4 py-1 bg-red-600 text-white rounded-md group hover:bg-red-700"
              onClick={() =>
                setComfirmDeletePopUp(
                  (confirmDeletePopUp) => !confirmDeletePopUp
                )
              }
            >
              <Trash style={{ width: "1.2rem", height: "1.2rem" }} />
              <span>Delete</span>
              <span className="text-sm absolute transform  translate-x-40 group-hover:block hidden text-red-500">
                if delete device is can't recover
              </span>
            </button>
          </div>
          <div className="mt-4 flex justify-between gap-4 items-center">
            <button
              className="px-10 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
              onClick={() => onEditDeviceName()}
            >
              Save
            </button>
            <button
              className="px-10 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-700"
              onClick={() => onClosePopUp(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {confirmDeletePopUp && (
        <div
          className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
          onClick={() => setComfirmDeletePopUp(false)}
        >
          <div
            className="bg-gray-800  rounded-lg rounded-t-xl lg:w-[300px] md:w-3/5 sm:w-3/5  z-100 shadow-lg shadow-gray-950 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white text-xl bg-gray-900 font-bold text-center w-full rounded-t-xl py-1">
              Confirm to Delete ?
            </div>
            <div className="flex justify-between w-full py-8 px-10">
              <button
                className="px-8 py-1 rounded-md text-white hover:opacity-75 bg-blue-500"
                onClick={onDeleteDevice}
              >
                Yes
              </button>
              <button
                className="px-8 py-1 rounded-md text-white hover:opacity-75 bg-gray-400"
                onClick={() => setComfirmDeletePopUp(!confirmDeletePopUp)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
