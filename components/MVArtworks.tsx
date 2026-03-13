"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ✅ Database type instead of mock data
import type { MvArtwork } from "@/lib/types/database";

// ✅ Props type — data comes from Server Component
type MVArtworksProps = {
  mvArtworks: MvArtwork[];
};

export function MVArtworks({ mvArtworks }: MVArtworksProps) {
  const [width, setWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current && containerRef.current) {
        setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const currentX = x.get();
    const scrollAmount = window.innerWidth >= 768 ? 448 : 312; // ≈ Card width + gap

    let newX;
    if (direction === 'left') {
      newX = Math.min(currentX + scrollAmount, 0);
    } else {
      newX = Math.max(currentX - scrollAmount, -width);
    }

    animate(x, newX, { type: "tween", ease: "easeInOut", duration: 0.5 });
  };

  return (
    <section className="relative w-full bg-background py-24 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="font-share-tech text-gray-500 tracking-widest text-sm uppercase mb-2 block">
              (03) Visual Gallery
            </span>
            <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8">
              <h2 className="font-contrail text-4xl md:text-6xl lg:text-8xl uppercase text-foreground leading-none">
                MV <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-white">ARTWORKS</span>
              </h2>
              <Link href="/portfolio?category=mv-artworks" className="font-base-neue uppercase text-sm text-gray-400 hover:text-electric-blue transition-colors duration-300 mb-2 md:mb-4">
                View Full Collection -&gt;
              </Link>
            </div>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="w-full pl-6 md:pl-12 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={sliderRef}
          drag="x"
          style={{ x }}
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 md:gap-12"
        >
          {mvArtworks.slice(0, 5).map((art) => (
            <motion.div
              key={art.id}
              className="relative min-w-[280px] md:min-w-[400px] group"
              whileHover={{ y: -20, transition: { duration: 0.4 } }}
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src={art.img}
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
                  <p className="font-base-neue text-sm text-gray-500">{art.artist}</p>
                </div>
                <span className="font-share-tech text-electric-blue text-xs border border-electric-blue/30 px-2 py-1 rounded">
                  MV-0{art.sortOrder}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}