import type { Situation } from "@/types";

/**
 * Common situations businesses are in when they reach out. These power the
 * homepage "How we help" overview. They are framing, not products — there are
 * no fixed packages or set prices. Every engagement is evaluated and quoted to
 * the customer's specific requirements; these just show how we'd typically
 * approach each kind of problem and which capabilities we'd draw on.
 */
export const situations: Situation[] = [
  {
    slug: "get-found",
    name: "Get Found",
    label: "Visibility",
    key: "01",
    heading: "Nobody can find us",
    blurb:
      "Low search visibility, no website, or a brand that doesn't look credible yet.",
    problem:
      "You're hard to find. Search visibility is low, the website is dated or missing, and the brand doesn't look credible enough to win trust.",
    summary:
      "We'd usually start by making you credible and findable — a brand that looks the part, copy that ranks, and a fast website built around it.",
    typicalWork: [
      "Brand identity & visual design, so every touchpoint looks consistent",
      "Website copywriting, written to convert and to rank",
      "SEO & AEO structuring, so search engines and AI answer tools surface you",
      "A new website or web app build, fast and mobile-first",
    ],
    capabilities: ["brand-design", "copywriting", "web-app-builds"],
  },
  {
    slug: "get-leads",
    name: "Get Leads",
    label: "Demand",
    key: "02",
    heading: "We're found, but quiet",
    blurb:
      "Traffic exists but enquiries don't. Ads aren't running, or aren't working.",
    problem:
      "People can find you, but enquiries aren't coming. Either ads aren't running, or the ones that are aren't converting into real demand.",
    summary:
      "Here we'd focus on turning attention into enquiries — paid campaigns and the landing pages behind them, managed and optimised.",
    typicalWork: [
      "Paid ads strategy and setup across Google, Meta & LinkedIn",
      "Ongoing campaign management, testing, and optimisation",
      "Landing page copy and build matched to each campaign",
    ],
    capabilities: ["ads-management", "copywriting", "web-app-builds"],
  },
  {
    slug: "stay-running",
    name: "Stay Running",
    label: "Capacity",
    key: "03",
    heading: "We're busy, not growing",
    blurb:
      "Leads are coming in, but admin and follow-up are eating the team's week.",
    problem:
      "Leads are landing, but admin and follow-up are eating the week. The team is busy keeping up rather than growing.",
    summary:
      "The work here is keeping momentum — day-to-day admin, follow-up, and upkeep handled so the demand you've built keeps moving instead of going cold.",
    typicalWork: [
      "Inbox, calendar, and lead follow-up handled daily",
      "Invoicing, reporting, and the recurring admin no one has time for",
      "Ongoing upkeep of ads, content, and your website or app",
    ],
    capabilities: ["admin-support", "ads-management"],
  },
];

export function getSituation(slug: string): Situation | undefined {
  return situations.find((s) => s.slug === slug);
}

/** Situations that typically draw on a given capability. */
export function situationsForCapability(capabilitySlug: string): Situation[] {
  return situations.filter((s) => s.capabilities.includes(capabilitySlug));
}
