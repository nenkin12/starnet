import type { Metadata } from "next";
import ServiceCallForm from "@/components/ServiceCallForm";

export const metadata: Metadata = {
  title: "Starlink Service Call",
  description:
    "Having trouble with your Starlink? Tell us which dish you have and what's going on — we'll schedule a professional service call. Serving nationwide.",
};

export default function ServiceCallPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#0A1628] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Starlink Service Call
          </h1>
          <p className="text-lg text-gray-300">
            Slow speeds, dropouts, storm damage, or a dish that needs to move?
            Tell us what&apos;s going on and we&apos;ll get a technician on it.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
            <ServiceCallForm />
          </div>
        </div>
      </section>
    </main>
  );
}
