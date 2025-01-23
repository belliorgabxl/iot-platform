"use client";

import React, { useEffect, useState } from "react";
import { Session } from "@/resource/model";
import AddDevicePopUp from "@/components/popup/AddDevicePopUp";
import EditDevicePopUp from "@/components/popup/EditDevicePopUp";
import Link from "next/link";
import { CirclePlus, Settings, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import { MqttProvider } from "@/components/connect/MqttContext";
import DeviceStatus from "@/components/statusconnect/DeviceStatus";

type Props = {
  session: Session;
};
interface DeviceData {
  deviceId: string;
  userId: string;
  name: string;
  topic: string;
  type: string;
  password: string;
  status: string;
  wifiId: string;
  wifiConnect: string;
}

interface ProductData {
  _id: string;
  productId: string;
  type: string;
  topic: string;
  password: string;
  ownerStatus: boolean;
  deviceId: string;
}

const getDeviceByUser = async (id: string) => {
  try {
    const response = await fetch(`/api/deviceByUser/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Unknown error");
  }
};

// const getProductId = async (productId: string) => {
//   try {
//     const response = await axios.get<ProductData>(`/api/products/${productId}`);
//     return response.data;
//   } catch (error) {
//     console.error(error instanceof Error ? error.message : "Unknown error");
//   }
// };
const getProductId = async (productId: string): Promise<ProductData | null> => {
  try {
    const response = await axios.get<ProductData>(`/api/products/${productId}`);
    if (!response.data) {
      console.warn("Product not found.");
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch product:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
};

export default function Body({ session }: Props) {
  const router = useRouter();

  const userId = session._id;
  const [devices, setDevices] = useState<DeviceData[]>([]);
  // const [device_type, setDevicType] = useState<string | null>();
  const [device_name, setDeviceName] = useState<string | null>();
  const [product_id, setProductId] = useState<string | null>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [loading_state, setLoadings] = useState<boolean>(false);
  const [popUp_click, setPopUpClick] = useState<boolean>(false);
  const [edit_popup, setEditPopUp] = useState<boolean>(false);
  const [triggerSubmit, setTriggerSubmit] = useState<boolean>(false);

  useEffect(() => {
    getDeviceByUser(String(userId)).then((data: any) => {
      setDevices(data);
      setLoading(true);
    });
  }, []);

  const onClickEditPopUp = () => {
    setEditPopUp(true);
  };

  const onClickPopUp = () => {
    setPopUpClick(true);
  };

  const onClosePopUp = () => {
    setPopUpClick(false);
  };

  const setLoadingButton = () => {
    setLoadings(true);
  };
  const unsetLoadingButton = () => {
    setLoadings(false);
  };

  const getAddDevicePopUp = (name: string, id: string) => {
    setDeviceName(name);
    setProductId(id);
    setTriggerSubmit(true);
  };

  const addDeviceSubmit = async () => {
    setLoadingButton();
    if (!device_name) {
      toast.error("Please Set Device Name into Your Device.");
    }
    if (!product_id) {
      toast.error("not have product id.");
    }
    if (product_id) {
      try {
        const item = await getProductId(product_id);
        if (item?.ownerStatus == false) {
          const deviceUUID = uuidv4();
          const wifiUUID = uuidv4();

          try {
            let deviceId = deviceUUID;
            let name = device_name;
            let topic = item.topic;
            let type = item.type;
            let password = item.password;
            let status = "owner";
            let wifiId = wifiUUID;
            let wifiConnect = "none";
            const res = await fetch("/api/devices", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                deviceId,
                userId,
                name,
                topic,
                type,
                password,
                status,
                wifiId,
                wifiConnect,
              }),
            });

            setDevices((items: any) => {
              const updatedInventory = items && [
                ...items,
                {
                  deviceId: deviceUUID,
                  name: device_name,
                  topic: item.topic,
                  type: item.type,
                  password: item.password,
                  status: status,
                  wifiId: wifiUUID,
                  wifiConnect: wifiConnect,
                },
              ];
              return updatedInventory;
            });

            let wifiName = "Default";
            let wifiPassword = "12345678";
            status = "none";

            const resWifi = await fetch("/api/wifi", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                wifiId,
                wifiName,
                wifiPassword,
                status,
              }),
            });
            let newOwnerStatus = true;
            const resProduct = await fetch(`/api/products/${product_id}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                newOwnerStatus,
              }),
            });
            if (res.ok && resWifi.ok && resProduct.ok) {
              toast.success("Add Device success.");
              unsetLoadingButton();
              onClosePopUp();
            } else {
              toast.error("Errors somthing went wrong.");
            }
          } catch (error) {
            toast.error("System Errors.");
          }
        } else {
          toast.error("product is already exist user.");
        }
      } catch (error) {
        toast.error("Not found.")
      }
    }

    unsetLoadingButton();
    onClosePopUp();
  };
  useEffect(() => {
    if (triggerSubmit) {
      if (!device_name) {
        alert("err");
      } else {
        addDeviceSubmit();
      }
      setTriggerSubmit(false);
    }
  }, [triggerSubmit, device_name]);
  return (
    <div>
      <div className={`bg-gray-800  w-full pb-10`}>
        <div className="absolute  text-white bg-gray-900 px-20 py-4 text-3xl my-3 rounded-xl  md:left-1/2 sm:left-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:-translate-x-1/2   left-5 ">
          <div
            className={` ${
              isLoading ? "animate-fadeIn" : "opacity-0"
            } flex justify-center items-center `}
          >
            <h1 className=" text-5xl font-extrabold text-gray-900 ">
              <span className="text-transparent bg-clip-text tracking-wide bg-gradient-to-tr to-blue-800 via-blue-400 from-sky-300 line-clamp-1 ">
                Devices
              </span>
            </h1>
          </div>
        </div>

        <div className="lg:flex lg:justify-end sm:grid sm:place-items-end grid place-items-end gap-3 py-5 px-5">
          <button
            className="flex gap-2 justify-center bg-blue-600 rounded-md items-center hover:bg-slate-600  shadow-md  h-fit text-white w-[180px] px-4 py-2 "
            onClick={onClickPopUp}
          >
            <CirclePlus
              style={{ width: "1.8rem", height: "1.8rem" }}
              className="relative  text-white"
            />
            Add Device
          </button>
          <button
            className="flex gap-2 justify-center items-center font-semibold bg-white rounded-md hover:bg-slate-600 hover:text-white  shadow-md shadow-black text-gray-700 w-[180px]  text-lg px-4 py-2 group"
            onClick={() => {
              router.push("/import");
            }}
          >
            <Wrench
              style={{ width: "2.0rem", height: "1.8rem" }}
              className="relative  text-gray-700 group-hover:text-white"
            />
            Import
          </button>
        </div>
        <div className="flex justify-center pt-5 mb-20">
          {devices.length > 0 && isLoading == true ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:w-11/12  lg:px-10 px-4 py-10 md:w-9/12 sm:w-9/12 w-full sm:px-10 bg-gray-700 border-2 border-dotted border-gray-500">
              {devices?.map((item: DeviceData) => (
                <div
                  key={item.deviceId}
                  className="px-7 py-5 bg-gradient-to-tl from-gray-800 via-indigo-900 to-blue-600 text-white rounded-2xl shadow-lg shadow-gray-800 duration-500  hover:bg-blue-800 hover:shadow-gray-900 hover:shadow-xl hover:scale-[101%] w-full group "
                >
                  <div
                    className="absolute w-12 h-12 rounded-full z-10 right-0 -top-5 shadow-md shadow-black bg-gray-300 animate-fastFade hidden group-hover:block hover:bg-gray-500 "
                    onClick={() => {
                      onClickEditPopUp();
                    }}
                  >
                    <button className=" w-full h-full grid place-items-center ">
                      <Settings
                        style={{ width: "2.0rem", height: "2.5rem" }}
                        className="text-black hover:scale-[105%] hover:text-white transition-colors"
                      />
                    </button>
                  </div>
                  <Link
                    className=""
                    href={"/products/" + item.type + "/" + item.deviceId}
                  >
                    <div className="w-full flex justify-center">
                      <div className="text-2xl  font-bold bg-gray-800 rounded-xl shadow-sm px-5 py-2 w-4/5 text-center text-slate-300">
                        {item.type.toUpperCase()}
                      </div>
                    </div>

                    <div className="my-4 flex">
                      <span className="w-[80px] font-bold text-xl text-white">
                        Name :
                      </span>
                      <span className="text-white mx-4 bg-gray-500 rounded-md py-1 text-xl px-6">
                        {item.name ?? "Loading..."}
                      </span>
                    </div>
                    <div className=" flex my-4">
                      <span className="font-bold text-xl w-[80px] text-white ">
                        IoT ID :
                      </span>
                      <span className="text-white mx-4 bg-gray-500 rounded-md  h-fit py-1  text-xl w-[250px] line-clamp-1 px-6">
                        {item.deviceId ?? "Loading"}
                      </span>
                    </div>
                    <div className=" flex items-center my-4">
                      <span className="font-bold text-xl w-[100px] text-white ">
                        Status :
                      </span>
                      <MqttProvider topic_device={item.topic}>
                        <DeviceStatus />
                      </MqttProvider>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : devices.length <= 0 && isLoading == true ? (
            <div className="grid text-white text-3xl  place-items-center w-9/10 px-80 py-20 bg-gray-700 mb-20 border-2 border-dashed border-gray-500">
              No Devices
            </div>
          ) : (
            <div className="grid text-white text-4xl  place-items-center w-9/10 px-80 py-20 bg-gray-700 animate-pulse text-bold mb-20 border-2 border-dashed border-gray-500">
              Loading...
            </div>
          )}
        </div>
      </div>
      {popUp_click == true && (
        <AddDevicePopUp
          onClosePopUp={() => setPopUpClick(!popUp_click)}
          loading_state={loading_state}
          onSave={getAddDevicePopUp}
        />
      )}
      {edit_popup && (
        <EditDevicePopUp
          onClosePopUp={() => {
            setEditPopUp(false);
          }}
        />
      )}
    </div>
  );
}
