import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Starnet Pros",
  description: "Thank you for contacting Starnet Pros. We'll be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ConversionPage() {
  return (
    <>
      <div className="bg-[#0A1628] pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mb-8">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Your request has been received. You should receive a confirmation
            text message to your phone shortly. A member of our team will
            reach out within 24 hours to discuss your project and schedule
            your installation.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "We Review Your Request",
                desc: "Our team reviews your submission and prepares a personalized plan based on your property and needs.",
              },
              {
                step: "2",
                title: "Check Your Phone",
                desc: "You'll receive a confirmation text message right away. Then expect a call or email within 24 hours to confirm details and schedule your date.",
              },
              {
                step: "3",
                title: "Professional Installation",
                desc: "Our certified technicians arrive on time, complete the install, verify speeds, and walk you through everything.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center">
            <p className="text-gray-700 mb-2">
              Need to reach us sooner?
            </p>
            <a
              href="tel:+18334112089"
              className="inline-flex items-center gap-2 text-xl font-semibold text-blue-600 hover:text-blue-500 transition-colors"
            >
              <Phone className="h-5 w-5" />
              (833) 411-2089
            </a>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
