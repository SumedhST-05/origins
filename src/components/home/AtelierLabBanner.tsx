import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Sparkles, ArrowRight, Box } from 'lucide-react';

interface AtelierLabBannerProps {
  flagshipProduct: Product;
}

export const AtelierLabBanner: React.FC<AtelierLabBannerProps> = ({ flagshipProduct }) => {
  const { openProductModal } = useCart();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#111111] text-white p-8 sm:p-14 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brown-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brown-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-brown-400 font-semibold">
                ORIGINE 3D STUDIO
              </span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              INTERROGATE EVERY RADIUS. <br />
              <span className="text-brown-400 italic font-serif">BEFORE YOU COMMIT.</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Experience dynamic lighting, multi-angle exploded inspections, and material colorway previews with zero latency directly on your screen.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => openProductModal(flagshipProduct)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brown-600 hover:bg-brown-700 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-luxury hover:shadow-luxury-hover"
            >
              <Box className="w-4 h-4" />
              <span>LAUNCH 3D INSPECTOR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
