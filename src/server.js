import { env } from "./config/env.js"; 
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = env.PORT;

// Establish database hookups and launch server listener cleanly
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server processing operations in [${env.NODE_ENV}] mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup critical failure:", error);
    process.exit(1);
  }
};

startServer();
