"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Check, ArrowUpRight, Mail, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";
import GlobeWidget from "@/components/contact/GlobeWidget";
import { Navbar } from "@/components/Navbar"; // 👈 Import Navbar
import { Footer } from "@/components/Footer";

// --- ANIMATION VARIANTS ---
const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
   }
};

const itemVariants = {
   hidden: { opacity: 0, scale: 0.95 },
   visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
   }
};

export default function ContactPage() {
   return (
      <div className="relative min-h-screen bg-background text-foreground selection:bg-electric-blue selection:text-black overflow-x-hidden transition-colors duration-500">
         <Navbar />
         {/* BACKGROUND EFFECTS */}
         <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
         </div>

         <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">

            {/* HEADER */}
            <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
               <div>
                  <span className="font-share-tech text-electric-blue text-xs tracking-widest uppercase mb-2 block">
                     (06) Contact Hub
                  </span>
                  <h1 className="font-contrail text-6xl md:text-7xl uppercase leading-none">
                     Let's <span className="text-foreground/50">Collaborate</span>
                  </h1>
               </div>
            </div>

            {/* --- PERFECT BENTO GRID --- */}
            {/* Mobile: 1 Col | Tablet: 2 Cols | Desktop: 4 Cols */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]" // Fixed row height for alignment
            >

               {/* 1. CONTACT FORM (Tall Box - Spans 2 Rows, 2 Cols) */}
               <motion.div variants={itemVariants} className="md:col-span-2 row-span-2">
                  <GlowCard className="h-full">
                     <ContactFormWidget />
                  </GlowCard>
               </motion.div>

               {/* 2. LIVE CLOCK (Small Box) */}
               <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                  <GlowCard className="h-full">
                     <TimeWidget />
                  </GlowCard>
               </motion.div>

               {/* 3. 3D GLOBE (Small Box) */}
               <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
                  <GlobeWidget />
                  <div className="absolute bottom-4 left-4 pointer-events-none z-10">
                     <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                        <span className="font-share-tech text-[10px] text-electric-blue uppercase">Online</span>
                     </div>
                     <div className="font-base-neue text-foreground text-sm">Colombo, LK</div>
                  </div>
               </motion.div>

               {/* 4. EMAIL (Small Box) */}
               <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                  <GlowCard className="h-full">
                     <CopyWidget label="Email" value="hello@novagraphy.com" icon={<Mail size={18} />} />
                  </GlowCard>
               </motion.div>

               {/* 5. LOCATION DETAILS (Small Box) */}
               <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                  <GlowCard className="h-full p-6 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                     <div className="flex justify-between items-start">
                        <div className="p-2 rounded-full bg-foreground/10 text-foreground group-hover:bg-electric-blue group-hover:text-black transition-colors">
                           <MapPin size={18} />
                        </div>
                        <ArrowUpRight className="text-foreground/60 group-hover:text-foreground transition-colors w-5 h-5" />
                     </div>
                     <div>
                        <span className="font-share-tech text-gray-500 text-[10px] uppercase block mb-1">Studio</span>
                        <p className="font-base-neue text-sm text-foreground leading-snug group-hover:text-electric-blue transition-colors">
                           45, Lotus Rd,<br /> Colombo 01.
                        </p>
                     </div>
                  </GlowCard>
               </motion.div>

               {/* 6. SOCIALS BAR (Wide Bar - Spans 2 Cols) */}
               <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 md:row-span-1">
                  <div className="h-full w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex items-center justify-between gap-4">
                     <span className="font-share-tech text-xs text-gray-500 hidden md:block">CONNECT WITH US</span>
                     <div className="flex gap-4 flex-1 justify-end">
                        <SocialIcon icon={<Instagram size={18} />} />
                        <SocialIcon icon={<Linkedin size={18} />} />
                        <SocialIcon icon={<Twitter size={18} />} />
                     </div>
                  </div>
               </motion.div>

            </motion.div>
         </div>
         <div className="relative z-10">
            <Footer />
         </div>
      </div>
   );
}

// --- WIDGETS ---

function GlowCard({ children, className }: { children: React.ReactNode, className?: string }) {
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
   }

   return (
      <div
         className={`relative group rounded-3xl border border-foreground/10 bg-foreground/5 dark:bg-white/5 backdrop-blur-xl overflow-hidden ${className}`}
         onMouseMove={handleMouseMove}
      >
         <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
               background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(45, 225, 252, 0.1), transparent 80%)`,
            }}
         />
         <div className="relative h-full z-10">{children}</div>
      </div>
   );
}

function ContactFormWidget() {
   return (
      <div className="h-full flex flex-col justify-between p-8">
         <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="font-share-tech text-[10px] text-green-500 uppercase tracking-widest">Projects Open</span>
            </div>
            <h3 className="font-contrail text-3xl md:text-4xl uppercase mb-6 leading-none">Start a Project</h3>
         </div>

         <form className="flex flex-col gap-6 flex-1 justify-center">
            <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="NAME" className="bg-transparent border-b border-foreground/10 py-2 text-sm focus:outline-none focus:border-electric-blue transition-colors font-share-tech" />
               <input type="email" placeholder="EMAIL" className="bg-transparent border-b border-foreground/10 py-2 text-sm focus:outline-none focus:border-electric-blue transition-colors font-share-tech" />
            </div>
            <input type="text" placeholder="TELL US ABOUT YOUR VISION" className="bg-transparent border-b border-foreground/10 py-2 text-sm focus:outline-none focus:border-electric-blue transition-colors font-share-tech w-full" />
         </form>

         <button className="mt-6 w-full bg-foreground text-background font-contrail text-lg uppercase py-4 rounded-full hover:bg-electric-blue hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Send Message
         </button>
      </div>
   );
}

function TimeWidget() {
   const [time, setTime] = useState("");
   const [date, setDate] = useState("");

   useEffect(() => {
      const updateTime = () => {
         const now = new Date();
         const options: Intl.DateTimeFormatOptions = { timeZone: "Asia/Colombo", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
         setTime(now.toLocaleTimeString("en-US", options));
         setDate(now.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }));
      };
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
         <span className="font-share-tech text-gray-500 text-[10px] uppercase tracking-widest mb-2">Local Time</span>
         <div className="font-share-tech text-4xl lg:text-5xl text-foreground tracking-widest whitespace-nowrap">
            {time}
         </div>
         <div className="mt-2 font-base-neue text-xs text-gray-400 uppercase tracking-widest">{date}</div>
      </div>
   );
}

function CopyWidget({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
   const [copied, setCopied] = useState(false);
   const handleCopy = () => {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div onClick={handleCopy} className="h-full w-full p-6 flex flex-col justify-between cursor-pointer group hover:bg-white/5 transition-colors">
         <div className="flex justify-between items-start">
            <div className="p-2 rounded-full bg-foreground/10 text-electric-blue group-hover:text-foreground transition-colors">
               {copied ? <Check size={18} /> : icon}
            </div>
            <div className="px-2 py-0.5 rounded border border-foreground/10 text-[9px] font-share-tech text-gray-500 uppercase">
               {copied ? "COPIED" : "COPY"}
            </div>
         </div>
         <div>
            <span className="font-share-tech text-gray-500 text-[10px] uppercase block mb-1">{label}</span>
            {/* break-all ensures long emails don't overflow */}
            <span className="font-base-neue text-sm md:text-base text-foreground group-hover:text-electric-blue transition-colors break-all">
               {value}
            </span>
         </div>
      </div>
   );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
   return (
      <div className="h-12 w-12 rounded-full border border-foreground/10 flex items-center justify-center text-gray-400 hover:text-background hover:bg-electric-blue hover:border-electric-blue transition-all duration-300 cursor-pointer">
         {icon}
      </div>
   );
}