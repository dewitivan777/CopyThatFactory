import {
  Code2,
  PenTool,
  FileText,
  Megaphone,
  Share2,
  Inbox,
} from "lucide-react";
import type { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    slug: "web-app-builds",
    index: "01",
    name: "Web & App Builds",
    summary:
      "Fast, modern websites and web apps for startups and small businesses — from a landing page to a focused custom tool, built to grow with you.",
    description:
      "Fast, mobile-first websites and web apps built for startups and smaller businesses — usually a marketing site, a landing page, or a focused custom tool that earns its keep from day one. We work in React, .NET, and other major frameworks, so we can match whatever stack suits the project or your existing team. Bigger, more complex platforms are possible, but our sweet spot is getting a lean, well-built product live quickly. Everything is built to support the marketing around it, not to sit in isolation. Hosting is billed separately on a platform of your choice — we handle the setup.",
    deliverables: [
      "Website and landing page builds",
      "Focused web apps and custom tools",
      "React, .NET, and other major frameworks",
      "Mobile-first, fast-loading pages",
      "CMS, analytics, and conversion tracking",
      "Hosting setup on your chosen platform (hosting billed separately)",
    ],
    fromPrice: 3500,
    priceUnit: "project",
    icon: Code2,
  },
  {
    slug: "brand-design",
    index: "02",
    name: "Brand Design",
    summary:
      "Logo, colour, type, and visual guidelines that make your ads, website, and social all look like one business.",
    description:
      "A brand system gives every touchpoint a shared visual language, so your website, ads, and social read as one credible business rather than three disconnected efforts. We design the identity and document it so it stays consistent as you grow.",
    deliverables: [
      "Logo design and usage rules",
      "Colour palette and typography system",
      "Visual guidelines document",
      "Templates for social, ads, and documents",
    ],
    fromPrice: 700,
    priceUnit: "project",
    icon: PenTool,
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
    fromPrice: 250,
    priceUnit: "hour",
    icon: FileText,
  },
  {
    slug: "ads-management",
    index: "04",
    name: "Ads Management",
    summary:
      "Google, Meta, and LinkedIn campaigns — strategy, setup, daily optimisation, and reporting you can actually read.",
    description:
      "We plan, launch, and manage paid campaigns across Google, Meta, and LinkedIn — then optimise them daily based on what's actually converting. We keep budgets realistic for a startup or small business, and reporting is in plain language, so you always know what your spend is doing.",
    deliverables: [
      "Channel and audience strategy",
      "Campaign setup and tracking",
      "Daily optimisation and A/B testing",
      "Plain-language performance reporting",
    ],
    fromPrice: 1800,
    priceUnit: "month",
    icon: Megaphone,
  },
  {
    slug: "social-media-management",
    index: "05",
    name: "Social Media Management",
    summary:
      "A consistent, on-brand social presence — content, scheduling, and community management across the platforms that matter to you.",
    description:
      "A consistent, on-brand social presence without the daily scramble. We plan and create the posts, schedule them, and handle the back-and-forth with your audience across the channels that fit your business — so your social stays active while you get on with running things.",
    deliverables: [
      "Content planning and a posting calendar",
      "Post creation — copy and visuals",
      "Scheduling and consistent publishing",
      "Community management and engagement",
    ],
    fromPrice: 1500,
    priceUnit: "month",
    icon: Share2,
  },
  {
    slug: "admin-support",
    index: "06",
    name: "Admin Support",
    summary:
      "Inbox, calendar, invoicing, and lead follow-up handled so enquiries don't go cold waiting on a reply.",
    description:
      "The recurring admin no one has time for — inbox, calendar, invoicing, and lead follow-up — handled daily so the leads your marketing generates don't go cold waiting on a reply.",
    deliverables: [
      "Inbox and calendar management",
      "Lead follow-up and qualification",
      "Invoicing and recurring reporting",
      "Upkeep of ads, content, and site",
    ],
    fromPrice: 1500,
    priceUnit: "month",
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
