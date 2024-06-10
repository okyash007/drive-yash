import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    path: {
      type: String,
      required: true,
    },
    parent_folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  },
  { timestamps: true }
);
const Image = mongoose.model("Image", imageSchema);

export default Image;
