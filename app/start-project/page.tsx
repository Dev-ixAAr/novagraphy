import type { Metadata } from "next";
import { prisma } from '@/lib/prisma';
import { ArrowRight, Sparkles } from 'lucide-react';
import PricingCards from '@/components/PricingCards';

export const metadata: Metadata = {
  title: "[INSERT_START_PROJECT_TITLE]",
  description: "[INSERT_START_PROJECT_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_START_PROJECT_OG_TITLE]",
    description: "[INSERT_START_PROJECT_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_START_PROJECT_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_START_PROJECT_OG_IMAGE_ALT]" }],
  },
};

// ─────────────────────────────────────────────
// Public Start‑Project / Pricing Page
// ─────────────────────────────────────────────
export default async function StartProjectPage() {
  const packages = await prisma.servicePackage.findMany({
    orderBy: { createdAt: 'asc' },
  });

  const WHATSAPP_NUMBER = '94XXXXXXXXX'; // ← Replace with your WhatsApp number

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1115] text-gray-900 dark:text-gray-100 selection:bg-indigo-500/30 transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-gray-300 mb-8 transition-colors">
            <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
            Premium Creative Services
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Start Your{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Project
            </span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            Choose a package that fits your vision. Premium quality, unmatched creativity, delivered on time.
          </p>
        </div>
      </section>

      {/* ── Packages by Category ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {packages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-500 text-lg py-20">
            No service packages available at the moment. Check back soon!
          </p>
        ) : (
          <PricingCards packages={packages} />
        )}
      </section>

      {/* ── Bottom CTA ── */}
      {packages.length > 0 && (
        <section className="border-t border-gray-200 dark:border-gray-800/50 transition-colors">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Need something custom?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto transition-colors">
              Can&apos;t find the right package? Let&apos;s create a plan that&apos;s tailored perfectly to your project.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I would like to discuss a custom project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black px-8 py-3.5 rounded-xl font-semibold text-sm dark:hover:bg-gray-100 transition-all shadow-lg shadow-gray-900/10 dark:shadow-white/10"
            >
              Let&apos;s Talk
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      )}
    </main>
  );
}

