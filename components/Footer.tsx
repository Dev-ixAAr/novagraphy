"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Dribbble } from "lucide-react";
import Image from "next/image"; // Image Import

// Trusted Brands Logos
const BRAND_LOGOS = [
  { name: "Brand A", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Brand B", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
];

// Main Logo Path (Same as Navbar)
const MAIN_LOGO = "/logo/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-background pt-24 pb-8 px-6 md:px-12 border-t border-white/5 overflow-hidden text-foreground">

      {/* Background Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-electric-blue/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- PART 1: TRUSTED BRANDS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 border-b border-white/10 pb-12">
          <h3 className="font-share-tech text-foreground/60 text-sm uppercase tracking-widest">
            Trusted by Industry Leaders
          </h3>

          <div className="flex items-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            {BRAND_LOGOS.map((brand, i) => (
              <div key={i} className="relative h-8 w-24 md:w-32">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  className="object-contain invert dark:invert-0"
                />
              </div>
            ))}
          </div>
        </div>


        {/* --- PART 2: MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

          {/* BRAND IDENTITY COLUMN */}
          <div className="md:col-span-5 flex flex-col justify-between h-full">
            <div>
              <Link href="./logo/logo.png" className="inline-block group mb-6">
                {/* 👇 LOGO IMAGE REPLACEMENT */}
                <div className="relative h-12 w-48 md:w-64">
                  <Image
                    src={MAIN_LOGO}
                    alt="NOVAGRAPHY Logo"
                    fill
                    className="object-contain object-left invert-0 dark:invert-0"
                  // Note: If your logo is white text, it might need 'invert' class in light mode depending on the image color.
                  // If it's a colored PNG that works on both, remove 'invert'.
                  />
                </div>
              </Link>

              <p className="font-base-neue text-foreground/70 mt-4 max-w-sm text-sm leading-relaxed">
                Crafting visual identities and digital experiences for forward-thinking brands.
                Based in the digital realm, operating worldwide.
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-8 md:mt-0 relative group">
              <input
                type="email"
                placeholder="Enter email for updates"
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm font-share-tech text-foreground focus:outline-none focus:border-electric-blue transition-colors placeholder:text-gray-600"
              />
              <button className="absolute right-0 top-3 text-gray-400 group-hover:text-electric-blue transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          {/* NAVIGATION COLUMN */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <h4 className="font-share-tech text-electric-blue text-xs uppercase tracking-widest mb-4">SITEMAP</h4>
            {["Work", "Studio", "Services", "About", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="font-base-neue text-foreground/70 hover:text-foreground transition-colors text-sm w-fit group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                {item}
              </Link>
            ))}
          </div>

          {/* SOCIALS COLUMN */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-share-tech text-electric-blue text-xs uppercase tracking-widest mb-4">SOCIALS</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Dribbble, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/70 hover:bg-electric-blue/10 hover:text-electric-blue hover:border-electric-blue transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <a href="mailto:hello@novagraphy.com" className="font-contrail text-xl md:text-2xl text-foreground hover:text-electric-blue transition-colors underline decoration-electric-blue/30 underline-offset-4 hover:decoration-electric-blue">
                hello@novagraphy.com
              </a>
            </div>
          </div>

        </div>


        {/* --- PART 3: BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 font-share-tech text-[10px] md:text-xs text-foreground/60 uppercase tracking-wider">

          <div className="flex gap-4 md:gap-8 mb-4 md:mb-0">
            <span>© {currentYear} NOVAGRAPHY INC.</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}