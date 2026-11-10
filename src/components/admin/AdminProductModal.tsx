import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ColorOption } from '../../types';
import { X, Plus, Trash2, Edit2, Shield, Eye, EyeOff, Package, Box, Check, RefreshCw } from 'lucide-react';

export const AdminProductModal: React.FC = () => {
  const {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    products,
    addProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct,
    updateInventory,
    orders,
    updateOrderStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'catalogue' | 'new-product' | 'orders'>('catalogue');

  // New product form state
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [edition, setEdition] = useState('Edition 01 / First Run');
  const [price, setPrice] = useState<number>(360);
  const [category, setCategory] = useState<Product['category']>('Performance');
  const [modelPath, setModelPath] = useState('/black_sneakers.glb');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80');
  const [inventory, setInventory] = useState<number>(40);
  const [sizesInput, setSizesInput] = useState('8, 8.5, 9, 9.5, 10, 10.5, 11, 12');
  const [colorsInput, setColorsInput] = useState('Pure Obsidian:#111111, Origins Mocha:#8B5E3C');

  if (!isAdminPanelOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const sizes = sizesInput
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    const colors: ColorOption[] = colorsInput
      .split(',')
      .map((item) => {
        const [cName, hex] = item.split(':').map((s) => s.trim());
        return { name: cName || 'Standard', hex: hex || '#111111' };
      })
      .filter((c) => c.name && c.hex);

    addProduct({
      name,
      subtitle: subtitle || 'Sculpted Minimalist Footwear',
      edition,
      price: Number(price) || 295,
      currency: '$',
      category,
      modelPath: modelPath.trim() || '/black_sneakers.glb',
      description: description || 'Engineered around minimalism and refined style.',
      story: 'Crafted with precision lasts and generative ergonomics.',
      featured: true,
      isActive: true,
      inventory: Number(inventory) || 25,
      availability: 'In Stock',
      rating: 5.0,
      reviewCount: 1,
      availableSizes: sizes.length ? sizes : [8, 9, 10, 11, 12],
      availableColors: colors.length ? colors : [{ name: 'Obsidian', hex: '#111111' }],
      images: [imageUrl],
      highlights: [
        'Proprietary Dual-Density Bio-Polymer',
        'Seamless Hydrophobic Adaptive Collar',
      ],
      specifications: {
        upperMaterial: 'Bonded technical knit with full-grain leather',
        soleTechnology: 'Origins Kinetic Core',
        weight: '315g (Size 9 US)',
        drop: '8mm offset',
        cushioning: 'Responsive Balanced Cushion',
        origin: 'Civitanova Marche, Italy',
        sustainability: '65% certified bio-derived',
      },
    });

    // Reset and switch back to catalogue
    setName('');
    setDescription('');
    setActiveTab('catalogue');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#E6E4E0] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#E6E4E0] flex items-center justify-between bg-[#F5F4F0]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#111111] text-[#8B5E3C]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B5E3C] font-bold block">
                PDF MODULE 08 &bull; ADMIN CONTROL INTERFACE
              </span>
              <h3 className="font-editorial text-base font-bold text-[#111111]">
                ORIGINS CATALOGUE & INVENTORY MANAGEMENT
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAdminPanelOpen(false)}
            className="p-1.5 rounded-full text-[#777777] hover:text-[#111111] hover:bg-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#E6E4E0] bg-white flex space-x-8 text-xs font-mono font-bold uppercase">
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'catalogue'
                ? 'border-[#8B5E3C] text-[#8B5E3C]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            Catalogue ({products.length} Products)
          </button>
          <button
            onClick={() => setActiveTab('new-product')}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'new-product'
                ? 'border-[#8B5E3C] text-[#8B5E3C]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            + Add New Silhouette (with 3D GLB)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-[#8B5E3C] text-[#8B5E3C]'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            Fulfillment & Orders ({orders.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {/* TAB 1: CATALOGUE LIST (Slide 6 & 11) */}
          {activeTab === 'catalogue' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#777777] font-mono">
                <span>Manage active visibility and real-time inventory levels</span>
                <span className="text-[#8B5E3C] font-semibold">
                  {products.filter((p) => p.isActive).length} Active on Storefront
                </span>
              </div>

              <div className="divide-y divide-[#E6E4E0] border border-[#E6E4E0] rounded-2xl overflow-hidden bg-white">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                      prod.isActive ? 'bg-white' : 'bg-[#F5F4F0]/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#FAFAF8] overflow-hidden border border-[#E6E4E0] p-1 flex-shrink-0">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs uppercase font-bold tracking-wider text-[#111111]">
                            {prod.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              prod.isActive
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {prod.isActive ? 'Active' : 'Deactivated'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#777777] font-mono mt-0.5">
                          {prod.category} &bull; GLB: <code className="text-[#8B5E3C]">{prod.modelPath}</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      {/* Price input */}
                      <div>
                        <span className="text-[10px] text-[#777777] block">Price</span>
                        <span className="font-bold text-[#111111]">${prod.price}</span>
                      </div>

                      {/* Inventory Stepper */}
                      <div>
                        <span className="text-[10px] text-[#777777] block">Inventory</span>
                        <input
                          type="number"
                          value={prod.inventory}
                          onChange={(e) => updateInventory(prod.id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 rounded border border-[#E6E4E0] text-xs font-mono font-bold text-center"
                        />
                      </div>

                      {/* Active/Deactivate Toggle (PDF Slide 6: "Activate or deactivate products instantly") */}
                      <button
                        onClick={() => toggleProductActive(prod.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                          prod.isActive
                            ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-[#E6E4E0]'
                            : 'bg-emerald-600 text-white border-emerald-600'
                        }`}
                        title={prod.isActive ? 'Deactivate and hide from storefront' : 'Activate on storefront'}
                      >
                        {prod.isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{prod.isActive ? 'Deactivate' : 'Activate'}</span>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded-full text-[#777777] hover:text-rose-600 hover:bg-rose-50"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CREATE PRODUCT (WITH DYNAMIC GLB MODEL PATH) */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#F7F2EE] border border-[#E8DDD4] flex items-start gap-3">
                <Box className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#63452F]">
                  <strong>Decoupled 3D Architecture:</strong> You can assign any <code>.glb</code> model path (e.g. <code>/black_sneakers.glb</code> or <code>/models/sneaker_02.glb</code>). The 3D viewer will dynamically load and render it.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Product Silhouette Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ORIGINS 07 / AERODYNAMIC"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs font-sans text-[#111111] focus:outline-none focus:border-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Subtitle / Edition
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Studio Edition / Run 01"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111] bg-white"
                  >
                    <option value="Performance">Performance</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="Atelier Reserve">Atelier Reserve</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Initial Inventory Count
                  </label>
                  <input
                    type="number"
                    value={inventory}
                    onChange={(e) => setInventory(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    GLB 3D Model Path
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/black_sneakers.glb"
                    value={modelPath}
                    onChange={(e) => setModelPath(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs font-mono text-[#8B5E3C] bg-[#FAFAF8]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Product Image Preview URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Available US Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Available Colors (Name:Hex, Name:Hex)
                  </label>
                  <input
                    type="text"
                    value={colorsInput}
                    onChange={(e) => setColorsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs text-[#111111]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the craftsmanship, materials, and biomechanical purpose..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E4E0] text-xs font-sans text-[#111111]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#8B5E3C] hover:bg-[#63452F] text-white text-xs font-semibold uppercase tracking-widest transition shadow-origins"
              >
                Publish New Footwear Silhouette
              </button>
            </form>
          )}

          {/* TAB 3: ORDERS & FULFILLMENT (PDF Slide 6 & 11) */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <span className="text-xs text-[#777777] font-mono block">
                Manage incoming orders, update tracking status, and dispatch telemetry
              </span>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-white border border-[#E6E4E0] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E4E0] pb-3 text-xs font-mono">
                      <div>
                        <span className="font-bold text-[#111111]">{ord.id}</span>
                        <span className="text-[#777777] ml-2">&bull; {ord.createdAt.slice(0, 10)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase text-[#777777]">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg border border-[#E6E4E0] text-xs font-mono font-bold bg-[#F5F4F0] text-[#111111]"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Fulfilment">In Fulfilment</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-[#777777] block uppercase">Recipient & Destination</span>
                        <p className="font-bold text-[#111111]">{ord.shippingAddress.fullName}</p>
                        <p className="text-[#777777]">{ord.shippingAddress.street}, {ord.shippingAddress.city}</p>
                        <p className="text-[#777777]">{ord.shippingAddress.country} &bull; {ord.shippingAddress.phone}</p>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#777777] block uppercase">Tracking Telemetry</span>
                        <p className="font-bold text-[#8B5E3C]">{ord.trackingNumber}</p>
                        <p className="text-[#777777]">Total Paid: <strong className="text-[#111111]">${ord.total.toFixed(0)}</strong></p>
                        <p className="text-[#777777]">Payment: {ord.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
