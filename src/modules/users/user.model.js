import { USER_ROLES } from "../../shared/constants.js";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    photoURL: String,

    mobileNumber: String,

    role: {
      type: String,
      // enum: ["user", "admin"],
      enum: [USER_ROLES.ADMIN, USER_ROLES.USER],
      // default: "user",
      default: USER_ROLES.USER,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);