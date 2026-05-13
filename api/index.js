import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let isConnected = false;

export default async function handler(req, res) {
  try {
    // connect DB only once
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB Connected");
    }

    return app(req, res);
  } catch (error) {
    console.error("❌ API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}