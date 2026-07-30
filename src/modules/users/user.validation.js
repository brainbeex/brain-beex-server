import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters"),
  email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  photoURL: z.string().url("Invalid photo URL format").optional().or(z.literal("")),
  mobileNumber: z.string().optional(),
});
