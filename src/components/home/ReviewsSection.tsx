import React from 'react';
import { REVIEWS } from '../../data/products';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brown-600" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-brown-600 font-semibold">
                COLLECTOR CRITIQUE
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111]">
              VERIFIED PERSPECTIVES.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-neutral-900">4.96 AVERAGE</span>
            <span>&bull;</span>
            <span>OVER 500+ DELIVERIES</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FAFAFA] border border-neutral-200/70 flex flex-col justify-between hover:border-brown-300 transition duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-brown-400/40 mb-4" />
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{rev.author}</h4>
                  <p className="text-[10px] text-neutral-400 font-mono">{rev.role}</p>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-brown-700">
                  {rev.productName.split('/')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
