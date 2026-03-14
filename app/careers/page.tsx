import { prisma } from "@/lib/prisma";
import CareersPageClient from "./CareersPageClient";

export default async function CareersPage() {
    const jobs = await prisma.job.findMany({
        where: { active: true },
        orderBy: { createdAt: "desc" },
    });

    return <CareersPageClient jobs={jobs} />;
}