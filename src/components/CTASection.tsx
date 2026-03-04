import Link from "next/link";
import { Phone } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  showPhone?: boolean;
}

export default function CTASection({
  title = "Ready to Get Connected?",
  subtitle = "Book your professional Starlink installation today and experience the internet you've been waiting for.",
  ctaText = "Book Your Installation",
  ctaHref = "/book",
  showPhone = true,
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-600 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-700 hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto"
          >
            {ctaText}
          </Link>
          {showPhone && (
            <a
              href="tel:+18334112089"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              (833) 411-2089
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
