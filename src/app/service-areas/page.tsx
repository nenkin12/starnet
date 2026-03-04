import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { serviceAreas } from "@/data/serviceAreas";
import { MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Starlink Installation Service Areas Nationwide | Starnet Pros",
  description:
    "Professional Starlink installation across all 50 states. Find a certified installer near you. Based in Charlotte, NC, serving customers nationwide.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Service Areas", url: "/service-areas" },
  ]);

  // Group by state
  const grouped = serviceAreas.reduce(
    (acc, area) => {
      if (!acc[area.state]) acc[area.state] = [];
      acc[area.state].push(area);
      return acc;
    },
    {} as Record<string, typeof serviceAreas>
  );

  return (
    <>
      <SchemaMarkup schema={schema} />

      <Hero
        title="Starlink Installation Service Areas"
        subtitle="Professional Starlink installation across the country. Based in Charlotte, NC, and expanding nationally."
        backgroundImage="/images/hero-service-areas.jpg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Service Areas" }]} />
      </div>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Where We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide professional Starlink installation in the following
              cities and surrounding areas. Don&apos;t see your location?{" "}
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-500"
              >
                Contact us
              </Link>{" "}
              — we&apos;re expanding rapidly.
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([state, areas]) => (
              <div key={state}>
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {state}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="group flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                    >
                      <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {area.city}, {area.stateAbbr}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-blue-50 border border-blue-100 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Don&apos;t See Your City?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              We&apos;re expanding our service area rapidly. Contact us to
              check availability in your area — we may already serve your
              location or can schedule a visit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:+18334112089"
                className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
              >
                Call (833) 411-2089
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
