import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — web, brand, copy, ads, social & admin under one roof`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Marketing, under one roof",
    title: "Built around what your business needs next.",
  });
}
