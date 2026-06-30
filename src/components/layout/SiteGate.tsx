"use client";

import { useEffect, useState } from "react";
import { UnderConstruction } from "./UnderConstruction";

/**
 * Fetches /site-config.json at runtime so the under-construction toggle can
 * be flipped by uploading a single JSON file — no rebuild or redeploy needed.
 *
 * To go live:  set "underConstruction": false in /site-config.json on the server.
 * To hide site: set "underConstruction": true.
 */
export function SiteGate({ children }: { children: React.ReactNode }) {
  const [underConstruction, setUnderConstruction] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/site-config.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((cfg) => setUnderConstruction(cfg.underConstruction === true))
      .catch(() => setUnderConstruction(false)); // fail open — show site if file is missing
  }, []);

  // While fetching, show a neutral dark screen to avoid flashing real content
  // before we know whether the site should be hidden.
  if (underConstruction === null) {
    return <div className="min-h-screen bg-stone-950" />;
  }

  if (underConstruction) {
    return <UnderConstruction />;
  }

  return <>{children}</>;
}
