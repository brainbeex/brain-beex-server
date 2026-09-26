import mongoose from "mongoose";
import env from "./env.js"; // 1. Imported env as a default export

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    
    // 2. Replaced process.env.MONGO_URI with validated env object
    await mongoose.connect(env.MONGO_URI);
    
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    throw error;
  }
};

export default connectDB;
