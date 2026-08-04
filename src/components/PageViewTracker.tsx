"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function getSessionId(): string {
  const key = "sn_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    if (pathname === lastPath.current) return;
    if (pathname.startsWith("/admin")) return;

    lastPath.current = pathname;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        session_id: getSessionId(),
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
