import { connect } from "@/dbConfig/dbConfig";
import Product from "../../../models/productModel";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  const { productId, type, topic, password, ownerStatus} =
    await request.json();

  await Product.create({
    productId,
    type,
    topic,
    password,
    ownerStatus,
  });

  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET() {
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Products deleted" }, { status: 200 });
}
