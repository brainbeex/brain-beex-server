import { z } from "zod";
import dotenv from "dotenv";

// Load the .env file variables
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  MONGO_URI: z.string({ required_error: "MONGO_URI is missing from your environment variables" }).url(),
  JWT_SECRET: z.string({ required_error: "JWT_SECRET is missing from your environment variables" }).min(10, "JWT_SECRET must be at least 10 characters long"),
  // Add your Firebase configurations here as well if needed
});

// Run validation safely
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error("Invalid environment configuration options:");
  envParse.error.errors.forEach((err) => {
    console.error(`[${err.path.join(".")}]: ${err.message}`);
  });
  process.exit(1); // Force terminate server immediately due to misconfiguration
}

export const env = envParse.data;
