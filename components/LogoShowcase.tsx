"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hexagon, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
// ✅ Unified PortfolioItem type
import type { PortfolioItem } from "@/lib/types/database";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// ✅ Props type — data comes from Server Component
type LogoShowcaseProps = {
  logoWorks: PortfolioItem[];
};

export function LogoShowcase({ logoWorks }: LogoShowcaseProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div className="flex items-end gap-4">
            <Hexagon className="text-electric-blue w-8 h-8" strokeWidth={1.5} />
            <div>
              <span className="font-share-tech text-electric-blue text-xs tracking-widest block mb-1">SECTION 04</span>
              <h2 className="font-contrail text-3xl md:text-4xl lg:text-5xl text-foreground uppercase leading-none">
                Identity <span className="text-gray-600">/ Logos</span>
              </h2>
            </div>
          </div>
          <div className="hidden md:flex gap-4 mb-2">
            <button onClick={scrollLeft} className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollRight} className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          ref={carouselRef}
          className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {logoWorks.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl shrink-0 snap-center w-[85vw] sm:w-[50vw] md:w-[320px] lg:w-[350px] h-[280px] md:h-[350px] ${item.className || ''}`}
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-share-tech text-electric-blue text-xs mb-1 block">{item.subtitle || 'Identity'}</span>
                    <h3 className="font-contrail text-2xl text-white">{item.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border border-electric-blue/0 group-hover:border-electric-blue/50 rounded-3xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}