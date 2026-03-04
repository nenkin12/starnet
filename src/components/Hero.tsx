import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText = "Book Your Installation",
  ctaHref = "/book",
  secondaryCta,
  secondaryHref,
  backgroundImage = "/images/hero-starlink-installation.jpg",
}: HeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A1628]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/40 to-[#0A1628]" />
      </div>

      {/* Geometric accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 border border-blue-400 rounded-full" />
        <div className="absolute top-40 right-40 w-96 h-96 border border-blue-400/50 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-all hover:shadow-blue-500/30 w-full sm:w-auto"
          >
            {ctaText}
          </Link>
          {secondaryCta && secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-lg border border-white/20 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              {secondaryCta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
