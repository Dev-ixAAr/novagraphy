import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default async function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pkg = await prisma.servicePackage.findUnique({
    where: { id },
  });

  if (!pkg) notFound();

  const WHATSAPP_NUMBER = '94XXXXXXXXX'; // ← Replace with your WhatsApp number
  const whatsappText = encodeURIComponent(
    `Hi, I would like to request the ${pkg.title} from the ${pkg.category} category.`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0f1115] text-gray-900 dark:text-gray-100 py-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10 pt-16">
        
        {/* Back Link */}
        <Link 
          href="/start-project"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Packages
        </Link>
        
        {/* Main Card */}
        <div className="relative bg-white dark:bg-[#161920] rounded-3xl p-8 sm:p-12 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-gray-800/60 overflow-hidden">
          
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 border-[40px] border-indigo-50/50 dark:border-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 border-[40px] border-cyan-50/50 dark:border-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between">
            {/* Left Col - Info */}
            <div className="flex-1 space-y-8">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  {pkg.category}
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  {pkg.title}
                </h1>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {pkg.price}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b border-gray-100 dark:border-gray-800 pb-2">
                  What&apos;s Included
                </h3>
                <ul className="space-y-4">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-4">
                      <CheckCircle2 size={22} className="shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col - Checkout Box */}
            <div className="w-full md:w-80 shrink-0">
              <div className="bg-gray-50 dark:bg-[#0f1115] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-6">
                <h3 className="text-lg font-semibold text-center">Ready to Start?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Click the button below to text us on WhatsApp. We typically reply within 1-2 hours.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-[#161920]"
                >
                  <Send size={18} />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Notes */}
          <div className="relative z-10 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase mb-4">
              Important Notes
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-transparent dark:border-white/5">
                <p>• A 50% non-refundable advance payment is required before starting the project.</p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-transparent dark:border-white/5">
                <p>• Additional revisions beyond the package limit will incur extra charges.</p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-transparent dark:border-white/5">
                <p>• Source files (PSD/AI) are available at an additional 25% to 50% cost.</p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-transparent dark:border-white/5">
                <p>• Project timelines start from the day all requirements and advance payments are received.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
