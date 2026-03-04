"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "About", href: "/about" },
  { name: "Store", href: "/store" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Starnet Pros Logo"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            <a
              href="tel:+18334112089"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              (833) 411-2089
            </a>
            <Link
              href="/book"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-gray-200 my-2" />
              <a
                href="tel:+18334112089"
                className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 px-2 py-1"
              >
                <Phone className="h-4 w-4" />
                (833) 411-2089
              </a>
              <Link
                href="/book"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-base font-semibold text-white hover:bg-blue-500 transition-colors mt-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
