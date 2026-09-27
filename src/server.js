import env from "./config/env.js"; // 1. Imported env config at line 1 (using default export)
import app from "./app.js";
import connectDB from "./config/db.js";

// 2. Transformed the port lookup to rely on our validated configuration settings
const PORT = Number(env.PORT);

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
