import mongoose, { Schema } from "mongoose";

const externalDeviceSchema = new Schema(
  {
    deviceId: String,
    userId: String,
    name: String,
    topic: String,
    broker: String,
    connectPath: {
      type: String,
      default: "", 
    },
    username: String,
    password: String,
    status: String,
    wifiId: String,
    wifiConnect: String,
  },
  {
    timestamps: true,
  }
);
const ExternalDevice =
  mongoose.models.ExternalDevice ||
  mongoose.model("ExternalDevice", externalDeviceSchema);

export default ExternalDevice;
