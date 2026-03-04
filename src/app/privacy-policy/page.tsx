import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Starnet Pros",
  description:
    "Starnet Pros privacy policy. Learn how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const schema = generateBreadcrumbSchema([
    { name: "Privacy Policy", url: "/privacy-policy" },
  ]);

  return (
    <>
      <SchemaMarkup schema={schema} />

      <div className="bg-[#0A1628] pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-gray-400">Last updated: January 1, 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
      </div>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-lg text-gray-600">
          <h2 className="text-gray-900">Introduction</h2>
          <p>
            Starnet Pros (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and
            is committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website starnetpros.com or use our
            services.
          </p>

          <h2 className="text-gray-900">Information We Collect</h2>
          <h3 className="text-gray-900">Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide
            when you:
          </p>
          <ul>
            <li>Fill out our contact form</li>
            <li>Book an installation appointment</li>
            <li>Call our phone number</li>
            <li>Subscribe to our communications</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Physical address or city</li>
            <li>Service preferences</li>
            <li>Messages or communications you send us</li>
          </ul>

          <h3 className="text-gray-900">Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain
            information, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>Device information</li>
          </ul>

          <h2 className="text-gray-900">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and manage our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Schedule and manage installation appointments</li>
            <li>Send you service-related communications</li>
            <li>Improve our website and services</li>
            <li>Analyze website usage and trends</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-gray-900">Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties except:
          </p>
          <ul>
            <li>
              To trusted service providers who assist us in operating our
              website and services
            </li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transaction such as a merger</li>
            <li>With your consent</li>
          </ul>

          <h2 className="text-gray-900">Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar tracking technologies to
            enhance your experience. You can set your browser to refuse cookies,
            but some features of our website may not function properly.
          </p>

          <h2 className="text-gray-900">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal
            information. However, no method of transmission over the Internet
            or electronic storage is 100% secure, and we cannot guarantee
            absolute security.
          </p>

          <h2 className="text-gray-900">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Request restriction of processing</li>
          </ul>

          <h2 className="text-gray-900">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these websites and
            encourage you to review their privacy policies.
          </p>

          <h2 className="text-gray-900">Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13.
            We do not knowingly collect personal information from children
            under 13.
          </p>

          <h2 className="text-gray-900">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &ldquo;Last updated&rdquo; date.
          </p>

          <h2 className="text-gray-900">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>
              Phone:{" "}
              <a href="tel:+18334112089">(833) 411-2089</a>
            </li>
            <li>
              Address: 1125 Charlottetowne Ave, Charlotte, NC 28204
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
