import mongoose, { Schema } from "mongoose";

const ExternalChartSchema = new Schema(
  {
    id: String,
    deviceId: String,
    type: String,
    value: { type: Array, required: true },
    label: { type: Array, required: true },
    bgcolor: { type: Array, required: true },
    fgcolor: { type: Array, required: true },
    unit: String,
  },
  {
    timestamps: true,
  }
);

const ExternalChart =
  mongoose.models.ExternalChart ||
  mongoose.model("ExternalChart", ExternalChartSchema);

export default ExternalChart;
