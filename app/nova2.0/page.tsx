"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const BG_IMG = "/logo/gojo.png";

const EVOLUTION_POINTS = [
    {
        title: "AI INTEGRATION",
        desc: "We are fusing our creative processes with advanced, custom-trained AI models to accelerate output and unlock entirely new visual dimensions.",
        number: "01"
    },
    {
        title: "SPATIAL WEB",
        desc: "Preparing for the 3D internet. NOVA2.0 embraces WebGL, WebXR, and immersive interactive environments natively.",
        number: "02"
    },
    {
        title: "SUSTAINABLE CODE",
        desc: "Optimized performance, lower carbon footprint. We are restructuring our deployment pipelines for maximum efficiency.",
        number: "03"
    }
];

export default function Nova2Page() {
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
                <EvolutionSection />
                <TechShowcase />
            </div>

            <Footer />
        </div>
    );
}

function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={containerRef} className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
            <motion.div style={{ y }} className="text-center z-10 w-full max-w-6xl mx-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-electric-blue/30 bg-electric-blue/5 mb-8">
                    <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                    <span className="font-share-tech text-electric-blue text-xs tracking-widest uppercase">The Next Iteration</span>
                </div>

                <h1 className="font-contrail text-[12vw] md:text-[10rem] uppercase leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 relative">
                    NOVA <br /> <span className="text-electric-blue">2.0</span>
                </h1>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left border-t border-foreground/10 pt-12">
                    <div>
                        <span className="block font-share-tech text-electric-blue text-xs mb-2">STATUS</span>
                        <span className="font-base-neue text-foreground/80">Rolling Deployment</span>
                    </div>
                    <div>
                        <span className="block font-share-tech text-electric-blue text-xs mb-2">TARGET</span>
                        <span className="font-base-neue text-foreground/80">Q4 2026</span>
                    </div>
                    <div>
                        <span className="block font-share-tech text-electric-blue text-xs mb-2">OBJECTIVE</span>
                        <span className="font-base-neue text-foreground/80">Redefine Digital Boundaries</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function EvolutionSection() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3 sticky top-32 h-fit">
                    <span className="font-share-tech text-electric-blue text-xs tracking-widest uppercase mb-4 block">The Shift</span>
                    <h2 className="font-contrail text-6xl uppercase leading-none text-foreground mb-6">
                        Evolution <br /> <span className="text-foreground/60">Not Mutation</span>
                    </h2>
                    <p className="font-base-neue text-foreground/60 text-lg">
                        We aren't throwing away what worked. We are supercharging our foundation to handle the demands of the future web.
                    </p>
                </div>

                <div className="lg:w-2/3 space-y-6">
                    {EVOLUTION_POINTS.map((item, idx) => (
                        <div key={idx} className="group p-10 rounded-3xl border border-foreground/10 bg-background/50 backdrop-blur-md hover:border-electric-blue transition-all duration-500 flex gap-8 items-start">
                            <span className="font-contrail text-5xl text-electric-blue/30 group-hover:text-electric-blue transition-colors">
                                {item.number}
                            </span>
                            <div>
                                <h3 className="font-contrail text-3xl uppercase mb-3 text-foreground group-hover:text-electric-blue transition-colors">{item.title}</h3>
                                <p className="font-base-neue text-foreground/60 text-lg leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TechShowcase() {
    const images = [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000", // Abstract tech
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", // Screen code/future
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"  // Circuit/Tech
    ];

    return (
        <section className="py-24 px-6 border-t border-foreground/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="font-contrail text-5xl md:text-6xl uppercase text-foreground">The Next Horizon</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-foreground/10 group">
                            <Image
                                src={img}
                                alt={`Tech Vision ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 filter saturate-0 group-hover:saturate-100"
                            />
                            {/* Blue overlay */}
                            <div className="absolute inset-0 bg-electric-blue/10 mix-blend-overlay group-hover:bg-electric-blue/0 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
