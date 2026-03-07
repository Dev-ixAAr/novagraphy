"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "01", name: "GRAPHY", href: "/works" },
  { id: "02", name: "STUDIO", href: "/studio" },
  { id: "03", name: "STORE", href: "/store" },
  { id: "04", name: "20", href: "/about" }, // "20" represents 2024/Identity or About
];

export function CategoriesFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-white/5">

      {/* --- CATEGORY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-white/5">
        {categories.map((cat, index) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="
              group relative h-[300px] border-r border-white/5 last:border-r-0 border-b lg:border-b-0 border-white/5
              flex flex-col justify-between p-8
              bg-transparent hover:bg-white/5 transition-colors duration-500
            "
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <span className="font-share-tech text-gray-500 text-xs">
                ( {cat.id} )
              </span>
              <div className="
                opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                transition-all duration-300 text-electric-blue
              ">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="relative overflow-hidden">
              {/* Outline Text (Default) */}
              <h3 className="
                  font-contrail text-4xl md:text-6xl lg:text-7xl text-transparent 
                  bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-900
                  group-hover:opacity-0 transition-opacity duration-300 absolute bottom-0 left-0
               ">
                {cat.name}
              </h3>

              {/* Filled Text (Hover Reveal) */}
              <h3 className="
                  font-contrail text-4xl md:text-6xl lg:text-7xl text-foreground
                  translate-y-[100%] group-hover:translate-y-0 
                  transition-transform duration-500 ease-[0.16,1,0.3,1]
               ">
                {cat.name}
              </h3>
            </div>

            {/* Hover Line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-electric-blue group-hover:w-full transition-all duration-500 ease-out" />
          </Link>
        ))}
      </div>

      {/* --- SUB FOOTER --- */}
      <div className="py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-8">

        {/* Brand Mark */}
        <div className="flex flex-col gap-2">
          <span className="font-gudlak text-3xl md:text-5xl lg:text-6xl text-electric-blue">
            NOVAGRAPHY
          </span>
          <p className="font-base-neue text-gray-500 text-sm max-w-xs">
            Visual experiences for the digital age.
            Crafted with precision and passion.
          </p>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="flex gap-6">
            {["Instagram", "Twitter", "LinkedIn", "Behance"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-base-neue text-sm uppercase tracking-widest text-gray-400 hover:text-electric-blue transition-colors"
              >
                {social}
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 font-share-tech text-xs text-foreground/60">
            <span>© {currentYear} NOVAGRAPHY. INC</span>
            <a href="#" className="hover:text-foreground transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-foreground transition-colors">TERMS OF USE</a>
          </div>
        </div>

      </div>
    </footer>
  );
}