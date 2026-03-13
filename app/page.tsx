import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Hero } from "@/components/Hero";

const Events = dynamic(() => import("@/components/Events").then((mod) => mod.Events), { ssr: true });
const MVArtworks = dynamic(() => import("@/components/MVArtworks").then((mod) => mod.MVArtworks), { ssr: true });
const LogoShowcase = dynamic(() => import("@/components/LogoShowcase").then((mod) => mod.LogoShowcase), { ssr: true });
const LatestProductsBento = dynamic(() => import("@/components/LatestProductsBento").then((mod) => mod.LatestProductsBento), { ssr: true });
const NavigationBlocks = dynamic(() => import("@/components/NavigationBlocks").then((mod) => mod.NavigationBlocks), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer").then((mod) => mod.Footer), { ssr: true });

export const metadata: Metadata = {
  title: "[INSERT_HOME_TITLE]", // Uses template: "[INSERT_HOME_TITLE] | NOVAGRAPHY"
  description: "[INSERT_HOME_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_HOME_OG_TITLE]",
    description: "[INSERT_HOME_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_HOME_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_HOME_OG_IMAGE_ALT]" }],
  },
};

// ✅ Wrapper imports for Suspense
import EventsWrapper from "@/components/wrappers/EventsWrapper";
import MVArtworksWrapper from "@/components/wrappers/MVArtworksWrapper";
import LogoShowcaseWrapper from "@/components/wrappers/LogoShowcaseWrapper";
import LatestProductsBentoWrapper from "@/components/wrappers/LatestProductsBentoWrapper";
import { Suspense } from "react";

export default function Home() {
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

        <Suspense fallback={<div className="w-full py-24 flex items-center justify-center animate-pulse"><div className="w-32 h-8 bg-white/10 rounded-lg"></div></div>}>
          <EventsWrapper />
        </Suspense>
        
        <Suspense fallback={<div className="w-full py-24 flex items-center justify-center animate-pulse"><div className="w-32 h-8 bg-white/10 rounded-lg"></div></div>}>
          <MVArtworksWrapper />
        </Suspense>

        <Suspense fallback={<div className="w-full py-24 flex items-center justify-center animate-pulse"><div className="w-32 h-8 bg-white/10 rounded-lg"></div></div>}>
          <LogoShowcaseWrapper />
        </Suspense>

        <Suspense fallback={<div className="w-full py-24 flex items-center justify-center animate-pulse"><div className="w-32 h-8 bg-white/10 rounded-lg"></div></div>}>
          <LatestProductsBentoWrapper />
        </Suspense>

        <NavigationBlocks />
        <Footer />

      </main>
    </div>
  );
}