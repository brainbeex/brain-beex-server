import { z } from "zod";

// Strengthened Zod schema reflecting the required MongoDB application model constraints
export const createApplicationSchema = z.object({
  competitionId: z
    .string({ required_error: "Competition ID is required" })
    .min(1, "Competition ID is required"),

  submissionLink: z
    .string({ required_error: "Submission link is required" })
    .url("Submission link must be a valid URL"),

  message: z
    .string()
    .max(2000, "Message must be at most 2000 characters")
    .optional(),
});
