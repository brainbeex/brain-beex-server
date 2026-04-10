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

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/applications", applicationRoutes);

// health route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// error handler
app.use(errorHandler);

export default app;



// // middlewares
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://brainbeex.netlify.app"
//   ],
//   credentials: true
// }));


// // ✅ Manual headers (SECOND — IMPORTANT for Vercel)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://brainbeex.netlify.app");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://brainbeex.netlify.app",
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });
