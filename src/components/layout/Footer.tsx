import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Globe, Award } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setIsAdminPanelOpen } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-[#FFFFFF] text-[#111111] pt-20 pb-12 border-t border-[#E6E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-[#E6E4E0]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#F5F4F0] text-[#8B5E3C]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-1">
                Handcrafted Precision
              </h4>
              <p className="text-xs text-[#777777] leading-relaxed">
                Assembled in Civitanova Marche, Italy, using lasted heritage geometry and supercritical bio-foams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#F5F4F0] text-[#8B5E3C]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-1">
                Carbon Neutral Global Courier
              </h4>
              <p className="text-xs text-[#777777] leading-relaxed">
                Direct flight courier delivery with 100% certified carbon offsets and recyclable unboxing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#F5F4F0] text-[#8B5E3C]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111111] mb-1">
                Product Authentication
              </h4>
              <p className="text-xs text-[#777777] leading-relaxed">
                Every pair arrives with an embedded cryptographic chip linking your physical pair to digital 3D provenance.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          {/* Brand & Newsletter (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-editorial font-black text-3xl tracking-tightest text-[#111111] uppercase">
                ORIGINS
              </span>
              <p className="text-xs text-[#8B5E3C] font-mono tracking-widest uppercase mt-1 font-semibold">
                PREMIUM ONLINE FOOTWEAR BRAND
              </p>
            </div>

            <p className="text-xs text-[#777777] leading-relaxed max-w-sm">
              Origins stands alone — an independent brand built on clean design and simplicity. Every touchpoint is crafted for a refined digital experience, keeping the product at the centre of the journey.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2 font-mono">
                Join the Origins Dispatch
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#63452F] bg-[#F7F2EE] border border-[#E8DDD4] p-3 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5E3C]" />
                  <span>You are registered for upcoming limited run drops.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter email for allocation alerts..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#F5F4F0] border border-[#E6E4E0] rounded-l-full text-xs text-[#111111] placeholder-[#777777] focus:outline-none focus:border-[#8B5E3C] font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#111111] hover:bg-[#8B5E3C] text-white rounded-r-full text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Silhouettes */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-bold text-[#111111]">
              Silhouettes
            </h5>
            <ul className="space-y-2.5 text-xs text-[#777777] font-mono">
              <li><a href="#collection" className="hover:text-[#8B5E3C] transition">Origins 01 / Kinetic</a></li>
              <li><a href="#collection" className="hover:text-[#8B5E3C] transition">Origins 02 / Strata</a></li>
              <li><a href="#collection" className="hover:text-[#8B5E3C] transition">Origins 03 / Monolith</a></li>
              <li><a href="#collection" className="hover:text-[#8B5E3C] transition">Origins 04 / Zero-Mass</a></li>
              <li><a href="#collection" className="hover:text-[#8B5E3C] transition">Origins 05 / Tempo</a></li>
            </ul>
          </div>

          {/* Architecture Modules */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-bold text-[#111111]">
              Architecture
            </h5>
            <ul className="space-y-2.5 text-xs text-[#777777] font-mono">
              <li><a href="#about" className="hover:text-[#8B5E3C] transition">Product Overview</a></li>
              <li><a href="#about" className="hover:text-[#8B5E3C] transition">Product Perspective</a></li>
              <li><a href="#specifications" className="hover:text-[#8B5E3C] transition">Biomechanical Specs</a></li>
              <li>
                <button onClick={() => setIsAdminPanelOpen(true)} className="hover:text-[#8B5E3C] transition text-left">
                  Admin Control Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-bold text-[#111111]">
              Client Care
            </h5>
            <ul className="space-y-2.5 text-xs text-[#777777] font-mono">
              <li><span className="text-[#111111]">Concierge:</span> concierge@origins-atelier.com</li>
              <li><span className="text-[#111111]">Civitanova Marche:</span> Via dell’Artigianato 12</li>
              <li><span className="text-[#111111]">Dispatch:</span> Carbon-Neutral Express Global</li>
              <li><span className="text-[#111111]">Policy:</span> 30-Day Complimentary Returns</li>
            </ul>
          </div>
        </div>

        {/* PDF Slide 12: "THE END" Minimal Editorial Outro */}
        <div className="py-12 border-t border-b border-[#E6E4E0] my-6 flex flex-col items-center justify-center text-center">
          <h2 className="font-editorial text-4xl sm:text-6xl font-light tracking-[0.2em] text-[#111111] uppercase">
            THE END
          </h2>
          <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mt-2">
            ORIGINS &bull; SLIDE 12 SPECIFICATION
          </span>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777777] font-mono">
          <p>&copy; {new Date().getFullYear()} ORIGINS FOOTWEAR S.P.A. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="text-[#111111] font-semibold">HANSHAL S. &bull; ADITYA T. &bull; SUMEDH T.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
