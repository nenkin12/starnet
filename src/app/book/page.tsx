import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaperformEmbed from "@/components/PaperformEmbed";
import { Phone, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Book Starlink Installation | Starnet Pros",
  description:
    "Book your professional Starlink installation with Starnet Pros. Fast scheduling, expert technicians, and clean installations. Call (833) 411-2089.",
  path: "/book",
});

export default function BookPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Book Installation", url: "/book" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <div className="bg-[#0A1628] pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Book Your Installation
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Fill out the form below to schedule your professional installation.
            We&apos;ll confirm your appointment and prepare a custom plan for
            your property.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Book Installation" }]} />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-10 shadow-sm">
            <PaperformEmbed />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Prefer to call?</p>
            <a
              href="tel:+18334112089"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-500 transition-colors text-lg"
            >
              <Phone className="h-5 w-5" />
              (833) 411-2089
            </a>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Book & Consult",
                desc: "Schedule online or call us. We'll discuss your needs, assess your property, and recommend the best plan and placement.",
              },
              {
                step: "2",
                title: "Professional Installation",
                desc: "Our certified technicians arrive on time, mount your dish optimally, route cables cleanly, and connect all devices.",
              },
              {
                step: "3",
                title: "Verify & Educate",
                desc: "We verify your speeds, walk you through your system, and make sure you're confident managing your Starlink.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
              Every Installation Includes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Property assessment and site survey",
                "Optimal dish mounting and positioning",
                "Clean cable routing (wall pass, conduit, or trench)",
                "All device connection and setup",
                "Speed verification and documentation",
                "System walkthrough and education",
                "Weather-resistant installation",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Have questions before booking?
            </p>
            <Link
              href="/contact"
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
            >
              Contact us for a free consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
