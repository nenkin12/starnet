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
        title="We Install Starlink So You Don't Have To"
        subtitle="Professional dish mounting, clean cable routing, and speed-verified installations for homes and businesses. Based in Charlotte, serving nationwide."
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

      {/* Services — Asymmetric Layout */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Photo side */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28">
                <img
                  src="/images/work/dish-mount-roof.jpg"
                  alt="Starlink dish professionally mounted on a residential roof"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg">
                  Real installation photo
                </div>
              </div>
            </div>
            {/* Cards side */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                What We Do
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Networking, satellite internet, security systems — installed
                properly the first time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              <div className="mt-8">
                <Link
                  href="/services"
                  className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
                >
                  Learn more about our services &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — 3 Steps with Real Photos */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 text-center mb-14 max-w-2xl mx-auto">
            Three steps from booking to blazing-fast internet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "We Assess Your Property",
                desc: "We check your roof, tree cover, and line of sight to find the best mounting spot before we drill a single hole.",
                image: "/images/work/dish-mount-roof.jpg",
                imageAlt: "Technician assessing roof for Starlink dish placement",
              },
              {
                step: "02",
                title: "We Install Everything Clean",
                desc: "Secure mounting, sealed wall passes, and concealed cable runs. No cables draped across your yard or through cracked windows.",
                image: "/images/work/dish-wall-mount-install.jpg",
                imageAlt: "Clean Starlink cable routing through wall",
              },
              {
                step: "03",
                title: "We Verify Your Speeds",
                desc: "Before we leave, we run speed tests and walk you through the Starlink app so you know exactly what you are getting.",
                image: "/images/work/speed-test-572mbps.jpg",
                imageAlt: "Speed test showing 572 Mbps on Starlink installation",
              },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                    Step {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
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

      {/* Our Work — Photo Gallery */}
      <section className="py-16 sm:py-24 bg-[#0A1628]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Our Work
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            Real installations from real job sites. No stock photos, no renders
            — just our technicians doing the work.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                src: "/images/work/dish-mount-roof.jpg",
                alt: "Starlink dish mounted on residential roof peak",
                span: "md:col-span-2 md:row-span-2",
              },
              {
                src: "/images/work/dish-wall-mount-install.jpg",
                alt: "Wall-mounted Starlink dish installation",
                span: "",
              },
              {
                src: "/images/work/speed-test-572mbps.jpg",
                alt: "Speed test showing 572 Mbps after professional installation",
                span: "",
              },
              {
                src: "/images/work/dish-mount-rural.jpg",
                alt: "Starlink installation on rural property",
                span: "",
              },
              {
                src: "/images/work/starlink-app-obstructions.jpg",
                alt: "Starlink app showing clear obstruction check",
                span: "",
              },
            ].map((photo) => (
              <div
                key={photo.src}
                className={`overflow-hidden rounded-xl ${photo.span}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 aspect-square"
                />
              </div>
            ))}
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
                desc: "Our team knows satellite internet, networking hardware, and security systems inside and out.",
              },
              {
                icon: Zap,
                title: "Optimized Performance",
                desc: "Proper dish placement and cable routing make a real difference — our customers consistently see top-tier speeds.",
              },
              {
                icon: CheckCircle,
                title: "Clean Installations",
                desc: "No messy cables. We route through walls, use conduit, and seal every penetration point.",
              },
              {
                icon: Users,
                title: "We Teach, Not Just Install",
                desc: "We walk you through the Starlink app, explain your speeds, and make sure you are comfortable before we leave.",
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
                Based in Charlotte, NC — installing Starlink, networking, and
                security systems for customers in every state. If you can see the
                sky, we can get you connected.
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
