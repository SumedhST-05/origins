import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, User, Search, Menu, X, Shield, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    itemCount,
    setIsCartOpen,
    setIsAuthModalOpen,
    setIsAdminPanelOpen,
    setIsSearchOpen,
    user,
    isAdmin,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'origins-nav-scrolled py-3.5 shadow-sm'
            : 'bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-b border-[#E6E4E0]/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: ORIGINS Wordmark */}
          <div className="flex items-center gap-3">
            <a href="#" className="group flex items-baseline gap-1.5 focus:outline-none">
              <span className="font-editorial text-2xl font-black tracking-tightest text-[#111111] uppercase transition-transform group-hover:scale-[1.02]">
                ORIGINS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
            </a>

            {/* Admin Badge Shortcut if in admin mode */}
            {isAdmin && (
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[10px] font-mono tracking-wider hover:bg-[#8B5E3C] transition"
              >
                <Shield className="w-3 h-3 text-[#8B5E3C]" />
                <span>ADMIN PORTAL</span>
              </button>
            )}
          </div>

          {/* Centre: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-widest text-[#111111]">
            <a
              href="#"
              className="hover:text-[#8B5E3C] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#8B5E3C] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Home
            </a>
            <a
              href="#collection"
              className="hover:text-[#8B5E3C] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#8B5E3C] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Shop
            </a>
            <a
              href="#collection"
              className="hover:text-[#8B5E3C] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#8B5E3C] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Collections
            </a>
            <a
              href="#about"
              className="hover:text-[#8B5E3C] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#8B5E3C] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              About
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#111111] hover:text-[#8B5E3C] transition-colors p-1"
              title="Search footwear"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Account / Login Trigger */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 text-[#111111] hover:text-[#8B5E3C] transition-colors p-1"
              title={user ? `Signed in as ${user.name}` : 'Sign In / Register'}
            >
              <User className="w-5 h-5 stroke-[1.8]" />
              <span className="hidden xl:inline text-xs font-semibold uppercase tracking-wider">
                {user ? user.name.split(' ')[0] : 'Account'}
              </span>
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-white hover:bg-[#8B5E3C] transition-all duration-300 shadow-sm"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
              <span className="text-xs font-mono font-bold">{itemCount}</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#111111] hover:text-[#8B5E3C] p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#111111]/60 backdrop-blur-sm">
          <div className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E6E4E0]">
                <span className="font-editorial text-2xl font-black text-[#111111]">
                  ORIGINS
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#777777] hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-5">
                {[
                  { name: 'Home', href: '#' },
                  { name: 'Shop All Footwear', href: '#collection' },
                  { name: 'Collections & Editions', href: '#collection' },
                  { name: 'About Origins', href: '#about' },
                  { name: 'Biomechanical Specs', href: '#specifications' },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-bold text-[#111111] hover:text-[#8B5E3C] transition"
                  >
                    {item.name}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminPanelOpen(true);
                  }}
                  className="text-left text-xs font-mono text-[#8B5E3C] font-bold uppercase tracking-wider pt-4 border-t border-[#E6E4E0]"
                >
                  &rarr; Admin Product Management
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E6E4E0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bag ({itemCount})</span>
              </button>
              <p className="text-center text-[10px] text-[#777777] font-mono tracking-widest uppercase">
                PREMIUM ONLINE FOOTWEAR BRAND
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
