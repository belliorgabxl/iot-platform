import { connect } from "@/dbConfig/dbConfig";
import storageValueModel from "@/models/storageValueModel.js";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  await connect();
  const { deviceId } = await params;
  const data = await storageValueModel.findOne({ deviceId: deviceId });
  if (!data) {
    return NextResponse.json({ message: "Not Found" }, { status: 200 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request, { params }) {
  await connect();
  const { deviceId } = await params;
  await storageValueModel.deleteOne({ deviceId: deviceId });
  return NextResponse.json({ message: "Delete Success" }, { status: 200 });
}

export async function PATCH(request, { params }) {
  await connect();
  const { deviceId } = params;
  const { newValue } = await request.json();

  if (!newValue) {
    return NextResponse.json(
      { message: "newValue is required" },
      { status: 400 }
    );
  }

  try {
    const updatedData = await storageValueModel.findOneAndUpdate(
      { deviceId },
      { $push: { value: newValue } },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
