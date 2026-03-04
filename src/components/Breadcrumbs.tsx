import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
