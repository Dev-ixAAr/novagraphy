// app/portfolio/page.tsx
// ✅ Server Component — NO "use client"
import type { Metadata } from "next";
import { getPortfolioItems } from "@/lib/actions/portfolio";
import PortfolioContent from "./portfolio-content";

export const metadata: Metadata = {
  title: "[INSERT_PORTFOLIO_TITLE]",
  description: "[INSERT_PORTFOLIO_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_PORTFOLIO_OG_TITLE]",
    description: "[INSERT_PORTFOLIO_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_PORTFOLIO_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_PORTFOLIO_OG_IMAGE_ALT]" }],
  },
};

export default async function PortfolioPage() {
  // Fetch ALL portfolio items (unified model) — client-side tabs will filter
  const allItems = await getPortfolioItems();

  return (
    <PortfolioContent items={allItems} />
  );
}