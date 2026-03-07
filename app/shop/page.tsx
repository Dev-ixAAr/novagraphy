"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { PRODUCTS } from "@/data/content";
import { ProductModal } from "@/components/ProductModal";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar"; // 👈 Import Navbar
import { Footer } from "@/components/Footer";

// Wrap contents in Suspense because we use useSearchParams in the Modal
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const router = useRouter();
  const { toggleCart, cartItems } = useCart();

  const handleProductClick = (id: string) => {
    // Update URL to trigger Modal without page reload
    router.push(`/shop?productId=${id}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 relative">

      {/* 1. Global Components */}
      <Navbar />
      <CartDrawer />
      <ProductModal />


      {/* 2. Floating Cart Trigger (Specific to Shop Page) */}
      <button
        onClick={toggleCart}
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 h-16 w-16 bg-electric-blue rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(45,225,252,0.4)] hover:scale-110 transition-transform duration-300"
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold h-6 w-6 rounded-full flex items-center justify-center border-2 border-black">
            {cartItems.length}
          </span>
        )}
      </button>

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

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image Card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 border border-white/10 mb-6">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-share-tech text-white uppercase tracking-widest border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-contrail text-2xl text-white uppercase group-hover:text-electric-blue transition-colors">
                    {product.title}
                  </h3>
                  <p className="font-base-neue text-sm text-gray-500 mt-1">
                    {product.category}
                  </p>
                </div>
                <span className="font-share-tech text-lg text-white">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}