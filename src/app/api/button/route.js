import { connect } from "@/dbConfig/dbConfig";
import Button from "../../../models/buttonModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  const {
    id,
    type,
    category,
    label,
    command,
    deviceId,
  } = await request.json();

  await Button.create({
    id,
    type,
    category,
    label,
    command,
    deviceId,
  });

  return NextResponse.json({ message: "Button Created" }, { status: 201 });
}

export async function GET() {
  const devices = await Button.find();
  return NextResponse.json(devices);
}