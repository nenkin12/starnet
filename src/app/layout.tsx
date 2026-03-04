import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Starnet Pros | Professional Networking, Starlink & Security Installation",
    template: "%s | Starnet Pros",
  },
  description:
    "Professional networking, Starlink installation, point-to-point systems, and security cameras for homes and businesses. Expert setup, clean cabling, 600+ Mbps speeds. Serving nationwide.",
  metadataBase: new URL("https://www.starnetpros.com"),
  openGraph: {
    type: "website",
    siteName: "Starnet Pros",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image-landscape.png",
        width: 1200,
        height: 628,
        alt: "Starnet Pros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image-landscape.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} /> */}

        {/* Microsoft UET tag — replace with your tag ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `(function(w,d,t,r,u){...})(window,document,'script','https://bat.bing.com/bat.js','YOUR_TAG_ID');` }} /> */}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
