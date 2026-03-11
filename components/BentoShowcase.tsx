"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Shirt, Hexagon, Layers, Box, Fingerprint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Placeholder images - Replace with your local assets in /public/
const IMAGES = {
  shirt1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
  shirt2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop",
  logo1: "https://images.unsplash.com/photo-1626785774573-4b7993143a23?q=80&w=2670&auto=format&fit=crop", // Abstract Logo Art
  logo2: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop", // Minimalist
  model: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const hoverEffect = {
  scale: 1.02,
  borderColor: "rgba(45, 225, 252, 0.5)", // Electric Blue
  boxShadow: "0 0 30px rgba(45, 225, 252, 0.15)",
  transition: { duration: 0.3 }
};

export function BentoShowcase() {
  return (
    <section className="relative w-full bg-background py-24 px-6 md:px-12 border-t border-white/5 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-electric-blue/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-share-tech text-electric-blue tracking-widest text-sm uppercase mb-2 block">
              (04) Merch & Identity
            </span>
            <h2 className="font-contrail text-4xl md:text-5xl lg:text-7xl uppercase text-foreground leading-none">
              Digital <span className="text-gray-500">Forge</span>
            </h2>
          </div>
          <Link href="/portfolio?category=identity" className="font-base-neue uppercase text-sm text-gray-400 hover:text-electric-blue transition-colors duration-300 md:mb-2">
            View Full Collection -&gt;
          </Link>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* 🔴 SECTION 1: LOGO DESIGN (Left Side) */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
              <Hexagon className="text-electric-blue w-6 h-6" />
              <h3 className="font-contrail text-3xl text-foreground">IDENTITY / LOGOS</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px]"
            >
              {/* Logo Card 1 (Wide) */}
              <motion.div
                variants={cardVariants}
                whileHover={hoverEffect}
                className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl"
              >
                <Image src={IMAGES.logo1} alt="Brand Identity" fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <h4 className="font-share-tech text-2xl text-white">NEBULA SYSTEMS</h4>
                  <p className="font-base-neue text-xs text-gray-300">Brand Identity 2024</p>
                </div>
              </motion.div>

              {/* Logo Card 2 (Square) */}
              <motion.div
                variants={cardVariants}
                whileHover={hoverEffect}
                className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center"
              >
                <Fingerprint className="w-16 h-16 text-white/20 group-hover:text-electric-blue transition-colors duration-500" />
                <span className="absolute bottom-4 font-share-tech text-xs text-gray-500">VECTOR ART</span>
              </motion.div>

              {/* Logo Card 3 (Square Image) */}
              <motion.div
                variants={cardVariants}
                whileHover={hoverEffect}
                className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl"
              >
                <Image src={IMAGES.logo2} alt="Minimal Logo" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </motion.div>
          </div>


          {/* 🔵 SECTION 2: PRODUCTS / MERCH (Right Side) */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4 justify-end">
              <h3 className="font-contrail text-3xl text-foreground">MERCH / PRODUCTS</h3>
              <Shirt className="text-electric-blue w-6 h-6" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px]"
            >
              {/* Product Card 1 (Tall Feature) */}
              <motion.div
                variants={cardVariants}
                whileHover={hoverEffect}
                className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl"
              >
                <Image src={IMAGES.model} alt="Streetwear Model" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-electric-blue text-black font-share-tech text-xs px-2 py-1 rounded">
                  NEW DROP
                </div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="font-contrail text-3xl text-white leading-none">STREET<br />WEAR</h4>
                </div>
              </motion.div>

              {/* Product Card 2 (Square) */}
              <motion.div
                variants={cardVariants}
                whileHover={hoverEffect}
                className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl p-4"
              >
                <Image src={IMAGES.shirt1} alt="T-Shirt Design" fill className="object-cover opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                  <button className="border border-electric-blue text-electric-blue px-4 py-2 font-share-tech text-xs hover:bg-electric-blue hover:text-black transition-colors">
                    VIEW ITEM
                  </button>
                </div>
              </motion.div>

              {/* Product Card 3 (Square Info) */}
              <motion.div
                variants={cardVariants}
                whileHover={hoverEffect}
                className="relative group overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-center items-center text-center p-6"
              >
                <Box className="w-10 h-10 text-electric-blue mb-4" />
                <h4 className="font-share-tech text-xl text-white">GLOBAL SHIP</h4>
                <p className="font-base-neue text-xs text-gray-500 mt-2"> worldwide delivery available</p>
              </motion.div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}