"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  const key = "sn_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function BlogEngagementTracker({ slug }: { slug: string }) {
  const pathname = usePathname();
  const startTime = useRef(0);
  const visibleTime = useRef(0);
  const lastVisible = useRef(0);
  const maxScroll = useRef(0);
  const conversions = useRef<string[]>([]);
  const sent = useRef(false);

  useEffect(() => {
    startTime.current = Date.now();
    lastVisible.current = Date.now();
    visibleTime.current = 0;
    maxScroll.current = 0;
    conversions.current = [];
    sent.current = false;

    // -- Scroll tracking --
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
        if (pct > maxScroll.current) maxScroll.current = pct;
      }
    }

    // -- Visibility tracking --
    function onVisibility() {
      if (document.hidden) {
        // Tab went hidden — accumulate visible time
        visibleTime.current += Date.now() - lastVisible.current;
      } else {
        // Tab came back
        lastVisible.current = Date.now();
      }
    }

    // -- Conversion click tracking --
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("/book") || href.includes("/contact")) {
        conversions.current.push(href);
      }
    }

    // -- Send beacon --
    function sendEngagement() {
      if (sent.current) return;
      sent.current = true;

      // Add any remaining visible time
      if (!document.hidden) {
        visibleTime.current += Date.now() - lastVisible.current;
      }

      // Cap at 30 minutes (server will also cap)
      const timeOnPageSec = Math.min(
        Math.round(visibleTime.current / 1000),
        1800
      );

      const payload = {
        type: "blog_engagement",
        slug,
        path: pathname,
        session_id: getSessionId(),
        time_on_page: timeOnPageSec,
        max_scroll: maxScroll.current,
        conversions: conversions.current,
      };

      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/track", blob);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("click", onClick);
    window.addEventListener("pagehide", sendEngagement);

    // Also send on beforeunload as fallback
    window.addEventListener("beforeunload", sendEngagement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onClick);
      window.removeEventListener("pagehide", sendEngagement);
      window.removeEventListener("beforeunload", sendEngagement);
      // Send on unmount (SPA navigation)
      sendEngagement();
    };
  }, [slug, pathname]);

  return null;
}
