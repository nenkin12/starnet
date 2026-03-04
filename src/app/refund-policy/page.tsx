import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Refund Policy | Starnet Pros",
  description:
    "Starnet Pros refund and cancellation policy. Learn about refunds, cancellations, and satisfaction with our installation services.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Refund Policy", url: "/refund-policy" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <div className="bg-[#0A1628] pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
          <p className="mt-4 text-gray-400">Last updated: March 2, 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Refund Policy" }]} />
      </div>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg text-gray-600">
          <h2 className="text-gray-900">Our Commitment</h2>
          <p>
            Starnet Pros stands behind our installation and consulting
            services. We want you to be satisfied with the work we perform.
            This Refund Policy explains when and how we offer refunds or
            adjustments.
          </p>

          <h2 className="text-gray-900">Cancellation by You</h2>
          <p>
            If you need to cancel or reschedule your appointment, please
            contact us as soon as possible. We request at least 24 hours
            notice when possible.
          </p>
          <ul>
            <li>
              <strong>No deposit or payment yet:</strong> You may cancel
              without charge. We simply ask that you let us know so we can
              offer the slot to another customer.
            </li>
            <li>
              <strong>Deposit or prepayment made:</strong> If you cancel with
              at least 24 hours notice, we will refund any deposit or
              prepayment in full, or apply it to a rescheduled date at your
              choice. If you cancel with less than 24 hours notice, we may
              retain a portion of the deposit to cover scheduling and
              preparation costs; the specific amount will be communicated at
              the time of booking.
            </li>
          </ul>

          <h2 className="text-gray-900">Cancellation by Us</h2>
          <p>
            We may need to reschedule or cancel due to weather, safety,
            equipment availability, or other circumstances beyond our control.
            If we cancel your appointment, we will offer a full refund of any
            amount you have paid, or we will work with you to reschedule at no
            additional charge.
          </p>

          <h2 className="text-gray-900">After Installation — Satisfaction</h2>
          <p>
            Our workmanship is covered by a 30-day guarantee (see our Terms &
            Conditions). If you are not satisfied with our installation work
            within that period:
          </p>
          <ul>
            <li>
              Contact us promptly so we can inspect and address the issue. We
              will correct any defects in our workmanship at no additional
              charge within the 30-day period.
            </li>
            <li>
              If we are unable to resolve the issue to your satisfaction, we
              may offer a partial or full refund of the installation fee for
              the work in question, depending on the circumstances. Each case
              is reviewed individually.
            </li>
          </ul>
          <p>
            After 30 days, we do not cover installation repairs or support.
            For ongoing service or equipment issues, contact Starlink directly
            unless you have an active Starnet Pros service plan with us.
          </p>
          <p>
            Refunds do not apply to third-party equipment (e.g., Starlink
            hardware), which is covered by Starlink&apos;s own warranty and
            return policy.
          </p>

          <h2 className="text-gray-900">Consultation-Only Services</h2>
          <p>
            If you have paid for a consultation only (no installation
            performed), and you are not satisfied, contact us within 7 days.
            We will work with you to make it right, which may include a
            refund of the consultation fee if we have not met the agreed
            scope.
          </p>

          <h2 className="text-gray-900">How to Request a Refund</h2>
          <p>
            To request a refund or discuss a cancellation or satisfaction
            issue, contact us by phone or in writing. We will respond promptly
            and work in good faith to resolve the matter.
          </p>

          <h2 className="text-gray-900">Contact</h2>
          <p>
            For refund requests or questions about this policy:
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
