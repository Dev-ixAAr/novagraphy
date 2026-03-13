"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shirt, ShoppingBag } from "lucide-react";
import Image from "next/image";
// ✅ Database type instead of mock data
import type { ProductDisplay } from "@/lib/types/database";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

// ✅ Props type — data comes from Server Component
type ProductShowcaseProps = {
  productDisplays: ProductDisplay[];
};

export function ProductShowcase({ productDisplays }: ProductShowcaseProps) {
    return (
        <section className="w-full bg-background py-24 px-6 md:px-12 border-t border-white/5 relative">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto">

                {/* Header - Right Aligned */}
                <div className="flex flex-col items-end mb-12 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Shirt className="text-electric-blue w-6 h-6" />
                        <span className="font-share-tech text-electric-blue text-xs tracking-widest">SECTION 05</span>
                    </div>
                    <h2 className="font-contrail text-3xl md:text-4xl lg:text-5xl text-foreground uppercase leading-none text-right">
                        Merch <span className="text-gray-600">/ Store</span>
                    </h2>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
                >
                    {productDisplays.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl ${item.className || ''}`}
                        >
                            {/* Status Badge */}
                            {item.status && (
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="bg-electric-blue text-black font-share-tech text-[10px] px-3 py-1 rounded uppercase tracking-wider">
                                        {item.status}
                                    </span>
                                </div>
                            )}

                            {/* Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center">
                                <button className="flex items-center gap-2 border border-electric-blue text-electric-blue px-6 py-3 rounded-full font-share-tech hover:bg-electric-blue hover:text-black transition-colors duration-300">
                                    <ShoppingBag className="w-4 h-4" />
                                    BUY NOW - {item.price}
                                </button>
                            </div>

                            {/* Default Info (Visible when NOT hovering) */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                                <h3 className="font-contrail text-3xl text-white uppercase">{item.title}</h3>
                                <p className="font-share-tech text-electric-blue">{item.price}</p>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}