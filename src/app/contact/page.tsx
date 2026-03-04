import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaperformEmbed from "@/components/PaperformEmbed";
import Hero from "@/components/Hero";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Contact Starnet Pros | Get a Free Quote",
  description:
    "Contact Starnet Pros for professional Starlink installation. Call (833) 411-2089 or fill out our form for a free quote. Based in Charlotte, NC, serving nationwide.",
  path: "/contact",
});

export default function ContactPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <Hero
        title="Get in Touch"
        subtitle="Ready to get connected? Reach out for a free consultation and custom installation quote."
        backgroundImage="/images/hero-contact.jpg"
        ctaText="Call (833) 411-2089"
        ctaHref="tel:+18334112089"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Contact" }]} />
      </div>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <a
                  href="tel:+18334112089"
                  className="flex items-start gap-4 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">(833) 411-2089</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@starnetpros.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      1125 Charlottetowne Ave
                      <br />
                      Charlotte, NC 28204
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <p className="text-gray-600">
                      Monday – Friday: 8:00 AM – 6:00 PM
                      <br />
                      Saturday – Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 aspect-square bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.4!2d-80.83!3d35.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzEyLjAiTiA4MMKwNDknNDguMCJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Starnet Pros Location"
                />
              </div>
            </div>

            {/* Paperform Embed */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours with a custom quote.
                </p>
                <PaperformEmbed />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
