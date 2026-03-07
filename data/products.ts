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