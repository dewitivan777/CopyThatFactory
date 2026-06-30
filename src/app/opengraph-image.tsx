import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — brand, ads, copy, admin & web under one roof`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Marketing, under one roof",
    title: "Built around what your business needs next.",
  });
}
