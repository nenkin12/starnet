import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SalesOrderForm from "@/components/sales/SalesOrderForm";

export const metadata: Metadata = {
  title: "Sales Order Form | Starnet Pros",
  robots: { index: false, follow: false },
};

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Starnet Pros" width={140} height={40} className="h-9 w-auto" />
          </Link>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Sales Order Form
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SalesOrderForm />
      </main>
    </div>
  );
}
