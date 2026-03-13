"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { ProductWithDetails } from "@/lib/types/database";

export function ProductModal() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const productId = searchParams.get("productId");

  // DATABASE PRODUCT
  const [product, setProduct] = useState<ProductWithDetails | null>(null);

  const [loading, setLoading] = useState(false);

  // UI STATE
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [isAdding, setIsAdding] = useState(false);

  const [mounted, setMounted] = useState(false);


  // FETCH PRODUCT FROM DATABASE
  useEffect(() => {

    if (!productId) {

      setProduct(null);

      return;

    }

    async function loadProduct() {

      try {

        setLoading(true);

        const res = await fetch(`/api/products/${productId}`);

        const data = await res.json();

        setProduct(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadProduct();

  }, [productId]);


  // INITIALIZE DEFAULTS
  useEffect(() => {

    setMounted(true);

    if (product) {

      setSelectedColor(product.colors?.[0] || null);

      setSelectedSize(product.sizes?.[0] || null);

      setQuantity(1);

      setActiveImageIndex(0);

    }

  }, [product]);


  // BODY SCROLL LOCK
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


  // RESET IMAGE WHEN COLOR CHANGES
  useEffect(() => {

    setActiveImageIndex(0);

  }, [selectedColor]);


  if (!mounted || loading || !product) return null;


  // PRICE CALC
  const currentPrice =
    (product.basePrice + (selectedSize?.priceMod || 0)) * quantity;


  // IMAGE SOURCE
  const currentImages =
    selectedColor?.images?.length > 0
      ? selectedColor.images
      : [product.image];


  const displayImage =
    currentImages[activeImageIndex] || product.image;


  const handleClose = () => {

    router.push("/shop", { scroll: false });

  };


  const handleAddToCart = () => {

    setIsAdding(true);

    setTimeout(() => {

      addToCart({

        id: `${product.id}-${selectedColor?.name || "default"}-${selectedSize?.label || "onesize"}`,

        name: product.title,

        price:
          product.basePrice + (selectedSize?.priceMod || 0),

        image: displayImage,

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

            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}

            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl"

            onClick={(e) => e.stopPropagation()}

          >

            {/* CLOSE */}
            <button

              onClick={handleClose}

              className="absolute top-4 right-4 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full transition-colors z-10"

            >

              <X className="w-6 h-6" />

            </button>


            {/* GALLERY */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-6">

              <AnimatePresence mode="wait">

                <motion.div

                  key={displayImage}

                  initial={{ opacity: 0 }}

                  animate={{ opacity: 1 }}

                  exit={{ opacity: 0 }}

                  transition={{ duration: 0.3 }}

                  className="w-full h-full flex items-center justify-center"

                >

                  <img

                    src={displayImage || "/placeholder.png"}

                    alt={product.title}

                    className="w-full h-full object-contain drop-shadow-xl"

                  />

                </motion.div>

              </AnimatePresence>


              {currentImages.length > 1 && (

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-md">

                  {currentImages.map((img: any, idx: number) => (

                    <button

                      key={idx}

                      onClick={() => setActiveImageIndex(idx)}

                      className={`

                      relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0

                      ${activeImageIndex === idx
                          ? "border-electric-blue opacity-100"
                          : "border-transparent opacity-50 hover:opacity-100"
                        }

                      `}

                    >

                      <Image

                        src={img}

                        alt="Thumbnail"

                        fill

                        className="object-cover"

                      />

                    </button>

                  ))}

                </div>

              )}

            </div>


            {/* DETAILS */}

            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">

              <span className="text-gray-500 text-sm uppercase tracking-widest mb-2 block">

                {product.category}

              </span>

              <h2 className="text-3xl md:text-4xl uppercase mb-4">

                {product.title}

              </h2>

              <div className="text-3xl text-electric-blue mb-6">

                ${currentPrice.toFixed(2)}

              </div>

              <p className="text-gray-600 mb-8">

                {product.description}

              </p>


              {/* OPTIONS */}

              <div className="space-y-6 mb-8 border-t pt-6">


                {/* COLOR */}

                {product.colors?.length > 0 && (

                  <div>

                    <span className="text-xs uppercase block mb-3">

                      Color : {selectedColor?.name}

                    </span>

                    <div className="flex gap-3">

                      {product.colors.map((color: any) => (

                        <button

                          key={color.id}

                          onClick={() => setSelectedColor(color)}

                          className={`

                          relative w-12 h-12 rounded-full overflow-hidden border-2

                          ${selectedColor?.id === color.id
                              ? "border-electric-blue scale-110"
                              : "opacity-70"
                            }

                          `}

                        >

                          <Image

                            src={color.images[0]}

                            alt={color.name}

                            fill

                            className="object-cover"

                          />

                        </button>

                      ))}

                    </div>

                  </div>

                )}


                {/* SIZE */}

                {product.sizes?.length > 0 && (

                  <div>

                    <span className="text-xs uppercase block mb-3">

                      Size : {selectedSize?.label}

                    </span>

                    <div className="flex flex-wrap gap-2">

                      {product.sizes.map((size: any) => (

                        <button

                          key={size.label}

                          onClick={() => setSelectedSize(size)}

                          className={`

                          px-4 py-2 border rounded text-sm

                          ${selectedSize?.label === size.label
                              ? "bg-black text-white"
                              : "border-gray-300"
                            }

                          `}

                        >

                          {size.label}

                          {size.priceMod > 0 && (
                            <span className="text-[10px] ml-1">

                              (+${size.priceMod})

                            </span>
                          )}

                        </button>

                      ))}

                    </div>

                  </div>

                )}


                {/* QUANTITY */}

                <div>

                  <span className="text-xs uppercase block mb-3">

                    Quantity

                  </span>

                  <div className="flex items-center gap-4">

                    <button

                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }

                    >

                      <Minus size={16} />

                    </button>

                    <span>{quantity}</span>

                    <button

                      onClick={() =>
                        setQuantity(quantity + 1)
                      }

                    >

                      <Plus size={16} />

                    </button>

                  </div>

                </div>


              </div>


              {/* ADD TO CART */}

              <button

                onClick={handleAddToCart}

                disabled={isAdding}

                className={`

                w-full py-5 rounded-full text-xl uppercase

                flex items-center justify-center gap-3

                ${isAdding
                    ? "bg-green-500"
                    : "bg-electric-blue"
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