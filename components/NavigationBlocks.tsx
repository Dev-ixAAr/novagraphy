"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, ShoppingBag, Layers, Activity } from "lucide-react";

// දත්ත ටික මෙතනම හදාගමු
const BLOCKS = [
  {
    id: "01",
    title: "GRAPHY",
    href: "/",
    icon: <Camera size={32} />,
    desc: "Visual Portfolio & Case Studies",
    color: "group-hover:text-pink-500", // Hover Color
  },
  {
    id: "02",
    title: "STUDIO",
    href: "/novastudio",
    icon: <Layers size={32} />,
    desc: "Our Creative Workspace",
    color: "group-hover:text-purple-500",
  },
  {
    id: "03",
    title: "STORE",
    href: "/shop",
    icon: <ShoppingBag size={32} />,
    desc: "Merch & Digital Assets",
    color: "group-hover:text-electric-blue",
  },
  {
    id: "04",
    title: "2.0",
    href: "/nova2.0",
    icon: <Activity size={32} />,
    desc: "The Next Evolution",
    color: "group-hover:text-green-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const blockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function NavigationBlocks() {
  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header (Optional) */}
        <div className="mb-12">
          <span className="font-share-tech text-gray-500 text-xs tracking-widest uppercase">
            (06) EXPLORE
          </span>
          <h2 className="font-contrail text-3xl md:text-4xl lg:text-5xl uppercase text-foreground">
            Navigate <span className="text-gray-600">Deep</span>
          </h2>
        </div>

        {/* --- GRID BLOCKS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {BLOCKS.map((item) => (
            <Link key={item.id} href={item.href} className="block group">
              <motion.div
                variants={blockVariants}
                className="
                  relative h-[350px] flex flex-col justify-between p-8
                  border border-white/10 bg-white/5 dark:bg-black/20 
                  hover:bg-white/10 dark:hover:bg-white/5 
                  transition-colors duration-500 overflow-hidden
                "
              >
                {/* Top Row: ID & Icon */}
                <div className="flex justify-between items-start z-10">
                  <span className="font-share-tech text-xs text-gray-500">
                    ( {item.id} )
                  </span>

                  {/* Icon Container */}
                  <div className={`
                    p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md
                    text-gray-400 transition-colors duration-300
                    ${item.color} group-hover:border-current
                  `}>
                    {item.icon}
                  </div>
                </div>

                {/* Bottom Row: Title & Arrow */}
                <div className="z-10 mt-auto">
                  <h3 className="font-contrail text-3xl md:text-4xl lg:text-5xl text-foreground mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="font-base-neue text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
                    {item.desc}
                  </p>
                </div>

                {/* Corner Arrow (Slides in) */}
                <div className={`
                  absolute top-8 right-8 opacity-0 -translate-x-4 -translate-y-4
                  group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0
                  transition-all duration-300 delay-75
                  ${item.color}
                `}>
                  <ArrowUpRight size={24} />
                </div>

                {/* Hover Background Gradient */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10
                  bg-gradient-to-br from-current to-transparent
                  transition-opacity duration-500 pointer-events-none
                  ${item.color.replace('text-', 'text-')} 
                `} />
                {/* Note: Tailwind dynamic colors in gradients can be tricky. 
                    Alternatively, use simple white/5 hover or specific classes. */}

              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}