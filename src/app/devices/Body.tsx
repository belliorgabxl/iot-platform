"use client";

import React, { useEffect, useState } from "react";
import { Session, DeviceModel } from "@/resource/model";
import AddDevicePopUp from "@/components/popup/AddDevicePopUp";
// import EditDevicePopUp from "@/components/popup/EditDevicePopUp";
import Link from "next/link";
import { CirclePlus, Cpu, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import { MqttProvider } from "@/components/connect/MqttContext";
import DeviceStatus from "@/components/statusconnect/DeviceStatus";
import GetIPComponent from "@/components/getIP";
import EditDevicePopUp from "@/components/popup/EditDevicePopUp";

type Props = {
  session: Session;
};

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
  const [devices, setDevices] = useState<DeviceModel[]>([]);
  // const [device_type, setDevicType] = useState<string | null>();
  const [device_name, setDeviceName] = useState<string | null>();
  const [product_id, setProductId] = useState<string | null>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [loading_state, setLoadings] = useState<boolean>(false);
  const [popUp_click, setPopUpClick] = useState<boolean>(false);
  const [edit_popup, setEditPopUp] = useState<boolean>(false);
  const [edit_id, setEditId] = useState<string | null>();
  const [edit_deviceId, setEditDeviceId] = useState<string | null>();
  const [triggerSubmit, setTriggerSubmit] = useState<boolean>(false);

  useEffect(() => {
    getDeviceByUser(String(userId)).then((data: any) => {
      setDevices(data);
      setLoading(true);
    });
  }, []);

  const onClickEditPopUp = (id: string, deviceId: string) => {
    setEditPopUp(true);
    setEditId(id);
    setEditDeviceId(deviceId);
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
            let productId = product_id;
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
                productId,
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
        toast.error("Not found.");
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
        <div className="lg:px-5 grid lg:flex gap-4 justify-between  bg-gray-700 px-10 py-2 rounded-md items-center">
          <div className="lg:flex grid gap-3 lg:gap-8">
            <div
              className={` ${
                isLoading ? "animate-fadeIn" : "opacity-0"
              } bg-gray-800 flex items-center h-fit rounded-full py-4 px-4 lg:px-10 w-fit `}
            >
              <h1 className=" md:text-4xl font-bold text-2xl lg:text-5xl  text-gray-900 ">
                <span className="text-transparent bg-clip-text tracking-wide bg-white line-clamp-1 ">
                  Devices
                </span>
              </h1>
            </div>
            <div className="grid text-white">
              <div className="grid lg:flex lg:gap-3 gap-0">
                <div className="text-white flex gap-2 lg:text-lg">
                  <p className="font-semibold text-blue-500">User :</p>
                  {session.username.toUpperCase()}
                </div>
                <div className="lg:block hidden">|</div>
                <div className="text-white flex gap-2 lg:text-lg">
                  <p className="font-semibold text-blue-500">Email</p> :{" "}
                  {session.email}
                </div>
              </div>

              <div className="lg:text-lg  flex gap-2">
                <p className="font-semibold text-blue-500">Device Owner :</p>{" "}
                {devices.length} Items
              </div>
              <div className="lg:flex items-center text-white md:flex sm:flex grid gap-2">
                <div className="lg:text-lg flex gap-2 text-white items-center">
                  <p className="font-semibold text-blue-500">Status :</p> User
                  online
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                <div className="lg:block hidden">|</div>
                <GetIPComponent />
              </div>
            </div>
          </div>

          <div className="lg:flex lg:justify-end sm:grid sm:place-items-start grid  place-items-start gap-3">
            <button
              className="flex gap-2 justify-center bg-blue-600 rounded-3xl items-center hover:bg-slate-600  shadow-md text-sm  h-fit text-white w-[180px] px-2 text-sm lg:px-4 py-1 "
              onClick={onClickPopUp}
            >
              <CirclePlus
                style={{ width: "1.8rem", height: "1.8rem" }}
                className="relative  text-white"
              />
              Example Device
            </button>
            <button
              className="flex gap-2 justify-center items-center font-semibold bg-white rounded-3xl hover:bg-slate-600 hover:text-white  text-sm shadow-md text-gray-700 w-[230px]  px-2 lg:px-4 py-1 group"
              onClick={() => {
                router.push("/externalDevice");
              }}
            >
              <Cpu
                style={{ width: "2.0rem", height: "1.8rem" }}
                className="relative  text-gray-700 group-hover:text-white"
              />
              Import New Device
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-5 mb-20">
          {devices.length > 0 && isLoading == true ? (
            <div className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 gap-4 lg:w-fit lg:px-10 px-4 py-10 md:w-[90%] sm:w-9/12 w-[90%] sm:px-10 bg-gray-700 border-2 border-dotted border-gray-500">
              {devices?.map((item: DeviceModel) => (
                <div
                  key={item.deviceId}
                  className="flex justify-center lg:px-0 lg:py-6 py-5 bg-gradient-to-tl from-gray-800 via-indigo-900 to-blue-600 text-white rounded-3xl px-6 shadow-lg shadow-gray-800 duration-500  hover:bg-blue-800 hover:shadow-gray-900 hover:shadow-xl hover:scale-[101%] lg:w-[320px] md:w-full sm:w-[300px] w-[280px] h-fit group "
                >
                  <div
                    className="absolute w-12 h-12 rounded-full z-10 right-0 -top-5 shadow-md shadow-black bg-gray-300 animate-fastFade hidden group-hover:block hover:bg-gray-500 "
                    onClick={() => {
                      onClickEditPopUp(item._id, item.deviceId);
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
                    className="grid gap-2 h-fit"
                    href={"/products/" + item.type + "/" + item.deviceId}
                  >
                    <div className="w-full flex justify-center">
                      <div className="text-xl  font-bold bg-gray-800 rounded-xl shadow-sm px-5 py-1 w-4/5 text-center h-fit text-slate-300">
                        {item.type.toUpperCase()}
                      </div>
                    </div>

                    <div className=" lg:gap-4 flex">
                      <span className="w-[80px] font-semibold lg:text-xl text-lg text-white">
                        Name :
                      </span>
                      <span className="text-white  bg-gray-500 rounded-md py-1 lg:text-lg  text-sm px-6">
                        {item.name ?? "Loading..."}
                      </span>
                    </div>

                    <div className=" flex items-center  ">
                      <span className="font-semibold lg:text-xl w-[100px] text-white ">
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
            <div className="grid text-white text-3xl  place-items-center w-full py-20 bg-gray-700 mb-20 border-2 border-dashed border-gray-500">
              No Devices
            </div>
          ) : (
            <div className="grid text-white text-4xl  place-items-center w-full py-20 bg-gray-700 animate-pulse text-bold mb-20 border-2 border-dashed border-gray-500">
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
      {edit_popup && edit_id && edit_deviceId && (
        <EditDevicePopUp
          id={edit_id}
          deviceId={edit_deviceId}
          onClosePopUp={() => {
            setEditPopUp(false);
          }}
        />
      )}
    </div>
  );
}
