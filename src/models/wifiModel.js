import mongoose, { Schema } from "mongoose";

const wifiSchema = new Schema(
  {
    wifiId:String,
    wifiName:String,
    wifiPassword:String,
    status:String
  },
  {
    timestamps: true,
  }
);

const Wifi = mongoose.models.Wifi || mongoose.model("Wifi", wifiSchema);

export default Wifi;