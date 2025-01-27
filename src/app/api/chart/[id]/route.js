import { connect } from "@/dbConfig/dbConfig";
import Chart from "@/models/chartModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connect();
  const { id } = await params;
  const chart = await Chart.find({ deviceId: id });
  if (!chart) {
    return NextResponse.json({ message: "Not Found" }, { status: 200 });
  }
  return NextResponse.json(chart, { status: 200 });
}

export async function DELETE(request, { params }) {
  await connect();
  const { id } = await params;
  await Chart.deleteOne({ _id: id });
  return NextResponse.json(
    { message: "Delete Chart Success" },
    { status: 200 }
  );
}
