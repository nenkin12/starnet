"use client";

import { useEffect } from "react";

export default function PaperformEmbed() {
  useEffect(() => {
    // Only load the script once
    if (!document.querySelector('script[src="https://paperform.co/__embed.min.js"]')) {
      const script = document.createElement("script");
      script.src = "https://paperform.co/__embed.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div data-paperform-id="iodb52vq" />;
}
