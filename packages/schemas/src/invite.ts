import { z } from "zod";

export const inviteSendSchema = z.object({
  // Currently empty, but ready for adding email, etc.
});

export type InviteSendInput = z.infer<typeof inviteSendSchema>;
