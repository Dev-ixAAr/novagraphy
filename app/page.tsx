import { Hero } from "@/components/Hero";
import { Events } from "@/components/Events";
import { MVArtworks } from "@/components/MVArtworks";
import { LogoShowcase } from "@/components/LogoShowcase";
import { LatestProductsBento } from "@/components/LatestProductsBento";
import { NavigationBlocks } from "@/components/NavigationBlocks";
import { Footer } from "@/components/Footer";

// ✅ Database actions
import { getEvents, getMvArtworks, getLogoWorks } from "@/lib/actions/portfolio";
import { getProducts, getProductDisplays } from "@/lib/actions/products";

export default async function Home() {
  // 🔥 All data fetched server-side in parallel
  const [events, mvArtworks, logoWorks, products, productDisplays] = await Promise.all([
    getEvents(),
    getMvArtworks(),
    getLogoWorks(),
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