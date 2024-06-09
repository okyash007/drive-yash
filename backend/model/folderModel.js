import mongoose from "mongoose";
import { imageSchema } from "./imageModel.js";


const foderSchema = new mongoose.Schema(
  {
    images: [imageSchema],
    subfolder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", foderSchema);

export default Folder;
