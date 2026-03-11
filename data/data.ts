
export type ProductVariant = {
  id: string;
  name: string; 
  images: string[]; // 👈 Array of images for this color
};

export type ProductSize = {
  label: string; // "S", "M", "L", "XL"
  priceMod: number; // Price difference (e.g., +10 for XL)
};

export type Product = {
  id: string;
  title: string;
  basePrice: number;
  category: string;
  description: string;
  colors?: ProductVariant[]; 
  sizes?: ProductSize[];
  image: string; // Default fallback image
};

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    title: "CYBERPUNK BOMBER",
    basePrice: 250.00,
    category: "OUTERWEAR",
    description: "Ballistic nylon construction with adaptive thermal lining.",
    image: "/products/bomber-black-1.jpg", // Default
    colors: [
      { 
        id: "c1", 
        name: "Void Black", 
        // 👇 Black color images
        images: [
            "/products/bomber-black-1.jpg", 
            "/products/bomber-black-2.jpg",
            "/products/bomber-black-3.jpg"
        ] 
      },
      { 
        id: "c2", 
        name: "Electric Blue", 
        // 👇 Blue color images
        images: [
            "/products/bomber-blue-1.jpg",
            "/products/bomber-blue-2.jpg"
        ] 
      },
    ],
    sizes: [
      { label: "S", priceMod: 0 },
      { label: "M", priceMod: 0 },
      { label: "L", priceMod: 10 },
      { label: "XL", priceMod: 20 },
    ]
  },

  {
    id: "prod-03",
    title: "VOID RUNNER CAP",
    basePrice: 35.00,
    category: "ACCESSORIES",
    description: "5-panel construction with reflective brim details.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936",
    // No sizes for caps, maybe just colors
    colors: [
        { id: "c1", name: "Black", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936"] }
    ]
  },
  {
    id: "prod-04",
    title: "TECH UTILITY VEST",
    basePrice: 180.00,
    category: "OUTERWEAR",
    description: "Modular attachment system with magnetic fidlock buckles.",
    image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=2660",
    sizes: [
        { label: "S/M", priceMod: 0 },
        { label: "L/XL", priceMod: 0 }
    ]
    // No colors, just one variant
  }
];

// ඔයාගේ පින්තූර ටික public folder එකට දාගන්න.
// උදාහරණ: 
// public/events/event-1.jpg
// public/mv/art-1.jpg

export const EVENTS_DATA = [
  {
    id: 1,
    title: "ALUTH KALAWA",
    date: "OCT 12, 2024",
    location: "TOKYO, JP",
    // 👇 ඔයාගේ Local Image Path එක මෙතනට දාන්න
    image: "/events/kalawa.jpg", 
    category: "LIVE SHOW",
  },
  {
    id: 2,
    title: "AFROSAFARI",
    date: "NOV 05, 2024",
    location: "BERLIN, DE",
    image: "/events/AFROSAFARI.jpg",
    category: "LIVE SHOW",
  },
  {
    id: 3,
    title: "YAGA",
    date: "DEC 31, 2024",
    location: "NEW YORK, US",
    image: "/events/yaga.jpg",
    category: "LIVE SHOW",
  },
];

export const MV_ARTWORKS_DATA = [
  { 
    id: 1, 
    title: "GASSEENA", 
    artist: "Nova Collective", 
    // 👇 ඔයාගේ Local Image Path එක
    img: "/mv/mv1.jpg" 
  },
  { 
    id: 2, 
    title: "ECHO CHAMBER", 
    artist: "The Architect", 
    img: "/mv/mv2.jpg" 
  },
  { 
    id: 3, 
    title: "CHROMATIC", 
    artist: "Prism Labs", 
    img: "/mv/mv3.jpg" 
  },
  { 
    id: 4, 
    title: "DEEP DIVE", 
    artist: "Oceanic", 
    img: "/mv/mv4.jpg" 
  },
  { 
    id: 5, 
    title: "SYNTH WAVE", 
    artist: "Retro Future", 
    img: "/mv/mv5.jpg" 
  },
];

// ඔයාගේ පින්තූර public folder එකට දාගන්න (/logos/..., /products/...)

export const LOGO_DATA = [
  {
    id: 1,
    title: "NEBULA SYSTEMS",
    category: "Brand Identity",
    image: "/logos/logo1.jpg",
    className: "md:col-span-2", // Wide Card
  },
  {
    id: 2,
    title: "APEX DYNAMICS",
    category: "Vector Art",
    image: "/logos/logo2.jpg",
    className: "md:col-span-1", // Square Card
  },
  {
    id: 3,
    title: "ZENITH AI",
    category: "Minimalist",
    image: "/logos/logo3.jpg",
    className: "md:col-span-1", // Square Card
  },
  {
    id: 4,
    title: "ECHO LABS",
    category: "Typography",
    image: "/logos/logo4.jpg",
    className: "md:col-span-2", // Wide Card
  },
];

export const PRODUCT_DATA = [
  {
    id: 1,
    title: "OVERSIZED TEE",
    price: "$45.00",
    status: "NEW DROP",
    image: "/products/1.jpg",
    className: "md:col-span-1 md:row-span-2", // Tall Card (Model Photo)
  },
  {
    id: 2,
    title: "CYBER HOODIE",
    price: "$80.00",
    status: "BESTSELLER",
    image: "/products/2.jpg",
    className: "md:col-span-1", // Square
  },
  {
    id: 3,
    title: "TECH CAP",
    price: "$30.00",
    status: null,
    image: "/products/3.jpg",
    className: "md:col-span-1", // Square
  },
  {
    id: 4,
    title: "ACCESSORY PACK",
    price: "$25.00",
    status: "LIMITED",
    image: "/products/4.jpg",
    className: "md:col-span-2", // Wide
  },
];

const TIMELINE = [
    { year: "2020", title: "THE SPARK", desc: "Started in a garage with one laptop and a vision to disrupt the digital space." },
    { year: "2021", title: "FIRST CLIENT", desc: "Landed our first international project in Tokyo, setting our global standard." },
    { year: "2022", title: "SCALING UP", desc: "Moved into our first physical studio and hired the core engineering team." },
    { year: "2023", title: "EXPANSION", desc: "Opened the Colombo headquarters and launched the 'Graphy' digital product line." },
    { year: "2024", title: "AWWWARDS", desc: "Won 'Site of the Day' for three consecutive projects, cementing our status." },
    { year: "2025", title: "FUTURE", desc: "Launching our own AI-driven design tools. The revolution continues." },
];

const PHILOSOPHY = [
    { title: "Obsession", desc: "We don't just design; we obsess over every pixel until it bleeds perfection.", color: "bg-blue-600" },
    { title: "Innovation", desc: "If it's been done before, we are not interested. We chase the unseen.", color: "bg-purple-600" },
    { title: "Humanity", desc: "Technology is cold. We inject soul into code to make it feel alive.", color: "bg-orange-500" },
];

const FOUNDER = { name: "ALEX NOVA", role: "FOUNDER & CREATIVE DIRECTOR", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887" };
const TEAM = [
    { name: "SARA JIN", role: "ART DIRECTOR", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887" },
    { name: "KAITO M.", role: "TECH LEAD", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887" },
    { name: "ELENA R.", role: "3D ARTIST", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" },
];

const PERKS = [
  { title: "Global Freedom", desc: "Work from anywhere. 15+ timezones.", icon: <Globe /> },
  { title: "Creative Autonomy", desc: "Lead your craft. No micromanagement.", icon: <Zap /> },
  { title: "Premium Gear", desc: "Top-tier M3 Max MacBooks provided.", icon: <Cpu /> },
];

const JOBS = [
  { id: "j1", title: "SENIOR UI ENGINEER", salary: "$120k - $160k", type: "FULL-TIME", location: "REMOTE", dept: "ENGINEERING" },
  { id: "j2", title: "3D MOTION ARTIST", salary: "$90k - $130k", type: "CONTRACT", location: "HYBRID", dept: "DESIGN" },
  { id: "j3", title: "BRAND STRATEGIST", salary: "$110k - $150k", type: "FULL-TIME", location: "NEW YORK", dept: "STRATEGY" },
];

const dummyCartItems = [
  {
    id: 1,
    name: "Aura - Limited Edition Print",
    price: 120.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Nova Photography Book",
    price: 85.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop"
  }
];

const EVOLUTION_POINTS = [
    {
        title: "AI INTEGRATION",
        desc: "We are fusing our creative processes with advanced, custom-trained AI models to accelerate output and unlock entirely new visual dimensions.",
        number: "01"
    },
    {
        title: "SPATIAL WEB",
        desc: "Preparing for the 3D internet. NOVA2.0 embraces WebGL, WebXR, and immersive interactive environments natively.",
        number: "02"
    },
    {
        title: "SUSTAINABLE CODE",
        desc: "Optimized performance, lower carbon footprint. We are restructuring our deployment pipelines for maximum efficiency.",
        number: "03"
    }
];


const STUDIO_FEATURES = [
    {
        title: "CREATIVE HUB",
        desc: "Where ideas collide and become reality. Our studio is designed to foster untethered creativity.",
        icon: <Lightbulb className="w-8 h-8" />
    },
    {
        title: "HIGH-END GEAR",
        desc: "Equipped with the latest in digital production, from 8K rendering nodes to VR testing rigs.",
        icon: <Zap className="w-8 h-8" />
    },
    {
        title: "COLLABORATION SPACE",
        desc: "Open plan seating, quiet pods, and a café. Because the best ideas often happen over coffee.",
        icon: <Layers className="w-8 h-8" />
    }
];

const TABS = [
    { label: "ALL", value: "all" },
    { label: "LIVE EVENTS", value: "events" },
    { label: "MV ARTWORKS", value: "mv-artworks" },
    { label: "IDENTITY", value: "identity" },
];

const PRODUCT = {
  id: "prod-001",
  title: "CYBERPUNK BOMBER",
  description: "Engineered for the neon streets. This limited edition bomber jacket features ballistic nylon construction, adaptive thermal lining, and our signature holographic branding. Water-resistant and future-proof.",
  basePrice: 250.00,
  rating: 4.8,
  reviews: 128,
  colors: [
    { name: "Void Black", hex: "#111111", image: "https://images.unsplash.com/photo-1551028919-ac7d21422e91?q=80&w=2670&auto=format&fit=crop" },
    { name: "Electric Blue", hex: "#2DE1FC", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2536&auto=format&fit=crop" },
    { name: "Lunar White", hex: "#F0F0F0", image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2670&auto=format&fit=crop" },
  ],
  sizes: [
    { label: "S", priceMod: 0 },
    { label: "M", priceMod: 0 },
    { label: "L", priceMod: 10 }, // Price increase for Large
    { label: "XL", priceMod: 20 },
  ]
};

const BG_IMG = "/logo/gojo.png";