"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Atom } from "lucide-react";
import { TextScramble } from "./ui/TextScramble";
import Particles from "./ui/Particles"; // කලින් හදපු Particles Component එක
import Image from "next/image";
import bgDataUrl from "@/public/logo/bg.jpg";
import charDataUrl from "@/public/logo/gojo.png";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- PARALLAX LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const xText = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const yText = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const xChar = useTransform(springX, [-0.5, 0.5], [45, -45]);
  const yChar = useTransform(springY, [-0.5, 0.5], [45, -45]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX / width) - 0.5);
    mouseY.set((clientY / height) - 0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="
        relative h-screen w-full overflow-hidden 
        /* 🌗 THEME BACKGROUND COLOR SWITCH */
        bg-[#F3F4F6] dark:bg-[#020202] 
        transition-colors duration-700 ease-in-out
        flex flex-col items-center justify-center
      "
    >
      {/* 
        ========================================
        1. BACKGROUND LAYER (ADAPTIVE)
        ========================================
      */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src={bgDataUrl}
            alt="Space Background"
            placeholder="blur"
            priority
            fill
            className="
                  object-cover blur-[40px] scale-110 
                  /* Light Mode: Low Opacity | Dark Mode: Medium Opacity */
                  opacity-30 dark:opacity-60
                  transition-opacity duration-700
                "
          />
        </motion.div>

        {/* OVERLAYS FOR READABILITY */}
        {/* Light Mode Overlay (White tint) */}
        <div className="absolute inset-0 bg-white/60 dark:bg-transparent transition-colors duration-700" />

        {/* Dark Mode Overlay (Black tint) */}
        <div className="absolute inset-0 bg-transparent dark:bg-black/70 transition-colors duration-700" />
      </div>

      {/* Cyber Grid (Subtle Lines) */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(45,225,252,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,225,252,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none transition-all duration-700" />

      {/* 
        ========================================
        2. PARTICLES LAYER
        ========================================
      */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <Particles
          className="absolute inset-0 w-full h-full"
          quantity={60}
          staticity={30}
          ease={50}
          refresh={false}
        // Particles component eke theme check ekata anuwa color eka maaru wenawa
        />
      </div>


      {/* 
        ========================================
        3. MAIN CONTENT
        ========================================
      */}
      <div className="relative z-30 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 h-full">

        {/* --- LEFT CARD --- */}
        <motion.div
          style={{ x: xChar, y: yChar }}
          className="hidden md:flex md:col-span-3 h-full items-center justify-start"
        >
          <div className="
            relative overflow-hidden w-full max-w-[260px] aspect-square
            rounded-3xl 
            /* 🌗 CARD COLORS */
            border border-gray-300 dark:border-white/10 
            bg-white/60 dark:bg-black/40 backdrop-blur-xl
            flex flex-col justify-between p-6
            shadow-xl dark:shadow-2xl
            transition-all duration-500
          ">
            <div className="flex justify-between items-start">
              <span className="font-base-neue text-xs uppercase tracking-widest text-gray-600 dark:text-electric-blue/80">Energy Level</span>
              <Atom className="text-gray-800 dark:text-electric-blue w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-share-tech text-4xl md:text-6xl text-foreground block transition-colors duration-500">
                ∞
              </span>
              <p className="font-base-neue text-sm text-foreground/70 mt-2 transition-colors duration-500">
                Cosmic Void <br /> Detected.
              </p>
            </div>
          </div>
        </motion.div>


        {/* --- CENTER: TEXT & CHARACTER --- */}
        <div className="md:col-span-6 h-full flex flex-col items-center relative">

          {/* A. TEXT LAYER (FIXED TOP) */}
          <motion.div
            style={{ x: xText, y: yText }}
            className="absolute top-[120px] z-10 flex flex-col items-center justify-start text-center w-full"
          >
            {/* 1. WELCOME TO */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-2"
            >
              <span className="
                font-base-neue text-sm md:text-lg tracking-[0.5em] font-bold 
                /* 🌗 Blue in both modes, slightly darker in light mode for visibility */
                text-blue-600 dark:text-electric-blue 
                drop-shadow-[0_0_10px_rgba(45,225,252,0.4)]
                transition-colors duration-500
              ">
                WELCOME TO
              </span>
            </motion.div>

            {/* 2. CREATIVE (Silver/Black Gradient Switch) */}
            <div className="relative">
              <TextScramble
                text="CREATIVE"
                className="
                  font-share-tech text-5xl md:text-7xl lg:text-[8rem] leading-[0.8] tracking-tighter 
                  
                  /* 🌗 LIGHT MODE: Dark Metallic Gradient */
                  text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600
                  
                  /* 🌗 DARK MODE: White/Silver Gradient */
                  dark:from-white dark:via-gray-200 dark:to-gray-500
                  
                  drop-shadow-xl dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]
                  select-none transition-all duration-500
                "
                duration={1.5}
              />
            </div>

            {/* 3. GOD'S HAVEN (Blue Switch) */}
            <div className="relative mt-2">
              <TextScramble
                text="GOD'S HAVEN"
                className="
                  font-share-tech text-5xl md:text-7xl lg:text-[8rem] leading-[0.8] tracking-tighter 
                  
                  /* 🌗 LIGHT MODE: Deep Blue Gradient */
                  text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-800
                  
                  /* 🌗 DARK MODE: Electric Neon Blue Gradient */
                  dark:from-electric-blue dark:to-[#0099cc]
                  
                  drop-shadow-[0_0_30px_rgba(45,225,252,0.6)]
                  select-none transition-all duration-500
                "
                duration={1.5}
                delay={0.3}
              />
            </div>
          </motion.div>


          {/* B. CHARACTER IMAGE (BOTTOM) */}
          <motion.div
            style={{ x: xChar, y: yChar }}
            className="absolute bottom-0 z-20 w-full h-[85%] flex items-end justify-center pointer-events-none"
          >
            {/* Glow Behind Character (Adaptive) */}
            <div className="
                absolute top-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen pointer-events-none blur-[100px]
                /* 🌗 LIGHT: Subtle Blue | DARK: Intense Neon */
                bg-blue-400/20 dark:bg-electric-blue/15
                transition-colors duration-700
            " />

            {/* We cannot use layout="fill" easily here because the container isn't clearly positioned for it relative to the image size requirements, wait, we can just use fixed size or use next/image with full sizing if we want, but since it's an img tag we can just replace it and add priority.*/}
            <div className="relative h-full w-full">
               <Image
                 src={charDataUrl}
                 alt="Hero Character"
                 placeholder="blur"
                 priority
                 fill
                 className="
                    object-contain object-bottom 
                    /* 🌗 SHADOWS: Soft in Light, Deep in Dark */
                    drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_50px_80px_rgba(0,0,0,0.8)]
                    transition-all duration-500
                  "
               />
            </div>
          </motion.div>

        </div>


        {/* --- RIGHT CARD --- */}
        <motion.div
          style={{ x: xChar, y: yChar }}
          className="hidden md:flex md:col-span-3 h-full items-center justify-end"
        >
          <div className="
             relative overflow-hidden w-full max-w-[260px] aspect-[3/4] 
             rounded-3xl 
             /* 🌗 CARD COLORS */
             border border-gray-300 dark:border-white/10 
             bg-white/60 dark:bg-black/40 backdrop-blur-xl group
             shadow-xl dark:shadow-2xl
             transition-all duration-500
           ">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="
                    w-16 h-16 rounded-full 
                    bg-white/50 dark:bg-white/10 backdrop-blur-xl 
                    border border-gray-400 dark:border-white/40 
                    flex items-center justify-center 
                    group-hover:bg-electric-blue group-hover:text-black 
                    transition-all duration-300 cursor-pointer shadow-lg
                 ">
                <Play className="w-6 h-6 ml-1 fill-current text-gray-800 dark:text-white group-hover:text-black" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-share-tech text-xs text-blue-600 dark:text-electric-blue animate-pulse">LIVE ●</span>
              <div className="h-0.5 w-full bg-gray-300 dark:bg-white/20 rounded-full mt-2">
                <div className="h-full w-2/3 bg-blue-500 dark:bg-electric-blue shadow-[0_0_5px_currentColor]" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}