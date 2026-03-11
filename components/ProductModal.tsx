"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS, Product, ProductVariant, ProductSize } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const productId = searchParams.get("productId");
  const product = PRODUCTS.find((p) => p.id === productId);

  // --- STATE ---
  const [selectedColor, setSelectedColor] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  // 📸 NEW: Active Image Index (Main Image)
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- INITIALIZE ---
  useEffect(() => {
    setMounted(true);
    if (product) {
      // Default selections
      setSelectedColor(product.colors ? product.colors[0] : null);
      setSelectedSize(product.sizes ? product.sizes[0] : null);
      setQuantity(1);
      setActiveImageIndex(0); // Reset image index
    }
  }, [product]);

  // Handle body scroll lock
  useEffect(() => {
    if (productId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [productId]);

  // If color changes, reset image index to 0
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor]);

  if (!mounted || !product) return null;

  // --- LOGIC ---
  const currentPrice = (product.basePrice + (selectedSize?.priceMod || 0)) * quantity;

  // 🖼️ Determine Image List to Show
  // If color selected -> use its images array
  // If no color -> fallback to single product.image (as an array)
  const currentImages = selectedColor
    ? selectedColor.images
    : [product.image];

  const displayImage = currentImages[activeImageIndex];

  const handleClose = () => {
    router.push("/shop", { scroll: false });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart({
        id: `${product.id}-${selectedColor?.name || 'default'}-${selectedSize?.label || 'onesize'}`,
        name: product.title,
        price: product.basePrice + (selectedSize?.priceMod || 0),
        image: displayImage, // Thumbnail in cart
        color: selectedColor?.name || "Standard",
        size: selectedSize?.label || "One Size",
        quantity: quantity,
      });
      setIsAdding(false);
      handleClose();
    }, 600);
  };

  return createPortal(
    <AnimatePresence>
      {productId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[9999] top-0 left-0 w-screen h-[100dvh] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-black dark:text-white" />
            </button>

            {/* --- LEFT: GALLERY --- */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayImage} // Animate on change
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={displayImage || product.image || '/placeholder.png'}
                    alt={product.title}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Thumbnails (Only show if more than 1 image) */}
              {currentImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-md">
                  {currentImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`
                        relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0
                        ${activeImageIndex === idx ? 'border-electric-blue opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}
                      `}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* --- RIGHT: DETAILS --- */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
              <span className="font-share-tech text-gray-500 dark:text-gray-400 text-sm uppercase tracking-widest mb-2 block">
                {product.category}
              </span>
              <h2 className="font-contrail text-3xl md:text-4xl lg:text-5xl uppercase text-black dark:text-white mb-4 leading-none">
                {product.title}
              </h2>
              <div className="font-share-tech text-3xl text-electric-blue mb-6">
                ${currentPrice.toFixed(2)}
              </div>
              <p className="font-base-neue text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* --- OPTIONS --- */}
              <div className="space-y-6 mb-8 border-t border-black/10 dark:border-white/10 pt-6">

                {/* 1. COLOR SELECTOR */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="font-share-tech text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3">
                      Select Color: <span className="text-black dark:text-white">{selectedColor?.name}</span>
                    </span>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color)}
                          className={`
                            relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all flex items-center justify-center
                            ${selectedColor?.id === color.id ? 'border-electric-blue scale-110' : 'border-transparent opacity-70 hover:opacity-100'}
                          `}
                        >
                          <Image src={color.images[0]} alt={color.name} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. SIZES */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <span className="font-share-tech text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3">
                      Select Size: <span className="text-black dark:text-white">{selectedSize?.label}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size.label}
                          onClick={() => setSelectedSize(size)}
                          className={`
                            px-4 py-2 border rounded font-share-tech text-sm transition-all
                            ${selectedSize?.label === size.label
                              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                              : 'border-black/20 text-gray-600 dark:border-white/20 dark:text-gray-400 hover:border-electric-blue hover:text-electric-blue'
                            }
                          `}
                        >
                          {size.label} {size.priceMod > 0 && <span className="text-[10px] ml-1 opacity-60">(+${size.priceMod})</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. QUANTITY */}
                <div>
                  <span className="font-share-tech text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3">Quantity</span>
                  <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 w-fit rounded-full px-4 py-2 border border-black/10 dark:border-white/10">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"><Minus size={16} /></button>
                    <span className="font-share-tech text-black dark:text-white w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"><Plus size={16} /></button>
                  </div>
                </div>

              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                  w-full py-5 rounded-full font-contrail text-xl uppercase tracking-wider
                  transition-all duration-300 border flex items-center justify-center gap-3
                  ${isAdding
                    ? 'bg-green-500 border-green-500 text-black'
                    : 'bg-electric-blue border-electric-blue text-black hover:shadow-[0_0_30px_rgba(45,225,252,0.4)]'
                  }
                `}
              >
                {isAdding ? (
                  <>Added <Check size={20} /></>
                ) : (
                  <>Add to Cart <ShoppingBag size={20} /></>
                )}
              </button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}