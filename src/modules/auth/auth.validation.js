import { z } from "zod";

export const loginSchema = z.object({
  idToken: z.string({ required_error: "Firebase ID token is required" }).min(1),
});
