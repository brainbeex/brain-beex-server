import { z } from "zod";

export const createApplicationSchema = z.object({
  competitionId: z.string({ required_error: "Competition ID is required" }).min(1),
  // Additional dynamic properties from user inputs can go here
});
