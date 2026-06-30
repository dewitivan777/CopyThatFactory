import {
  PenTool,
  Megaphone,
  FileText,
  Code2,
  Inbox,
} from "lucide-react";
import type { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    slug: "brand-design",
    index: "01",
    name: "Brand Design",
    summary:
      "Logo, colour, type, and visual guidelines that make ads, website, and print all look like one business.",
    description:
      "A brand system gives every touchpoint a shared visual language, so your ads, website, and printed material read as one credible business rather than three disconnected efforts. We design the identity and document it so it stays consistent as you grow.",
    deliverables: [
      "Logo design and usage rules",
      "Colour palette and typography system",
      "Visual guidelines document",
      "Templates for social, ads, and documents",
    ],
    icon: PenTool,
  },
  {
    slug: "ads-management",
    index: "02",
    name: "Ads Management",
    summary:
      "Google, Meta, and LinkedIn campaigns — strategy, setup, daily optimisation, and reporting you can actually read.",
    description:
      "We plan, launch, and manage paid campaigns across Google, Meta, and LinkedIn — then optimise them daily based on what's actually converting. Reporting is in plain language, so you always know what your spend is doing.",
    deliverables: [
      "Channel and audience strategy",
      "Campaign setup and tracking",
      "Daily optimisation and A/B testing",
      "Plain-language performance reporting",
    ],
    icon: Megaphone,
  },
  {
    slug: "copywriting",
    index: "03",
    name: "Copywriting",
    summary:
      "Website, SEO, and AEO copy that reads well for people and is structured so search engines and AI tools can find and cite it.",
    description:
      "Words that convert for readers and are structured so search engines and AI answer tools can surface and cite you. We write website pages, landing pages, and supporting content with both audiences in mind.",
    deliverables: [
      "Website and landing page copy",
      "SEO-structured content",
      "AEO structuring for AI answer tools",
      "Tone of voice guidelines",
    ],
    icon: FileText,
  },
  {
    slug: "web-app-builds",
    index: "04",
    name: "Web & App Builds",
    summary:
      "Bespoke websites and web apps, from a single landing page to custom tools — built to support whatever the marketing is doing.",
    description:
      "Fast, mobile-first websites and bespoke web apps — from a single landing page to custom internal tools. Everything is built to support the marketing around it, not to sit in isolation.",
    deliverables: [
      "Bespoke website and web app builds",
      "Mobile-first, fast-loading pages",
      "CMS or custom tooling as needed",
      "Analytics and conversion tracking",
    ],
    icon: Code2,
  },
  {
    slug: "admin-support",
    index: "05",
    name: "Admin Support",
    summary:
      "Inbox, calendar, invoicing, and lead follow-up handled so campaigns don't go cold waiting on a reply.",
    description:
      "The recurring admin no one has time for — inbox, calendar, invoicing, and lead follow-up — handled daily so the leads your campaigns generate don't go cold waiting on a reply.",
    deliverables: [
      "Inbox and calendar management",
      "Lead follow-up and qualification",
      "Invoicing and recurring reporting",
      "Upkeep of ads, content, and site",
    ],
    icon: Inbox,
  },
];

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}

export function getCapabilities(slugs: string[]): Capability[] {
  return slugs
    .map((slug) => getCapability(slug))
    .filter((c): c is Capability => Boolean(c));
}
