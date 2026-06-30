import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { getCapability, capabilities } from "@/data/capabilities";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Copy That Factory capability";

export function generateStaticParams() {
  return capabilities.map((cap) => ({ slug: cap.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cap = getCapability(slug);
  return renderOgImage({
    eyebrow: "Capability",
    title: cap?.name ?? "Copy That Factory",
  });
}
