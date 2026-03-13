"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// ✅ Database type instead of mock data
import type { ProductWithDetails } from "@/lib/types/database";

// ✅ Props type — data comes from Server Component
type LatestProductsBentoProps = {
  products: ProductWithDetails[];
};

export function LatestProductsBento({ products }: LatestProductsBentoProps) {
  const router = useRouter();

  // Get only the first 4 items for the Home page
  const featuredProducts = products.slice(0, 4);

  const handleProductClick = (id: string) => {
    // Navigate to Shop page with the Query Param
    router.push(`/shop?productId=${id}`);
  };

  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-share-tech text-electric-blue text-sm uppercase tracking-widest mb-2 block">
              (05) New Arrivals
            </span>
            <h2 className="font-contrail text-4xl md:text-5xl lg:text-7xl uppercase text-foreground leading-none">
              Latest <span className="text-gray-600">Drops</span>
            </h2>
          </div>
          <button
            onClick={() => router.push('/shop')}
            className="hidden md:flex items-center gap-2 font-share-tech text-xs uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-electric-blue hover:text-black hover:border-electric-blue transition-all duration-300"
          >
            View Full Collection <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">

          {featuredProducts.map((product, index) => {
            // Bento Logic: First item spans 2 rows & 2 cols (Large square)
            const isLarge = index === 0;
            const gridClass = isLarge
              ? "md:col-span-2 md:row-span-2"
              : "md:col-span-1 md:row-span-1";

            return (
              <motion.div
                key={product.id}
                layoutId={`product-${product.id}`}
                onClick={() => handleProductClick(product.id)}
                className={`
                  relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 
                  ${gridClass}
                `}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={product.colors?.[0]?.images?.[0] || product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    {isLarge && (
                      <span className="bg-electric-blue text-black font-share-tech text-[10px] px-2 py-1 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="backdrop-blur-xl bg-black/60 border border-white/10 p-4 rounded-xl">
                      <h3 className="font-contrail text-xl md:text-2xl text-white uppercase">{product.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-share-tech text-electric-blue">${product.basePrice.toFixed(2)}</span>
                        <span className="text-xs font-base-neue text-gray-300 flex items-center gap-1">
                          <ShoppingBag size={12} /> Shop Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}