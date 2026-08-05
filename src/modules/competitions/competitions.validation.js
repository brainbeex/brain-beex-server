import { z } from "zod";

export const createCompetitionSchema = z.object({
  title: z.string({ required_error: "Title is required" }).trim().min(5, "Title must be at least 5 characters long"),
  description: z.string({ required_error: "Description is required" }).trim().min(20, "Description must be at least 20 characters long"),
  organizer: z.string({ required_error: "Organizer name is required" }).trim().min(3, "Organizer name is required"),
  prize: z.string().optional().default(""),
  category: z.string().optional().default("general"),
  deadline: z.string({ required_error: "Deadline date is required" }).datetime({ message: "Invalid ISO date string" }),
});

// Rule for PATCH /competitions/:id (All fields are optional because updates can be partial)
export const updateCompetitionSchema = createCompetitionSchema.partial();
