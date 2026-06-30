import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { capabilities } from "@/data/capabilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/capabilities", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const capabilityRoutes = capabilities.map((cap) => ({
    url: `${base}/capabilities/${cap.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...capabilityRoutes];
}
