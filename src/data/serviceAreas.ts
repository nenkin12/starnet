export interface ServiceArea {
  city: string;
  state: string;
  stateAbbr: string;
  slug: string;
  description: string;
  challenges: string;
  benefits: string;
  testimonialId: number;
}

import { serviceAreasSoutheast } from "./serviceAreasSoutheast";
import { serviceAreasNortheast } from "./serviceAreasNortheast";
import { serviceAreasMidwest } from "./serviceAreasMidwest";
import { serviceAreasWest } from "./serviceAreasWest";
import { serviceAreasNationwide } from "./serviceAreasNationwide";

export const serviceAreas: ServiceArea[] = [
  ...serviceAreasSoutheast,
  ...serviceAreasNortheast,
  ...serviceAreasMidwest,
  ...serviceAreasWest,
  ...serviceAreasNationwide,
  // North Carolina (detailed)
  {
    city: "Charlotte",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "charlotte-nc",
    description:
      "As the largest city in North Carolina, Charlotte is a hub of growth and innovation. But even in a metro area of over 2.6 million people, reliable high-speed internet remains a challenge for many residents and businesses — especially those in the rapidly expanding suburbs and surrounding rural communities. Starnet Pros is headquartered right here in Charlotte, and we're proud to serve our home city with professional Starlink installation services. Whether you're in a newly built neighborhood still waiting on fiber infrastructure, a rural property in Mecklenburg County, or a business in an area underserved by traditional ISPs, we deliver fast, clean, and reliable Starlink installations that get you connected the right way.",
    challenges:
      "Many Charlotte-area neighborhoods outside the urban core still rely on outdated cable or DSL connections. New developments often face months-long waits for traditional ISPs to lay infrastructure. Starlink provides an immediate, high-speed alternative.",
    benefits:
      "With Starlink installed by Starnet Pros, Charlotte-area customers enjoy speeds that rival fiber — with customers reporting speeds over 600 Mbps. Our local presence means faster scheduling and same-week installations from a team that knows the area inside and out.",
    testimonialId: 1,
  },
  {
    city: "Raleigh",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "raleigh-nc",
    description:
      "Raleigh, the capital of North Carolina and a cornerstone of the Research Triangle, is one of the fastest-growing cities in the Southeast. While the city itself boasts strong broadband options, many communities just outside Raleigh — in Wake, Johnston, and Franklin counties — face significant connectivity gaps. Starnet Pros provides professional Starlink installation services across the greater Raleigh area, helping homeowners and businesses break free from slow, unreliable internet. Our installations are clean, professional, and built to last, giving you the high-speed connection you need without waiting for traditional ISPs to catch up.",
    challenges:
      "The Triangle region is growing fast, and infrastructure hasn't kept pace. Rural properties east and south of Raleigh often have limited options beyond satellite or fixed wireless with poor performance. Even some suburban developments face delays getting wired broadband.",
    benefits:
      "Starlink delivers low-latency, high-speed internet to areas where cable and fiber haven't reached. Starnet Pros ensures your installation is done right — with optimal dish placement for clear sky views and clean cable routing through your home or office.",
    testimonialId: 2,
  },
  {
    city: "Asheville",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "asheville-nc",
    description:
      "Nestled in the Blue Ridge Mountains, Asheville is known for its vibrant arts scene, stunning natural beauty, and growing remote-work community. But the same mountains that make Asheville beautiful also make reliable internet a real challenge. Winding roads, steep terrain, and low population density have left many Asheville-area residents and businesses without viable broadband options. Starnet Pros brings professional Starlink installation to Asheville and the surrounding mountain communities. We understand the unique challenges of working in mountainous terrain — from finding the right mounting angle to routing cables through older homes and cabins.",
    challenges:
      "Mountain terrain creates dead zones where traditional internet can't reach. Dense tree cover can affect satellite signal. Many homes in Buncombe and surrounding counties are off the beaten path, making traditional ISP service expensive or impossible to obtain.",
    benefits:
      "Starlink's satellite constellation provides coverage regardless of terrain. Our certified installers know how to position your dish for maximum sky visibility even in wooded, mountainous areas. We've helped dozens of mountain residents finally get the fast, reliable internet they need.",
    testimonialId: 5,
  },
  {
    city: "Murphy",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "murphy-nc",
    description:
      "Murphy sits in the far western tip of North Carolina, surrounded by the Nantahala National Forest and the Cherokee County mountains. It's one of the most remote and beautiful parts of the state — and one of the most underserved when it comes to internet connectivity. For residents and small business owners in Murphy and surrounding communities like Andrews, Hayesville, and Brasstown, Starlink has been a game-changer. Starnet Pros provides expert installation services throughout Cherokee County, ensuring your dish is mounted securely, cables are routed cleanly, and your connection is optimized for the best possible speeds.",
    challenges:
      "Cherokee County has some of the lowest broadband adoption rates in North Carolina. DSL is often the only option, and speeds rarely exceed 10 Mbps. Many residents rely on cellular hotspots, which are unreliable and expensive.",
    benefits:
      "Starlink brings true broadband speeds to one of the most underserved areas in the state. With professional installation from Starnet Pros, Murphy residents are seeing speeds they never thought possible — streaming, video calls, and remote work are finally viable.",
    testimonialId: 2,
  },
  {
    city: "Wilmington",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "wilmington-nc",
    description:
      "Wilmington, located along the Cape Fear River and North Carolina's southern coast, is a thriving port city with a growing tech and film industry. While downtown Wilmington has decent broadband, many coastal and rural communities in New Hanover, Brunswick, and Pender counties struggle with spotty service — especially during hurricane season when ground-based infrastructure is vulnerable. Starnet Pros serves the greater Wilmington area with professional Starlink installations that are built to withstand coastal weather conditions. Our installations use outdoor-rated hardware and secure mounting techniques designed for wind resistance and salt air durability.",
    challenges:
      "Coastal storms and hurricanes can knock out traditional internet for days or weeks. Barrier island communities and rural coastal properties often have limited ISP options. Seasonal residents and vacation rental owners need reliable connectivity year-round.",
    benefits:
      "Starlink operates independently of ground infrastructure, making it resilient during storms and outages. Starnet Pros installations are designed with weather resistance in mind — secure mounts, weatherproof connections, and optimal positioning for the coastal environment.",
    testimonialId: 3,
  },
  {
    city: "Greensboro",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "greensboro-nc",
    description:
      "Greensboro, the third-largest city in North Carolina, anchors the Piedmont Triad region alongside Winston-Salem and High Point. While the urban core has standard broadband access, many areas in Guilford County and the surrounding rural communities face significant connectivity gaps. Starnet Pros provides professional Starlink installation services across the greater Greensboro area. We help homeowners and businesses in underserved areas access high-speed satellite internet with clean, professional installations that just work.",
    challenges:
      "Suburban sprawl and rural areas south and east of Greensboro often lack cable or fiber infrastructure. Small businesses in industrial areas sometimes find traditional ISPs too slow or too expensive. Legacy DSL connections are common but insufficient for modern needs.",
    benefits:
      "Starlink provides a fast, reliable alternative to outdated DSL and spotty cable. Our team ensures your installation is optimized for the Piedmont region — flat terrain means excellent sky visibility and strong signal performance in most locations.",
    testimonialId: 1,
  },
  {
    city: "Durham",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "durham-nc",
    description:
      "Durham is a hub for research, healthcare, and technology — home to Duke University and a thriving startup scene. But step outside the city limits into Durham County's rural stretches, and internet access drops off dramatically. Starnet Pros brings professional Starlink installation to the greater Durham area, serving both urban and rural customers who want fast, reliable satellite internet. Whether you're working from home in a rural part of the county or running a business that needs a backup connection, we deliver clean, professional installations every time.",
    challenges:
      "Rural Durham County and neighboring Person and Granville counties have limited broadband options. Work-from-home professionals in these areas struggle with video calls and cloud-based tools on slow connections. Traditional ISPs have been slow to expand into less profitable areas.",
    benefits:
      "Starlink gives Durham-area residents broadband-quality speeds without waiting for fiber to arrive. Our installations include full device setup, speed verification, and a walkthrough so you know exactly how to get the most from your connection.",
    testimonialId: 2,
  },
  {
    city: "Fayetteville",
    state: "North Carolina",
    stateAbbr: "NC",
    slug: "fayetteville-nc",
    description:
      "Fayetteville, home to Fort Liberty (formerly Fort Bragg), is one of North Carolina's most important military communities. The city serves a large population of active-duty service members, veterans, and their families — many of whom live in rural areas of Cumberland and Harnett counties where internet options are limited. Starnet Pros provides professional Starlink installation services throughout the Fayetteville area. We understand the importance of reliable connectivity for military families — whether it's staying in touch with deployed service members, supporting remote work, or enabling kids' online learning.",
    challenges:
      "Rural areas around Fayetteville have limited cable coverage. Military families stationed in off-base housing often face subpar internet options. The flat, open terrain of the Sandhills region is actually ideal for satellite reception, making Starlink an excellent choice.",
    benefits:
      "The open terrain around Fayetteville provides excellent sky views for Starlink, resulting in strong, consistent speeds. Starnet Pros offers fast scheduling and professional installation so military families can get connected quickly, even during PCS transitions.",
    testimonialId: 3,
  },
  // Georgia
  {
    city: "Young Harris",
    state: "Georgia",
    stateAbbr: "GA",
    slug: "young-harris-ga",
    description:
      "Young Harris is a small mountain town in Towns County, Georgia, right along the North Carolina border. Known for Young Harris College and the surrounding Appalachian beauty, this area is a haven for retirees, vacation homeowners, and small business owners who cherish the mountain lifestyle. But reliable internet has long been one of the biggest challenges of living here. Starnet Pros provides professional Starlink installation services throughout the Young Harris area and neighboring communities like Hiawassee, Blairsville, and Blue Ridge. Our team has extensive experience installing in mountainous terrain and knows how to position your dish for the best performance in the North Georgia mountains.",
    challenges:
      "Towns County and the surrounding area have extremely limited broadband options. DSL from the local telco is often the only wired option, with speeds rarely exceeding 5-10 Mbps. Cellular coverage is spotty at best in many valleys and hollows.",
    benefits:
      "Starlink transforms connectivity for mountain communities. With professional installation, residents can work remotely, stream content, and run businesses from locations that were previously off the grid. Our installers know how to maximize performance even in areas with heavy tree cover.",
    testimonialId: 5,
  },
  {
    city: "Milton",
    state: "Georgia",
    stateAbbr: "GA",
    slug: "milton-ga",
    description:
      "Milton, Georgia, is an affluent city in the northern reaches of Fulton County, known for its equestrian communities, large-lot estates, and a distinctly rural character despite being just 30 miles from downtown Atlanta. Many Milton residents chose the area for its space and privacy — but that same low-density development means internet service providers have been slow to build out infrastructure. Starnet Pros provides professional Starlink installation for Milton homeowners and businesses who are tired of slow DSL, unreliable fixed wireless, or paying premium prices for limited cable service. Our installations are designed to match the quality of your property — clean, professional, and invisible where possible.",
    challenges:
      "Large lot sizes and estate properties in Milton make cable and fiber buildout expensive for ISPs. Many residents on multi-acre properties are stuck with DSL or fixed wireless that can't support modern streaming, smart home, and work-from-home needs.",
    benefits:
      "Starlink provides fiber-like speeds without the need for ground infrastructure. Starnet Pros delivers installations that complement high-end properties — concealed cable runs, professional mounts, and a clean aesthetic that doesn't compromise your home's appearance.",
    testimonialId: 1,
  },
  // New Mexico
  {
    city: "Angel Fire",
    state: "New Mexico",
    stateAbbr: "NM",
    slug: "angel-fire-nm",
    description:
      "Angel Fire, nestled in the Sangre de Cristo Mountains of northern New Mexico, is a premier ski and outdoor recreation destination. This resort community draws visitors and part-time residents year-round, but reliable internet has always been a challenge at 8,600 feet elevation. Starnet Pros provides professional Starlink installation services for Angel Fire residents, vacation homeowners, and local businesses. Whether you're running a rental property, working remotely from your mountain retreat, or managing a local business, we ensure your Starlink system is installed for optimal performance in high-altitude mountain conditions.",
    challenges:
      "High altitude, mountainous terrain, and seasonal population fluctuations make traditional ISP investment in Angel Fire unattractive. Many homes rely on slow DSL or expensive cellular connections. Vacation rental owners need reliable internet for guest satisfaction and property management.",
    benefits:
      "Starlink provides consistent high-speed internet regardless of location or elevation. Professional installation ensures your dish is positioned to handle mountain weather and seasonal conditions. Vacation rental owners see improved reviews and bookings with reliable Wi-Fi.",
    testimonialId: 5,
  },
  // Texas
  {
    city: "Granbury",
    state: "Texas",
    stateAbbr: "TX",
    slug: "granbury-tx",
    description:
      "Granbury, Texas, is a charming lakeside city in Hood County, about an hour southwest of Fort Worth. Known for its historic town square, Lake Granbury, and growing retiree community, Granbury has seen significant residential growth in recent years. But internet infrastructure hasn't kept pace with new development. Starnet Pros provides professional Starlink installation for Granbury-area homeowners, lakefront property owners, and businesses. We bring fast, reliable internet to an area where cable and fiber coverage is inconsistent and often unavailable outside city limits.",
    challenges:
      "Hood County's rapid growth has outpaced ISP infrastructure. Lakefront and rural properties often have no cable or fiber options. Fixed wireless services are available but perform poorly during peak usage and bad weather.",
    benefits:
      "Starlink delivers consistent, high-speed internet regardless of your distance from town. Texas' flat, open terrain provides excellent sky visibility for strong satellite reception. Our installations are designed to withstand Texas heat, storms, and high winds.",
    testimonialId: 2,
  },
  {
    city: "Horseshoe Bay",
    state: "Texas",
    stateAbbr: "TX",
    slug: "horseshoe-bay-tx",
    description:
      "Horseshoe Bay is a luxury resort community on the shores of Lake LBJ in the Texas Hill Country. This exclusive community attracts retirees, vacation homeowners, and remote professionals who value the lakeside lifestyle. But the Hill Country's rolling terrain and rural character mean high-speed internet is far from guaranteed. Starnet Pros provides premium Starlink installation services for Horseshoe Bay residents who expect both performance and aesthetics. Our installations are designed to be as clean and unobtrusive as the community itself — no visible cable clutter, professional mounting, and optimal placement for the best speeds.",
    challenges:
      "Hill Country terrain creates pockets where cable and fiber providers don't reach. Many lakefront properties are in areas with only DSL or cellular options. High-end homeowners expect both performance and aesthetic quality from any installation.",
    benefits:
      "Starlink brings fiber-like performance to the Hill Country without ground infrastructure. Our premium installation approach ensures your system blends seamlessly with your property. We handle everything from permits to final speed verification.",
    testimonialId: 1,
  },
  {
    city: "Wimberley",
    state: "Texas",
    stateAbbr: "TX",
    slug: "wimberley-tx",
    description:
      "Wimberley, Texas, is a vibrant artistic community in Hays County, known for its natural beauty, creative culture, and the famous Blue Hole swimming area. Located between Austin and San Antonio, Wimberley has become a popular destination for remote workers, artists, and retirees seeking a quieter pace of life. But reliable internet remains one of the area's biggest challenges. Starnet Pros serves the Wimberley area with professional Starlink installation, helping residents and small business owners overcome the connectivity limitations that come with Hill Country living. Our installations are reliable, weather-resistant, and designed for the unique terrain of the area.",
    challenges:
      "Wimberley's canyon-like terrain and tree cover create internet dead zones. Traditional ISPs serve the town center but leave rural properties underserved. Remote workers and artists depend on reliable uploads for video calls, cloud storage, and e-commerce.",
    benefits:
      "Starlink provides reliable broadband regardless of your location in the Wimberley area. Our certified installers assess your property for the best dish placement, considering terrain and tree cover. Speeds that support video calls, streaming, and cloud-based creative work.",
    testimonialId: 5,
  },
  {
    city: "Kerrville",
    state: "Texas",
    stateAbbr: "TX",
    slug: "kerrville-tx",
    description:
      "Kerrville is the largest city in the Texas Hill Country, serving as the commercial hub for Kerr County and the surrounding region. Known for its outdoor recreation, ranch properties, and growing retirement community, Kerrville offers a high quality of life — but internet connectivity hasn't always matched. Starnet Pros provides professional Starlink installation across the Kerrville area, from in-town homes to sprawling ranch properties. We help homeowners, businesses, and agricultural operations get the reliable high-speed internet they need to stay connected in one of Texas' most beautiful regions.",
    challenges:
      "Ranch properties and rural acreages around Kerrville often have zero broadband options. The city itself has cable service, but coverage drops off quickly outside town. Agricultural operations need reliable connectivity for modern farm management tools and communication.",
    benefits:
      "Starlink is ideal for Kerrville's mix of in-town and rural properties. Professional installation ensures your system works reliably through Texas weather. Ranch and agricultural customers benefit from connectivity that enables precision agriculture and remote management.",
    testimonialId: 2,
  },
  // Colorado
  {
    city: "Castle Pines",
    state: "Colorado",
    stateAbbr: "CO",
    slug: "castle-pines-co",
    description:
      "Castle Pines is an upscale community in Douglas County, Colorado, just south of Denver. Known for its golf courses, mountain views, and family-friendly neighborhoods, Castle Pines attracts homeowners who value quality and premium services. While parts of the metro area have fiber and cable, many properties in Castle Pines — particularly those in The Village at Castle Pines and surrounding areas — face surprisingly limited internet options. Starnet Pros provides professional Starlink installation for Castle Pines homeowners who want a reliable, high-performance internet alternative. Our installations meet the premium standards that Castle Pines residents expect — clean, concealed, and professionally executed.",
    challenges:
      "Some areas of Castle Pines have limited ISP competition, leading to high prices and mediocre speeds. HOA restrictions in some communities make dish placement planning important. Homeowners want high-speed internet without compromising their property's aesthetics.",
    benefits:
      "Starlink provides an ISP-independent high-speed connection. Our team works within HOA guidelines and prioritizes aesthetics. Colorado's elevation and open sky conditions provide excellent satellite reception for consistently strong performance.",
    testimonialId: 1,
  },
  // Michigan
  {
    city: "Dexter",
    state: "Michigan",
    stateAbbr: "MI",
    slug: "dexter-mi",
    description:
      "Dexter is a charming small town in Washtenaw County, Michigan, just west of Ann Arbor. With its historic downtown, excellent schools, and proximity to the Huron River, Dexter attracts families and professionals who want small-town living with big-city access. But internet service in the surrounding rural areas of Washtenaw and Livingston counties often falls short of modern needs. Starnet Pros provides professional Starlink installation for Dexter-area residents and businesses. Whether you're working remotely from a farmstead, running a home-based business, or simply want reliable streaming and connectivity, we deliver installations that are built to handle Michigan's weather extremes.",
    challenges:
      "Rural properties outside Dexter proper often have only DSL or limited cable options. Michigan's severe weather — heavy snow, ice, and storms — demands robust, weather-resistant installations. Many residents commute to Ann Arbor or work remotely and need enterprise-grade connectivity.",
    benefits:
      "Starlink provides fiber-speed internet regardless of your distance from Ann Arbor. Our Michigan installations are built for harsh winters — secure mounts, weather-rated cabling, and dish positioning that accounts for snow and ice buildup. Year-round reliability you can count on.",
    testimonialId: 3,
  },
];

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreas.map((area) => area.slug);
}
