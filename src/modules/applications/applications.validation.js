import { z } from "zod";

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

export const updateApplicationSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]).optional(),

  reviewNote: z
    .string()
    .max(2000, "Review note must be at most 2000 characters")
    .optional(),
});