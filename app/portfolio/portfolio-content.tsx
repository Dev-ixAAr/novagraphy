// app/portfolio/portfolio-content.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
// ✅ Database types instead of mock data
import type { Event, MvArtwork, LogoWork } from "@/lib/types/database";

const TABS = [
  { label: "ALL", value: "all" },
  { label: "LIVE EVENTS", value: "events" },
  { label: "MV ARTWORKS", value: "mv-artworks" },
  { label: "IDENTITY", value: "identity" },
];

// ============================================
// PROPS TYPE — Data comes from Server Component
// ============================================
type PortfolioContentProps = {
  events: Event[];
  mvArtworks: MvArtwork[];
  logoWorks: LogoWork[];
};

// ============================================
// PORTFOLIO GRID (Inner Component)
// ============================================
function PortfolioGrid({ events, mvArtworks, logoWorks }: PortfolioContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category") || "all";

  const [activeTab, setActiveTab] = useState(categoryParam);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveTab(categoryParam);
  }, [categoryParam]);

  // Handle body scroll and navbar visibility when lightbox opens
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.classList.remove("lightbox-open");
    }
  }, [selectedItem]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // ============================================
  // ✅ Build unified dataset from DATABASE props
  //    (instead of imported mock data)
  // ============================================
  let displayedItems: any[] = [];

  if (activeTab === "all" || activeTab === "events") {
    displayedItems = [
      ...displayedItems,
      ...events.map((item) => ({
        ...item,
        type: "events",
        unifiedImage: item.image,
        subtitle: `${item.date} • ${item.location}`,
      })),
    ];
  }

  if (activeTab === "all" || activeTab === "mv-artworks") {
    displayedItems = [
      ...displayedItems,
      ...mvArtworks.map((item) => ({
        ...item,
        type: "mv-artworks",
        unifiedImage: item.img, // "img" key matches database field
        subtitle: item.artist,
        category: "Visual Gallery",
      })),
    ];
  }

  if (activeTab === "all" || activeTab === "identity") {
    displayedItems = [
      ...displayedItems,
      ...logoWorks.map((item) => ({
        ...item,
        type: "identity",
        unifiedImage: item.image,
        subtitle: item.category,
      })),
    ];
  }

  // Deterministic function to get grid spans based on index
  const getBentoSpan = (index: number) => {
    const pattern = index % 5;
    switch (pattern) {
      case 0:
        return "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2";
      case 1:
      case 2:
        return "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1";
      case 3:
        return "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1";
      case 4:
        return "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 relative z-10">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`relative px-6 py-2 rounded-full font-share-tech text-xs tracking-wider uppercase transition-all duration-300 border overflow-hidden ${
              activeTab === tab.value
                ? "bg-transparent text-electric-blue border-electric-blue/50"
                : "bg-black/20 text-gray-400 border-white/10 hover:border-electric-blue/30 hover:text-white backdrop-blur-md"
            }`}
          >
            {activeTab === tab.value && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-blue shadow-[0_0_10px_rgba(45,225,252,0.8)]"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Bento Grid Showcase */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[300px] gap-4 md:gap-6 w-full"
      >
        <AnimatePresence mode="popLayout">
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedItem(item)}
                className={`group relative w-full h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl ${getBentoSpan(index)}`}
              >
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <Image
                    src={
                      item.unifiedImage ||
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    }
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0"
                  />
                </div>

                {/* Magnetic Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-electric-blue/30 rounded-2xl transition-colors duration-500 z-20 pointer-events-none" />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 translate-y-8 transition-all duration-500 ease-[0.33,1,0.68,1] group-hover:opacity-100 group-hover:translate-y-0 z-10" />

                {/* Content Revealed on Hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.33,1,0.68,1] delay-75">
                  <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col">
                      <span className="font-base-neue text-electric-blue text-xs uppercase tracking-widest mb-2 font-semibold">
                        {item.category || item.type}
                      </span>
                      <h3 className="font-contrail text-2xl md:text-3xl lg:text-4xl text-white leading-none uppercase drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="font-base-neue text-xs md:text-sm text-gray-300 mt-2 max-w-[80%] line-clamp-2">
                        {item.subtitle || item.description}
                      </p>
                    </div>

                    <div className="bg-electric-blue/20 p-3 rounded-full border border-electric-blue/50 text-electric-blue backdrop-blur-md transform transition-transform duration-500 group-hover:rotate-45 shrink-0 self-end">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-32 text-center bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm"
            >
              <h3 className="font-contrail text-3xl text-gray-600 mb-4">
                No Items Found
              </h3>
              <p className="font-base-neue text-gray-500">
                It seems there aren&apos;t any items matching this category yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Full Screen Viewer */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                className="fixed inset-0 z-[200] w-screen h-[100dvh] flex items-center justify-center bg-black/80 backdrop-blur-lg cursor-zoom-out"
                onClick={() => setSelectedItem(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(null);
                  }}
                  className="fixed top-6 right-6 p-2 text-white/50 hover:text-white z-[210] transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                <motion.img
                  src={
                    selectedItem.unifiedImage ||
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                  }
                  alt={selectedItem.title || "Portfolio Item"}
                  className="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain rounded-md drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-default"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

// ============================================
// ✅ MAIN EXPORT — Receives props from Server Component
// ============================================
export default function PortfolioContent({
  events,
  mvArtworks,
  logoWorks,
}: PortfolioContentProps) {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-[800px] bg-electric-blue/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-share-tech text-electric-blue tracking-widest text-sm uppercase mb-4 block">
              Digital Archives
            </span>
            <h1 className="font-contrail text-5xl md:text-7xl lg:text-9xl uppercase text-foreground leading-none mb-6">
              Full <span className="text-electric-blue/80">Portfolio</span>
            </h1>
            <p className="font-base-neue text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Explore our complete collection of live events, visual artworks,
              brand identities, and exclusive apparel. Crafted with precision,
              designed for impact.
            </p>
          </motion.div>
        </div>

        <Suspense
          fallback={
            <div className="w-full h-64 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <PortfolioGrid
            events={events}
            mvArtworks={mvArtworks}
            logoWorks={logoWorks}
          />
        </Suspense>
      </div>
    </main>
  );
}