// import app from "../src/app.js";
// import serverless from "serverless-http";
// import connectDB from "../src/config/db.js";

// let isReady = false;

// const init = async () => {
//   if (!isReady) {
//     console.log("🔥 Initializing server...");
//     await connectDB();
//     console.log("✅ MongoDB connected");
//     isReady = true;
//   }
// };

// const handler = serverless(app);

// export default async (req, res) => {
//   await init(); // connect ONLY once
//   return handler(req, res); // ❌ no await here
// };


// export default function handler(req, res) {
//   console.log("🔥 DIRECT FUNCTION HIT");

//   res.status(200).json({
//     status: "DIRECT_OK",
//   });
// }




// import app from "../src/app.js";
// import connectDB from "../src/config/db.js";

// export default async function handler(req, res) {
//   await connectDB();

//   return app(req, res); // ✅ NO serverless-http
// }


import app from "../src/app.js";
import connectDB from "../src/config/db.js";

export default async function handler(req, res) {
  // ✅ FORCE CORS HEADERS (CRITICAL FIX)
  res.setHeader("Access-Control-Allow-Origin", "https://brainbeex.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectDB();

  return app(req, res);
}