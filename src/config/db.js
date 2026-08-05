import mongoose from "mongoose";
import { env } from "./env.js"; 

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    throw error;
  }
};

export default connectDB;
