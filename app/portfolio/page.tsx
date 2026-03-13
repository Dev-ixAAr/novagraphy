// app/portfolio/page.tsx
// ✅ Server Component — NO "use client"
import { getPortfolioItems, getEvents, getMvArtworks, getLogoWorks } from "@/lib/actions/portfolio";
import PortfolioContent from "./portfolio-content";

export const metadata = {
  title: "Portfolio | Novagraphy",
  description: "Our creative works and projects",
};

export default async function PortfolioPage() {
  const [events, mvArtworks, logoWorks] = await Promise.all([
    getEvents(),
    getMvArtworks(),
    getLogoWorks(),
  ]);

  return (
    <PortfolioContent
      events={events}
      mvArtworks={mvArtworks}
      logoWorks={logoWorks}
    />
  );
}