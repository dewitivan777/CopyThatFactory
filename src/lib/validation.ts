import { z } from "zod";
import { capabilities } from "@/data/capabilities";

const capabilitySlugs = capabilities.map((c) => c.slug) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is a little long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(120, "That company name is a little long.")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),
  interest: z
    .enum([...capabilitySlugs, "not-sure"])
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least a sentence.")
    .max(2000, "That message is a bit long; please trim it down."),
  /**
   * Honeypot field — hidden from real users, so it should stay empty. We don't
   * reject it at the schema level: a filled value is handled in the API route,
   * which silently accepts the request without delivering anything, so bots
   * don't learn they've been filtered.
   */
  company_size: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
