import { z } from "zod";

export const todoCreateSchema = z.object({
  text: z.string().min(1, "Text must be at least 1 character"),
});

export const todoToggleSchema = z.object({
  id: z.number(),
  completed: z.boolean(),
});

export const todoDeleteSchema = z.object({
  id: z.number(),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;
export type TodoToggleInput = z.infer<typeof todoToggleSchema>;
export type TodoDeleteInput = z.infer<typeof todoDeleteSchema>;
