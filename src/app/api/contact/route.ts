import { NextResponse } from "next/server";
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
    // Reject if verification failed or score is too low (0 = bot, 1 = human).
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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  // If email delivery isn't configured yet, don't fail the user. Log the
  // submission so it can be picked up, and return success. Wire up Resend
  // (or any provider) by setting the env vars in .env.local — see .env.example.
  if (!apiKey || !toEmail || !fromEmail) {
    console.info("[contact] Email delivery not configured. Submission:\n", text);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't send your message. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Delivery failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
