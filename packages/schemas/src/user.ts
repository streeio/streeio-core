import { z } from "zod";

export const userBanSchema = z.object({
  userId: z.string(),
  banReason: z.string().optional(),
});

export const userUnbanSchema = z.object({
  userId: z.string(),
});

export type UserBanInput = z.infer<typeof userBanSchema>;
export type UserUnbanInput = z.infer<typeof userUnbanSchema>;
