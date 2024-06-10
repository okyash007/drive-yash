import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Image = mongoose.model("Image", imageSchema);

export default Image;
