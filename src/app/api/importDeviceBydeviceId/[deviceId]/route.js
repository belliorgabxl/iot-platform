import { connect } from "@/dbConfig/dbConfig";
import ExternalDevice from "@/models/externalDeviceModel";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  await connect();
  const { deviceId } = await params;
  const devices = await ExternalDevice.find({ deviceId: deviceId });
  if (!devices){
    return NextResponse.json({message:"Not Found"}, { status: 200 })
  }
  return NextResponse.json(devices, { status: 200 });
}
export async function DELETE(request, { params }) {
    await connect();
    const { id } = await params;
    await ExternalDevice.deleteOne({ _id: id });
    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  }