import { connect } from "@/dbConfig/dbConfig";
import Wifi from "../../../models/wifiModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  const { wifiId, wifiName, wifiPassword, status } = await request.json();
  await Wifi.create({
    wifiId,
    wifiName,
    wifiPassword,
    status,
  });
  return NextResponse.json({ message: "Wi-fi Created" }, { status: 201 });
}

export async function GET() {
  await connect();
  const wifi = await Wifi.find();
  return NextResponse.json(wifi);
}

export async function DELETE(request) {
  await connect();
  const id = await request.nextUrl.searchParams.get("id");

  await Wifi.findByIdAndDelete(id);
  return NextResponse.json({ message: "wifi deleted" }, { status: 200 });
}
