"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { ArrowUpRight, Globe, Zap, Cpu, Briefcase, MapPin, ChevronDown, Send, X } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar"; // 👈 Import Navbar
import { Footer } from "@/components/Footer";

// --- MOCK DATA ---
const PERKS = [
  { title: "Global Freedom", desc: "Work from anywhere. 15+ timezones.", icon: <Globe /> },
  { title: "Creative Autonomy", desc: "Lead your craft. No micromanagement.", icon: <Zap /> },
  { title: "Premium Gear", desc: "Top-tier M3 Max MacBooks provided.", icon: <Cpu /> },
];

const JOBS = [
  { id: "j1", title: "SENIOR UI ENGINEER", salary: "$120k - $160k", type: "FULL-TIME", location: "REMOTE", dept: "ENGINEERING" },
  { id: "j2", title: "3D MOTION ARTIST", salary: "$90k - $130k", type: "CONTRACT", location: "HYBRID", dept: "DESIGN" },
  { id: "j3", title: "BRAND STRATEGIST", salary: "$110k - $150k", type: "FULL-TIME", location: "NEW YORK", dept: "STRATEGY" },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-electric-blue selection:text-black overflow-x-hidden transition-colors duration-500">
      <Navbar /> {/* 👈 Add Navbar at the top */}
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10">
        <ParallaxHero />
        <SpotlightPerks />
        <JobsList onApply={(job) => setSelectedJob(job)} />
        <FAQSection />
      </div>

      {/* 2. APPLICATION DRAWER (SLIDE-OVER) */}

      <ApplicationDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
      <Footer /> {/* 👈 Add Footer at the bottom */}
    </div>
  );
}

// --- HERO SECTION (PARALLAX TEXT) ---
function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) * 0.05); // Subtle movement
    mouseY.set((clientY - top - height / 2) * 0.05);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Floating Elements (Background) */}
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] border border-white/5 rounded-full opacity-20" />
        <div className="absolute w-[40vw] h-[40vw] border border-white/5 rounded-full opacity-30" />
        <div className="absolute w-[20vw] h-[20vw] border border-electric-blue/10 rounded-full opacity-50 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 border border-foreground/10 bg-foreground/5 dark:bg-white/5 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-share-tech text-xs uppercase tracking-widest text-gray-300">We are Hiring</span>
          </div>

          <h1 className="font-contrail text-7xl md:text-[10rem] uppercase leading-[0.8] tracking-tighter mb-8 mix-blend-overlay">
            Join The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Cult.</span>
          </h1>

          <p className="font-base-neue text-gray-400 max-w-lg mx-auto text-lg md:text-xl leading-relaxed">
            We are building the digital future. If you are obsessed with quality and crave the unknown, you belong here.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// --- SPOTLIGHT PERKS (MOUSE GLOW) ---
function SpotlightPerks() {
  return (
    <section className="py-24 px-6 md:px-12 border-b border-foreground/5 bg-foreground/5 dark:bg-black/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {PERKS.map((perk, i) => (
          <SpotlightCard key={i}>
            <div className="mb-6 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 w-fit text-electric-blue border border-foreground/10">
              {perk.icon}
            </div>
            <h3 className="font-contrail text-3xl text-foreground mb-2 uppercase">{perk.title}</h3>
            <p className="font-base-neue text-foreground/60 text-sm leading-relaxed">{perk.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

function SpotlightCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border border-foreground/10 bg-foreground/5 dark:bg-white/5 rounded-3xl p-8 overflow-hidden hover:border-foreground/20 transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(45, 225, 252, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// --- JOBS LIST (ACCORDION STYLE) ---
function JobsList({ onApply }: { onApply: (job: any) => void }) {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 flex items-end justify-between border-b border-foreground/10 pb-8">
          <h2 className="font-contrail text-6xl text-foreground uppercase">Open Roles</h2>
          <span className="font-share-tech text-electric-blue text-xs border border-electric-blue/30 px-3 py-1 rounded-full">
            03 POSITIONS
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="group relative p-8 md:p-10 rounded-3xl border border-foreground/10 bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 transition-all duration-500 cursor-pointer"
              onClick={() => onApply(job)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-contrail text-3xl md:text-5xl text-foreground group-hover:text-electric-blue transition-colors duration-300">
                    {job.title}
                  </h3>
                  <div className="flex gap-6 mt-3 font-share-tech text-xs text-foreground/50 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-2"><Briefcase size={12} /> {job.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <span className="font-share-tech text-foreground text-lg hidden md:block">{job.salary}</span>
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-electric-blue group-hover:text-black group-hover:border-electric-blue transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- APPLICATION DRAWER (SLIDE OVER) ---
function ApplicationDrawer({ job, onClose }: { job: any, onClose: () => void }) {
  return (
    <AnimatePresence>
      {job && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl bg-background border-l border-foreground/10 shadow-2xl overflow-y-auto"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="font-share-tech text-foreground/50 text-xs uppercase tracking-widest">Applying For</span>
                  <h2 className="font-contrail text-4xl text-foreground mt-2">{job.title}</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="First Name" />
                  <InputGroup label="Last Name" />
                </div>
                <InputGroup label="Email Address" type="email" />
                <InputGroup label="Portfolio URL" />
                <InputGroup label="LinkedIn / GitHub" />

                <div className="pt-8">
                  <button className="w-full py-5 rounded-full bg-foreground text-background hover:bg-electric-blue hover:text-black font-contrail text-xl uppercase tracking-wider hover:shadow-[0_0_30px_rgba(45,225,252,0.4)] transition-all flex items-center justify-center gap-3">
                    Submit Application <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InputGroup({ label, type = "text" }: { label: string, type?: string }) {
  return (
    <div className="relative group">
      <input
        type={type}
        required
        className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground font-base-neue focus:outline-none focus:border-electric-blue transition-colors peer placeholder-transparent"
        placeholder={label}
      />
      <label className="absolute left-0 -top-3 text-xs text-foreground/50 font-share-tech uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/50 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-electric-blue">
        {label}
      </label>
    </div>
  );
}

// --- FAQ (Keep Simple) ---
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const FAQS = [
    { q: "Remote Policy?", a: "100% Remote. We have hubs in Colombo and NY, but you work where you feel alive." },
    { q: "Hiring Process?", a: "Portfolio Review → Culture Chat → Paid Test Project → Offer." },
  ];

  return (
    <section className="py-24 px-6 md:px-12 border-t border-foreground/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-contrail text-3xl text-foreground/50 mb-12 text-center uppercase">Common Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-foreground/10 rounded-2xl bg-foreground/5 dark:bg-white/5 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between p-6 text-left">
                <span className="font-base-neue text-foreground">{faq.q}</span>
                <ChevronDown className={`text-foreground/50 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-6 pb-6 text-foreground/60 font-base-neue text-sm">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}