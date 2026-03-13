// lib/actions/products.ts
import { prisma } from "@/lib/prisma";

// ============================================
// Full Products (with colors & sizes)
// ============================================
export async function getProducts() {
  return prisma.product.findMany({
    include: {
      colors: { orderBy: { sortOrder: "asc" } },
      sizes: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      colors: { orderBy: { sortOrder: "asc" } },
      sizes: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true },
    include: {
      colors: { orderBy: { sortOrder: "asc" } },
      sizes: { orderBy: { sortOrder: "asc" } },
    },
  });
}

// ============================================
// Product Display Cards (grid layout)
// ============================================
export async function getProductDisplays() {
  return prisma.productDisplay.findMany({
    orderBy: { sortOrder: "asc" },
  });
}