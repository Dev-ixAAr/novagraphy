import { prisma } from "@/lib/prisma";

// ============================================
// Portfolio Items — Unified (for tabbed view)
// ============================================
export async function getPortfolioItems(category?: string) {
  return prisma.portfolioItem.findMany({
    where: category && category !== "all" ? { category } : undefined,
    orderBy: { sortOrder: "asc" },
  });
}

// ============================================
// Individual Collections
// ============================================
export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getMvArtworks() {
  return prisma.mvArtwork.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getLogoWorks() {
  return prisma.logoWork.findMany({
    orderBy: { sortOrder: "asc" },
  });
}