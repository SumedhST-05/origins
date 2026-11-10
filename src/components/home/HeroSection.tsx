import React, { useState } from 'react';
import { HeroSneakerCanvas } from '../3d/HeroSneakerCanvas';
import { Product, ColorOption } from '../../types';
import { useCart } from '../../context/CartContext';
import { ArrowDown, ArrowRight, ShieldCheck, Cpu, Sparkles, Box } from 'lucide-react';

interface HeroSectionProps {
  flagshipProduct: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ flagshipProduct }) => {
  const { openProductModal } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    flagshipProduct.availableColors[0]
  );

  return (
    <section id="hero" className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-white">
      {/* Editorial Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.025] leading-none z-0">
        <span className="font-editorial text-[22vw] font-black uppercase text-black tracking-tightest whitespace-nowrap">
          ORIGINE
        </span>
      </div>

      {/* Top Editorial Sub-bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest bg-brown-100 text-brown-800 uppercase">
              {flagshipProduct.badge || 'FLAGSHIP RELEASE'}
            </span>
            <span className="text-[11px] font-mono tracking-widest text-neutral-400">
              AUTUMN / WINTER 2026
            </span>
          </div>
          <h2 className="text-xs uppercase font-mono tracking-[0.2em] text-neutral-500">
            {flagshipProduct.edition}
          </h2>
        </div>

        <div className="mt-3 md:mt-0 flex items-center gap-6 text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-brown-600" />
            <span>WebGL 3D Interactive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-brown-600" />
            <span>Dual-Density Core</span>
          </div>
        </div>
      </div>

      {/* Main Hero Showcase Center */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        {/* Left Column: Headlines & Storytelling (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="font-editorial text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.05]">
              STEP INTO <br />
              <span className="text-brown-600 italic font-serif">SOMETHING</span> <br />
              DIFFERENT.
            </h1>
            <p className="text-sm sm:text-base text-[#777777] font-normal leading-relaxed max-w-md">
              Designed for movement. Crafted for everyday expression. A radical synthesis of anatomical sculpture and supercritical foam dampening.
            </p>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-3 max-w-sm pt-2">
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="block text-[10px] uppercase font-mono text-neutral-400">Weight</span>
              <span className="text-xs font-mono font-bold text-neutral-900">315 Grams</span>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="block text-[10px] uppercase font-mono text-neutral-400">Offset</span>
              <span className="text-xs font-mono font-bold text-neutral-900">8mm Drop</span>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="block text-[10px] uppercase font-mono text-neutral-400">Origin</span>
              <span className="text-xs font-mono font-bold text-neutral-900">Marche, Italy</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {/* Primary CTA - Rich warm brown */}
            <a
              href="#collection"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#8B5E3C] hover:bg-[#70482B] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5 group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary CTA */}
            <button
              onClick={() => openProductModal(flagshipProduct)}
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-neutral-50 text-[#111111] border border-neutral-200 text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:border-neutral-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-brown-600" />
              <span>DISCOVER THE SHOE</span>
            </button>
          </div>

          {/* Social Proof quote snippet */}
          <div className="pt-2 flex items-center gap-3 text-xs text-neutral-500">
            <div className="flex -space-x-1.5">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[9px] font-mono flex items-center justify-center font-bold">EV</span>
              <span className="w-6 h-6 rounded-full bg-brown-600 text-white text-[9px] font-mono flex items-center justify-center font-bold">MC</span>
              <span className="w-6 h-6 rounded-full bg-neutral-300 text-neutral-800 text-[9px] font-mono flex items-center justify-center font-bold">SL</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              Rated 4.95 / 5.0 across 148 verified collector deliveries
            </span>
          </div>
        </div>

        {/* Right Column: 3D Sneaker Experience (Cols 6-12) */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 flex items-center justify-center">
          {/* Subtle Radial Studio Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-white/60 pointer-events-none" />

          {/* 3D Canvas */}
          <div className="w-full relative">
            <HeroSneakerCanvas
              modelPath={flagshipProduct.modelPath}
              hotspots={flagshipProduct.hotspots}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              availableColors={flagshipProduct.availableColors}
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Brand Marquee Bar */}
      <div className="relative z-10 border-t border-neutral-100 bg-neutral-50/50 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#collection"
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-brown-600 transition"
          >
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-brown-600" />
            <span className="tracking-widest uppercase">SCROLL TO DISCOVER ARCHIVE</span>
          </a>

          <div className="hidden sm:flex items-center gap-6 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            <span>Adaptive Ergonomics</span>
            <span>&bull;</span>
            <span>Zero-Mass Suspension</span>
            <span>&bull;</span>
            <span>Hand-Laminated Foxing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
