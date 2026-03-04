import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions | Starnet Pros",
  description:
    "Starnet Pros terms and conditions of service. Read our terms before using our website or services.",
  path: "/terms",
});

export default function TermsPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Terms & Conditions", url: "/terms" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <div className="bg-[#0A1628] pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-gray-400">Last updated: January 1, 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Terms & Conditions" }]} />
      </div>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg text-gray-600">
          <h2 className="text-gray-900">Agreement to Terms</h2>
          <p>
            By accessing or using the Starnet Pros website (starnetpros.com)
            and services, you agree to be bound by these Terms and Conditions.
            If you do not agree with any part of these terms, you may not use
            our website or services.
          </p>

          <h2 className="text-gray-900">Services</h2>
          <p>
            Starnet Pros provides professional Starlink satellite internet
            installation, consultation, and related services. Our services
            include but are not limited to:
          </p>
          <ul>
            <li>Starlink consultation and plan guidance</li>
            <li>Residential and commercial installation</li>
            <li>RV and mobile installation</li>
            <li>Point-to-point installation</li>
            <li>Network optimization and support</li>
          </ul>

          <h2 className="text-gray-900">Independent Contractor Status</h2>
          <p>
            Starnet Pros is an independent service provider. We are not
            affiliated with, sponsored by, or endorsed by Starlink, SpaceX,
            or any of their associated companies. We do not sell Starlink
            equipment or represent Starlink in any official capacity.
          </p>

          <h2 className="text-gray-900">Service Scheduling and Cancellation</h2>
          <p>
            Installation appointments are subject to availability and weather
            conditions. We reserve the right to reschedule appointments due
            to unsafe conditions or circumstances beyond our control. Please
            provide at least 24 hours notice for cancellations.
          </p>

          <h2 className="text-gray-900">Pricing and Payment</h2>
          <p>
            Service pricing is provided through custom quotes based on your
            specific installation requirements. Quotes are valid for 30 days
            from the date provided. Payment terms will be communicated at the
            time of booking. Additional charges may apply for unforeseen
            complications encountered during installation.
          </p>

          <h2 className="text-gray-900">Customer Responsibilities</h2>
          <p>As a customer, you are responsible for:</p>
          <ul>
            <li>
              Purchasing your Starlink equipment directly from Starlink
            </li>
            <li>
              Ensuring you have the right to modify your property for
              installation purposes
            </li>
            <li>
              Providing accurate information about your property and needs
            </li>
            <li>Being present or available during the installation</li>
            <li>
              Obtaining any necessary permits or HOA approvals
            </li>
          </ul>

          <h2 className="text-gray-900">Warranty and Liability</h2>
          <p>
            Starnet Pros warrants our installation workmanship for a period of
            30 days from the date of installation. This warranty covers
            mounting hardware, cable routing, and connections installed by our
            team. After 30 days, we do not cover repairs or support for the
            installation; for ongoing service or equipment issues, you would
            contact Starlink directly unless you have an active Starnet Pros
            service plan with us.
          </p>
          <p>This warranty does not cover:</p>
          <ul>
            <li>Starlink equipment (covered by Starlink&apos;s own warranty)</li>
            <li>Damage caused by severe weather events</li>
            <li>Modifications made after installation</li>
            <li>Issues related to Starlink service outages</li>
            <li>Normal wear and tear</li>
          </ul>

          <h2 className="text-gray-900">Limitation of Liability</h2>
          <p>
            Starnet Pros shall not be liable for any indirect, incidental,
            special, or consequential damages arising from the use of our
            services. Our total liability shall not exceed the amount paid
            for the specific service giving rise to the claim.
          </p>

          <h2 className="text-gray-900">Speed and Performance</h2>
          <p>
            Internet speeds and performance referenced on our website and in
            our marketing materials are based on real customer reports and are
            not guaranteed. Actual speeds depend on numerous factors including
            Starlink plan, network congestion, dish placement, weather, and
            local conditions.
          </p>

          <h2 className="text-gray-900">Intellectual Property</h2>
          <p>
            All content on the Starnet Pros website — including text, images,
            logos, and design — is the property of Starnet Pros and is
            protected by copyright and intellectual property laws. You may not
            reproduce, distribute, or use our content without written
            permission.
          </p>

          <h2 className="text-gray-900">Website Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our website for any unlawful purpose</li>
            <li>
              Attempt to gain unauthorized access to our systems
            </li>
            <li>Interfere with the proper functioning of our website</li>
            <li>
              Submit false or misleading information through our forms
            </li>
          </ul>

          <h2 className="text-gray-900">Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Changes take effect immediately upon posting to our website.
            Continued use of our services after changes constitutes acceptance
            of the updated terms.
          </p>

          <h2 className="text-gray-900">Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of the State
            of North Carolina. Any disputes shall be resolved in the courts
            of Mecklenburg County, North Carolina.
          </p>

          <h2 className="text-gray-900">Contact</h2>
          <p>
            For questions about these Terms and Conditions, contact us at:
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
