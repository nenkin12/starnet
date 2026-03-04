import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import PaperformEmbed from "@/components/PaperformEmbed";
import { services } from "@/data/services";
import {
  MessageSquare,
  Wrench,
  Building2,
  Truck,
  Radio,
  BarChart3,
  Camera,
  CheckCircle,
  Phone,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Wrench,
  Building2,
  Truck,
  Radio,
  BarChart3,
  Camera,
};

export const metadata: Metadata = createMetadata({
  title: "Starlink Installation & Security System Services | Starnet Pros",
  description:
    "Professional Starlink installation, point-to-point networking, and security camera system services. Residential, commercial, RV setups. Expert consultation and clean cabling.",
  path: "/services",
});

export default function ServicesPage() {
  const schemas = [
    ...services.map((s) => generateServiceSchema(s.title, s.description)),
    generateBreadcrumbSchema([{ name: "Services", url: "/services" }]),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />

      <Hero
        title="Networking, Starlink & Security System Services"
        subtitle="From complete networking solutions and Starlink installation to point-to-point systems and security cameras, we deliver expert setup for homes, businesses, and mobile users."
        backgroundImage="/images/hero-services.jpg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Services" }]} />
      </div>

      {/* Book Installation Form - landing focus at top */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Book Your Installation
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below to schedule your professional installation.
            We&apos;ll confirm your appointment and prepare a custom plan for
            your property.
          </p>
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || MessageSquare;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                      !isEven ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    <div className={!isEven ? "lg:col-start-2" : ""}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {service.details}
                      </p>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`rounded-2xl bg-gradient-to-br from-[#0A1628] to-blue-900 aspect-[4/3] flex items-center justify-center overflow-hidden ${
                        !isEven ? "lg:col-start-1" : ""
                      }`}
                    >
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="h-24 w-24 text-blue-400/20" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Other imagery / service illustrations — lower on page */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Service overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { src: "/images/services/consultation.svg", alt: "Consultation" },
                { src: "/images/services/rv-mobile.svg", alt: "RV & mobile" },
                { src: "/images/services/security-camera.svg", alt: "Security systems" },
                { src: "/images/services/plan-comparison.svg", alt: "Plan comparison" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-gray-50 border border-gray-200 p-6 flex items-center justify-center aspect-square"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Note */}
          <div className="mt-20 rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Custom Pricing for Every Project
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Every installation is unique. We provide personalized quotes based
              on your property, mounting requirements, and service needs. No
              hidden fees, no surprises.
            </p>
            <a
              href="tel:+18334112089"
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors text-lg"
            >
              Call (833) 411-2089 for a free quote
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
