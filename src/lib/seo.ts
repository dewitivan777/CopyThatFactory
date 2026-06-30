import { siteConfig } from "@/data/site";

/** Resolve a site-relative path to an absolute URL using the configured origin. */
export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base || "/";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Stable JSON-LD @id anchors so nodes can reference each other across pages. */
export const schemaIds = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
};
