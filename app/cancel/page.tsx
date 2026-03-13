"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

export default function OrderCancelPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 bg-zinc-50 dark:bg-black/95 text-zinc-900 dark:text-white selection:bg-red-500/30">
      
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8"
      >
        <XCircle 
          className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]" 
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center max-w-lg w-full"
      >
        <h1 className="font-contrail text-4xl md:text-5xl uppercase tracking-wider mb-4">
          Payment Canceled
        </h1>
        <p className="font-base-neue text-zinc-500 dark:text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-md mx-auto">
          Your payment was not completed or has been canceled. Don't worry, you haven't been charged. Please try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8">
          <Link href="/checkout" className="w-full sm:w-auto">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full tracking-widest uppercase font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-[0.98]">
              Try Again
            </button>
          </Link>
          
          <Link href="/cart" className="w-full sm:w-auto">
            <button className="w-full bg-transparent border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-900 dark:text-white px-8 py-4 rounded-full tracking-widest uppercase font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950 active:scale-[0.98]">
              Back to Cart
            </button>
          </Link>
        </div>
      </motion.div>

    </main>
  );
}
