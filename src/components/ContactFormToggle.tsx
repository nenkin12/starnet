"use client";

import { useState, useEffect } from "react";
import PaperformEmbed from "@/components/PaperformEmbed";
import { Home, Building2 } from "lucide-react";

export default function ContactFormToggle() {
  const [activeForm, setActiveForm] = useState<"residential" | "business">("residential");

  useEffect(() => {
    if (window.location.hash === "#business") {
      setActiveForm("business");
    }
  }, []);

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
        <button
          onClick={() => setActiveForm("residential")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            activeForm === "residential"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Home className="h-4 w-4" />
          Residential
        </button>
        <button
          onClick={() => setActiveForm("business")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            activeForm === "business"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Business
        </button>
      </div>

      {/* Residential Form */}
      {activeForm === "residential" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Residential Inquiry
          </h2>
          <p className="text-gray-600 mb-8">
            Need internet, Wi-Fi, or security cameras for your home? Fill out
            the form below and we&apos;ll get back to you within 24 hours with
            a custom quote.
          </p>
          <PaperformEmbed />
        </div>
      )}

      {/* Business Form */}
      {activeForm === "business" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Business Inquiry
          </h2>
          <p className="text-gray-600 mb-8">
            Looking for networking, structured cabling, or security systems for
            your business? Tell us about your project and we&apos;ll put
            together a custom proposal.
          </p>
          <PaperformEmbed formId="suimrd4s" />
        </div>
      )}
    </div>
  );
}
