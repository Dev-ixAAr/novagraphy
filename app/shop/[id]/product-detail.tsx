// app/shop/[id]/product-detail.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Star, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { ProductWithDetails } from "@/lib/types/database";

type ProductDetailProps = {
  product: ProductWithDetails;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Current images based on selected color
  const currentImages = selectedColor?.images || [product.image];
  
  // Calculate price
  const finalPrice = product.basePrice + (selectedSize?.priceMod || 0);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs tracking-widest">BACK TO SHOP</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ============================================ */}
          {/* LEFT — IMAGES */}
          {/* ============================================ */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={currentImages[selectedImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900"
            >
              <Image
                src={currentImages[selectedImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Thumbnail Strip */}
            {currentImages.length > 1 && (
              <div className="flex gap-3">
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`
                      relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300
                      ${
                        selectedImageIndex === idx
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                          : "opacity-50 hover:opacity-100"
                      }
                    `}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================================ */}
          {/* RIGHT — PRODUCT INFO */}
          {/* ============================================ */}
          <div className="space-y-8">
            {/* Category */}
            <p className="text-xs tracking-[0.3em] text-neutral-500">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">
                ${finalPrice.toFixed(2)}
              </span>
              {selectedSize && selectedSize.priceMod > 0 && (
                <span className="text-sm text-neutral-500 line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed">
              {product.description}
            </p>

            {/* ============================================ */}
            {/* COLOR SELECTOR */}
            {/* ============================================ */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs tracking-widest text-neutral-500">
                  COLOR — {selectedColor?.name || "Select"}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedImageIndex(0); // Reset image on color change
                      }}
                      className={`
                        w-10 h-10 rounded-full transition-all duration-300
                        ${
                          selectedColor?.id === color.id
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                            : "hover:scale-110"
                        }
                      `}
                      style={{ backgroundColor: color.hex || "#333" }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* SIZE SELECTOR */}
            {/* ============================================ */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs tracking-widest text-neutral-500">
                  SIZE — {selectedSize?.label || "Select"}
                </p>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-6 py-3 text-sm tracking-wider rounded-lg transition-all duration-300 border
                        ${
                          selectedSize?.id === size.id
                            ? "bg-white text-black border-white font-bold"
                            : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30"
                        }
                      `}
                    >
                      {size.label}
                      {size.priceMod > 0 && (
                        <span className="text-[10px] ml-1 text-neutral-500">
                          +${size.priceMod}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* ADD TO CART */}
            {/* ============================================ */}
            <button className="w-full py-4 bg-white text-black font-bold tracking-widest text-sm rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              ADD TO CART — ${finalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}