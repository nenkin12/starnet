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
        title="Residential & Business Internet, Networking & Security"
        subtitle="From home internet and Wi-Fi coverage to office networking and security cameras — we design, install, and support connectivity solutions for homes and businesses nationwide."
        ctaText="Residential"
        ctaHref="/contact#residential"
        secondaryCta="Business"
        secondaryHref="/contact#business"
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

      {/* Services */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Internet, networking, Wi-Fi, and security — installed properly
              the first time for homes and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
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

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 text-center mb-14 max-w-2xl mx-auto">
            Three steps from consultation to a fully connected property.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "We assess your property or facility, understand your needs, and recommend the right solution — internet, networking, security, or all three.",
              },
              {
                step: "02",
                title: "Professional Installation",
                desc: "Secure mounting, sealed wall passes, concealed cable runs, and proper network configuration. Every job is done clean and to code.",
              },
              {
                step: "03",
                title: "Testing & Walkthrough",
                desc: "We verify speeds, test every connection, confirm camera feeds, and walk you through the entire system before we leave.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-16 sm:py-24 bg-[#0A1628]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Business Solutions
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We help businesses of all sizes build reliable infrastructure — from single-office setups to multi-location deployments.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Office Networking",
                desc: "Structured cabling, managed switches, VLANs, and enterprise Wi-Fi — designed for performance and scalability.",
              },
              {
                title: "Security Camera Systems",
                desc: "IP camera installation with remote viewing, NVR setup, and strategic placement for full property coverage.",
              },
              {
                title: "Structured Cabling",
                desc: "Cat6/Cat6a runs, patch panels, server rack buildouts, and clean cable management throughout your facility.",
              },
              {
                title: "Point-to-Point Links",
                desc: "Wireless bridge connections between buildings, job sites, or remote structures — no trenching required.",
              },
              {
                title: "Wi-Fi Coverage",
                desc: "Enterprise access points, heat mapping, and mesh systems to eliminate dead zones across your entire property.",
              },
              {
                title: "Internet Installation",
                desc: "Fiber, cable, fixed wireless, or satellite — we handle the physical installation and optimize your connection.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact#business"
              className="inline-flex rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Get a Business Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Why Starnet Pros */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Customers Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Experienced Technicians",
                desc: "Our team knows internet infrastructure, business networking, and security systems inside and out.",
              },
              {
                icon: Zap,
                title: "Optimized Performance",
                desc: "Proper network design and cable routing make a real difference — whether it is a full office buildout, security camera system, or home Wi-Fi upgrade.",
              },
              {
                icon: CheckCircle,
                title: "Clean Installations",
                desc: "No messy cables. We route through walls, use conduit, and seal every penetration point.",
              },
              {
                icon: Users,
                title: "We Teach, Not Just Install",
                desc: "We walk you through every system we install — apps, remote access, network settings — and make sure you are comfortable before we leave.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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

      {/* Service Areas — Visual */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Serving Communities Across the Country
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Installing internet, networking, and security systems for
                homes and businesses in every state. Wherever you are, we get
                you connected.
              </p>
              <Link
                href="/service-areas"
                className="inline-flex rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                View All Service Areas
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                "North Carolina",
                "Georgia",
                "Texas",
                "Colorado",
                "Michigan",
                "New Mexico",
                "Florida",
                "Virginia",
                "Tennessee",
                "Ohio",
                "Pennsylvania",
                "Arizona",
                "California",
                "Oregon",
                "Washington",
                "And more...",
              ].map((state) => (
                <span
                  key={state}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    state === "And more..."
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  {state}
                </span>
              ))}
            </div>
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
