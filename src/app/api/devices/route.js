import { connect } from "@/dbConfig/dbConfig";
import Device from "@/models/deviceModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  const {
    deviceId,
    userId,
    name,
    topic,
    type,
    password,
    status,
    wifiId,
    wifiConnect,
  } = await request.json();

  await Device.create({
    deviceId,
    userId,
    name,
    topic,
    type,
    password,
    status,
    wifiId,
    wifiConnect,
  });

  return NextResponse.json({ message: "Device Created" }, { status: 201 });
}

export async function GET() {
  const devices = await Device.find();
  return NextResponse.json(devices);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Device.findByIdAndDelete(id);
  return NextResponse.json({ message: "Device deleted" }, { status: 200 });
}
// try {
//   const res = await fetch("http://localhost:3000/api/topics", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ title, description }),
//   });

//   if (res.ok) {
//     router.push("/");
//   } else {
//     throw new Error("Failed to create a topic");
//   }
// } catch (error) {
//   console.log(error);
// }
// };
