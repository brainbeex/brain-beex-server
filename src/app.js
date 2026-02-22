import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;