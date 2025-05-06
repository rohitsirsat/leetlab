import { Resend } from "resend";
import { generateVerificationEmail } from "./emailTemplates/verification-email.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, username, verifyUrl) {
  const { html, text } = generateVerificationEmail(username, verifyUrl);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html,
      text,
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
