import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  label: z.string(),
  done: z.boolean().optional(),
});
