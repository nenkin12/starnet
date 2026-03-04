import Link from "next/link";
import { Calendar, Clock, Satellite, MapPin } from "lucide-react";

// Generate a consistent color scheme from slug
function getCardTheme(slug: string) {
  const themes = [
    { from: "#0A1628", via: "#1E3A5F", accent: "#3B82F6" },
    { from: "#0F172A", via: "#1E3A5F", accent: "#60A5FA" },
    { from: "#0C1222", via: "#172554", accent: "#2563EB" },
    { from: "#0A1628", via: "#1E40AF", accent: "#93C5FD" },
    { from: "#111827", via: "#1F2937", accent: "#3B82F6" },
    { from: "#0F172A", via: "#0E2A4E", accent: "#38BDF8" },
    { from: "#0A1628", via: "#1E3A5F", accent: "#818CF8" },
    { from: "#0C1222", via: "#1A365D", accent: "#60A5FA" },
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return themes[Math.abs(hash) % themes.length];
}

// Extract state name or topic label from slug
function getCardLabel(slug: string): { label: string; isState: boolean } {
  const stateMatch = slug.match(/^starlink-installation-in-(.+)$/);
  if (stateMatch) {
    const state = stateMatch[1]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return { label: state, isState: true };
  }
  return { label: "", isState: false };
}

// Simple state abbreviation map
const stateAbbreviations: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY",
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  date,
  readTime,
  image,
  imageAlt,
}: BlogCardProps) {
  const theme = getCardTheme(slug);
  const { label, isState } = getCardLabel(slug);
  const abbr = isState ? stateAbbreviations[label.toLowerCase()] || "" : "";

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 transition-all"
    >
      <div
        className="aspect-video relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.from} 100%)`,
        }}
      >
        {image ? (
          <>
            <img
              src={image}
              alt={imageAlt || title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <>
            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Decorative circles */}
            <div
              className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10"
              style={{ background: theme.accent }}
            />
            <div
              className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full opacity-[0.07]"
              style={{ background: theme.accent }}
            />

            {isState ? (
              /* State post visual */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {abbr && (
                  <span
                    className="text-5xl font-black tracking-wider opacity-20 mb-1"
                    style={{ color: theme.accent }}
                  >
                    {abbr}
                  </span>
                )}
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="h-3.5 w-3.5" style={{ color: theme.accent }} />
                  <span
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: theme.accent }}
                  >
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 opacity-40">
                  <Satellite className="h-4 w-4 text-white" />
                  <span className="text-[10px] text-white font-medium tracking-widest uppercase">
                    Starlink Installation
                  </span>
                </div>
              </div>
            ) : (
              /* Topical post visual */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <Satellite
                  className="h-10 w-10 mb-3 opacity-30"
                  style={{ color: theme.accent }}
                />
                <span
                  className="text-xs font-semibold tracking-wide uppercase text-center leading-relaxed max-w-[200px] opacity-60"
                  style={{ color: theme.accent }}
                >
                  {title.length > 50 ? title.slice(0, 50) + "..." : title}
                </span>
              </div>
            )}

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-blue-600 group-hover:text-blue-500">
          Read more &rarr;
        </span>
      </div>
    </Link>
  );
}
