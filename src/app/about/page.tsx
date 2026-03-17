import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import Hero from "@/components/Hero";
import { Heart, Target, BookOpen, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "About Starnet Pros | Our Mission & Story",
  description:
    "Learn about Starnet Pros — professional internet installation, business networking, and security camera systems for businesses and homes nationwide.",
  path: "/about",
});

export default function AboutPage() {
  const schema = generateBreadcrumbSchema([
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <Hero
        title="About Starnet Pros"
        subtitle="We believe every business and home deserves reliable internet, professional networking, and security — and the knowledge to make the most of it all."
        backgroundImage="/images/hero-about.jpg"
        ctaText="Our Services"
        ctaHref="/services"
        secondaryCta="Contact Us"
        secondaryHref="/contact"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "About" }]} />
      </div>

      {/* Our Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p>
                Starnet Pros started with a simple observation: businesses and
                homeowners were paying for internet and networking services but
                not getting the performance they were promised. Bad installations,
                poorly designed networks, weak Wi-Fi coverage, and zero support
                after setup were the norm — not the exception.
              </p>
              <p>
                We saw small businesses running critical operations on consumer-grade
                routers. We met property owners with dead zones covering half their
                building. We talked to companies that had paid for &quot;professional&quot;
                installations that left them with messy cables and unreliable connections.
              </p>
              <p>
                That gap between what modern internet and networking <em>can</em> deliver
                and what most people <em>actually</em> experience is why Starnet Pros
                exists. Today, we install and support all types of internet service —
                fiber, cable, fixed wireless, and satellite — alongside business networking,
                Wi-Fi systems, structured cabling, and security camera installations.
                We&apos;re not just installers — we&apos;re consultants, educators,
                and advocates for getting businesses and homes truly connected and protected.
              </p>
              <p>
                Based in Atlanta, Georgia, we&apos;ve grown from serving our local
                community to helping customers across the country. Every installation
                we do reflects our founding principle: do it right, do it clean,
                and make sure the customer understands their system before we leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Mission",
                desc: "To bridge the connectivity and security gap for businesses and homes through professional internet installation, networking, and security systems.",
              },
              {
                icon: Heart,
                title: "Customer First",
                desc: "We don't just drop off equipment and walk away. We educate every customer so they can maximize their investment.",
              },
              {
                icon: Shield,
                title: "Quality",
                desc: "Every installation is clean, professional, and built to last. No messy cables, no shortcuts, no compromises.",
              },
              {
                icon: BookOpen,
                title: "Education",
                desc: "We believe an informed customer is a satisfied customer. We take the time to explain, demonstrate, and empower.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education-First */}
      <section className="py-16 sm:py-24 bg-[#0A1628]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                The Education-First Difference
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Most installers mount some equipment, hand you a receipt, and drive
                away. We take a different approach.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Before every installation, we consult with you about the right
                service, equipment, and configuration. After installation, we walk you
                through your system — how to check performance, troubleshoot issues,
                manage your network, and get the most out of your setup.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Our customers don&apos;t just get faster internet. They get the
                confidence and knowledge to manage it themselves.
              </p>
              <Link
                href="/services"
                className="inline-flex rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-[#0A1628] border border-white/10 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                What You Get With Every Installation
              </h3>
              <ul className="space-y-4">
                {[
                  "Free consultation and property assessment",
                  "Professional equipment mounting and installation",
                  "Clean, concealed cable routing",
                  "Full device connection and speed verification",
                  "Post-installation walkthrough and education",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-blue-400 mt-1 flex-shrink-0">&#10003;</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 text-sm mt-6 pt-6 border-t border-white/10">
                Services include: internet installation, business networking, Wi-Fi
                systems, structured cabling, point-to-point links, and security cameras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Starnet Pros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "We work with every provider",
                body: "We're not tied to any single internet provider or brand. Our only job is to get you the right setup and install it correctly — so our advice is 100% in your interest.",
              },
              {
                title: "Clean work, every time",
                body: "We take pride in cable routing, mounting, and finish quality. No exposed wires, no shortcuts. Your installation should look as good as it performs.",
              },
              {
                title: "You'll know how it works",
                body: "Before we leave, you'll understand how to monitor your network, troubleshoot common issues, and manage your systems. We want you confident, not dependent.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Serving Businesses & Homes Nationwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Based in Atlanta, GA, we serve customers across Georgia, North
            Carolina, Texas, Colorado, Michigan, New Mexico, Florida — with
            more states being added regularly.
          </p>
          <Link
            href="/service-areas"
            className="inline-flex rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            View Service Areas
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
