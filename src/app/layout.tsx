import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageViewTracker } from "@/components/PageViewTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Starnet Pros | Residential & Business Internet, Networking & Security",
    template: "%s | Starnet Pros",
  },
  description:
    "Professional internet installation, networking, Wi-Fi solutions, structured cabling, and security cameras for homes and businesses. Expert setup, clean installations, and nationwide service.",
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
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
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
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4XZHF2HSJ0"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4XZHF2HSJ0');` }} />

        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','4296792303973431');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4296792303973431&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Microsoft UET tag — Starnet Leads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,t,u,o){w[u]=w[u]||[],o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.net/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:""),n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)})(window,document,"script","uetq",{ti:"343237477",enableAutoSpaTracking:true});`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <PageViewTracker />
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
