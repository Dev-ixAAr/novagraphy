// lib/actions/about.ts
import { prisma } from "@/lib/prisma";

export async function getTimeline() {
  return prisma.timelineEntry.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPhilosophies() {
  return prisma.philosophy.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getFounder() {
  return prisma.teamMember.findFirst({
    where: { isFounder: true },
  });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    where: { isFounder: false },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllTeam() {
  return prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  });
}