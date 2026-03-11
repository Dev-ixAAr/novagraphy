"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems, toggleCart } = useCart();
  
  // Only show the global cart icon on the shop page or its subroutes
  const isShopPage = pathname?.startsWith('/shop');

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4 md:px-6">
      {/* ═══════════════════════════════════════════════════════════════
          NAVBAR WRAPPER — Strict Light / Dark theme enforcement
          Light: translucent white glass with dark text
          Dark:  translucent black glass with light text
      ═══════════════════════════════════════════════════════════════ */}
      <nav
        className={[
          "relative flex items-center justify-between w-full h-14 rounded-full px-6",
          "backdrop-blur-md shadow-2xl transition-colors duration-300",
          /* ── Light Mode (default) ── */
          "bg-white/80 border border-black/10 text-zinc-900",
          /* ── Dark Mode ── */
          "dark:bg-black/60 dark:border-white/10 dark:text-white",
        ].join(" ")}
      >

        {/* --- LEFT SIDE: LOGO --- */}
        <div className="flex items-center gap-4">
          <Link href="/" className="relative z-10 flex items-center">
            <div className="relative h-8 w-28 md:w-32">
              {/*
                Logo color handling:
                - Source logo is assumed WHITE / light.
                - Light mode: `invert` flips it to dark so it's visible on white bg.
                - Dark mode: `dark:invert-0` keeps the original light logo.
              */}
              <Image
                src="/logo/logo.png"
                alt="Logo"
                fill
                className="object-contain object-left invert dark:invert-0 transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* Glowing Vertical Divider */}
          <div className="hidden md:block h-6 w-[1px] bg-blue-500/80 shadow-[0_0_12px_2px_rgba(59,130,246,0.8)]" />
        </div>

        {/* --- CENTER: LINKS --- */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={[
                  "relative flex flex-col items-center justify-center h-full px-2",
                  "text-sm uppercase tracking-widest font-medium font-base-neue",
                  "transition-colors duration-300",
                  isActive
                    ? "text-electric-blue"
                    : "text-zinc-900 dark:text-white hover:text-electric-blue dark:hover:text-electric-blue",
                ].join(" ")}
              >
                {link.name}

                {isActive && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="absolute bottom-2 h-1 w-1 rounded-full bg-electric-blue shadow-[0_0_8px_#2DE1FC]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* --- RIGHT SIDE: CTA & MOBILE TOGGLE --- */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <button
              className={[
                "group relative overflow-hidden rounded-full bg-transparent px-6 py-2",
                "text-[11px] font-share-tech uppercase tracking-widest",
                "transition-all duration-300",
                /* Light */
                "border border-zinc-900/20 text-zinc-900",
                "hover:border-electric-blue hover:text-electric-blue",
                "hover:shadow-[0_0_15px_rgba(45,225,252,0.2)]",
                /* Dark */
                "dark:border-white/20 dark:text-white",
                "dark:hover:border-electric-blue dark:hover:text-electric-blue",
              ].join(" ")}
            >
              <span className="relative z-10 transition-colors duration-300 font-semibold">
                START PROJECT
              </span>
              <div className="absolute inset-0 bg-electric-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </div>

          {/* --- CONDITIONALLY RENDER CART ICON (Only on Shop) --- */}
          <AnimatePresence>
            {isShopPage && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={toggleCart}
                className="relative p-2 text-zinc-900 dark:text-white hover:text-electric-blue dark:hover:text-electric-blue transition-colors cursor-pointer"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartItems.length > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-0 right-0 h-4 w-4 rounded-full bg-electric-blue flex items-center justify-center border-2 border-white dark:border-black"
                    >
                      <span className="text-[9px] font-bold text-black leading-none">
                        {cartItems.length}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>

          {/* --- MOBILE TOGGLE --- */}
          <button
            className="md:hidden text-zinc-900 dark:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={[
              "absolute top-16 left-4 right-4 z-40 rounded-3xl p-6",
              "backdrop-blur-2xl md:hidden flex flex-col gap-6 shadow-2xl",
              "transition-colors duration-300",
              /* Light */
              "bg-white/95 border border-black/10 text-zinc-900",
              /* Dark */
              "dark:bg-black/95 dark:border-white/10 dark:text-white",
            ].join(" ")}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={[
                    "text-2xl font-base-neue flex justify-between items-center group",
                    "transition-colors duration-300",
                    isActive
                      ? "text-electric-blue"
                      : "text-zinc-900 dark:text-white hover:text-electric-blue dark:hover:text-electric-blue",
                  ].join(" ")}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_#2DE1FC]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-900/10 dark:bg-white/10 group-hover:bg-electric-blue transition-colors" />
                  )}
                </Link>
              );
            })}

            <div className="h-[1px] bg-zinc-900/10 dark:bg-white/10 w-full my-2 transition-colors duration-300" />

            <button
              onClick={() => setIsOpen(false)}
              className={[
                "w-full rounded-full border border-electric-blue bg-electric-blue/10",
                "px-6 py-4 text-[11px] font-share-tech uppercase tracking-widest",
                "text-electric-blue transition-all",
                "active:bg-electric-blue active:text-white dark:active:text-black",
                "hover:bg-electric-blue hover:text-white dark:hover:text-black",
                "hover:shadow-[0_0_15px_rgba(45,225,252,0.4)]",
              ].join(" ")}
            >
              START PROJECT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}