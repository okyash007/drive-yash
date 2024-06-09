import mongoose from "mongoose";
import { imageSchema } from "./imageModel.js";

const driveSchema = new mongoose.Schema(
  {
    images: [imageSchema],
    folder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Drive = mongoose.model("Drive", driveSchema);

export default Drive;
