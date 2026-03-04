export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  benefits: string[];
  details: string;
  image?: string;
}

export const services: Service[] = [
  {
    id: "starlink-consultation",
    title: "Starlink Consultation",
    shortTitle: "Consultation",
    icon: "MessageSquare",
    description:
      "Get expert guidance on Starlink options, equipment selection, mounting solutions, cable routing, and Wi-Fi performance best practices before your installation.",
    details:
      "Not sure which Starlink plan or equipment is right for you? Our certified consultants walk you through every option — from residential to business kits — so you make the right choice the first time. We assess your property, recommend optimal dish placement for maximum signal strength, and plan cable routing that keeps your installation clean and professional. No pressure, no upsells — just honest, expert advice.",
    benefits: [
      "Personalized equipment recommendations",
      "Property assessment for optimal dish placement",
      "Cable routing and mounting plan",
      "Wi-Fi coverage optimization advice",
      "Plan comparison and cost guidance",
    ],
    image: "/images/work/dish-mount-roof.jpg",
  },
  {
    id: "professional-installation",
    title: "Professional Installation",
    shortTitle: "Installation",
    icon: "Wrench",
    description:
      "Secure, clean mounting on your home or building with outdoor-rated cabling, professional cable routing, and full device connection assistance.",
    details:
      "Our professional installation service is the core of what we do. We securely mount your Starlink dish in the optimal location, run outdoor-rated cabling through walls, conduit, or trenching — whatever your property requires. Every cable is neatly routed and secured. We connect all your devices, verify speeds, and walk you through everything before we leave. No messy cables, no guesswork, no callbacks.",
    benefits: [
      "Secure, weatherproof mounting",
      "Clean cable routing — no messy installations",
      "Wall passes, conduit, and trenching options",
      "Full device connection and speed verification",
      "Post-installation walkthrough and education",
    ],
    image: "/images/work/dish-mount-rural.jpg",
  },
  {
    id: "commercial-solutions",
    title: "Commercial & Business Solutions",
    shortTitle: "Commercial",
    icon: "Building2",
    description:
      "Enterprise-grade Starlink network design, installation, and performance monitoring for businesses across agriculture, oil & gas, transportation, and more.",
    details:
      "Starlink is transforming how businesses in remote and underserved areas stay connected. We design and install commercial-grade Starlink networks tailored to your industry — whether you're running a farm, managing oil field operations, or coordinating a fleet. Our solutions include multi-access point setups, network performance monitoring, and cost-efficiency guidance to maximize your ROI.",
    benefits: [
      "Custom network design for your business",
      "Multi-access point configurations",
      "Performance monitoring setup",
      "Industry-specific solutions",
      "Cost-efficiency and ROI guidance",
    ],
    image: "/images/work/dish-wall-mount-install.jpg",
  },
  {
    id: "rv-mobile-installation",
    title: "RV & Mobile Installation",
    shortTitle: "RV / Mobile",
    icon: "Truck",
    description:
      "Stay connected on the road with professional Starlink setup designed for full-time travelers, RVers, and mobile users.",
    details:
      "Life on the road shouldn't mean losing your internet connection. We help full-time travelers and RV owners choose the right Starlink Roam plan and install it for reliable connectivity wherever you go. Our mobile installations are designed to be secure, aerodynamic, and easy to use — so you can stream, work, and stay connected from any campsite or parking spot in the country.",
    benefits: [
      "Roam plan selection guidance",
      "Secure, aerodynamic mounting for vehicles",
      "Optimized for travel and mobile use",
      "Works at campsites, rest stops, and remote locations",
      "Quick setup and teardown assistance",
    ],
    image: "/images/work/speed-test-572mbps.jpg",
  },
  {
    id: "point-to-point",
    title: "Point-to-Point Installation",
    shortTitle: "Point-to-Point",
    icon: "Radio",
    description:
      "Establish reliable, high-speed connections between two locations — ideal for properties with multiple buildings, barns, or outbuildings.",
    details:
      "Need to extend your internet connection to a second building, barn, workshop, or guest house? Our point-to-point installation service creates a dedicated high-speed wireless bridge between two locations on your property. This is perfect for farms, ranches, estates, and commercial properties where running cable isn't practical. We handle the complete setup — from site survey to final speed verification.",
    benefits: [
      "High-speed connection between buildings",
      "No need for trenching or long cable runs",
      "Ideal for farms, ranches, and estates",
      "Reliable in all weather conditions",
      "Complete site survey and installation",
    ],
    image: "/images/work/starlink-app-obstructions.jpg",
  },
  {
    id: "security-camera-installation",
    title: "Security Camera & System Installation",
    shortTitle: "Security Systems",
    icon: "Camera",
    description:
      "Professional security camera and surveillance system installation for homes and businesses — wired or wireless, indoor and outdoor.",
    details:
      "Protect your property with professionally installed security cameras and surveillance systems. We design, install, and configure complete security setups tailored to your property — from single-camera residential systems to multi-camera commercial installations. Our team handles mounting, wiring, network configuration, and remote access setup so you can monitor your property from anywhere. We work with leading brands and integrate your security system with your existing network for seamless performance.",
    benefits: [
      "Custom security system design for your property",
      "Indoor and outdoor camera installation",
      "Professional wiring and cable concealment",
      "Remote viewing and mobile app setup",
      "Integration with existing network and Starlink",
    ],
    image: "/images/services/security-camera.svg",
  },
  {
    id: "plan-comparison",
    title: "Plan Comparison Guidance",
    shortTitle: "Plan Guidance",
    icon: "BarChart3",
    description:
      "Understand the differences between Starlink Standard, Roam, and Business kits with expert, unbiased guidance tailored to your needs.",
    details:
      "Starlink offers multiple plans and hardware options, and choosing the wrong one can cost you hundreds of dollars and months of frustration. We break down the differences between Standard, Roam, Priority, and Business plans in plain language — covering speeds, data caps, portability, and pricing. Our guidance is 100% unbiased because we don't sell Starlink equipment. We just help you make the smartest choice.",
    benefits: [
      "Unbiased, education-first approach",
      "Side-by-side plan comparisons",
      "Hardware and equipment guidance",
      "Cost analysis and recommendations",
      "No equipment sales — just honest advice",
    ],
    image: "/images/services/plan-comparison.svg",
  },
];
