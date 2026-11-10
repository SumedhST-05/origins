import React from 'react';
import { BRAND_VALUES } from '../../data/products';
import { ArrowUpRight, Compass, Hammer, Sparkles, Feather } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="story" className="py-28 bg-[#FAFAFA] border-t border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-brown-600" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-brown-600 font-semibold">
            THE MANIFESTO &bull; ORIGINE ATELIER
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.08] tracking-tight">
              NOT JUST FOOTWEAR. <br />
              <span className="text-brown-600 italic font-serif">A STATEMENT.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-4">
            <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
              We reject mass-disposable silhouettes. Every shoe is calibrated as a singular architectural artifact — balancing raw geological permanence with athletic feather-weight fluidity.
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Imagery & Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Left Large Editorial Photo with Overlay */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-luxury border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=85"
                alt="Artisanal leather shoe craftsmanship"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Editorial Quote Pill */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] font-mono tracking-widest text-brown-300 uppercase block mb-1">
                  ATELIER ARCHIVE &bull; VOL 01
                </span>
                <p className="font-editorial text-lg sm:text-xl font-bold max-w-lg leading-snug">
                  "Where classic shoemaking disciplines dissolve into computational generative geometry."
                </p>
              </div>
            </div>

            {/* Floating Overlapping Spec Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 p-5 rounded-2xl bg-white border border-neutral-200 shadow-floating max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 text-brown-600 mb-1">
                <Hammer className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                  MARCHE CRAFT
                </span>
              </div>
              <p className="text-xs text-neutral-800 font-medium">
                4.5 hours of individual hand-buffing per pair before final box seal.
              </p>
            </div>
          </div>

          {/* Right Column: Pillars & Design Philosophy */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-brown-600">
                PHILOSOPHY 01
              </span>
              <h3 className="font-editorial text-2xl font-bold text-neutral-900 leading-snug">
                Designed Around The Skeleton, Not Around The Mold.
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Standard footwear assumes static flat planes. Our footwear is sculpted directly from high-speed pressure telemetry maps captured during dynamic acceleration, pivoting, and decelerated braking.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-brown-600">
                PHILOSOPHY 02
              </span>
              <h3 className="font-editorial text-2xl font-bold text-neutral-900 leading-snug">
                Supercritical Nitrogen Bio-Polymer.
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                By infusing supercritical nitrogen into bio-derived polymers at molecular thresholds, we eliminate micro-voids, providing continuous non-fatiguing cushion rebound over millions of strides.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#specifications"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 hover:text-brown-600 border-b-2 border-neutral-900 hover:border-brown-600 pb-1 transition-all"
              >
                <span>EXPLORE TECHNICAL BLUEPRINTS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Four Brand Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-neutral-200/80">
          {BRAND_VALUES.map((pillar: { number: string; title: string; description: string }) => (
            <div
              key={pillar.number}
              className="p-6 rounded-3xl bg-white border border-neutral-200/70 shadow-sm hover:border-brown-300 transition duration-300"
            >
              <span className="font-mono text-2xl font-black text-brown-500 mb-4 block">
                {pillar.number}
              </span>
              <h4 className="font-editorial text-base font-bold text-neutral-900 mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
