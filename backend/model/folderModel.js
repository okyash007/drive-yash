import mongoose from "mongoose";

const foderSchema = new mongoose.Schema(
  {
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    type: {
      type: String,
      enum: ["root", "content"],
      default: "content",
    },
    parent_folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    sub_folder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", foderSchema);

export default Folder;
