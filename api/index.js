import app from "../src/app.js";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

const handler = async (req, res) => {
  console.log("🔥 FUNCTION START");

  await connectDB();
  console.log("✅ DB CONNECTED");

  return serverless(app)(req, res);
};

export default handler;