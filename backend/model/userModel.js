import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    drive: { type: mongoose.Schema.Types.ObjectId, ref: "Drive" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
