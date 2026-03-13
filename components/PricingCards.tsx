'use client';

import { CheckCircle2, Star, Sparkles } from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  price: string;
  category: string;
  features: string[];
}

export default function PricingCards({ packages }: { packages: ServicePackage[] }) {
  // Group packages by category
  const grouped = new Map<string, ServicePackage[]>();
  for (const pkg of packages) {
    const list = grouped.get(pkg.category) ?? [];
    list.push(pkg);
    grouped.set(pkg.category, list);
  }

  const WHATSAPP_NUMBER = '94XXXXXXXXX'; // ← Replace with your WhatsApp number

  return (
    <div className="space-y-32">
      {[...grouped.entries()].map(([category, pkgs]) => (
        <div key={category} className="relative z-10 w-full mb-20 last:mb-0">
          
          {/* Category Header */}
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl sm:text-6xl font-base-neue font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400 drop-shadow-sm mb-4 transition-all">
              {category}
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-400 dark:via-electric-blue dark:to-cyan-400 rounded-full" />
          </div>

          <div className={`grid gap-8 ${pkgs.length === 1 ? 'max-w-md mx-auto' : pkgs.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {pkgs.map((pkg) => {
              const isPremium = pkg.title.toLowerCase().includes('premium');
              const isTopSelling = pkg.title === 'Top Selling Package';

              const whatsappText = encodeURIComponent(
                `Hi, I would like to request the ${pkg.title} from the ${pkg.category} category.`
              );
              const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

              return (
                <div 
                  key={pkg.id} 
                  className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2
                  ${isPremium || isTopSelling ? 'shadow-[0_0_40px_-10px_rgba(45,225,252,0.3)] hover:shadow-[0_0_60px_-10px_rgba(45,225,252,0.5)] scale-[1.02]' : 'shadow-2xl shadow-zinc-200/50 hover:shadow-zinc-300/50 dark:shadow-none'}
                  `}
                >
                  {/* Glassmorphism Background layer (Matched to Navbar) */}
                  <div className="absolute inset-0 backdrop-blur-md bg-white/80 border border-black/10 dark:bg-black/60 dark:border-white/10 transition-colors duration-300 z-0" />

                  {/* Gradient overlay logic for premium looks */}
                  {(isPremium || isTopSelling) && (
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent dark:from-electric-blue/10 dark:via-blue-600/5 dark:to-transparent pointer-events-none z-0" />
                  )}

                  {/* Top-Edge Gradient Line for neon effect */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 z-10 bg-gradient-to-r ${
                    isPremium ? 'from-indigo-600 via-electric-blue to-cyan-400 drop-shadow-[0_0_12px_rgba(45,225,252,0.8)]' : 
                    isTopSelling ? 'from-blue-600 via-cyan-500 to-indigo-600' :
                    'from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600'
                  }`} />

                  {/* Best Seller Ribbon Box */}
                  {isTopSelling && (
                    <div className="absolute top-6 right-0 bg-electric-blue/10 border-y border-l border-electric-blue text-electric-blue text-[10px] font-share-tech font-bold uppercase tracking-widest py-1.5 px-4 rounded-l-full shadow-[0_0_15px_rgba(45,225,252,0.2)] flex items-center gap-1.5 z-20 transition-colors">
                      <Star size={12} className="fill-electric-blue text-electric-blue drop-shadow-md" />
                      Best Seller
                    </div>
                  )}

                  <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                    
                    {/* Title & Badge */}
                    <div className="mb-6">
                      <h3 className={`text-2xl font-base-neue font-bold tracking-widest mb-2 ${
                        isPremium ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-electric-blue dark:to-cyan-400' : 
                        'text-zinc-900 dark:text-white'
                      }`}>
                        {pkg.title}
                        {isPremium && <Sparkles size={18} className="inline ml-2 text-electric-blue mb-1 drop-shadow-[0_0_8px_rgba(45,225,252,0.5)]" />}
                      </h3>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-base-neue font-black text-zinc-900 dark:text-white transition-colors tracking-tighter">
                          {pkg.price}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-zinc-900/10 dark:bg-white/10 mb-8 transition-colors duration-300" />

                    {/* Features */}
                    <div className="flex-1">
                      <ul className="space-y-4 mb-4">
                        {pkg.features.map((feature, fi) => {
                          const isHighlightedFeature = feature.toUpperCase().includes('UNLIMITED');
                          
                          return (
                            <li key={fi} className="flex items-start gap-3">
                              <CheckCircle2 
                                size={18} 
                                className={`shrink-0 mt-0.5 ${(isPremium || isTopSelling) ? 'text-electric-blue drop-shadow-[0_0_8px_rgba(45,225,252,0.4)]' : 'text-zinc-600 dark:text-zinc-400'}`} 
                              />
                              <span className={`text-[15px] font-medium leading-relaxed transition-colors ${
                                isHighlightedFeature 
                                ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-electric-blue dark:to-blue-400' 
                                : 'text-zinc-800 dark:text-zinc-300'
                              }`}>
                                {feature}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                      <p className="text-[11px] font-share-tech text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-6 mb-8 flex items-center">
                        * Consult requirements prior to quoting
                      </p>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative overflow-hidden w-full flex items-center justify-center gap-2.5 py-4 rounded-full text-[11px] font-share-tech uppercase tracking-widest transition-all duration-300 mt-auto border ${
                        (isPremium || isTopSelling)
                          ? 'border-electric-blue bg-electric-blue/10 text-electric-blue hover:bg-electric-blue hover:text-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(45,225,252,0.4)]'
                          : 'border-zinc-900/20 text-zinc-900 hover:border-electric-blue hover:text-electric-blue dark:border-white/20 dark:text-white dark:hover:border-electric-blue dark:hover:text-electric-blue hover:shadow-[0_0_15px_rgba(45,225,252,0.2)]'
                      }`}
                    >
                      {/* WhatsApp Icon */}
                      <svg className="w-4 h-4 fill-current relative z-10 transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                      <span className="relative z-10 font-bold">Order via WhatsApp</span>
                    </a>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
