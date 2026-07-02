import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export — required for FTP / shared-hosting deployment.
  // NOTE: the /api/contact route will not function on a static host.
  // To restore server-side features, remove `output` and deploy to a Node.js host.
  output: "export",
  // Emit `route/index.html` (not `route.html`) so URLs with a trailing slash
  // resolve on static hosts. Without this, `/capabilities/<slug>/` hits the
  // folder that only holds the opengraph-image and shows a directory listing.
  trailingSlash: true,
  // Static export can't run the image optimizer, so images are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
