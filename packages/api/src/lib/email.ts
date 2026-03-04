import InvitationEmail from "@streeio-core/emails/invitation-email";
import { env } from "@streeio-core/env/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

const FROM_EMAIL = "Proptech <onboarding@resend.dev>";
// const FROM_EMAIL = "Proptech <tsyokeshs@gmail.com>";

export async function sendInviteEmail(
  to: string,
  userEmail: string,
  tempPassword: string
) {
  console.log("Sending invite email to:", to);
  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "You're invited to Proptech",
      react: InvitationEmail({
        userEmail,
        tempPassword,
      }),
    });
    console.log("Resend send result:", res);
    return res;
  } catch (err) {
    console.error("Resend send error:", err);
    throw err;
  }
}
