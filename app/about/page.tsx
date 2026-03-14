import { prisma } from "@/lib/prisma";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { sortOrder: "asc" },
    });

    return <AboutPageClient teamMembers={teamMembers} />;
}