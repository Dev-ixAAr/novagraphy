// app/portfolio/portfolio-content.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PortfolioItem, Event, MvArtwork, LogoWork } from "@/lib/types/database";

// ============================================
// TABS
// ============================================
const TABS = [
  { label: "ALL", value: "all" },
  { label: "LIVE EVENTS", value: "events" },
  { label: "MV ARTWORKS", value: "mv-artworks" },
  { label: "IDENTITY", value: "identity" },
];

// ============================================
// PROPS TYPE
// ============================================
type PortfolioContentProps = {
  portfolioItems: PortfolioItem[];
  events: Event[];
  mvArtworks: MvArtwork[];
  logoWorks: LogoWork[];
};

export default function PortfolioContent({
  portfolioItems,
  events,
  mvArtworks,
  logoWorks,
}: PortfolioContentProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter items based on active tab
  const filteredItems =
    activeTab === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeTab);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <p className="text-sm tracking-[0.3em] text-neutral-500 mb-4">
            OUR WORK
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            PORTFOLIO
          </h1>
          <p className="text-neutral-400 mt-4 max-w-md mx-auto">
            A curated collection of our finest creative productions.
          </p>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* FILTER TABS */}
      {/* ============================================ */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`
                  px-5 py-2 text-xs tracking-widest font-medium rounded-full 
                  transition-all duration-300 whitespace-nowrap
                  ${
                    activeTab === tab.value
                      ? "bg-white text-black"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BENTO GRID */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  group relative overflow-hidden rounded-2xl cursor-pointer
                  ${item.className || "md:col-span-1"}
                `}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs tracking-widest text-neutral-400 mb-1">
                    {item.subtitle}
                  </p>
                  <h3 className="text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  {item.date && (
                    <p className="text-xs text-neutral-500 mt-1">{item.date}</p>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-3 py-1 text-[10px] tracking-widest bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    {item.category.toUpperCase().replace("-", " ")}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </section>

      {/* ============================================ */}
      {/* STATS */}
      {/* ============================================ */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "PROJECTS", value: portfolioItems.length.toString() },
            { label: "EVENTS", value: events.length.toString() },
            { label: "ARTWORKS", value: mvArtworks.length.toString() },
            { label: "LOGOS", value: logoWorks.length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="text-xs tracking-widest text-neutral-500 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}