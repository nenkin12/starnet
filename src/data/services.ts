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
    id: "business-networking",
    title: "Business Networking Solutions",
    shortTitle: "Business",
    icon: "Building2",
    description:
      "Complete network design, installation, and management for businesses of all sizes — from single-office setups to multi-location enterprises.",
    details:
      "Your business depends on reliable connectivity. We design and install enterprise-grade networks tailored to your operation — structured cabling, managed switches, commercial Wi-Fi, VLANs, and firewall configuration. Whether you're a small office, retail location, warehouse, or multi-site operation, we build networks that keep your team productive and your data secure. We handle everything from initial network assessment to ongoing support.",
    benefits: [
      "Custom network design and architecture",
      "Structured cabling and rack buildouts",
      "Commercial-grade Wi-Fi and access points",
      "Firewall, VLAN, and security configuration",
      "Scalable solutions that grow with your business",
    ],
    image: "/images/work/low-voltage-wiring.jpg",
  },
  {
    id: "security-camera-installation",
    title: "Security Camera & System Installation",
    shortTitle: "Security Systems",
    icon: "Camera",
    description:
      "Professional security camera and surveillance system installation for homes and businesses — wired or wireless, indoor and outdoor.",
    details:
      "Protect your property with professionally installed security cameras and surveillance systems. We design, install, and configure complete security setups tailored to your property — from single-camera residential systems to multi-camera commercial deployments with NVR/DVR recording, Cat6 runs, and centralized monitoring. Our team handles strategic camera placement, wiring, network configuration, and remote access setup so you can monitor your property from anywhere. We serve retail stores, warehouses, offices, restaurants, and multi-location businesses with scalable systems built for 24/7 reliability.",
    benefits: [
      "Custom security system design for your property",
      "Indoor and outdoor camera installation",
      "Professional wiring and cable concealment",
      "Remote viewing and mobile app setup",
      "Integration with your existing network",
      "NVR/DVR recording and storage configuration",
      "Motion detection and smart alerts setup",
    ],
    image: "/images/work/security-camera-dome-install.webp",
  },
  {
    id: "internet-installation",
    title: "Internet Installation & Setup",
    shortTitle: "Internet",
    icon: "Wrench",
    description:
      "Professional installation for any type of internet service — fiber, cable, fixed wireless, satellite, and more. We get you connected right the first time.",
    details:
      "Whether you're switching to fiber, setting up cable internet, going with fixed wireless, or installing satellite service like Starlink — we handle the full installation. That means clean cable routing, proper equipment mounting, wall passes, conduit runs, and full device connection. We work with every major provider and technology so you get the best setup for your location and budget. Every install includes speed verification and a walkthrough before we leave.",
    benefits: [
      "Works with all internet types — fiber, cable, fixed wireless, satellite",
      "Clean cable routing and professional mounting",
      "Wall passes, conduit, and trenching options",
      "Full device connection and speed verification",
      "Post-installation walkthrough and education",
    ],
    image: "/images/work/dish-mount-rural.jpg",
  },
  {
    id: "wifi-solutions",
    title: "Wi-Fi & Wireless Solutions",
    shortTitle: "Wi-Fi",
    icon: "Radio",
    description:
      "Whole-property Wi-Fi coverage for homes and businesses — dead zones eliminated with enterprise-grade access points and mesh systems.",
    details:
      "Slow Wi-Fi and dead zones cost you time and money. We assess your property, identify coverage gaps, and install the right wireless solution — whether that's commercial access points, mesh systems, or outdoor Wi-Fi for large properties. Our installations include proper access point placement, PoE cabling, controller configuration, and network optimization. The result: fast, reliable Wi-Fi in every corner of your home or business.",
    benefits: [
      "Whole-property Wi-Fi coverage assessment",
      "Enterprise-grade access points and mesh systems",
      "PoE cabling and professional mounting",
      "Network optimization and channel tuning",
      "Indoor and outdoor coverage solutions",
    ],
    image: "/images/work/wireless-network-diagram.jpeg",
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
      "Ideal for farms, ranches, and business campuses",
      "Reliable in all weather conditions",
      "Complete site survey and installation",
    ],
    image: "/images/work/starlink-app-obstructions.jpg",
  },
  {
    id: "consultation",
    title: "Free Network Consultation",
    shortTitle: "Consultation",
    icon: "MessageSquare",
    description:
      "Get expert guidance on the best internet, networking, and security solutions for your home or business — before any work begins.",
    details:
      "Not sure what internet service, network setup, or security system is right for you? Our consultants assess your property and needs, then recommend the best solution — whether that's fiber, fixed wireless, satellite, a full network overhaul, or a security upgrade. We evaluate your current setup, identify bottlenecks, and create a plan that fits your budget. No pressure, no upsells — just honest, expert advice tailored to your situation.",
    benefits: [
      "Free property and network assessment",
      "Internet service and provider recommendations",
      "Network design and upgrade planning",
      "Security system recommendations",
      "Budget-conscious solutions",
    ],
    image: "/images/work/security-camera-wall-install.jpeg",
  },
  {
    id: "structured-cabling",
    title: "Structured Cabling & Low Voltage",
    shortTitle: "Cabling",
    icon: "BarChart3",
    description:
      "Professional structured cabling for offices, retail, warehouses, and new construction — Cat6, fiber runs, patch panels, and server racks.",
    details:
      "A reliable network starts with proper cabling. We install structured cabling systems for businesses and new construction — including Cat6/Cat6a runs, fiber optic cables, patch panels, network racks, and cable management. Whether you're building out a new office, upgrading an existing space, or wiring a warehouse, our installations are clean, labeled, and built to industry standards. We also handle low-voltage wiring for security cameras, access control, and audio/video systems.",
    benefits: [
      "Cat6/Cat6a and fiber optic installation",
      "Patch panels, racks, and cable management",
      "New construction and retrofit wiring",
      "Low-voltage for security and AV systems",
      "Labeled, tested, and documented runs",
    ],
    image: "/images/work/structured-cabling-rack.webp",
  },
];
