"use client";

import PaperformEmbed from "@/components/PaperformEmbed";

/** Business-only inquiry form. The old residential/business toggle was
 *  removed when the site repositioned as a commercial-only (B2B) service. */
export default function ContactFormToggle() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Business Inquiry
      </h2>
      <p className="text-gray-600 mb-8">
        Looking for networking, structured cabling, internet installation, or
        security systems for your business? Tell us about your project and
        we&apos;ll put together a custom proposal.
      </p>
      <PaperformEmbed formId="suimrd4s" />
    </div>
  );
}
