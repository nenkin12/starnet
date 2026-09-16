"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    uetq?: unknown[];
  }
}

/**
 * Fires a Microsoft Ads UET custom event whenever a phone link is tapped,
 * so the "call" conversion goal (event action: outbound_click) can track
 * call clicks from Bing ads. Uses a delegated listener so it covers every
 * tel: link on the site, including ones added later.
 */
export default function UetCallTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      window.uetq = window.uetq || [];
      window.uetq.push("event", "outbound_click", {
        event_category: "phone_call",
        event_label: link.getAttribute("href") ?? "tel:unknown",
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
