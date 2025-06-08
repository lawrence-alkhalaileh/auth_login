import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerMail(req, res) {
  const { username, userEmail, text, subject } = req.body;

  if (!username || !userEmail) {
    return res.status(400).json({ error: "Missing username or email." });
  }

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">👋 Hello, Bitch!</h2>
        <p style="font-size: 16px; color: #555;">
          "Welcome aboard! We're thrilled to have you join us.
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 14px; color: #888;">
          Need help? Just reply to this email and we’ll be in touch!
        </p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lorans0alkhalailah@gmail.com",
      subject: subject || "Welcome to Acme! 🎉",
      html: emailHTML,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
