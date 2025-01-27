import { connect } from "@/dbConfig/dbConfig";
import Chart from "../../../models/chartModel";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  const {
    id,
    type,
   label,
   bgcolor,
   fgcolor,
   unit,
   deviceId
  } = await request.json();

  await Chart.create({
    id,
    type,
   label,
   bgcolor,
   fgcolor,
   unit,
   deviceId
  });

  return NextResponse.json({ message: "Chart Created" }, { status: 201 });
}


export async function GET() {
  const chart = await Chart.find();
  return NextResponse.json(chart);
}