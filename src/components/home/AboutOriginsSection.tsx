import React from 'react';
import { PDF_MODULES } from '../../data/products';
import { ShieldCheck, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutOriginsSection: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-[#FFFFFF] border-t border-[#E6E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Sub-eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1.5px] bg-[#8B5E3C]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B5E3C] font-semibold">
            ABOUT ORIGINS &bull; PRODUCT OVERVIEW
          </span>
        </div>

        {/* Large Editorial Headline (PDF Slide 2 & 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] leading-[1.08] tracking-tight">
              THE ART OF <br />
              <span className="text-[#8B5E3C] italic font-serif">EVERYDAY MOVEMENT.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#777777] leading-relaxed max-w-xl">
              Origins is a premium e-commerce platform designed for online footwear shopping, built around the principles of minimalism, refined style, and convenience.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-3 space-y-6 border-l border-[#E6E4E0] lg:pl-10">
            <h3 className="font-editorial text-xl font-bold text-[#111111]">
              Product Perspective
            </h3>
            <p className="text-sm text-[#777777] leading-relaxed">
              Origins stands alone — an independent brand built on clean design and simplicity. Every touchpoint is crafted for a refined digital experience, keeping the product at the centre of the journey.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Browsing & real-time search functionality',
                'Interactive 3D product details & shopping bag',
                'Seamless checkout & payment processing',
                'User accounts, live order tracking & admin controls'
              ].map((scope, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-medium text-[#111111]">
                  <span className="w-5 h-5 rounded-full bg-[#F5F4F0] text-[#8B5E3C] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Asymmetrical Editorial Showcase (PDF Slide 2 & 4 Visual Balance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="relative rounded-3xl overflow-hidden bg-[#F5F4F0] border border-[#E6E4E0] h-[400px] sm:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
              alt="Origins Refined Aesthetics"
              className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8B5E3C] font-bold mb-1">
                MINIMALISM & REFINED STYLE
              </span>
              <h4 className="font-editorial text-2xl font-bold">
                A Product-First Digital Experience
              </h4>
              <p className="text-xs text-neutral-300 mt-2 max-w-sm">
                Generous whitespace, oversized typography, and uncluttered presentation allow each footwear silhouette to breathe.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-[#F5F4F0] border border-[#E6E4E0] h-[400px] sm:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
              alt="Origins Biomechanical Engineering"
              className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8B5E3C] font-bold mb-1">
                CIVITANOVA MARCHE &bull; ITALY
              </span>
              <h4 className="font-editorial text-2xl font-bold">
                Hand-Lasted Precision Construction
              </h4>
              <p className="text-xs text-neutral-300 mt-2 max-w-sm">
                Pairing multi-generational Italian footwear artisans with supercritical nitrogen bio-polymer dampening.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Architectural Modules (PDF Slide 8) */}
        <div className="border-t border-[#E6E4E0] pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#8B5E3C] uppercase font-bold">
                SYSTEM ARCHITECTURE
              </span>
              <h3 className="font-editorial text-3xl font-extrabold text-[#111111] mt-1">
                ORIGINS PLATFORM MODULES.
              </h3>
            </div>
            <p className="text-xs font-mono text-[#777777]">
              PDF DOCUMENT SPECIFICATION &bull; SLIDE 08
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PDF_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="p-6 rounded-2xl bg-[#F5F4F0]/60 border border-[#E6E4E0] hover:border-[#8B5E3C] hover:bg-white transition-all duration-300 group"
              >
                <span className="font-mono text-2xl font-black text-[#111111] group-hover:text-[#8B5E3C] transition-colors block mb-2">
                  {mod.id}
                </span>
                <h4 className="font-editorial text-sm font-bold text-[#111111] mb-1">
                  {mod.title}
                </h4>
                <p className="text-xs text-[#777777] leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
