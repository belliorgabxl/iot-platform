import { connect } from "@/dbConfig/dbConfig";
import Device from "../../../../models/deviceModel";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
  await connect();
  const { _id } = await params;
  const { name } = await request.json();
  const updateDeviceName = await Device.findOneAndUpdate(
    { _id },
    { name }
  );
  if (!updateDeviceName) {
    return NextResponse.json({ message: "Name Not Found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Name updated"},
    { status: 200 }
  );
}
