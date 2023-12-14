import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isCritical: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
