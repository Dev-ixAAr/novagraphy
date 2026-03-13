"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ✅ Unified PortfolioItem type
import type { PortfolioItem } from "@/lib/types/database";

// ✅ Props type — data comes from Server Component
type MVArtworksProps = {
  mvArtworks: PortfolioItem[];
};

export function MVArtworks({ mvArtworks }: MVArtworksProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -350, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 350, behavior: 'smooth' });

  return (
    <section className="relative w-full bg-background py-24 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="font-share-tech text-gray-500 tracking-widest text-sm uppercase mb-2 block">
              (03) Visual Gallery
            </span>
            <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8">
              <h2 className="font-contrail text-4xl md:text-5xl lg:text-8xl uppercase text-foreground leading-none">
                MV <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-white">ARTWORKS</span>
              </h2>
              <Link href="/portfolio?category=mv-artworks" className="font-base-neue uppercase text-sm text-gray-400 hover:text-electric-blue transition-colors duration-300 mb-2 md:mb-4">
                View Full Collection -&gt;
              </Link>
            </div>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={scrollLeft}
              className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={carouselRef} 
        className="w-full pl-6 md:pl-12 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-8 flex gap-8 md:gap-12"
      >
          {mvArtworks.map((art, index) => (
            <motion.div
              key={art.id}
              className="relative w-[85vw] sm:w-[50vw] md:w-[400px] shrink-0 snap-center group"
              whileHover={{ y: -20, transition: { duration: 0.4 } }}
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-electric-blue/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_#2DE1FC]">
                    <Play className="w-6 h-6 text-black ml-1 fill-black" />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-end">
                <div>
                  <h3 className="font-contrail text-2xl text-foreground uppercase">{art.title}</h3>
                  <p className="font-base-neue text-sm text-gray-500">{art.subtitle}</p>
                </div>
                <span className="font-share-tech text-electric-blue text-xs border border-electric-blue/30 px-2 py-1 rounded">
                  MV-0{art.sortOrder}
                </span>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}