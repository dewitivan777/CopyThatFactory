"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { capabilities } from "@/data/capabilities";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-base border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[0.82rem] font-semibold text-ink"
    >
      {children}
      {optional && (
        <span className="ml-1 font-normal text-ink-soft">(optional)</span>
      )}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[0.8rem] text-amber">
      <AlertCircle size={13} aria-hidden="true" />
      {message}
    </p>
  );
}

interface ContactFormProps {
  /** Preselects the "What can we help with?" dropdown (from ?interest=). */
  defaultInterest?: ContactFormValues["interest"];
}

/**
 * Inject the reCAPTCHA v3 script on demand and resolve once it's ready. We load
 * it lazily — on first form interaction rather than site-wide — so reCAPTCHA's
 * third-party cookies aren't set on pages (or visits) that never submit a form.
 */
let recaptchaPromise: Promise<void> | null = null;
function loadRecaptcha(): Promise<void> {
  if (!siteConfig.recaptchaSiteKey || typeof window === "undefined") {
    return Promise.resolve();
  }
  if (recaptchaPromise) return recaptchaPromise;

  recaptchaPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById("recaptcha-v3");
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "recaptcha-v3";
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteConfig.recaptchaSiteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      recaptchaPromise = null;
      reject(new Error("Failed to load reCAPTCHA."));
    };
    document.head.appendChild(script);
  });
  return recaptchaPromise;
}

export function ContactForm({ defaultInterest }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const recaptchaTriggered = useRef(false);

  /** Begin loading reCAPTCHA the first time the user touches the form. */
  function primeRecaptcha() {
    if (recaptchaTriggered.current) return;
    recaptchaTriggered.current = true;
    loadRecaptcha().catch(() => {
      // Ignore here; submit re-attempts and surfaces any error to the user.
    });
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interest: defaultInterest ?? "not-sure" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setServerError(null);

    // Obtain a reCAPTCHA v3 token if the site key is configured. The script is
    // loaded lazily, so make sure it's ready before requesting a token.
    let recaptchaToken: string | undefined;
    if (siteConfig.recaptchaSiteKey && typeof window !== "undefined") {
      try {
        await loadRecaptcha();
        recaptchaToken = await new Promise<string>((resolve) =>
          window.grecaptcha.ready(async () => {
            const token = await window.grecaptcha.execute(
              siteConfig.recaptchaSiteKey,
              { action: "contact" },
            );
            resolve(token);
          }),
        );
      } catch {
        setStatus("error");
        setServerError(
          "We couldn't load spam protection. Please try again, or email us directly.",
        );
        return;
      }
    }

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          event_category: "contact_form",
          event_label: values.interest ?? "not-sure",
        });
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[10px] border border-rule bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-blue" size={40} />
        <h3 className="text-[1.3rem]">Thanks — we&apos;ve got it.</h3>
        <p className="mx-auto mt-2 max-w-[360px] text-ink-soft">
          We&apos;ll review what you sent and get back to you within one working
          day with a straight read on where to start.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[0.9rem] font-semibold text-blue-deep underline-offset-2 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={primeRecaptcha}
      noValidate
      className="rounded-[10px] border border-rule bg-white p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={cn(fieldBase, errors.name ? "border-amber" : "border-rule")}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={cn(fieldBase, errors.email ? "border-amber" : "border-rule")}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="company" optional>
            Company
          </Label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={cn(fieldBase, "border-rule")}
            {...register("company")}
          />
        </div>

        <div>
          <Label htmlFor="website" optional>
            Website
          </Label>
          <input
            id="website"
            type="text"
            inputMode="url"
            placeholder="yourbusiness.co.za"
            className={cn(fieldBase, "border-rule")}
            {...register("website")}
          />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="interest">What can we help with?</Label>
        <select
          id="interest"
          className={cn(fieldBase, "border-rule")}
          {...register("interest")}
        >
          <option value="not-sure">
            I&apos;m not sure yet — help me work out what I need
          </option>
          {capabilities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">What&apos;s going on?</Label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us what's not working — your website, your ads, the admin load, or all of it."
          className={cn(
            fieldBase,
            "resize-y",
            errors.message ? "border-amber" : "border-rule",
          )}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Honeypot — visually hidden, ignored by humans, catches bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_size">Company size</label>
        <input
          id="company_size"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_size")}
        />
      </div>

      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 rounded-base bg-amber/10 px-3.5 py-2.5 text-[0.85rem] text-amber">
          <AlertCircle size={15} aria-hidden="true" />
          {serverError ?? "Something went wrong. Please try again."}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
