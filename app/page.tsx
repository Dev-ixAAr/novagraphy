import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Events } from "@/components/Events";
import { MVArtworks } from "@/components/MVArtworks";
import { LogoShowcase } from "@/components/LogoShowcase";
import { LatestProductsBento } from "@/components/LatestProductsBento";
import { NavigationBlocks } from "@/components/NavigationBlocks";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "[INSERT_HOME_TITLE]", // Uses template: "[INSERT_HOME_TITLE] | NOVAGRAPHY"
  description: "[INSERT_HOME_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_HOME_OG_TITLE]",
    description: "[INSERT_HOME_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_HOME_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_HOME_OG_IMAGE_ALT]" }],
  },
};

// ✅ Database actions — Home page uses "Latest" variants (take: 3, newest first)
import { getLatestEvents, getLatestMvArtworks, getLatestLogoWorks } from "@/lib/actions/portfolio";
import { getProducts, getProductDisplays } from "@/lib/actions/products";

export default async function Home() {
  // 🔥 All data fetched server-side in parallel — 3 latest items per section
  const [events, mvArtworks, logoWorks, products, productDisplays] = await Promise.all([
    getLatestEvents(),
    getLatestMvArtworks(),
    getLatestLogoWorks(),
    getProducts(),
    getProductDisplays(),
  ]);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground selection:bg-electric-blue selection:text-black overflow-hidden transition-colors duration-500">

      {/* 
        1. CINEMATIC GRAIN OVERLAY 
        Adds a subtle texture to the entire page, reducing "digital sharpness"
        and giving it a premium, film-like quality.
      */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]">
        <svg className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <main className="flex flex-col w-full">

        {/* 3. HERO SECTION */}
        {/* The entry point with 3D/Parallax effects */}
        <Hero />

        <Events events={events} />
        <MVArtworks mvArtworks={mvArtworks} />
        <LogoShowcase logoWorks={logoWorks} />
        <LatestProductsBento products={products} />
        <NavigationBlocks />
        <Footer />

      </main>
    </div>
  );
}