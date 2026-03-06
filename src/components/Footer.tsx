import Link from "next/link";
import { Phone, Clock } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Starlink Consultation", href: "/services#starlink-consultation" },
    { name: "Professional Installation", href: "/services#professional-installation" },
    { name: "Commercial Solutions", href: "/services#commercial-solutions" },
    { name: "RV & Mobile Installation", href: "/services#rv-mobile-installation" },
    { name: "Point-to-Point", href: "/services#point-to-point" },
    { name: "Security Systems", href: "/services#security-camera-installation" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Contact", href: "/contact" },
    { name: "Book Installation", href: "/book" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img
              src="/images/logo.png"
              alt="Starnet Pros Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm mb-4">
              Professional networking, Starlink installation, and security
              camera systems — serving customers nationwide.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+18334112089"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                (833) 411-2089
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="h-4 w-4 flex-shrink-0" />
                Mon–Fri 8:00 AM – 6:00 PM
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-xs text-center mb-3">
            Starnetpros.com is an independent platform and has no affiliation,
            sponsorship, or endorsement from Starlink, SpaceX, or their
            associated companies.
          </p>
          <p className="text-gray-500 text-xs text-center">
            &copy; {new Date().getFullYear()} Starnet Pros. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
