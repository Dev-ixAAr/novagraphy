// lib/actions/careers.ts
import { prisma } from "@/lib/prisma";

export async function getPerks() {
  return prisma.perk.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getJobs(dept?: string) {
  return prisma.job.findMany({
    where: {
      active: true,
      ...(dept && dept !== "ALL" ? { dept } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}