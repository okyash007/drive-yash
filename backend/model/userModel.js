import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    root_folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
