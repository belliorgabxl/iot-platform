import { connect } from "@/dbConfig/dbConfig";
import StorageValue from "@/models/storageValueModel.js";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { deviceId, value } = await request.json();
    if (!deviceId || !value) {
      return NextResponse.json(
        { message: "deviceId and value are required" },
        { status: 400 }
      );
    }

    const newDoc = await StorageValue.create({ deviceId, value });
    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
    try {
      const docs = await StorageValue.find();
      return NextResponse.json(docs, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
export async function PUT(request) {
  try {
    const { id, value } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const updatedDoc = await StorageValue.findByIdAndUpdate(
      id,
      { value },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
