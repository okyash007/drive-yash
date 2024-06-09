import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
