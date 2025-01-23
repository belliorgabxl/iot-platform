import mongoose, { Schema } from "mongoose";

const buttonSchema = new Schema(
  {
    deviceId:String,
    type:String,
    category:String,
    label:String,
    command:String,
  },
  {
    timestamps: true,
  }
);

const Button = mongoose.models.Button || mongoose.model("Button", buttonSchema);

export default Button;