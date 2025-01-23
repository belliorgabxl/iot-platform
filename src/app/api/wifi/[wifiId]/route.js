import { connect } from "@/dbConfig/dbConfig";
import Wifi from "../../../../models/wifiModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connect();
  const { wifiId } = await params;
  const wifi = await Wifi.findOne({ wifiId: wifiId });

  return NextResponse.json(wifi, { status: 200 });
}

export async function PUT(request, { params }) {
  await connect();
  const { wifiId } = await params;
  const {
    newWifiName: wifiName,
    newWifiPassword: wifiPassword,
    newStatus: status,
  } = await request.json();

  await Wifi.findByIdAndUpdate(wifiId, {
    wifiName,
    wifiPassword,
    status,
  });
  return NextResponse.json({ message: "Wi-fi Updated." }, { status: 200 });
}
// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }
