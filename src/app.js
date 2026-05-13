import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import competitionRoutes from "./modules/competitions/competitions.routes.js";
import applicationRoutes from "./modules/applications/applications.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// ✅ Allowed frontend domains
const allowedOrigins = [
  "http://localhost:5173",
  "https://brainbeex.netlify.app",
];

// ✅ ONLY ONE CORS CONFIG
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight
app.options("*", cors());

// ✅ Middlewares
app.use(express.json());
app.use(morgan("dev"));

// ✅ Root
app.get("/", (req, res) => {
  res.send("BrainBeex Server Running 🚀");
});

// ✅ Health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/applications", applicationRoutes);

// ✅ Error handler
app.use(errorHandler);

export default app;