import { inviteSendSchema } from "@streeio-core/schemas/invite";
import { publicProcedure, router } from "../index";
import { sendInviteEmail } from "../lib/email";

export const inviteRouter = router({
  send: publicProcedure.input(inviteSendSchema).mutation(async () => {
    console.log("Sending invite email...");
    try {
      const result = await sendInviteEmail(
        "tsyokeshs@gmail.com",
        "tsyokeshs@gmail.com",
        "tempPassword123"
      );
      console.log("sendInviteEmail result:", result);
      return { success: true, result };
    } catch (err) {
      console.error("invite.send error:", err);
      throw err;
    }
  }),
});
