// import { z } from "zod";
// import dotenv from "dotenv";

// // Load the .env file variables
// dotenv.config();

// const envSchema = z.object({
//   NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
//   PORT: z.string().default("5000"),
//   MONGO_URI: z.string({ required_error: "MONGO_URI is missing from your environment variables" }).url(),
//   JWT_SECRET: z.string({ required_error: "JWT_SECRET is missing from your environment variables" }).min(10, "JWT_SECRET must be at least 10 characters long"),
//   FIREBASE_PROJECT_ID: z.string({ required_error: "FIREBASE_PROJECT_ID is missing from your environment variables" }),
//   FIREBASE_CLIENT_EMAIL: z.string({ required_error: "FIREBASE_CLIENT_EMAIL is missing from your environment variables" }).email(),
//   FIREBASE_PRIVATE_KEY: z.string({ required_error: "FIREBASE_PRIVATE_KEY is missing from your environment variables" }),
// });

// // Run validation safely
// const envParse = envSchema.safeParse(process.env);

// if (!envParse.success) {
//   console.error("❌ Invalid environment configuration options:");
//   envParse.error.errors.forEach((err) => {
//     console.error(`   👉 [${err.path.join(".")}]: ${err.message}`);
//   });
//   process.exit(1); // Force terminate server immediately due to misconfiguration
// }

// export const env = envParse.data;



import dotenv from "dotenv";
import { z } from "zod";

// Load the raw .env file values into process.env
dotenv.config();

// Create the strict configuration blueprint schema
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .default("5000"),
  MONGO_URI: z
    .string()
    .min(1, "MONGO_URI is required"),
  JWT_SECRET: z
    .string()
    .min(10, "JWT_SECRET must be at least 10 characters"),
  FIREBASE_PROJECT_ID: z
    .string()
    .min(1, "FIREBASE_PROJECT_ID is required"),
  FIREBASE_CLIENT_EMAIL: z
    .string()
    .email("FIREBASE_CLIENT_EMAIL must be a valid email"),
  FIREBASE_PRIVATE_KEY: z
    .string()
    .min(1, "FIREBASE_PRIVATE_KEY is required"),
});

// Run validation safely using safeParse to print readable layout errors before crashing
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1); // Safely prevent server from running with invalid config
}

// const env = parsed.data;

// // Export as default export as required by your mentor's blueprint style
// export default env;

// Export BOTH ways so your existing files and your mentor's blueprint both work!
export const env = parsed.data; // Works for import { env }
export default env;             // Works for import env (Mentor style)

