import React, { useState } from 'react';
import { Product, ColorOption } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ProductSneakerCanvas } from '../3d/ProductSneakerCanvas';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Sparkles,
  Info,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, wishlist, toggleWishlist, openProductModal, activeProducts } = useStore();

  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.availableSizes[2] || product.availableSizes[0] || 9.5);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.availableColors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'story' | 'craftsmanship'>('specs');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = activeProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#E6E4E0] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#E6E4E0] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-lg font-black tracking-tightest text-[#111111]">
              ORIGINS
            </span>
            <span className="text-xs text-[#777777] font-mono">
              / {product.edition}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 rounded-full text-[#777777] hover:text-[#8B5E3C] hover:bg-[#F5F4F0] transition"
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#8B5E3C] text-[#8B5E3C]' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#777777] hover:text-[#111111] hover:bg-[#F5F4F0] transition"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-12">
          {/* Split-Screen 3D Viewer & Product Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive 3D GLB Viewer (Cols 1-7) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <ProductSneakerCanvas
                modelPath={product.modelPath}
                selectedColor={selectedColor}
                hotspots={product.hotspots}
                activeHotspotId={activeHotspotId}
                onHotspotClick={(hs) => setActiveHotspotId(hs.id)}
              />

              {/* Hotspot details banner if clicked */}
              {activeHotspotId && product.hotspots && (
                <div className="p-4 rounded-2xl bg-[#F7F2EE] border border-[#E8DDD4] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-[#63452F] uppercase tracking-wide">
                      {product.hotspots.find((h) => h.id === activeHotspotId)?.title}
                    </h5>
                    <p className="text-xs text-[#744B2E] mt-0.5">
                      {product.hotspots.find((h) => h.id === activeHotspotId)?.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHotspotId(null)}
                    className="ml-auto text-[#8B5E3C] hover:text-[#111111] text-xs font-mono"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5 pt-2">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-xl overflow-hidden border border-[#E6E4E0] bg-[#F5F4F0]"
                  >
                    <img
                      src={img}
                      alt={`${product.name} detail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details & Buying Controls (Cols 8-12) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Titles & Price */}
              <div className="space-y-2 border-b border-[#E6E4E0] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8B5E3C] font-semibold">
                    {product.availability} &bull; Stock: {product.inventory}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#111111]">
                    <span className="text-[#8B5E3C]">★</span>
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-[#777777]">({product.reviewCount})</span>
                  </div>
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl font-black text-[#111111] leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-[#777777]">{product.subtitle}</p>

                <div className="pt-2 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[#111111]">
                    {product.currency}{product.price}
                  </span>
                  <span className="text-xs text-[#777777] font-mono">
                    Complimentary Express Dispatch
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                {product.description}
              </p>

              {/* Colorway Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#111111] uppercase tracking-wider">
                    Selected Color:
                  </span>
                  <span className="text-[#8B5E3C] font-semibold">
                    {selectedColor.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.availableColors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-[#8B5E3C] bg-[#F7F2EE] text-[#63452F] ring-2 ring-[#8B5E3C]/30'
                            : 'border-[#E6E4E0] text-[#111111] hover:border-[#111111]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111111] uppercase tracking-wider font-mono">
                    US Men's Size:
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="text-[#8B5E3C] hover:text-[#63452F] text-xs font-medium underline flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    <span>Fit Guide</span>
                  </button>
                </div>

                {sizeGuideOpen && (
                  <div className="p-3 bg-[#F5F4F0] rounded-2xl border border-[#E6E4E0] text-xs text-[#777777] space-y-1">
                    <p className="font-semibold text-[#111111]">Anatomical Italian Last</p>
                    <p className="text-[11px]">
                      True to size. For a snug performance lockdown, select your standard running shoe size.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white shadow-sm ring-2 ring-[#111111]'
                            : 'bg-[#F5F4F0] hover:bg-[#E8DDD4]/60 text-[#111111] border border-[#E6E4E0]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity + Add to Cart CTA */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E6E4E0] rounded-full bg-white px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1 text-[#777777] hover:text-[#111111]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-[#111111]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1 text-[#777777] hover:text-[#111111]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#8B5E3C] hover:bg-[#63452F] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-origins hover:shadow-origins-hover"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG &bull; ${product.price * quantity}</span>
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="border-t border-[#E6E4E0] pt-4 grid grid-cols-2 gap-3 text-xs text-[#777777]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B5E3C]" />
                  <span>Free Courier Over $300</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B5E3C]" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Accordion / Tabs */}
          <div className="border-t border-[#E6E4E0] pt-8">
            <div className="flex items-center space-x-6 border-b border-[#E6E4E0] pb-3">
              {[
                { id: 'specs', label: 'Biomechanical Specs' },
                { id: 'story', label: 'Origins Narrative' },
                { id: 'craftsmanship', label: 'Materials & Origin' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs font-bold uppercase tracking-wider transition-all relative pb-3 -mb-3 ${
                    activeTab === tab.id
                      ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]'
                      : 'text-[#777777] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'specs' && (
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-[#F5F4F0] border border-[#E6E4E0]">
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-[#777777]">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-xs font-semibold text-[#111111] mt-1 block">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'story' && (
              <div className="pt-6 max-w-3xl space-y-4 text-sm text-[#777777] leading-relaxed">
                <p className="font-editorial text-lg text-[#111111] font-bold">
                  "{product.story}"
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                      <Check className="w-4 h-4 text-[#8B5E3C] flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'craftsmanship' && (
              <div className="pt-6 space-y-4 text-xs text-[#777777] leading-relaxed max-w-3xl">
                <p>
                  Assembled in Civitanova Marche, Marche region, using heritage lasted construction and supercritical bio-foams.
                </p>
                <div className="p-4 rounded-2xl bg-[#F7F2EE] border border-[#E8DDD4] text-[#63452F] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-xs uppercase tracking-wide">
                      Certified Circular Footwear Standard
                    </span>
                    <span className="text-xs text-[#744B2E]">
                      Zero harmful chemical adhesives. Recyclable packaging architecture.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Silhouettes */}
          <div className="border-t border-[#E6E4E0] pt-8">
            <h4 className="font-editorial text-lg font-bold text-[#111111] mb-6">
              RELATED SILHOUETTES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => openProductModal(rel)}
                  className="group bg-[#FAFAF8] rounded-2xl border border-[#E6E4E0] p-4 hover:border-[#8B5E3C] transition cursor-pointer"
                >
                  <div className="h-40 rounded-xl bg-white overflow-hidden mb-3 border border-[#E6E4E0]/60">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#777777]">
                    {rel.category}
                  </span>
                  <h5 className="text-xs font-bold text-[#111111] group-hover:text-[#8B5E3C] transition-colors">
                    {rel.name}
                  </h5>
                  <p className="text-xs font-mono font-semibold text-[#111111] mt-1">
                    {rel.currency}{rel.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
