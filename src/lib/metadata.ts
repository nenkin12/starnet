import type { Metadata } from "next";

const BASE_URL = "https://www.starnetpros.com";

export function createMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const image = ogImage || `${BASE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Starnet Pros",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
