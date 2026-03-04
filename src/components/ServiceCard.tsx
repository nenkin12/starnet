import Link from "next/link";
import {
  MessageSquare,
  Wrench,
  Building2,
  Truck,
  Radio,
  BarChart3,
  Camera,
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

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  id: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  id,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || MessageSquare;

  return (
    <Link
      href={`/services#${id}`}
      className="group block rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
