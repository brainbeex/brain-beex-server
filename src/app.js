import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import competitionRoutes from "./modules/competitions/competitions.routes.js";
import applicationRoutes from "./modules/applications/applications.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// ✅ CORS FIRST (VERY IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://brainbeex.netlify.app",
    ],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("BrainBeex Server Running 🚀");
});


// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/applications", applicationRoutes);

// health route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// error handler
app.use(errorHandler);

export default app;

