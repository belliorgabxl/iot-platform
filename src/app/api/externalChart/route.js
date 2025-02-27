import { connect } from "@/dbConfig/dbConfig";
import ExternalChart from "../../../models/externalChartModel";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  const { id, type, value, label, bgcolor, fgcolor, unit, deviceId } =
    await request.json();

  await ExternalChart.create({
    id,
    type,
    label,
    value,
    bgcolor,
    fgcolor,
    unit,
    deviceId,
  });

  return NextResponse.json(
    { message: "ExternalChart Created" },
    { status: 201 }
  );
}

export async function GET() {
  const chart = await ExternalChart.find();
  return NextResponse.json(chart);
}
