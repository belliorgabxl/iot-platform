"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ExternalDeviceModel, Session } from "@/resource/model";
import { ChevronRight, Settings } from "lucide-react";
import DeviceStatus from "@/components/statusconnect/DeviceStatus";
import { MqttProvider } from "@/components/connect/MqttContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditExternalDevicePopUp from "@/components/popup/EditExternalDevicePopUp";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ExternalMqttProvider } from "@/components/connect/ExternalContext";
import ExternalDeviceStatus from "@/components/statusconnect/ExternalDeviceStatus";
interface Props {
  session: Session;
}
const getExternalDevice = async (userid: string) => {
  try {
    const result = await fetch(`/api/importDevice/${userid}`);
    return await result.json();
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Unknown error");
    return [];
  }
};

export default function Body({ session }: Props) {
  const router = useRouter();
  const userId = session.toString();
  const [devices, setDevices] = useState<ExternalDeviceModel[] | null>([]);

  const [newBroker, setNewBroker] = useState<string>("");
  const [newUsernameBroker, setNewUsernameBroker] = useState<string>("");
  const [newPasswordBroker, setNewPasswordBroker] = useState<string>("");
  const [newTopic, setNewTopic] = useState<string>("");
  const [newEndPoint, setNewEndPoint] = useState<string>("");
  const [newDeviceName, setNewDeviceName] = useState<string>("");

  const [openImport, setOpenImport] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [addVerifyPopUp, setAddVerifyPopUp] = useState<boolean>(false);

  const [edit_popup, setEditPopUp] = useState<boolean>(false);
  const [edit_id, setEditId] = useState<string | null>();
  const [edit_deviceId, setEditDeviceId] = useState<string | null>();

  useEffect(() => {
    getExternalDevice(String(userId)).then((item: any) => {
      setDevices(item);
      setLoading(true);
    });
  }, []);

  const onCancelImport = () => {
    setOpenImport(false);
    setNewBroker("");
  };

  const onClickEditPopUp = (id: string, deviceId: string) => {
    setEditPopUp(true);
    setEditId(id);
    setEditDeviceId(deviceId);
  };
  return (
    <div className="w-full bg-gray-700">
      <div className="w-full grid place-items-center ">
        <h1 className="py-2 bg-gray-800 px-10 text-3xl rounded-3xl text-white my-2">
          Import New Device
        </h1>
      </div>
      <div className="w-full mt-4 flex justify-start px-2 lg:px-10 gap-5">
        <button
          className="flex text-white items-center gap-2 px-8 py-2 rounded-3xl bg-blue-600 hover:bg-blue-500"
          onClick={() => setOpenImport(!openImport)}
        >
          Import New Device
          <ChevronRight
            style={{ width: "1.5rem", height: "1.5rem" }}
            className={` ${
              openImport ? "rotate-90" : ""
            } duration-200 relative translate-y-0.5`}
          />
        </button>
        <button
          className="flex text-white items-center gap-2 px-8 py-2 rounded-3xl bg-blue-600 hover:bg-blue-500"
          onClick={() => {
            router.push("/documents/src-code/ep1");
          }}
        >
          .ino Source-Code
          <ChevronRight
            style={{ width: "1.5rem", height: "1.5rem" }}
            className={` duration-200 relative translate-y-0.5`}
          />
        </button>
      </div>

      {openImport && (
        <div className="animate-fastFade lg:flex grid gap-2 lg:gap-5 my-2 px-5 lg:px-10">
          <div className=" py-5  rounded-md grid gap-4  bg-gray-800 w-fit px-4">
            <div className="grid gap-4">
              <h1 className="text-white text-lg font-semibold px-5 bg-gray-900 py-1 w-fit  rounded-md">
                Select Broker
              </h1>
              <div className="flex gap-4 ">
                <div className="flex gap-2 items-center">
                  <label className="text-lg text-white ">HIVE MQ</label>
                  <input
                    type="radio"
                    name="broker"
                    onChange={(e) => setNewBroker(e.target.value)}
                    value="hivemq"
                    className="w-4 h-4 shadow-none"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="text-lg text-white ">Adafruit</label>
                  <input
                    type="radio"
                    name="broker"
                    onChange={(e) => setNewBroker(e.target.value)}
                    value="adafruite"
                    defaultValue={newBroker || ""}
                    className="w-4 h-4 shadow-none"
                  />
                </div>
              </div>
              <hr className="w-full text-white" />
              {newBroker == "hivemq" ? (
                <div className="grid gap-2">
                  <h1 className="font-semibold text-blue-500 text-lg">
                    Hive-MQ Connection
                  </h1>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">MQTT End point :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[300px] md:w-[300px] text-gray-800 w-full px-2"
                      onChange={(e) => setNewEndPoint(e.target.value)}
                      value={newEndPoint}
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Username :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                      onChange={(e) => setNewUsernameBroker(e.target.value)}
                      value={newUsernameBroker}
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Password :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                      onChange={(e) => setNewPasswordBroker(e.target.value)}
                      value={newPasswordBroker}
                    />
                  </div>
                  <hr className="w-full mt-2 text-white" />
                </div>
              ) : newBroker == "adafruite" ? (
                <div className="grid gap-2">
                  <h1 className="font-semibold text-blue-500  text-lg">
                    Adafruit Connection
                  </h1>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">MQTT EndPiont :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[300px] md:w-[300px]  text-gray-800 px-2"
                      onChange={(e) => setNewEndPoint(e.target.value)}
                      value={newEndPoint}
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Username :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                      onChange={(e) => setNewUsernameBroker(e.target.value)}
                      value={newUsernameBroker}
                    />
                  </div>
                  <div className="grid lg:flex gap-2 text-white">
                    <label className="w-[140px]">Key :</label>
                    <input
                      type="text"
                      className="rounded-sm bg-gray-300 text-sm lg:w-[200px] md:w-[200px]  text-gray-800 px-2"
                      onChange={(e) => setNewPasswordBroker(e.target.value)}
                      value={newPasswordBroker}
                    />
                  </div>
                  <hr className="w-full mt-2 text-white" />
                </div>
              ) : (
                <div className="hidden"></div>
              )}
            </div>
            <div className="grid lg:flex gap-2 text-white">
              <label className="lg:w-[100px] ">Topic :</label>
              <input
                type="text"
                className=" px-3 bg-gray-600 lg:w-full w-[80%] rounded-sm"
                onChange={(e) => setNewTopic(e.target.value)}
                value={newTopic}
              />
            </div>
            {/* <hr className="w-full text-white"/> */}
            <div className="grid lg:flex gap-2 text-white">
              <label className="w-[100px] ">Port No :</label>
              <input
                type="text"
                className=" px-3 bg-gray-600 lg:w-full w-[80%]  rounded-sm"
              />
            </div>
            <div className="grid lg:flex justify-center items-center  w-full  gap-4 text-white">
              <label className="w-[150px] text-lg "> Device Name </label>
              <input
                type="text"
                className=" px-3 py-1 lg:w-full w-[70%]  bg-gray-900 text-blue-600 rounded-sm"
                onChange={(e) => setNewDeviceName(e.target.value)}
                value={newDeviceName}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-10 bg-blue-500 h-fit rounded-md py-1 text-white duration-500  hover:bg-blue-700"
              disabled={
                !newBroker || !newDeviceName || !newEndPoint || !newTopic
              }
              onClick={() => {
                setAddVerifyPopUp(true);
              }}
            >
              Add
            </button>
            <button
              className="px-10 bg-white h-fit text-gray-800 rounded-md py-1 duration-500   hover:bg-gray-600 hover:text-white"
              onClick={onCancelImport}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid place-items-center lg:px-10 px-2 w-full py-2">
        {devices && devices.length > 0 && isLoading == true ? (
          <div className="lg:w-full md:w-9/12 sm:w-9/12 w-full sm:px-10 lg:px-0 px-4 py-10 bg-gray-700 border-2 grid place-items-center border-dotted border-gray-500">
            <div className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 gap-8    w-fit">
              {devices?.map((item: ExternalDeviceModel) => (
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
                    href={"/products/" + "external" + "/" + item.deviceId}
                  >
                    <div className="w-full flex justify-center">
                      <div className="text-xl  font-bold bg-gray-800 rounded-xl shadow-sm px-5 py-1 w-4/5 text-center h-fit text-slate-300">
                        {item.broker.toUpperCase()}
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
                      <ExternalMqttProvider
                        topic_device={item.topic}
                        broker={item.broker}
                        connectPath={item.connectPath}
                        username={item.username}
                        password={item.password}
                      >
                        <ExternalDeviceStatus />
                      </ExternalMqttProvider>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : isLoading == true ? (
          <div className="grid text-white text-3xl  place-items-center w-full  py-20 bg-gray-700 mb-20 border-2 border-dashed border-gray-500">
            No Devices
          </div>
        ) : (
          <div className="grid text-white text-3xl  place-items-center w-full  py-20 bg-gray-700 mb-20 border-2 animate-pulse t border-dashed border-gray-500">
            Loading...
          </div>
        )}
      </div>
      {addVerifyPopUp && (
        <ImportExternalPopup
          onClosePopUp={setAddVerifyPopUp}
          userId={userId}
          broker={newBroker}
          topic={newTopic}
          connectPath={newEndPoint}
          name={newDeviceName}
          username={newUsernameBroker}
          password={newPasswordBroker}
        />
      )}
      {edit_popup && edit_id && edit_deviceId && (
        <EditExternalDevicePopUp
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
type ExternalImport = {
  broker: string;
  topic: string;
  userId: string;
  connectPath: string;
  name: string;
  username: string;
  password: string;
  onClosePopUp: (value: boolean) => void;
};
const ImportExternalPopup = ({
  onClosePopUp,
  userId,
  broker,
  topic,
  connectPath,
  name,
  username,
  password,
}: ExternalImport) => {
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const onSaveNewDevice = async () => {
    setSaveLoad(true);
    const deviceId = uuidv4();
    let status = "";
    const wifiId = uuidv4();
    const wifiConnect = "none";
    const wifiName = "Default";
    const wifiPassword = "12345678";
    const response1 = await fetch(`/api/importDevice`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        deviceId,
        userId,
        name,
        topic,
        broker,
        connectPath,
        username,
        password,
        status,
        wifiId,
        wifiConnect,
      }),
    });
    status = "none";
    const response2 = await fetch(`/api/wifi`, {
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
    if (response1.ok && response2) {
      toast.success("Import Success.");
      setSaveLoad(false);
      onClosePopUp(false);
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-800 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="z-50 w-[90%] lg:w-[400px] md:w-[300px] rounded-md grid bg-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-2 bg-gray-900 rounded-t-md text-white w-full flex justify-center">
          <h1 className="text-xl font-semibold">Confirm </h1>
        </div>
        <div className="px-10 py-5">
          <p className="text-sm text-white">
            To Import Device please check and comfirm to sure is your data
            connecton is correct information.
          </p>
        </div>
        <div className="flex pb-4 lg:gap-5 gap-2 justify-center  text-white">
          <button
            className="rounded-md hover:bg-blue-600 bg-blue-500 text-white py-1 w-[120px]"
            onClick={() => {
              onSaveNewDevice();
            }}
          >
            {saveLoad ? <p>Loading...</p> : <p>ConFirm</p>}
          </button>
          <button
            className="rounded-md hover:bg-gray-700 bg-gray-500 text-white py-1 w-[120px]"
            onClick={() => onClosePopUp(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
