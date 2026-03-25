// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" }); 

// console.log("ENV CHECK:", process.env.FIREBASE_PROJECT_ID);

import "dotenv/config";

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    
    
  })
  .catch((err) => {
    console.error(err);
  });

