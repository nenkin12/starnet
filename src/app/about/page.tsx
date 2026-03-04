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
    "Learn about Starnet Pros — professional Starlink installation, point-to-point networking, and security camera systems. Bridging the connectivity gap with an education-first approach.",
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
        subtitle="We believe everyone deserves reliable networking, high-speed internet, and secure properties — and the knowledge to make the most of it all."
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
                Starnet Pros was founded with a simple observation: Starlink was
                revolutionizing internet access for millions of people in rural
                and underserved areas — but too many customers were struggling to
                get the most out of it.
              </p>
              <p>
                We saw homeowners with dishes sitting on the ground getting
                half the speed they should. We met business owners who chose the
                wrong plan and wasted hundreds of dollars. We talked to families
                who gave up on Starlink entirely because their DIY installation
                didn&apos;t work — when all it needed was proper placement and
                setup.
              </p>
              <p>
                That gap between what Starlink <em>can</em> deliver and what
                most people <em>actually</em> experience is why Starnet Pros
                exists. Today, we&apos;ve expanded beyond Starlink to offer
                point-to-point networking and security camera installations.
                We&apos;re not just installers — we&apos;re educators,
                consultants, and advocates for getting people truly connected
                and protected.
              </p>
              <p>
                Based in Charlotte, North Carolina, we&apos;ve grown from
                serving our local community to helping customers across the
                Southeast and beyond. Every installation we do reflects our
                founding principle: do it right, do it clean, and make sure the
                customer understands their system before we leave.
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
                desc: "To bridge the connectivity and security gap in rural and underserved communities through professional Starlink, networking, and security system installation.",
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
                Most installers mount a dish, hand you a receipt, and drive
                away. We take a different approach.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Before every installation, we consult with you about the right
                plan, equipment, and placement. After installation, we walk you
                through your system — how to check speeds, troubleshoot issues,
                optimize your network, and understand your Starlink app.
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
                  "Pre-installation consultation and property assessment",
                  "Optimal dish placement with professional mounting",
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
                Add-ons: Point-to-point, mesh networking, and security camera
                systems are available as separate add-ons to your installation.
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
                title: "No conflict of interest",
                body: "We don't sell Starlink equipment. Our only job is to get you the right setup and install it correctly — so our advice is 100% in your interest.",
              },
              {
                title: "Clean work, every time",
                body: "We take pride in cable routing, mounting, and finish quality. No exposed wires, no shortcuts. Your installation should look as good as it performs.",
              },
              {
                title: "You'll know how it works",
                body: "Before we leave, you'll understand how to check speeds, use the Starlink app, and troubleshoot common issues. We want you confident, not dependent.",
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
            Expanding Nationwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Based in Charlotte, NC, we currently serve customers across North
            Carolina, Georgia, Texas, Colorado, Michigan, and New Mexico — with
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
