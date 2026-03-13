"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProductWithDetails } from "@/lib/types/database";

export function MinimalistLightbox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedImageId = searchParams.get("selectedImageId");

  const [product, setProduct] = useState<ProductWithDetails | null>(null);

  // ✅ Fetch product from database via API
  useEffect(() => {
    if (!selectedImageId) {
      setProduct(null);
      return;
    }

    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${selectedImageId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to load product for lightbox:", error);
      }
    }

    loadProduct();
  }, [selectedImageId]);

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
              src={product.colors?.[0]?.images?.[0] || product.image}
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
