"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 bg-zinc-50 dark:bg-black/95 text-zinc-900 dark:text-white selection:bg-blue-500/30">
      
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8"
      >
        <CheckCircle 
          className="w-24 h-24 text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" 
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <h1 className="font-contrail text-4xl md:text-5xl uppercase tracking-wider mb-4">
          Order Confirmed
        </h1>
        <p className="font-base-neue text-zinc-500 dark:text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-md mx-auto">
          Thank you for your purchase. Your creative gear is being prepared.
        </p>

        {/* Order Details subtle box */}
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl p-6 mb-12 backdrop-blur-sm shadow-sm inline-block w-full max-w-sm mx-auto text-left">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Order ID</span>
              <span className="font-share-tech text-base">#NVG-8492</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Estimated Delivery</span>
              <span className="text-sm font-medium">3-5 Business Days</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/shop" className="w-full sm:w-auto">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full tracking-widest uppercase font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98]">
              Continue Shopping
            </button>
          </Link>
          
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full bg-transparent border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-900 dark:text-white px-8 py-4 rounded-full tracking-widest uppercase font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950 active:scale-[0.98]">
              Back to Home
            </button>
          </Link>
        </div>
      </motion.div>

    </main>
  );
}
