import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  serviceAreas,
  getServiceAreaBySlug,
  getAllServiceAreaSlugs,
} from "@/data/serviceAreas";
import { testimonials } from "@/data/testimonials";
import { services } from "@/data/services";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import { CheckCircle, MapPin, Zap, Shield } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};

  return {
    title: `Starlink Installation in ${area.city}, ${area.stateAbbr} | Starnet Pros`,
    description: `Professional Starlink installation in ${area.city}, ${area.state}. Expert setup, clean cabling, speeds up to 600+ Mbps. Book your installation with Starnet Pros today.`,
    alternates: {
      canonical: `https://www.starnetpros.com/service-areas/${slug}`,
    },
    openGraph: {
      title: `Starlink Installation in ${area.city}, ${area.stateAbbr} | Starnet Pros`,
      description: `Professional Starlink installation in ${area.city}, ${area.state}. Expert setup, clean cabling, speeds up to 600+ Mbps.`,
    },
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const testimonial = testimonials.find((t) => t.id === area.testimonialId);

  const schemas = [
    generateLocalBusinessSchema(`${area.city}, ${area.state}`),
    generateServiceSchema(
      "Professional Starlink Installation",
      `Expert Starlink satellite internet installation in ${area.city}, ${area.state}. Clean mounting, cable routing, and speed optimization.`,
      `${area.city}, ${area.state}`
    ),
    generateBreadcrumbSchema([
      { name: "Service Areas", url: "/service-areas" },
      {
        name: `${area.city}, ${area.stateAbbr}`,
        url: `/service-areas/${slug}`,
      },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      {/* Hero */}
      <section className="bg-[#0A1628] pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-400 mb-4">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">
              {area.city}, {area.state}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Professional Starlink Installation in {area.city},{" "}
            {area.stateAbbr}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Expert Starlink setup for homes and businesses in the{" "}
            {area.city} area. Clean installations, optimized performance,
            and speeds customers report over 600 Mbps.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors text-center"
            >
              Book Installation in {area.city}
            </Link>
            <a
              href="tel:+18334112089"
              className="rounded-lg border border-white/20 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors text-center"
            >
              Call (833) 411-2089
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Service Areas", href: "/service-areas" },
            { name: `${area.city}, ${area.stateAbbr}` },
          ]}
        />
      </div>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Starlink Installation in {area.city}, {area.stateAbbr}
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>{area.description}</p>
              </div>

              {/* Challenges */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Connectivity Challenges in {area.city}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.challenges}
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Starlink With Starnet Pros in {area.city}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.benefits}
                </p>
              </div>

              {/* Services */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Services Available in {area.city}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services#${service.id}`}
                      className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900 text-sm">
                          {service.title}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {service.description.substring(0, 80)}...
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Stats */}
              <div className="rounded-2xl bg-[#0A1628] p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Why Choose Professional Installation
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Zap,
                      label: "600+ Mbps speeds reported",
                    },
                    {
                      icon: Shield,
                      label: "Certified, trained technicians",
                    },
                    {
                      icon: CheckCircle,
                      label: "Clean, professional cabling",
                    },
                    {
                      icon: MapPin,
                      label: `Serving the ${area.city} area`,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <item.icon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/book"
                  className="mt-6 block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  Book in {area.city}
                </Link>
              </div>

              {/* Testimonial */}
              {testimonial && (
                <div className="mb-6">
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                  />
                </div>
              )}

              {/* Contact Card */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Questions?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Call us or visit our contact page to get a free quote for
                  Starlink installation in {area.city}.
                </p>
                <a
                  href="tel:+18334112089"
                  className="block w-full rounded-lg border border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  (833) 411-2089
                </a>
                <Link
                  href="/contact"
                  className="block mt-3 text-center text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Send us a message &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Get Connected in ${area.city} Today`}
        subtitle={`Professional Starlink installation for homes and businesses in ${area.city}, ${area.state}. Book now or call for a free consultation.`}
      />
    </>
  );
}
