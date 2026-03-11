"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";

export function MinimalistLightbox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedImageId = searchParams.get("selectedImageId");

  const product = PRODUCTS.find((p) => p.id === selectedImageId);

  useEffect(() => {
    if (selectedImageId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImageId]);

  const handleClose = () => {
    router.push("/shop", { scroll: false });
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {selectedImageId && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-3xl"
            onClick={handleClose}
          />
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
            className="relative z-10 w-full h-full p-4 md:p-12 flex items-center justify-center pointer-events-none"
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain pointer-events-auto drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
