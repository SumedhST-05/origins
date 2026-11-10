import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSneakerCanvas } from '../3d/ScrollSneakerCanvas';
import { Product, ColorOption } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ArrowDown, ArrowRight, Sparkles, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollExperienceProps {
  flagshipProduct: Product;
}

export const HeroScrollExperience: React.FC<HeroScrollExperienceProps> = ({ flagshipProduct }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);
  const originsTitleRef = useRef<HTMLHeadingElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(flagshipProduct.availableColors[0]);

  const { openProductModal } = useStore();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial entrance animation
    const ctx = gsap.context(() => {
      // 1. Initial entrance for ORIGINS giant title & hero elements
      gsap.fromTo(
        originsTitleRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power2.out' }
      );

      // 2. Main ScrollTrigger pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2800',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);

            if (p < 0.22) {
              setChapterIndex(0);
            } else if (p < 0.52) {
              setChapterIndex(1);
            } else if (p < 0.82) {
              setChapterIndex(2);
            } else {
              setChapterIndex(3);
            }
          },
        },
      });

      // Phase 0 -> Phase 1: Fade out Hero text, fade in Chapter 1
      tl.to(heroContentRef.current, { opacity: 0, y: -40, duration: 0.25 }, 0.05)
        .to(originsTitleRef.current, { opacity: 0.12, scale: 1.08, duration: 0.3 }, 0.05)
        .fromTo(ch1Ref.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3 }, 0.22)

        // Phase 1 -> Phase 2: Fade out Chapter 1, fade in Chapter 2
        .to(ch1Ref.current, { opacity: 0, x: -40, duration: 0.2 }, 0.46)
        .fromTo(ch2Ref.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3 }, 0.52)

        // Phase 2 -> Phase 3: Fade out Chapter 2, fade in Chapter 3
        .to(ch2Ref.current, { opacity: 0, x: 40, duration: 0.2 }, 0.76)
        .fromTo(ch3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0.82);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#FFFFFF] overflow-hidden select-none">
      {/* PDF Slide 1 Minimal Top Header Credentials */}
      <div className="absolute top-6 inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#777777] uppercase pointer-events-none">
        <span className="font-semibold text-[#111111]">HANSHAL S.</span>
        <span className="hidden sm:inline">ADITYA T.</span>
        <span className="hidden sm:inline">SUMEDH T.</span>
        <span className="font-semibold text-[#8B5E3C]">PREMIUM FOOTWEAR BRAND</span>
      </div>

      {/* GIANT OVERSIZED ORIGINS WATERMARK / TYPOGRAPHY (Matching PDF Slide 1) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1
          ref={originsTitleRef}
          className="font-editorial text-[22vw] font-black text-[#111111] leading-none tracking-ultra opacity-[0.92] uppercase transition-opacity duration-300"
          style={{ letterSpacing: '-0.06em' }}
        >
          ORIGINS
        </h1>
      </div>

      {/* 3D WEBGL SNEAKER CANVAS (Layered right above / through the giant title) */}
      <div className="absolute inset-0 z-10">
        <ScrollSneakerCanvas
          scrollProgress={scrollProgress}
          chapterIndex={chapterIndex}
          modelPath={flagshipProduct.modelPath}
          selectedColor={selectedColor}
        />
      </div>

      {/* OVERLAY CONTENT PHASES */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 pointer-events-none flex flex-col justify-between py-24 sm:py-20">
        {/* PHASE 0: HERO INTRODUCTION */}
        <div
          ref={heroContentRef}
          className="w-full flex-1 flex flex-col justify-end pb-8 pointer-events-auto"
        >
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B5E3C] font-semibold">
                ORIGINS ATELIER &bull; 2026
              </span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-6xl font-black text-[#111111] leading-[1.05] tracking-tight">
              DESIGNED <br />
              <span className="text-[#8B5E3C] italic font-serif">TO MOVE.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#777777] font-normal leading-relaxed max-w-md">
              Not just footwear. An expression of individuality. Built around the principles of minimalism, refined style, and product-first craftsmanship.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#collection"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#8B5E3C] hover:bg-[#63452F] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-origins hover:shadow-origins-hover group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => openProductModal(flagshipProduct)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#111111] border border-[#E6E4E0] text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:border-[#111111]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8B5E3C]" />
                <span>DISCOVER ORIGINS</span>
              </button>
            </div>
          </div>
        </div>

        {/* PHASE 1: CHAPTER 01 — THE DESIGN */}
        <div
          ref={ch1Ref}
          className="absolute inset-y-0 left-6 sm:left-12 max-w-md flex flex-col justify-center pointer-events-auto opacity-0"
        >
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E6E4E0] shadow-origins space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8B5E3C] uppercase block">
              01 — THE DESIGN
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
              EVERY DETAIL HAS A PURPOSE.
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Every curve eliminates mechanical drag while delivering architectural presence. Seamless bonded technical knit wraps the foot in zero-abrasion anatomical symmetry.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] font-mono text-[#111111]">
              <span className="font-bold">Weight: 315g</span>
              <span>&bull;</span>
              <span className="font-bold">8mm Drop</span>
              <span>&bull;</span>
              <span className="text-[#8B5E3C]">Zero-Waste Knit</span>
            </div>
          </div>
        </div>

        {/* PHASE 2: CHAPTER 02 — THE COMFORT */}
        <div
          ref={ch2Ref}
          className="absolute inset-y-0 right-6 sm:right-12 max-w-md flex flex-col justify-center pointer-events-auto opacity-0"
        >
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E6E4E0] shadow-origins space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8B5E3C] uppercase block">
              02 — THE COMFORT
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
              MADE TO MOVE WITH YOU.
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Supercritical nitrogen-infused bio-foam provides instantaneous rebound across millions of cycles. Engineered for all-day metropolitan pacing without foot fatigue.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] font-mono text-[#111111]">
              <span className="font-bold text-[#8B5E3C]">78.4% Energy Return</span>
              <span>&bull;</span>
              <span>Dual-Core Density</span>
            </div>
          </div>
        </div>

        {/* PHASE 3: CHAPTER 03 — THE IDENTITY */}
        <div
          ref={ch3Ref}
          className="absolute inset-y-0 left-6 sm:left-12 max-w-md flex flex-col justify-center pointer-events-auto opacity-0"
        >
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E6E4E0] shadow-origins space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8B5E3C] uppercase block">
              03 — THE IDENTITY
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
              FIND YOUR OWN DIRECTION.
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Origins stands alone — an independent brand built on clean design, minimalism, and refined style. Keeping the product at the absolute centre of the journey.
            </p>
            <div className="pt-3">
              <button
                onClick={() => openProductModal(flagshipProduct)}
                className="px-6 py-3 rounded-full bg-[#111111] hover:bg-[#8B5E3C] text-white text-xs font-semibold tracking-widest uppercase transition-colors"
              >
                Inspect 3D Silhouette
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SCROLL PROGRESS & HINT */}
        <div className="w-full flex items-center justify-between border-t border-[#E6E4E0]/80 pt-4 text-xs font-mono text-[#777777]">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3.5 h-3.5 text-[#8B5E3C] animate-bounce" />
            <span className="tracking-widest uppercase text-[10px] sm:text-xs">
              SCROLL DRIVEN STORYTELLING
            </span>
          </div>

          {/* Chapter dots indicator */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  chapterIndex === idx
                    ? 'bg-[#8B5E3C] w-6'
                    : 'bg-[#E6E4E0]'
                }`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            <span>CHAPTER:</span>
            <strong className="text-[#111111]">
              {chapterIndex === 0
                ? 'ORIGINS'
                : chapterIndex === 1
                ? '01 DESIGN'
                : chapterIndex === 2
                ? '02 COMFORT'
                : '03 IDENTITY'}
            </strong>
          </div>
        </div>
      </div>

      {/* Floating Colorway Switcher in bottom right */}
      <div className="absolute bottom-6 right-6 z-30 hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E6E4E0] shadow-sm">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] px-2">
          Color:
        </span>
        {flagshipProduct.availableColors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color)}
            className={`w-5 h-5 rounded-full border border-black/10 transition-transform ${
              selectedColor.name === color.name
                ? 'scale-125 ring-2 ring-[#8B5E3C]'
                : 'hover:scale-110 opacity-70 hover:opacity-100'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};
