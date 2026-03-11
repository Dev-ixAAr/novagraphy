"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EVENTS_DATA } from "@/data/content"; // 👈 මෙතනින් Import කරන්න

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

export function Events() {
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
          <Link href="/portfolio?category=events" className="font-base-neue uppercase text-sm text-gray-400 hover:text-electric-blue transition-colors duration-300 md:mb-4">
            View Full Collection -&gt;
          </Link>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {EVENTS_DATA.slice(0, 5).map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              className="group relative h-[500px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/20 dark:bg-black/40"
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
                    {event.category}
                  </span>
                </div>

                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  {/* <div className="flex items-center gap-4 text-electric-blue mb-3 font-share-tech text-xs tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                  </div> */}

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