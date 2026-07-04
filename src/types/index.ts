import type { LucideIcon } from "lucide-react";

// Extend the Window interface with third-party globals loaded via <Script>.
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * A common situation a business is in when they come to us — used in the
 * homepage "How we help" overview. These are NOT products or fixed bundles:
 * each describes a typical problem and the capabilities we'd usually draw on,
 * but every engagement is scoped and quoted to the customer's own requirements.
 */
export interface Situation {
  /** Stable key, also used as the tab/anchor id, e.g. "get-found" */
  slug: string;
  /** Outcome-led title, e.g. "Get Found" */
  name: string;
  /** Short category label, e.g. "Visibility" */
  label: string;
  /** Numbered key shown in the selector, e.g. "01" */
  key: string;
  /** Heading shown on the situation tab, e.g. "Nobody can find us" */
  heading: string;
  /** Supporting copy shown on the situation tab */
  blurb: string;
  /** The bottleneck this situation describes, in the client's words */
  problem: string;
  /** One-paragraph framing of how we'd approach it */
  summary: string;
  /** What this kind of work usually involves (illustrative, not a fixed list) */
  typicalWork: string[];
  /** Capability slugs we'd typically draw on for this situation */
  capabilities: string[];
}

export interface Capability {
  /** URL-safe identifier used for /capabilities/[slug] */
  slug: string;
  /** Numbered index, e.g. "01" */
  index: string;
  /** Display name, e.g. "Brand Design" */
  name: string;
  /** Short summary shown in grids and cards */
  summary: string;
  /** Longer description for the detail page */
  description: string;
  /** Concrete deliverables for the detail page */
  deliverables: string[];
  /**
   * Indicative starting price in ZAR (e.g. 3000). A competitive "feeler"
   * price to signal affordability to prospects — every engagement is still
   * scoped and quoted individually, not a fixed rate card.
   */
  fromPrice: number;
  /** How fromPrice is billed */
  priceUnit: "project" | "month" | "hour";
  /** Icon rendered alongside the capability */
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
