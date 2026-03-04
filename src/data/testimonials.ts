export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  type: "residential" | "rv" | "business" | "general";
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Starnet Pros did an amazing job! The installation was clean, professional, and rock-solid. No messy cables, just a perfect setup that works flawlessly. Highly recommend!",
    author: "Mark T.",
    type: "residential",
  },
  {
    id: 2,
    quote:
      "I never thought I'd see fast internet out here, but Starnet Pros made it happen! Now I'm getting over 600 Mbps in the middle of nowhere. Life-changing!",
    author: "Sarah W.",
    type: "residential",
  },
  {
    id: 3,
    quote:
      "Fast, friendly, and knowledgeable! Starnet Pros made getting set up easy, and now I have reliable internet no matter the weather.",
    author: "Verified Customer",
    type: "general",
  },
  {
    id: 4,
    quote:
      "I've been traveling full-time in my RV for over a year, and staying connected was always a challenge. Starnet Pros helped me choose the right Starlink plan and made installation easy.",
    author: "RV Customer",
    type: "rv",
  },
  {
    id: 5,
    quote:
      "As a small business owner operating from a cabin in the mountains, reliable internet was always a challenge. I turned to Starnet Pros, and they not only helped me get Starlink set up but also optimized my network for seamless video calls, file transfers, and cloud work.",
    author: "Business Customer",
    type: "business",
  },
];
