
import app from "../src/app.js";
import serverless from "serverless-http";
import connectDB from "../src/config/db.js";

const handler = async (req, res) => {
  await connectDB(); // 🔥 VERY IMPORTANT
  return serverless(app)(req, res);
};

export default handler;



// import app from "../src/app.js";
// import serverless from "serverless-http";

// export default serverless(app);