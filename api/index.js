import app from "../src/app.js";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

let isReady = false;

const init = async () => {
  if (!isReady) {
    console.log("🔥 Initializing server...");
    await connectDB();
    console.log("✅ MongoDB connected");
    isReady = true;
  }
};

const handler = serverless(app);

export default async (req, res) => {
  await init(); // connect ONLY once
  return handler(req, res); // ❌ no await here
};