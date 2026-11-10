import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-[#111111] text-white text-[11px] font-medium py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-brown-400 animate-pulse" />
          <span>MILAN ATELIER RUN 2026</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <span className="text-neutral-300">
            COMPLIMENTARY GLOBAL EXPRESS SHIPPING OVER $300
          </span>
          <span className="hidden md:inline text-neutral-500">&bull;</span>
          <span className="hidden md:inline text-brown-300 font-semibold">
            LIMITED FIRST PRODUCTION ALLOCATION
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-neutral-400 hover:text-white transition cursor-pointer">
          <a href="#collection" className="flex items-center gap-1">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
