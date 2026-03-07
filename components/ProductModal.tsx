"use client";

import React, { useState, useEffect } from "react";
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

  // --- INITIALIZE ---
  useEffect(() => {
    if (product) {
      // Default selections
      setSelectedColor(product.colors ? product.colors[0] : null);
      setSelectedSize(product.sizes ? product.sizes[0] : null);
      setQuantity(1);
      setActiveImageIndex(0); // Reset image index
    }
  }, [product]);

  // If color changes, reset image index to 0
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor]);

  if (!product) return null;

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

  return (
    <AnimatePresence>
      {productId && (
        <div className="relative z-[100]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl grid grid-cols-1 md:grid-cols-2"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/40 hover:bg-white/10 text-white transition-colors backdrop-blur-md border border-white/10"
                >
                  <X size={24} />
                </button>

                {/* --- LEFT: GALLERY --- */}
                <div className="flex flex-col h-full bg-white/5 border-r border-white/5">

                  {/* Main Image Display */}
                  <div className="relative flex-1 aspect-square md:aspect-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayImage} // Animate on change
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={displayImage}
                          alt={product.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Thumbnails (Only show if more than 1 image) */}
                  {currentImages.length > 1 && (
                    <div className="flex gap-2 p-4 overflow-x-auto bg-black/20 backdrop-blur-sm border-t border-white/5">
                      {currentImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`
                                        relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0
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
                <div className="p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a]">

                  {/* ... (Title, Price, Description logic remains same) ... */}
                  <span className="font-share-tech text-gray-500 text-sm uppercase tracking-widest mb-2">
                    {product.category}
                  </span>
                  <h2 className="font-contrail text-3xl md:text-4xl lg:text-5xl uppercase text-white mb-4 leading-none">
                    {product.title}
                  </h2>
                  <div className="font-share-tech text-3xl text-electric-blue mb-6">
                    ${currentPrice.toFixed(2)}
                  </div>
                  <p className="font-base-neue text-gray-400 mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  {/* --- OPTIONS --- */}
                  <div className="space-y-6 mb-8 border-t border-white/10 pt-6">

                    {/* 1. COLOR SELECTOR */}
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <span className="font-share-tech text-xs text-gray-500 uppercase tracking-widest block mb-3">
                          Select Color: <span className="text-white">{selectedColor?.name}</span>
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
                              {/* Show first image of this color as preview */}
                              <Image src={color.images[0]} alt={color.name} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ... (Sizes & Quantity logic remains same) ... */}

                    {/* 2. SIZES */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <span className="font-share-tech text-xs text-gray-500 uppercase tracking-widest block mb-3">
                          Select Size: <span className="text-white">{selectedSize?.label}</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size.label}
                              onClick={() => setSelectedSize(size)}
                              className={`
                                                px-4 py-2 border rounded font-share-tech text-sm transition-all
                                                ${selectedSize?.label === size.label
                                  ? 'bg-white text-black border-white'
                                  : 'border-white/20 text-gray-400 hover:border-electric-blue hover:text-electric-blue'
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
                      <span className="font-share-tech text-xs text-gray-500 uppercase tracking-widest block mb-3">Quantity</span>
                      <div className="flex items-center gap-4 bg-white/5 w-fit rounded-full px-4 py-2 border border-white/10">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-white"><Minus size={16} /></button>
                        <span className="font-share-tech text-white w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-white"><Plus size={16} /></button>
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
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}