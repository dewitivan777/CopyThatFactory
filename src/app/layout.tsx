import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButterflyCursor } from "@/components/ui/ButterflyCursor";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { rootGraph } from "@/lib/structured-data";
import { siteConfig } from "@/data/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  // Load the variable font with its optical-size axis so large "display"
  // headings pick up the high thick/thin contrast seen in the brand reference.
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Web, Brand, Copy, Ads & Social for Startups`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        {/* Google Analytics — only loads on the production host, and tracks
            client-side route changes since next/link never fully reloads. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {/* reCAPTCHA v3 is loaded lazily from the contact form on first
            interaction (see ContactForm), so it doesn't set third-party
            cookies on pages that don't need it. */}
        <JsonLd data={rootGraph()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <ButterflyCursor />
      </body>
    </html>
  );
}
