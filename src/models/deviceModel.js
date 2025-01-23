import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema(
  {
    deviceId:String,
    userId:String,
    name:String,
    topic:String,
    type:String,
    password:String,
    status:String,
    wifiId:String,
    wifiConnect:String
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);

export default Device;