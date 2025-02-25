import { connect } from "@/dbConfig/dbConfig";
import ExternalDevice from "@/models/externalDeviceModel";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  await connect();
  const { deviceId } = await params;
  const devices = await ExternalDevice.findOne({ deviceId: deviceId });
  if (!devices) {
    return NextResponse.json({ message: "Not Found" }, { status: 200 });
  }
  return NextResponse.json(devices, { status: 200 });
}
export async function PUT(request, { params }) {
  try {
    await connect();
    const { deviceId } = params;
    const { name } = await request.json();

    const updatedDevice = await ExternalDevice.findOneAndUpdate(
      { deviceId: deviceId },
      { $set: { name: name } },
      { new: true }
    );

    if (updatedDevice) {
      return new Response(
        JSON.stringify({ success: true, data: updatedDevice }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Device not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
export async function DELETE(request, { params }) {
  await connect();
  const { deviceId } = await params;
  await ExternalDevice.deleteOne({ deviceId: deviceId });
  return NextResponse.json({ message: "Delete Success" }, { status: 200 });
}

