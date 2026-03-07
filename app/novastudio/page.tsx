"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Layers, Lightbulb, Zap } from "lucide-react";

const BG_IMG = "/logo/gojo.png";

const STUDIO_FEATURES = [
    {
        title: "CREATIVE HUB",
        desc: "Where ideas collide and become reality. Our studio is designed to foster untethered creativity.",
        icon: <Lightbulb className="w-8 h-8" />
    },
    {
        title: "HIGH-END GEAR",
        desc: "Equipped with the latest in digital production, from 8K rendering nodes to VR testing rigs.",
        icon: <Zap className="w-8 h-8" />
    },
    {
        title: "COLLABORATION SPACE",
        desc: "Open plan seating, quiet pods, and a café. Because the best ideas often happen over coffee.",
        icon: <Layers className="w-8 h-8" />
    }
];

const BENTO_PHOTOS = [
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069", span: "md:col-span-2 md:row-span-2", alt: "Studio Overview" },
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070", span: "md:col-span-2 md:row-span-1", alt: "Collaboration Pods" },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032", span: "md:col-span-1 md:row-span-1", alt: "Workstation Setup" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070", span: "md:col-span-1 md:row-span-1", alt: "Creative Space" },
    { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070", span: "md:col-span-4 md:row-span-1", alt: "Creative Think Tank" }
];

export default function NovaStudioPage() {
    return (
        <div className="min-h-screen transition-colors duration-700 ease-in-out bg-background text-foreground selection:bg-electric-blue selection:text-black overflow-x-hidden">
            <Navbar />

            {/* BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src={BG_IMG}
                    alt="Background"
                    fill
                    className="object-cover blur-[80px] opacity-10 dark:opacity-30 scale-110 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background/90 transition-colors duration-700" />
            </div>

            <div className="relative z-10 pt-32 pb-24">
                <HeroSection />
                <FeaturesSection />
                <GallerySection />
            </div>

            <Footer />
        </div>
    );
}

function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

    return (
        <section ref={containerRef} className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
            <motion.div style={{ y }} className="text-center z-10 max-w-5xl mx-auto">
                <div className="mb-6 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-12 bg-electric-blue/50" />
                    <span className="font-share-tech text-electric-blue uppercase tracking-[0.3em] text-sm font-bold">The Creative Core</span>
                    <div className="h-[1px] w-12 bg-electric-blue/50" />
                </div>
                <h1 className="font-contrail text-6xl md:text-[8rem] uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 pb-4">
                    NOVASTUDIO
                </h1>
                <p className="mt-8 font-base-neue text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                    More than a workspace. It's an ecosystem designed for high-performance creativity, where boundaries are pushed and digital magic is forged.
                </p>
            </motion.div>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STUDIO_FEATURES.map((feature, idx) => (
                        <div key={idx} className="p-10 rounded-3xl border border-foreground/10 bg-background/50 backdrop-blur-xl hover:border-electric-blue/50 transition-colors group">
                            <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-8 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="font-contrail text-3xl uppercase mb-4 text-foreground">{feature.title}</h3>
                            <p className="font-base-neue text-foreground/60 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GallerySection() {
    return (
        <section className="py-24 px-6 border-t border-foreground/5 relative">
            {/* Background ambient glow matching bento grid style */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <span className="font-share-tech text-electric-blue uppercase tracking-widest text-sm mb-4 block">Inside The Lab</span>
                    <h2 className="font-contrail text-5xl md:text-7xl uppercase text-foreground">A Glimpse</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    {BENTO_PHOTOS.map((photo, idx) => (
                        <div key={idx} className={`relative rounded-3xl overflow-hidden group border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl ${photo.span} ${photo.span.includes('md:row-span-1') && !photo.span.includes('col-span-4') ? 'aspect-square md:aspect-auto' : ''}`}>
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

                            {/* Hover info overlay */}
                            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 ease-out">
                                <span className="font-share-tech text-electric-blue text-xs tracking-widest uppercase bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-electric-blue/20">
                                    {photo.alt}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
