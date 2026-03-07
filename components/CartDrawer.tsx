"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { isOpen, toggleCart, cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. BACKDROP BLUR OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
          />

          {/* 2. DRAWER PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md border-l border-white/10 bg-[#050505] shadow-2xl"
          >
            <div className="flex h-full flex-col">
              
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-electric-blue" size={20} />
                  <span className="font-contrail text-2xl uppercase text-white">Your Cart</span>
                  <span className="font-share-tech text-xs text-gray-500">({cartItems.length} ITEMS)</span>
                </div>
                <button 
                  onClick={toggleCart} 
                  className="rounded-full p-2 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CART ITEMS SCROLL AREA */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-electric-blue/20 scrollbar-track-transparent">
                {cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <span className="font-share-tech text-gray-600">CART IS EMPTY</span>
                    <button onClick={toggleCart} className="text-electric-blue text-sm underline underline-offset-4">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item, idx) => (
                      <motion.div 
                        key={`${item.id}-${idx}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5"
                      >
                        {/* Image */}
                        <div className="relative h-24 w-20 overflow-hidden rounded-lg bg-gray-900">
                           <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        
                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="font-contrail text-lg text-white uppercase leading-none">{item.name}</h4>
                            <div className="mt-1 flex gap-3 text-xs font-share-tech text-gray-400">
                               <span>SIZE: {item.size}</span>
                               <span className="w-px h-3 bg-white/20"></span>
                               <span>COLOR: {item.color}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                             <span className="font-share-tech text-electric-blue text-lg">
                               ${item.price.toFixed(2)}
                             </span>
                             <button 
                               onClick={() => removeFromCart(item.id)}
                               className="text-gray-500 hover:text-red-500 transition-colors"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER & CHECKOUT */}
              <div className="border-t border-white/10 bg-black/20 p-6 backdrop-blur-xl">
                <div className="mb-6 flex justify-between items-end">
                   <span className="font-base-neue text-sm text-gray-400 uppercase tracking-widest">Subtotal</span>
                   <span className="font-share-tech text-3xl text-white">${cartTotal.toFixed(2)}</span>
                </div>
                
                <button className="
                  group relative w-full overflow-hidden rounded-full 
                  bg-white text-black py-4 
                  font-contrail text-xl uppercase tracking-wider
                  transition-all duration-300
                  hover:bg-electric-blue hover:shadow-[0_0_40px_rgba(45,225,252,0.4)]
                ">
                   <span className="relative z-10 flex items-center justify-center gap-2">
                     Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </span>
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}