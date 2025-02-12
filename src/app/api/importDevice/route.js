import { connect } from "@/dbConfig/dbConfig";
import ExternalDevice from "../../../models/externalDeviceModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  const { deviceId,
    userId,
    name,
    topic,
    broker,
    connectPath,
    username,
    password,
    status,
    wifiId,
    wifiConnect,} = await request.json();

  await ExternalDevice.create({deviceId,
    userId,
    name,
    topic,
    broker,
    connectPath,
    username,
    password,
    status,
    wifiId,
    wifiConnect,});
    console.log("Request Body:", {
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
      });
      

  return NextResponse.json({ message: "Create Success" }, { status: 201 });
}

export async function GET() {
  const devices = await ExternalDevice.find();
  return NextResponse.json(devices);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await ExternalDevice.findByIdAndDelete(id);
  return NextResponse.json({ message: "Device deleted" }, { status: 200 });
}
