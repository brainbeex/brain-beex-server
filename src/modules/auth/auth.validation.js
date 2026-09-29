import { z } from "zod";

// Validates that the request body contains a non-empty idToken string
export const createJwtSchema = z.object({
  idToken: z.string().min(1, "Firebase ID token is required"),
});
