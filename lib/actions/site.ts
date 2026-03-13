// lib/actions/site.ts
import { prisma } from "@/lib/prisma";

export async function getEvolutionPoints() {
  return prisma.evolutionPoint.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getStudioFeatures() {
  return prisma.studioFeature.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSiteSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({
    where: { key },
  });
  return setting?.value ?? null;
}

export async function getAllSiteSettings() {
  const settings = await prisma.siteSetting.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}