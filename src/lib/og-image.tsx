import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const colors = {
  bg: "#F6FAFD",
  panel: "#EDF6FB",
  ink: "#0E2A3D",
  inkSoft: "#45607A",
  blue: "#2D8FC1",
  blueDeep: "#1C6E9C",
  rule: "#D7EAF5",
};

/**
 * Shared social-share card used by the root and the dynamic [slug] routes, so
 * every shared link gets a branded, on-message preview image.
 */
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: colors.bg,
          padding: "72px 80px",
          borderBottom: `16px solid ${colors.blue}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.blueDeep,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
              color: colors.ink,
              maxWidth: 960,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: colors.blue,
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 600, color: colors.ink }}>
            {siteConfig.name}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
