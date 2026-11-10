import React, { useState } from 'react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight, Eye, ShoppingBag, Box, Check } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { activeProducts, openProductModal, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredProducts =
    activeCategory === 'All'
      ? activeProducts
      : activeProducts.filter((p) => p.category === activeCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes[2] || product.availableSizes[0] || 9.5;
    const defaultColor = product.availableColors[0];
    addToCart(product, defaultSize, defaultColor, 1);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1800);
  };

  return (
    <section id="collection" className="py-28 bg-[#FFFFFF] border-t border-[#E6E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B5E3C] font-semibold">
                CURATED ARCHIVE &bull; 2026
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-black text-[#111111] tracking-tight">
              THE SILHOUETTES.
            </h2>
            <p className="text-sm text-[#777777] max-w-md">
              Each silhouette is sculpted around biomechanical motion data and rendered in real-time 3D for comprehensive inspection.
            </p>
          </div>

          {/* Minimalist Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F5F4F0] text-[#777777] hover:text-[#111111] hover:bg-[#E8DDD4]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => openProductModal(product)}
              className="group relative flex flex-col bg-[#FAFAF8] rounded-3xl border border-[#E6E4E0] p-6 transition-all duration-500 hover:border-[#8B5E3C] hover:shadow-origins-hover cursor-pointer overflow-hidden"
            >
              {/* Top Card Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#777777] font-semibold">
                  {product.edition}
                </span>

                <div className="flex items-center gap-1 text-[10px] font-mono text-[#111111] bg-white px-2.5 py-0.5 rounded-full border border-[#E6E4E0]">
                  <Box className="w-3 h-3 text-[#8B5E3C]" />
                  <span>3D GLB</span>
                </div>
              </div>

              {/* Large Product Image Preview with Smooth Zoom */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-white border border-[#E6E4E0]/60 flex items-center justify-center p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay with 3D Inspect Action */}
                <div className="absolute inset-0 bg-[#111111]/15 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111111] text-xs font-semibold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5 text-[#8B5E3C]" />
                    <span>Launch 3D Studio</span>
                  </span>
                </div>
              </div>

              {/* Colorway Swatches */}
              <div className="flex items-center gap-1.5 my-4">
                {product.availableColors.map((color) => (
                  <span
                    key={color.name}
                    className="w-3 h-3 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                <span className="text-[10px] font-mono text-[#777777] ml-2">
                  {product.availableColors.length} Colorways
                </span>
              </div>

              {/* Card Meta & Actions */}
              <div className="mt-auto pt-3 border-t border-[#E6E4E0] flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B5E3C] font-bold block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-editorial text-base font-bold text-[#111111] group-hover:text-[#8B5E3C] transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-mono text-sm font-semibold text-[#111111] mt-1">
                    {product.currency}{product.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Add to Bag Button */}
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
                      quickAddedId === product.id
                        ? 'bg-[#8B5E3C] border-[#8B5E3C] text-white'
                        : 'bg-white border-[#E6E4E0] text-[#111111] hover:border-[#111111]'
                    }`}
                    title="Quick Add to Bag"
                  >
                    {quickAddedId === product.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                  </button>

                  {/* Open Detail Arrow */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#111111] group-hover:bg-[#8B5E3C] text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
