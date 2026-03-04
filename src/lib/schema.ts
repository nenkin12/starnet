const BUSINESS_INFO = {
  name: "Starnet Pros",
  phone: "(833) 411-2089",
  phoneE164: "+18334112089",
  url: "https://www.starnetpros.com",
  address: {
    streetAddress: "1125 Charlottetowne Ave",
    addressLocality: "Charlotte",
    addressRegion: "NC",
    postalCode: "28204",
    addressCountry: "US",
  },
  hours: ["Mo-Fr 08:00-18:00"],
  image: "https://www.starnetpros.com/images/logo.png",
  description:
    "Professional Starlink satellite internet installation company serving residential and commercial clients across North Carolina and expanding nationally.",
};

export function generateLocalBusinessSchema(areaServed?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_INFO.name,
    image: BUSINESS_INFO.image,
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.phoneE164,
    description: BUSINESS_INFO.description,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.address,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    ...(areaServed && {
      areaServed: {
        "@type": "City",
        name: areaServed,
      },
    }),
    priceRange: "$$",
    sameAs: [
      "https://www.trustpilot.com/review/starnetpros.com",
      "https://www.yelp.com/biz/starnet-pros-charlotte-3",
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.image,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_INFO.phoneE164,
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.trustpilot.com/review/starnetpros.com",
      "https://www.yelp.com/biz/starnet-pros-charlotte-3",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
  };
}

export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  areaServed?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phoneE164,
      url: BUSINESS_INFO.url,
    },
    ...(areaServed && {
      areaServed: {
        "@type": "City",
        name: areaServed,
      },
    }),
  };
}

export function generateArticleSchema(
  title: string,
  datePublished: string,
  author: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: BUSINESS_INFO.image,
      },
    },
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BUSINESS_INFO.url}${item.url}`,
    })),
  };
}

export function generateFAQSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
