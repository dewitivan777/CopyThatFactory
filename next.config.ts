import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export — required for FTP / shared-hosting deployment.
  // NOTE: the /api/contact route will not function on a static host.
  // To restore server-side features, remove `output` and deploy to a Node.js host.
  output: "export",
  // Static export can't run the image optimizer, so images are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
