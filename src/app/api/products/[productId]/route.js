import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

export async function GET(request, { params }) {
  await connect();
  const { productId } = await params;

  const product = await Product.findOne({ productId: productId });

  if (!product) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(product, { status: 200 });
}

export async function PUT(request, { params }) {
  await connect();
  const { productId } = await params;
  const { newOwnerStatus: ownerStatus } = await request.json();

  const updatedProduct = await Product.findOneAndUpdate(
    { productId },
    { ownerStatus },
    { new: true }
  );
  
  if (!updatedProduct) {
    return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Product updated", product: updatedProduct },
    { status: 200 }
  );
}
