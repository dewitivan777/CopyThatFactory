import type { Capability } from "@/types";

/**
 * Join class names, dropping falsy values. A tiny dependency-free helper so
 * components can compose conditional Tailwind classes cleanly.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a capability's indicative starting price, e.g. "From R3,000" or "From R1,800/month". */
export function formatFromPrice(cap: Pick<Capability, "fromPrice" | "priceUnit">): string {
  const amount = `R${cap.fromPrice.toLocaleString("en-US")}`;
  const suffix = cap.priceUnit === "project" ? "" : `/${cap.priceUnit}`;
  return `From ${amount}${suffix}`;
}
