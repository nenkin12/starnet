import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Shipping Policy | Starnet Pros",
  description:
    "Starnet Pros shipping and delivery policy. How we deliver our installation services and what to expect when you book.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Shipping Policy", url: "/shipping-policy" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <div className="bg-[#0A1628] pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Shipping Policy</h1>
          <p className="mt-4 text-gray-400">Last updated: March 2, 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Shipping Policy" }]} />
      </div>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg text-gray-600">
          <h2 className="text-gray-900">Overview</h2>
          <p>
            Starnet Pros is a professional installation and consulting company.
            We provide on-site services — including Starlink installation,
            point-to-point networking, and security camera systems — at your
            location. This policy explains how we &ldquo;deliver&rdquo; our
            services and what you can expect regarding scheduling, travel, and
            any physical items we may provide.
          </p>

          <h2 className="text-gray-900">We Do Not Ship Starlink Equipment</h2>
          <p>
            Starlink dishes, routers, and accessories are purchased directly
            from Starlink (starlink.com). Starnet Pros does not sell or ship
            Starlink equipment. Shipping of your Starlink order is handled
            entirely by Starlink; delivery times and tracking are managed
            through your Starlink account. We recommend ordering your
            equipment in advance so it arrives before your scheduled
            installation date.
          </p>

          <h2 className="text-gray-900">Delivery of Our Services</h2>
          <p>
            Our &ldquo;delivery&rdquo; is the performance of installation and
            related services at your property. When you book an appointment:
          </p>
          <ul>
            <li>
              <strong>Scheduling:</strong> We confirm your appointment and, in
              many cases, provide a window (e.g., morning or afternoon) for
              our technician&apos;s arrival.
            </li>
            <li>
              <strong>Service area:</strong> We serve designated regions;
              travel to your address is included in our service area. For
              locations outside our standard areas, we may offer service with
              a travel fee, which will be disclosed before booking.
            </li>
            <li>
              <strong>Weather and access:</strong> We may need to reschedule
              if weather or site conditions make installation unsafe or
              ineffective. We will work with you to choose a new date.
            </li>
          </ul>

          <h2 className="text-gray-900">Materials We Provide On-Site</h2>
          <p>
            For your installation, we may bring mounting hardware, cable,
            conduit, or other materials. These are supplied as part of the
            agreed scope of work and are not shipped separately to you unless
            we explicitly agree otherwise. Any such materials are delivered
            and installed at the time of your appointment.
          </p>

          <h2 className="text-gray-900">Questions</h2>
          <p>
            If you have questions about scheduling, service areas, or what to
            expect when we come to your property, contact us:
          </p>
          <ul>
            <li>
              Phone: <a href="tel:+18334112089">(833) 411-2089</a>
            </li>
            <li>
              Address: 1125 Charlottetowne Ave, Charlotte, NC 28204
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
