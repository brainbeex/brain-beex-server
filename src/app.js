import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import competitionRoutes from "./modules/competitions/competitions.routes.js";
// import applicationRoutes from "./modules/applications/applications.routes.js";
import applicationRoutes from "./modules/applications/applications.routes.js"

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);

// router.use("/applications", applicationRoutes);
app.use("/api/applications", applicationRoutes);

// health route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use(errorHandler);

export default app;