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
      "We had them set up our entire office network — structured cabling, access points, the works. The difference is night and day. Video calls finally work without dropping, and the whole team noticed the speed improvement immediately.",
    author: "Sarah W.",
    type: "business",
  },
  {
    id: 3,
    quote:
      "Fast, friendly, and knowledgeable! Starnet Pros made getting our business connected easy, and now we have reliable internet and Wi-Fi coverage across our entire property.",
    author: "Verified Customer",
    type: "general",
  },
  {
    id: 4,
    quote:
      "We run a small warehouse and needed security cameras plus a proper network. Starnet Pros handled the whole project — cabling, cameras, Wi-Fi — all clean and professional. Best investment we've made.",
    author: "James R.",
    type: "business",
  },
  {
    id: 5,
    quote:
      "As a small business owner, reliable internet and security were always a challenge. Starnet Pros not only got us connected but also optimized our network for seamless video calls, file transfers, and cloud work. They even set up our camera system.",
    author: "Business Customer",
    type: "business",
  },
  {
    id: 6,
    quote:
      "We needed cameras across three retail locations with centralized remote viewing. Starnet Pros handled every site — wiring, NVR setup, mobile app configuration — and finished ahead of schedule. Loss prevention has never been easier.",
    author: "David L.",
    type: "business",
  },
  {
    id: 7,
    quote:
      "After a break-in attempt at our warehouse, we called Starnet Pros for a full security camera system. They installed 12 cameras, set up motion alerts, and ran all the cabling clean and out of sight. We can see every angle from our phones now — total peace of mind.",
    author: "Angela M.",
    type: "business",
  },
];
