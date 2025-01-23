import { connect } from "@/dbConfig/dbConfig";
import Device from "../../../../models/deviceModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  await connect();
  const { userId } = await params;
  const devices = await Device.find({ userId: userId });
  if (!devices){
    return NextResponse.json({message:"Not Found"}, { status: 200 })
  }
  return NextResponse.json(devices, { status: 200 });
}

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }
