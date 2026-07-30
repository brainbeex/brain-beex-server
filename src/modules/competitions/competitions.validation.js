import { z } from "zod";

export const createCompetitionSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(5, "Title must be at least 5 characters long"),
  description: z.string({ required_error: "Description is required" }).min(20, "Description must be at least 20 characters long"),
  organizer: z.string({ required_error: "Organizer name is required" }),
  deadline: z.string({ required_error: "Deadline date is required" }).datetime({ message: "Invalid ISO date string" }),
});
