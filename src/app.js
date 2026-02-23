import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRoutes);
app.use(errorHandler);

// health route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;