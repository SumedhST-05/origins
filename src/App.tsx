import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { HeroScrollExperience } from './components/home/HeroScrollExperience';
import { FeaturedCollection } from './components/home/FeaturedCollection';
import { AboutOriginsSection } from './components/home/AboutOriginsSection';
import { TechSpecsSection } from './components/home/TechSpecsSection';
import { ReviewsSection } from './components/home/ReviewsSection';
import { Footer } from './components/layout/Footer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/shopping/CartDrawer';
import { AuthAccountModal } from './components/shopping/AuthAccountModal';
import { AdminProductModal } from './components/admin/AdminProductModal';
import { SearchModal } from './components/shopping/SearchModal';
import { CheckCircle2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    activeProducts,
    activeProduct,
    openProductModal,
    closeProductModal,
    toastMessage,
  } = useStore();

  const flagshipProduct = activeProducts[0] || {
    id: 'origins-01',
    name: 'ORIGINS 01 / KINETIC',
    modelPath: '/black_sneakers.glb',
    availableColors: [{ name: 'Pure Obsidian', hex: '#111111' }],
  };

  // URL Hash Deep Linking Support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const matched = activeProducts.find((p) => p.id === prodId);
        if (matched) {
          openProductModal(matched);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeProducts]);

  useEffect(() => {
    if (activeProduct) {
      if (!window.location.hash.startsWith('#product-')) {
        window.history.pushState(null, '', `#product-${activeProduct.id}`);
      }
    } else {
      if (window.location.hash.startsWith('#product-')) {
        window.history.pushState(null, '', ' ');
      }
    }
  }, [activeProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] selection:bg-[#8B5E3C] selection:text-white">
      {/* Floating / Sticky Navigation (PDF Slide 1 & Prompt Spec) */}
      <Navbar />

      <main className="flex-1">
        {/* Sections 3 & 4: Hero & GSAP Scroll-Controlled Storytelling (01 Design, 02 Comfort, 03 Identity) */}
        <HeroScrollExperience flagshipProduct={flagshipProduct as any} />

        {/* Section 5: Featured Collection (Reusable Dynamic Products Grid) */}
        <FeaturedCollection />

        {/* Sections 1 & 7: About Origins, Product Perspective, System Architecture (PDF Slides 2, 3, 4, 8) */}
        <AboutOriginsSection />

        {/* Biomechanical Engineering Specs */}
        <TechSpecsSection />

        {/* Collector Reviews (PDF Founders / Critique) */}
        <ReviewsSection />
      </main>

      {/* Footer (with PDF Slide 12 "THE END" Minimal Editorial Outro) */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      <CartDrawer />
      <ProductDetailModal product={activeProduct} onClose={closeProductModal} />
      <AuthAccountModal />
      <AdminProductModal />
      <SearchModal />

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#111111] text-white text-xs font-mono shadow-2xl border border-neutral-800 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#8B5E3C] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

export default App;
