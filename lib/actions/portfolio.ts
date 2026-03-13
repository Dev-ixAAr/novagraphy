import { prisma } from "@/lib/prisma";

// ============================================
// 🔑 CANONICAL CATEGORY STRINGS
// These MUST match everywhere: admin forms, server actions, frontend queries.
// ============================================
// 'events'      → Live Events section
// 'mv-artworks' → MV Artworks section
// 'identity'    → Identity / Logos section

// ============================================
// Portfolio Items — Unified (for tabbed /portfolio page)
// ============================================
export async function getPortfolioItems(category?: string) {
  return prisma.portfolioItem.findMany({
    where: category && category !== "all" ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

// ============================================
// Full Collections — ALL items, newest first
// (used on /portfolio full collection pages)
// ============================================
export async function getEvents() {
  return prisma.portfolioItem.findMany({
    where: { category: "events" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMvArtworks() {
  return prisma.portfolioItem.findMany({
    where: { category: "mv-artworks" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLogoWorks() {
  return prisma.portfolioItem.findMany({
    where: { category: "identity" },
    orderBy: { createdAt: "desc" },
  });
}

// ============================================
// Home Page — Latest 3 items per section
// ============================================
export async function getLatestEvents() {
  return prisma.portfolioItem.findMany({
    where: { category: "events" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export async function getLatestMvArtworks() {
  return prisma.portfolioItem.findMany({
    where: { category: "mv-artworks" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export async function getLatestLogoWorks() {
  return prisma.portfolioItem.findMany({
    where: { category: "identity" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}