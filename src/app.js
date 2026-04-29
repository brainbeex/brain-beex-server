import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import competitionRoutes from "./modules/competitions/competitions.routes.js";
import applicationRoutes from "./modules/applications/applications.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://brainbeex.netlify.app",
];

// ✅ CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Preflight handling (Step 2)
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Vercel edge fix (Step 3)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Middlewares
app.use(express.json());
app.use(morgan("dev"));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("BrainBeex Server Running 🚀");
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/applications", applicationRoutes);

// ✅ Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// ✅ Error handler (must be last)
app.use(errorHandler);

export default app;