"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { siteConfig } from "@/data/site";

/**
 * Only send hits from the real production domain — prevents `npm run dev` /
 * local or staging builds from polluting production GA data.
 */
function isProductionHost(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.location.hostname === new URL(siteConfig.url).hostname;
  } catch {
    return false;
  }
}

/**
 * Loads gtag.js (only on the production host) and sends a `page_view` on
 * every route change. Next's client-side routing (via next/link) never
 * triggers a full page reload, so gtag's automatic pageview — which only
 * fires once, on initial script load — would otherwise miss every
 * in-app navigation.
 */
export function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setEnabled(Boolean(siteConfig.gtagId) && isProductionHost());
  }, []);

  useEffect(() => {
    if (!enabled || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [enabled, pathname, searchParams]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.gtagId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
