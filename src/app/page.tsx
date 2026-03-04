import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import SchemaMarkup from "@/components/SchemaMarkup";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faq";
import {
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateFAQSchema,
} from "@/lib/schema";
import { Shield, Zap, CheckCircle, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const schemas = [
    generateLocalBusinessSchema(),
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    generateFAQSchema(faqs),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      <Hero
        title="Professional Networking & Security Installation — Done Right"
        subtitle="Certified technicians delivering Starlink, point-to-point networking, security cameras, and complete network solutions for homes and businesses. No messy cables, no guesswork — just expert setup and support."
        ctaText="Book Your Installation"
        ctaHref="/book"
        secondaryCta="View Our Services"
        secondaryHref="/services"
      />

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                Trusted on Trustpilot
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-green-500 text-lg">&#9733;</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                Reviewed on Yelp
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500 text-lg">&#9733;</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                Installations Completed
              </span>
              <span className="text-2xl font-bold text-blue-600">2,100+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From networking and Starlink installation to point-to-point systems
              and security cameras, we handle every step with precision and care.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
            >
              View all services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Professional Installation */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Choose Professional Installation?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Whether it&apos;s Starlink, point-to-point networking, or security cameras —
              the difference between &ldquo;it works&rdquo; and &ldquo;it works
              perfectly&rdquo; is professional installation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="rounded-2xl border border-gray-200 p-8 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-500 mb-6">
                DIY Installation
              </h3>
              <ul className="space-y-4">
                {[
                  "Dish sitting on ground or deck — suboptimal signal",
                  "Cables running across yard or through windows",
                  "No speed verification or optimization",
                  "Risk of weather damage to unsecured equipment",
                  "Hours spent troubleshooting on your own",
                  "No expert guidance on plan or placement",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">&#10005;</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-blue-600 p-8 bg-blue-50/50 relative">
              <div className="absolute -top-3 left-8 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Recommended
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Starnet Pros Installation
              </h3>
              <ul className="space-y-4">
                {[
                  "Optimal roof-mounted placement for maximum signal",
                  "Clean, concealed cable routing through walls and conduit",
                  "Speed verified — customers report 600+ Mbps",
                  "Weatherproof, secure mounting built to last",
                  "Full walkthrough and education before we leave",
                  "Expert guidance on the right plan and equipment",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-900">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 sm:py-24 bg-[#0A1628]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Customers Choose Starnet Pros
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Certified Professionals",
                desc: "Trained, experienced technicians who know Starlink inside and out.",
              },
              {
                icon: Zap,
                title: "600+ Mbps Speeds",
                desc: "Our customers report blazing-fast speeds with optimized dish placement.",
              },
              {
                icon: CheckCircle,
                title: "Clean Installations",
                desc: "No messy cables — professional cable routing through walls and conduit.",
              },
              {
                icon: Users,
                title: "Education First",
                desc: "We don't just install — we teach you how to get the most from Starlink.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real reviews from real customers across the country.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} quote={t.quote} author={t.author} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Serving Communities Across the Country
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Based in Charlotte, NC, we serve residential and commercial
              customers across North Carolina, Georgia, Texas, Colorado,
              Michigan, New Mexico, and expanding nationally.
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/service-areas"
              className="inline-flex rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
