"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Award, Users, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar"; // 👈 Import Navbar
import { Footer } from "@/components/Footer";

// --- DATA ---
const TIMELINE = [
    { year: "2020", title: "THE SPARK", desc: "Started in a garage with one laptop and a vision to disrupt the digital space." },
    { year: "2021", title: "FIRST CLIENT", desc: "Landed our first international project in Tokyo, setting our global standard." },
    { year: "2022", title: "SCALING UP", desc: "Moved into our first physical studio and hired the core engineering team." },
    { year: "2023", title: "EXPANSION", desc: "Opened the Colombo headquarters and launched the 'Graphy' digital product line." },
    { year: "2024", title: "AWWWARDS", desc: "Won 'Site of the Day' for three consecutive projects, cementing our status." },
    { year: "2025", title: "FUTURE", desc: "Launching our own AI-driven design tools. The revolution continues." },
];

const PHILOSOPHY = [
    { title: "Obsession", desc: "We don't just design; we obsess over every pixel until it bleeds perfection.", color: "bg-blue-600" },
    { title: "Innovation", desc: "If it's been done before, we are not interested. We chase the unseen.", color: "bg-purple-600" },
    { title: "Humanity", desc: "Technology is cold. We inject soul into code to make it feel alive.", color: "bg-orange-500" },
];

const FOUNDER = { name: "ALEX NOVA", role: "FOUNDER & CREATIVE DIRECTOR", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887" };
const TEAM = [
    { name: "SARA JIN", role: "ART DIRECTOR", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887" },
    { name: "KAITO M.", role: "TECH LEAD", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887" },
    { name: "ELENA R.", role: "3D ARTIST", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" },
];

const BG_IMG = "/logo/gojo.png";

export default function AboutPage() {
    return (
        <div className="min-h-screen transition-colors duration-700 ease-in-out bg-background text-foreground selection:bg-electric-blue selection:text-black overflow-x-hidden">
            <Navbar /> {/* 👈 Add Navbar */}
            {/* 1. BACKGROUND */}
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

            <div className="relative z-10">
                <HeroSection />
                <StatsBanner />
                <VerticalJourneySection /> {/* 👇 UPDATED SECTION */}
                <CardStackPhilosophy />
                <FounderSection />
                <TeamGrid />
                <MarqueeCTA />
            </div>
            <Footer />
        </div>
    );
}

// --- UPDATED: VERTICAL SPLIT JOURNEY ---
function VerticalJourneySection() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-24">
                    <span className="font-share-tech text-blue-600 dark:text-electric-blue uppercase tracking-widest text-sm">The Path</span>
                    <h2 className="font-contrail text-5xl md:text-7xl text-foreground mt-4">OUR LEGACY</h2>
                </div>

                <div className="relative">
                    {/* Central Line (Desktop Only) */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-foreground/10 md:-translate-x-1/2 h-full z-0" />

                    <div className="space-y-12 md:space-y-24">
                        {TIMELINE.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >

                                    {/* 1. Empty Space (For Balance) */}
                                    <div className="hidden md:block w-1/2" />

                                    {/* 2. Central Node (Dot) */}
                                    <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-2 border-blue-600 dark:border-electric-blue bg-white dark:bg-black z-10 md:-translate-x-1/2 transform -translate-x-1/2 md:translate-x-[-50%] mt-1 md:mt-0 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-electric-blue rounded-full animate-pulse" />
                                    </div>

                                    {/* 3. Content Card */}
                                    <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                        <span className="font-contrail text-6xl md:text-8xl text-foreground/5 dark:text-white/5 absolute -top-8 -z-10 select-none">
                                            {item.year}
                                        </span>
                                        <div className="relative z-10">
                                            <h3 className="font-share-tech text-2xl text-blue-600 dark:text-electric-blue mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="font-base-neue text-lg text-foreground/60 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

// --- RE-USED COMPONENTS (Unchanged) ---

function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div ref={containerRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
            <motion.div style={{ y }} className="text-center z-10">
                <div className="mb-6 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-12 bg-gray-400 dark:bg-electric-blue/50 transition-colors duration-700" />
                    <span className="font-share-tech text-foreground/60 dark:text-electric-blue uppercase tracking-[0.3em] text-sm font-bold transition-colors duration-700">The Origin Story</span>
                    <div className="h-[1px] w-12 bg-gray-400 dark:bg-electric-blue/50 transition-colors duration-700" />
                </div>
                <h1 className="font-contrail text-7xl md:text-[10rem] uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 transition-all duration-700">WHO <br /> WE ARE</h1>
            </motion.div>
        </div>
    );
}

function StatsBanner() {
    return (
        <section className="relative z-10 -mt-20 px-6">
            <div className="max-w-5xl mx-auto rounded-3xl border border-foreground/10 bg-background/60 dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl transition-colors duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-foreground/10">
                    <StatItem icon={<Globe />} value="15+" label="Countries Served" />
                    <StatItem icon={<Award />} value="08" label="International Awards" />
                    <StatItem icon={<Users />} value="450+" label="Happy Clients" />
                </div>
            </div>
        </section>
    );
}

function StatItem({ icon, value, label }: { icon: any, value: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4 text-gray-700 dark:text-electric-blue transition-colors duration-700">{icon}</div>
            <span className="font-contrail text-4xl md:text-5xl text-foreground transition-colors duration-700">{value}</span>
            <span className="font-share-tech text-xs uppercase tracking-widest text-gray-500 mt-2">{label}</span>
        </div>
    );
}

function CardStackPhilosophy() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3 sticky top-32 h-fit">
                    <span className="font-share-tech text-electric-blue text-xs tracking-widest uppercase mb-4 block">Our DNA</span>
                    <h2 className="font-contrail text-6xl md:text-7xl uppercase leading-none text-foreground mb-6">
                        What Drives <br /> <span className="text-foreground/60">Us Forward</span>
                    </h2>
                    <p className="font-base-neue text-foreground/60">
                        It's not just about code. It's about the feeling. The rhythm. The impact.
                    </p>
                </div>

                <div className="lg:w-2/3 space-y-8">
                    {PHILOSOPHY.map((item, index) => (
                        <div key={index} className="sticky top-40">
                            <div className={`
                      p-12 rounded-3xl border border-foreground/20 shadow-xl
                      backdrop-blur-xl
                      bg-background
                      transition-transform duration-500 hover:scale-[1.02]
                   `}>
                                <div className="flex justify-between items-start mb-8">
                                    <span className={`text-xs font-share-tech px-3 py-1 rounded-full text-white ${item.color}`}>0{index + 1}</span>
                                    <ArrowUpRight className="text-foreground/60" />
                                </div>
                                <h3 className="font-contrail text-5xl uppercase mb-4 text-foreground">{item.title}</h3>
                                <p className="font-base-neue text-xl text-foreground/60 max-w-lg">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FounderSection() {
    return (
        <section className="py-32 px-6 md:px-12 bg-background transition-colors duration-700">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <div className="w-full md:w-1/2 relative group">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl">
                            <Image src={FOUNDER.img} alt={FOUNDER.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" />
                            <div className="absolute bottom-8 right-8 mix-blend-difference"><span className="font-gudlak text-6xl text-white opacity-80">Alex.</span></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-electric-blue" />
                            <span className="font-share-tech text-electric-blue text-sm uppercase tracking-widest">Visionary</span>
                        </div>
                        <h2 className="font-contrail text-6xl md:text-8xl uppercase leading-none mb-8 text-foreground">{FOUNDER.name}</h2>
                        <h3 className="font-share-tech text-gray-500 text-lg uppercase tracking-widest mb-8 border-b border-foreground/10 pb-8 inline-block">{FOUNDER.role}</h3>
                        <p className="font-base-neue text-xl text-foreground/60 leading-relaxed max-w-lg mb-12">"We don't chase trends. We create digital ecosystems that define the next era of the web."</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TeamGrid() {
    return (
        <section className="py-24 px-6 md:px-12 border-t border-foreground/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex justify-between items-end">
                    <h2 className="font-contrail text-4xl md:text-5xl uppercase text-foreground/60">The Core Team</h2>
                    <span className="font-share-tech text-xs text-electric-blue border border-electric-blue/30 px-3 py-1 rounded-full">03 MEMBERS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TEAM.map((member, i) => (
                        <div key={i} className="group relative cursor-pointer">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-background mb-6 border border-foreground/5 shadow-lg dark:shadow-none">
                                <Image src={member.img} alt={member.name} fill className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110 z-10" />
                            </div>
                            <div className="text-center group-hover:-translate-y-2 transition-transform duration-500">
                                <h3 className="font-contrail text-2xl text-foreground uppercase">{member.name}</h3>
                                <p className="font-base-neue text-xs text-gray-500 uppercase tracking-widest mt-1 group-hover:text-electric-blue transition-colors">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MarqueeCTA() {
    return (
        <section className="py-24 overflow-hidden border-t border-foreground/10 bg-background transition-colors duration-700">
            <Link href="/contact" className="group block">
                <div className="whitespace-nowrap flex overflow-hidden">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                        className="flex gap-12 pr-12"
                    >
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="font-contrail text-[10vw] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 group-hover:from-electric-blue group-hover:to-cyan-600 transition-all duration-500">
                                Let's Create Magic ✦
                            </span>
                        ))}
                    </motion.div>
                </div>
            </Link>
        </section>
    );
}