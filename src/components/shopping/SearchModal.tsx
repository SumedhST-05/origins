import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowUpRight, Box } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, activeProducts, openProductModal } = useStore();
  const [query, setQuery] = useState('');

  // Keyboard shortcut cmd+k / ctrl+k to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? activeProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : activeProducts.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E4E0] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E6E4E0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8B5E3C] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search footwear models, categories, materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none text-[#111111] focus:outline-none placeholder-[#777777]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#777777] hover:text-[#111111] font-mono px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full text-[#777777] hover:text-[#111111] hover:bg-[#F5F4F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#777777] px-2 mb-2">
            <span>{query ? `Search Results (${results.length})` : 'Curated Silhouettes'}</span>
            <span>ESC to close</span>
          </div>

          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  openProductModal(product);
                  setIsSearchOpen(false);
                }}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#F5F4F0] cursor-pointer transition border border-transparent hover:border-[#E6E4E0]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#FAFAF8] overflow-hidden border border-[#E6E4E0] p-1 flex items-center justify-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[#111111] group-hover:text-[#8B5E3C] transition">
                        {product.name}
                      </h4>
                      <span className="flex items-center gap-1 text-[9px] font-mono bg-white px-2 py-0.5 rounded-full border border-[#E6E4E0] text-[#777777]">
                        <Box className="w-2.5 h-2.5 text-[#8B5E3C]" />
                        3D
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777777] mt-0.5">{product.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#111111]">
                    {product.currency}{product.price}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#111111] text-[#777777] group-hover:text-white flex items-center justify-center transition border border-[#E6E4E0]">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#777777]">
              No footwear silhouettes found matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
