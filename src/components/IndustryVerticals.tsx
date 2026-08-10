import { Building2, ShoppingBag, Warehouse, UtensilsCrossed } from "lucide-react";

const verticals = [
  {
    icon: Building2,
    title: "Offices & Corporate",
    desc: "Structured cabling, enterprise Wi-Fi, VLANs, and security cameras — built for productivity and data security.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Storefronts",
    desc: "POS networks, loss-prevention cameras, customer Wi-Fi, and reliable connectivity across single or multi-location setups.",
  },
  {
    icon: Warehouse,
    title: "Warehouses & Industrial",
    desc: "Full-coverage Wi-Fi, loading dock cameras, point-to-point links, and rugged infrastructure for large facilities.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Hospitality",
    desc: "Kitchen cameras, guest Wi-Fi, POS networking, and surveillance systems tailored for food service and hospitality.",
  },
];

export default function IndustryVerticals() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Your Industry
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We design and install networking and security solutions tailored to
            the demands of your industry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden"
            >
              <div
                className="aspect-[3/2] bg-gradient-to-br from-[#0A1628] to-blue-900 flex items-center justify-center"
                data-placeholder={`industry-${v.title.toLowerCase().replace(/\s.*/, "")}`}
              >
                <v.icon className="h-12 w-12 text-blue-400/20" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
