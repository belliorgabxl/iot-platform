import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productId:String,
    type:String,
    topic:String,
    password:String,
    ownerStatus:Boolean
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;