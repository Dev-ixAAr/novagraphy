// app/product/[id]/product-detail-client.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import type { ProductWithDetails } from "@/lib/types/database";

type ProductDetailClientProps = {
  product: ProductWithDetails;
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  
  // State
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || product.sizes?.[0] || null); // Default M
  const [isAdding, setIsAdding] = useState(false);

  // Computed Price
  const currentPrice = product.basePrice + (selectedSize?.priceMod || 0);

  // Image source
  const displayImage = selectedColor?.images?.[0] || product.image;

  // Add to Cart Logic
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate API delay / Animation time
    setTimeout(() => {
      addToCart({
        id: `${product.id}-${selectedColor?.name || "default"}-${selectedSize?.label || "onesize"}`,
        name: product.title,
        price: currentPrice,
        image: displayImage,
        color: selectedColor?.name || "Standard",
        size: selectedSize?.label || "One Size",
        quantity: 1,
      });
      setIsAdding(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      {/* Include Drawer so it renders when state changes */}
      <CartDrawer />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div className="relative flex flex-col gap-6">
          {/* Main Image with Transition */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor?.name || "default"}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
            
            {/* Overlay Tag */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full">
               <span className="font-share-tech text-electric-blue text-xs uppercase">Limited Edition</span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.colors && product.colors.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.colors.map((col) => (
                <button 
                  key={col.id}
                  onClick={() => setSelectedColor(col)}
                  className={`relative aspect-square rounded-xl overflow-hidden border transition-all duration-300 ${selectedColor?.id === col.id ? 'border-electric-blue opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                   <Image src={col.images[0] || product.image} alt={col.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>


        {/* --- RIGHT: DETAILS & ACTIONS --- */}
        <div className="flex flex-col justify-center h-full lg:sticky lg:top-24">
           
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-xs font-share-tech text-gray-500 mb-6 uppercase tracking-widest">
              <span>Home</span> / <span>Shop</span> / <span className="text-electric-blue">{product.category}</span>
           </div>

           {/* Title & Price */}
           <h1 className="font-contrail text-5xl md:text-7xl uppercase leading-none mb-4">
             {product.title}
           </h1>
           
           <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <motion.span 
                 key={currentPrice} // Animates number change
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="font-share-tech text-4xl text-electric-blue"
              >
                ${currentPrice.toFixed(2)}
              </motion.span>
              
              <div className="flex items-center gap-2">
                 <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
                 <span className="font-base-neue text-xs text-gray-400">(128 Reviews)</span>
              </div>
           </div>

           {/* Description */}
           <p className="font-base-neue text-gray-400 leading-relaxed mb-8">
             {product.description}
           </p>


           {/* --- VARIANTS --- */}
           <div className="space-y-8 mb-10">
              
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                   <span className="font-share-tech text-xs text-gray-500 uppercase tracking-widest block mb-4">
                      Select Color: <span className="text-white">{selectedColor?.name || "Standard"}</span>
                   </span>
                   <div className="flex gap-4">
                      {product.colors.map((color) => (
                         <button
                           key={color.id}
                           onClick={() => setSelectedColor(color)}
                           className={`
                             group relative h-10 w-10 rounded-full flex items-center justify-center
                             transition-all duration-300
                             ${selectedColor?.id === color.id ? 'scale-110 ring-2 ring-electric-blue ring-offset-2 ring-offset-black' : 'hover:scale-105'}
                           `}
                           aria-label={`Select ${color.name}`}
                         >
                            <span 
                              className="absolute inset-0 rounded-full border border-white/10"
                              style={{ backgroundColor: color.hex || "#333" }} 
                            />
                         </button>
                      ))}
                   </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                   <span className="font-share-tech text-xs text-gray-500 uppercase tracking-widest block mb-4">
                      Select Size: <span className="text-white">{selectedSize?.label || "One Size"}</span>
                   </span>
                   <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                         <button
                           key={size.id}
                           onClick={() => setSelectedSize(size)}
                           className={`
                             h-12 w-16 border rounded flex items-center justify-center font-base-neue text-sm transition-all duration-300
                             ${selectedSize?.id === size.id 
                               ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                               : 'bg-transparent text-gray-400 border-white/20 hover:border-electric-blue hover:text-electric-blue'
                             }
                           `}
                         >
                            {size.label}
                         </button>
                      ))}
                   </div>
                </div>
              )}
           </div>


           {/* --- ACTIONS --- */}
           <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                  relative flex-1 h-16 overflow-hidden rounded-full font-contrail text-xl uppercase tracking-wider
                  transition-all duration-300 border border-transparent
                  ${isAdding ? 'bg-green-500 text-black' : 'bg-electric-blue text-black hover:shadow-[0_0_30px_rgba(45,225,252,0.5)]'}
                `}
              >
                 <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                       {isAdding ? (
                         <motion.div
                           key="added"
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -20, opacity: 0 }}
                           className="flex items-center gap-2"
                         >
                            <Check size={24} /> ADDED!
                         </motion.div>
                       ) : (
                         <motion.div
                           key="add"
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -20, opacity: 0 }}
                           className="flex items-center gap-2"
                         >
                            ADD TO CART <Plus size={24} />
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </button>
              
              <button className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300">
                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>
              </button>
           </div>

           <p className="mt-6 font-share-tech text-[10px] text-gray-500 text-center uppercase tracking-widest">
             Free shipping on orders over $300 • 30-Day Returns
           </p>

        </div>

      </div>
    </div>
  );
}
