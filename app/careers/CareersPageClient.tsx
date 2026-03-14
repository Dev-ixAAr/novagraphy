"use client";

import React, { useState, useRef, useTransition } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { ArrowUpRight, Globe, Zap, Cpu, Briefcase, MapPin, ChevronDown, Send, CheckCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { submitApplication } from "@/app/actions/application";

// --- STATIC PERKS (not managed via admin) ---
const PERKS = [
  { title: "Global Freedom", desc: "Work from anywhere. 15+ timezones.", icon: <Globe /> },
  { title: "Creative Autonomy", desc: "Lead your craft. No micromanagement.", icon: <Zap /> },
  { title: "Premium Gear", desc: "Top-tier M3 Max MacBooks provided.", icon: <Cpu /> },
];

// --- TYPES ---
interface JobData {
  id: string;
  title: string;
  salary: string;
  type: string;
  location: string;
  dept: string;
  active: boolean;
  createdAt: Date;
}

interface CareersPageClientProps {
  jobs: JobData[];
}

export default function CareersPageClient({ jobs }: CareersPageClientProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-electric-blue selection:text-black overflow-x-hidden transition-colors duration-500">
      <Navbar />
      {/* CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
      </div>

      <div className="relative z-10">
        <ParallaxHero />
        <SpotlightPerks />
        <JobsAccordion jobs={jobs} />
        <FAQSection />
      </div>

      <Footer />
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
    mouseX.set((clientX - left - width / 2) * 0.05);
    mouseY.set((clientY - top - height / 2) * 0.05);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[85vh] flex items-center justify-center overflow-hidden"
    >
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

          <h1 className="font-contrail text-5xl md:text-7xl lg:text-[10rem] uppercase leading-[0.8] tracking-tighter mb-8 mix-blend-overlay">
            Join The <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Cult.</span>
          </h1>

          <p className="font-base-neue text-gray-400 max-w-lg mx-auto text-base md:text-lg lg:text-xl leading-relaxed">
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

// ─── JOBS ACCORDION (INLINE EXPANSION) ──────────────────────────────────────
function JobsAccordion({ jobs }: { jobs: JobData[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 flex items-end justify-between border-b border-foreground/10 pb-8">
          <h2 className="font-contrail text-6xl text-foreground uppercase">Open Roles</h2>
          <span className="font-share-tech text-electric-blue text-xs border border-electric-blue/30 px-3 py-1 rounded-full">
            {String(jobs.length).padStart(2, "0")} POSITIONS
          </span>
        </div>

        {jobs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isExpanded={expandedId === job.id}
                onToggle={() => toggle(job.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/40 font-base-neue py-12">No open positions at this time. Check back soon!</p>
        )}
      </div>
    </section>
  );
}

// ─── SINGLE JOB CARD (WITH INLINE FORM) ─────────────────────────────────────
function JobCard({
  job,
  isExpanded,
  onToggle,
}: {
  job: JobData;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`
        relative rounded-3xl border transition-all duration-500 overflow-hidden
        ${isExpanded
          ? "bg-[#16181d] border-electric-blue/20 shadow-[0_0_40px_-12px_rgba(45,225,252,0.12)]"
          : "bg-foreground/5 dark:bg-white/5 border-foreground/10 hover:bg-foreground/10 dark:hover:bg-white/10"
        }
      `}
    >
      {/* ── Clickable Header ── */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-8 md:p-10 cursor-pointer group"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3
              className={`font-contrail text-3xl md:text-5xl transition-colors duration-300 ${
                isExpanded ? "text-electric-blue" : "text-foreground group-hover:text-electric-blue"
              }`}
            >
              {job.title}
            </h3>
            <div className="flex gap-6 mt-3 font-share-tech text-xs text-foreground/50 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <MapPin size={12} /> {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase size={12} /> {job.type}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <span className="font-share-tech text-foreground text-lg hidden md:block">
              {job.salary}
            </span>
            <div
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isExpanded
                  ? "bg-electric-blue text-black border-electric-blue rotate-90"
                  : "border-foreground/20 group-hover:bg-electric-blue group-hover:text-black group-hover:border-electric-blue"
              }`}
            >
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </button>

      {/* ── Expandable Inline Form ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="form-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <InlineApplicationForm job={job} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── INLINE APPLICATION FORM ────────────────────────────────────────────────
function InlineApplicationForm({ job }: { job: JobData }) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setError(null);
    const formData = new FormData(formRef.current);

    startTransition(async () => {
      const result = await submitApplication(formData, job.title);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong.");
      }
    });
  };

  return (
    <div className="px-8 md:px-10 pb-10">
      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

      {submitted ? (
        /* ── Success State ── */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center py-8"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="font-contrail text-2xl text-white mb-2">Application Sent!</h3>
          <p className="font-base-neue text-gray-400 max-w-md text-sm leading-relaxed">
            Thank you for applying for{" "}
            <span className="text-electric-blue font-semibold">{job.title}</span>.
            We&apos;ve sent a confirmation to your email. Our team will review your portfolio and reach out soon.
          </p>
        </motion.div>
      ) : (
        /* ── Form ── */
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputGroup label="First Name" name="firstName" required />
            <InputGroup label="Last Name" name="lastName" required />
          </div>
          <InputGroup label="Email Address" name="email" type="email" required />
          <InputGroup label="Phone Number" name="phone" type="tel" required />
          <InputGroup label="Portfolio URL (Optional)" name="portfolioUrl" />
          <InputGroup label="LinkedIn / GitHub (Optional)" name="linkedinUrl" />

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-base-neue">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 rounded-full bg-white text-black hover:bg-electric-blue hover:text-black font-contrail text-lg uppercase tracking-wider hover:shadow-[0_0_30px_rgba(45,225,252,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application <Send size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── INPUT GROUP ────────────────────────────────────────────────────────────
function InputGroup({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative group">
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-b border-gray-600/60 focus:border-electric-blue py-3 text-white font-base-neue focus:outline-none transition-colors peer placeholder-transparent"
        placeholder={label}
      />
      <label className="absolute left-0 -top-3 text-xs text-gray-400 font-share-tech uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-electric-blue">
        {label}
      </label>
    </div>
  );
}

// --- FAQ ---
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
                <ChevronDown className={`text-foreground/50 transition-transform ${open === i ? "rotate-180" : ""}`} />
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
