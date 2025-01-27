import mongoose, { Schema } from "mongoose";

const chartSchema = new Schema(
  {
    id:String,
    deviceId:String,
    type:String,
    label:String,
    bgcolor:String,
    fgcolor:String,
    unit:String,
  },
  {
    timestamps: true,
  }
);

const Chart = mongoose.models.Chart || mongoose.model("Chart", chartSchema);

export default Chart;