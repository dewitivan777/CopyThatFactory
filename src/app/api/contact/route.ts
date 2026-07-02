import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validation";
import { capabilities } from "@/data/capabilities";

export const runtime = "nodejs";

function interestLabel(value?: string): string {
  if (!value || value === "not-sure")
    return "Not sure yet — wants help working out what they need";
  return capabilities.find((c) => c.slug === value)?.name ?? value;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: a filled hidden field means a bot. Accept silently so the bot
  // thinks it succeeded, but don't deliver anything.
  if (data.company_size) {
    return NextResponse.json({ ok: true });
  }

  // reCAPTCHA v3 verification — only runs when a secret key is configured.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    const token = (payload as Record<string, unknown>).recaptchaToken;
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "reCAPTCHA verification required." }, { status: 400 });
    }
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`,
      { method: "POST" },
    );
    const verifyData = await verifyRes.json() as { success: boolean; score: number; action: string };
    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: "reCAPTCHA check failed. Please try again." }, { status: 400 });
    }
  }

  const subject = `New enquiry from ${data.name}${
    data.company ? ` (${data.company})` : ""
  }`;
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.website ? `Website: ${data.website}` : null,
    `Interested in: ${interestLabel(data.interest)}`,
    "",
    "Message:",
    data.message,
  ].filter(Boolean);
  const text = lines.join("\n");

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail  = process.env.CONTACT_TO_EMAIL;

  // If SMTP isn't configured, log the submission and return success so the
  // user isn't blocked. Set the env vars in .env.production to enable delivery.
  if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
    console.info("[contact] SMTP not configured. Submission:\n", text);
    return NextResponse.json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(process.env.SMTP_PORT ?? "465", 10),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `"Copy That" <${smtpUser}>`,
      to: toEmail,
      replyTo: data.email,
      subject,
      text,
    });
  } catch (err) {
    console.error("[contact] SMTP delivery failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
