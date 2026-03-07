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

export const PRODUCTS = [
  {
    id: "prod-01",
    title: "CYBERPUNK BOMBER",
    price: 250.00,
    category: "OUTERWEAR",
    image: "https://images.unsplash.com/photo-1551028919-ac7d21422e91?q=80&w=2670&auto=format&fit=crop",
    description: "Ballistic nylon construction with adaptive thermal lining."
  },
  {
    id: "prod-02",
    title: "NEON VERSE TEE",
    price: 45.00,
    category: "T-SHIRTS",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop",
    description: "Heavyweight cotton with puff-print neon graphics."
  },
  {
    id: "prod-03",
    title: "VOID RUNNER CAP",
    price: 35.00,
    category: "ACCESSORIES",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936&auto=format&fit=crop",
    description: "5-panel construction with reflective brim details."
  },
  {
    id: "prod-04",
    title: "TECH UTILITY VEST",
    price: 180.00,
    category: "OUTERWEAR",
    image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=2660&auto=format&fit=crop",
    description: "Modular attachment system with magnetic fidlock buckles."
  },
  // Add more products for the Shop grid...
  {
    id: "prod-05",
    title: "DATA STREAM HOODIE",
    price: 95.00,
    category: "TOPS",
    image: "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=2000&auto=format&fit=crop",
    description: "Oversized fit with datamosh back print."
  }
];