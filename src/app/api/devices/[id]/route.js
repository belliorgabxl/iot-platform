import { connect } from "@/dbConfig/dbConfig";
import Device from "@/models/deviceModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connect();
  const { id } = await params;

  const devices = await Device.findOne({ deviceId: id });

  return NextResponse.json(devices, { status: 200 });
}

export async function PUT(request, { params }) {
  await connect();
  const { id } = await params;

  await Device.updateOne({ deviceId: id });

  return NextResponse.json({ message: "Update Success" }, { status: 200 });
}

export async function DELETE(request, { params }) {
  await connect();
  const { id } = await params;
  await Device.deleteOne({ _id: id });
  return NextResponse.json({ message: "Delete Success" }, { status: 200 });
}

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }
