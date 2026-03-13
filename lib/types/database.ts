// lib/types/database.ts
import type { 
  Product, 
  ProductVariant, 
  ProductSize,
  ProductDisplay,
  Event,
  MvArtwork,
  LogoWork,
  PortfolioItem,
  TimelineEntry,
  Philosophy,
  TeamMember,
  Perk,
  Job,
  EvolutionPoint,
  StudioFeature,
  Order,
  OrderItem,
} from "@prisma/client";

// Product with relations
export type ProductWithDetails = Product & {
  colors: ProductVariant[];
  sizes: ProductSize[];
};

// Order with items
export type OrderWithItems = Order & {
  items: OrderItem[];
};

// Re-export for convenience
export type {
  Product,
  ProductVariant,
  ProductSize,
  ProductDisplay,
  Event,
  MvArtwork,
  LogoWork,
  PortfolioItem,
  TimelineEntry,
  Philosophy,
  TeamMember,
  Perk,
  Job,
  EvolutionPoint,
  StudioFeature,
  Order,
  OrderItem,
};