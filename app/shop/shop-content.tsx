// app/shop/shop-content.tsx
"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
// ✅ Database type instead of mock data
import type { ProductWithDetails } from "@/lib/types/database";
import { ProductModal } from "@/components/ProductModal";
import { MinimalistLightbox } from "@/components/MinimalistLightbox";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ============================================
// PROPS TYPE — Data comes from Server Component
// ============================================
type ShopContentProps = {
  products: ProductWithDetails[];
};

// ============================================
// MAIN EXPORT
// ============================================
export default function ShopContent({ products }: ShopContentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopInner products={products} />
    </Suspense>
  );
}

// ============================================
// INNER COMPONENT (uses hooks like useRouter)
// ============================================
function ShopInner({ products }: ShopContentProps) {
  const router = useRouter();
  const { toggleCart, cartItems } = useCart();

  const handleProductClick = (id: string) => {
    router.push(`/shop?productId=${id}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 relative">
      {/* 1. Global Components */}
      <Navbar />
      <CartDrawer />
      <ProductModal />
      <MinimalistLightbox />

      {/* 2. Floating Cart Trigger */}
      <motion.button
        onClick={toggleCart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[100] flex items-center justify-center p-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] cursor-pointer transition-colors bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-blue-500 rounded-full border-2 border-white dark:border-black">
            {cartItems.length}
          </span>
        )}
      </motion.button>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="font-share-tech text-gray-500 text-xs tracking-widest uppercase mb-2 block">
            Catalog 2024
          </span>
          <h1 className="font-contrail text-6xl md:text-8xl uppercase text-white leading-none">
            All <span className="text-electric-blue">Products</span>
          </h1>
        </div>

        {/* Product Grid — ✅ Uses database `products` prop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Image Card */}
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 border border-white/10 mb-6 cursor-pointer"
                onClick={() =>
                  router.push(`/shop?selectedImageId=${product.id}`, {
                    scroll: false,
                  })
                }
              >
                <Image
                  src={
                    // ✅ First color's first image, fallback to product.image
                    product.colors?.[0]?.images?.[0] || product.image
                  }
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Badge */}
                {product.status && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[10px] tracking-widest font-bold bg-electric-blue text-black rounded-full uppercase">
                      {product.status}
                    </span>
                  </div>
                )}

                {/* Quick View Overlay */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span className="font-share-tech text-white uppercase tracking-widest border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Info */}
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div>
                  <h3 className="font-contrail text-2xl text-white uppercase group-hover:text-electric-blue transition-colors">
                    {product.title}
                  </h3>
                  <p className="font-base-neue text-sm text-gray-500 mt-1">
                    {product.category}
                  </p>

                  {/* ✅ Color Swatches from database */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {product.colors.map((color) => (
                        <div
                          key={color.id}
                          className="w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125"
                          style={{ backgroundColor: color.hex || "#333" }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  )}

                  {/* ✅ Size Tags from database */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size.id}
                          className="px-2 py-0.5 text-[10px] tracking-wider bg-white/5 rounded text-gray-500 border border-white/5"
                        >
                          {size.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="font-share-tech text-lg text-white">
                  ${product.basePrice.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-700 mb-6" />
            <h3 className="font-contrail text-3xl text-gray-600 mb-4">
              No Products Yet
            </h3>
            <p className="font-base-neue text-gray-500">
              Check back soon for new drops.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}