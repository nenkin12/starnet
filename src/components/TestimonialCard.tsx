import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
}

export default function TestimonialCard({
  quote,
  author,
}: TestimonialCardProps) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
      <blockquote className="text-gray-700 leading-relaxed text-sm">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="mt-4 text-sm font-semibold text-gray-900">— {author}</p>
    </div>
  );
}
