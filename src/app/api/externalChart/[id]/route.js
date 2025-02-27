import { connect } from "@/dbConfig/dbConfig";
import ExternalChart from "@/models/externalChartModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connect();
  const { id } = await params;
  const chart = await ExternalChart.find({ deviceId: id });
  if (!chart) {
    return NextResponse.json({ message: "Not Found" }, { status: 200 });
  }
  return NextResponse.json(chart, { status: 200 });
}

export async function DELETE(request, { params }) {
  await connect();
  const { id } = await params;
  await ExternalChart.deleteOne({ _id: id });
  return NextResponse.json(
    { message: "Delete Chart Success" },
    { status: 200 }
  );
}
