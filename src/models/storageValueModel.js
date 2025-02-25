import mongoose, { Schema } from "mongoose";

const StorageSchema = new Schema(
  {
    deviceId: { type: String, required: true },
    value: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const StorageValue =
  mongoose.models.StorageValue || mongoose.model("StorageValue", StorageSchema);

export default StorageValue;
