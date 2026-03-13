"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
// ✅ Unified PortfolioItem type
import type { PortfolioItem } from "@/lib/types/database";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

// ✅ Props type — data comes from Server Component
type EventsProps = {
  events: PortfolioItem[];
};

export function Events({ events }: EventsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <section className="relative w-full bg-background py-24 px-6 md:px-12 border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-share-tech text-electric-blue tracking-widest text-sm uppercase mb-2 block">
              (02) Experiences
            </span>
            <h2 className="font-contrail text-4xl md:text-5xl lg:text-7xl uppercase text-foreground">
              Live <span className="text-electric-blue/80">Events</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <Link href="/portfolio?category=events" className="font-base-neue uppercase text-sm text-gray-400 hover:text-electric-blue transition-colors duration-300 md:mb-4">
              View Full Collection -&gt;
            </Link>
            
            <div className="hidden md:flex gap-4 mb-4">
              <button onClick={scrollLeft} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollRight} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:border-electric-blue hover:text-electric-blue transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          ref={carouselRef}
          className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              className="group relative h-[400px] md:h-[500px] w-[85vw] sm:w-[60vw] md:w-[400px] lg:w-[450px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/20 dark:bg-black/40"
            >
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex justify-between items-start opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <span className="bg-electric-blue/90 text-black font-share-tech text-xs px-2 py-1 rounded-sm uppercase">
                    {event.subtitle || 'Event'}
                  </span>
                </div>

                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-contrail text-3xl md:text-4xl text-white leading-none uppercase mb-2">
                    {event.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}