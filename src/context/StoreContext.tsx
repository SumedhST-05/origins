import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ColorOption, UserProfile, UserAddress, Order, OrderItem } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import confetti from 'canvas-confetti';

interface StoreContextType {
  // Products
  products: Product[];
  activeProducts: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  toggleProductActive: (id: string) => void;
  deleteProduct: (id: string) => void;
  updateInventory: (id: string, count: number) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: number, color: ColorOption, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  freeShippingThreshold: number;

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: UserAddress, paymentMethod: string, discount: number) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // User Auth & Profiles
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, password?: string, asAdmin?: boolean) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  isAdmin: boolean;

  // Admin Panel
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;

  // Active Product Detail View
  activeProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'origins_products_catalog_v2';
const CART_STORAGE_KEY = 'origins_cart_v2';
const ORDERS_STORAGE_KEY = 'origins_orders_v2';
const USER_STORAGE_KEY = 'origins_user_v2';
const WISHLIST_STORAGE_KEY = 'origins_wishlist_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products Catalog State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // 2. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Seed initial demo orders for realistic order tracking
    return [
      {
        id: 'ORIGIN-849201',
        createdAt: '2026-11-08T10:30:00Z',
        items: [
          {
            productId: 'origins-kinetic-01',
            productName: 'ORIGINS 01 / KINETIC',
            price: 340,
            selectedSize: 9.5,
            selectedColor: 'Pure Obsidian',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
          }
        ],
        subtotal: 340,
        discount: 0,
        shipping: 0,
        total: 340,
        shippingAddress: {
          fullName: 'Hanshal S.',
          street: '14 Mayfair Boulevard',
          city: 'London',
          state: 'Greater London',
          postalCode: 'W1J 8AJ',
          country: 'United Kingdom',
          phone: '+44 20 7946 0912'
        },
        paymentMethod: 'Apple Pay &bull;&bull;&bull;&bull; 4242',
        status: 'In Fulfilment',
        trackingNumber: 'ORG-UK-9842109',
        estimatedDelivery: 'November 14, 2026'
      }
    ];
  });

  // 4. User Profile State (Defaults to demo customer)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      id: 'usr_guest_demo',
      name: 'Aditya T.',
      email: 'aditya@origins-atelier.com',
      role: 'customer',
      savedAddresses: [
        {
          fullName: 'Aditya T.',
          street: '4-12 Roppongi Hills Studio',
          city: 'Minato-ku, Tokyo',
          state: 'Tokyo Prefecture',
          postalCode: '106-6108',
          country: 'Japan',
          phone: '+81 3 5555 0142'
        }
      ],
      orderHistory: []
    };
  });

  // 5. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Products CRUD
  const activeProducts = products.filter((p) => p.isActive);

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `origins-${newProdData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    const createdProduct: Product = {
      ...newProdData,
      id: newId,
    };
    setProducts((prev) => [createdProduct, ...prev]);
    showToast(`Added ${createdProduct.name} to catalogue`);
    return createdProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully');
  };

  const toggleProductActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newState = !p.isActive;
          showToast(`${p.name} is now ${newState ? 'Active on Storefront' : 'Hidden from Storefront'}`);
          return { ...p, isActive: newState };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalogue');
  };

  const updateInventory = (id: string, count: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inventory: Math.max(0, count) } : p))
    );
  };

  // Cart operations
  const addToCart = (product: Product, size: number, color: ColorOption, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `${product.id}-${size}-${color.name}-${Date.now()}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      };
      return [newItem, ...prev];
    });

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.85, x: 0.9 },
        colors: ['#111111', '#8B5E3C', '#63452F', '#F5F4F0'],
      });
    } catch {}

    showToast(`Added ${product.name} (US ${size}) to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 300;

  // Orders & Checkout
  const placeOrder = (shippingAddress: UserAddress, paymentMethod: string, discount: number) => {
    const isFree = subtotal >= freeShippingThreshold || subtotal === 0;
    const shipping = isFree ? 0 : 25;
    const total = Math.max(0, subtotal - discount + shipping);

    const newOrder: Order = {
      id: `ORIGIN-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        price: c.product.price,
        selectedSize: c.selectedSize,
        selectedColor: c.selectedColor.name,
        quantity: c.quantity,
        image: c.product.images[0] || '',
      })),
      subtotal,
      discount,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      status: 'Confirmed',
      trackingNumber: `ORG-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: 'November 18, 2026',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update product inventory levels
    cart.forEach((c) => {
      updateInventory(c.product.id, (c.product.inventory || 20) - c.quantity);
    });

    clearCart();
    showToast(`Order ${newOrder.id} confirmed!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order ${orderId} status set to ${status}`);
  };

  // Auth
  const login = (email: string, password = '', asAdmin = false) => {
    const role = asAdmin || email.includes('admin') ? 'admin' : 'customer';
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: role === 'admin' ? 'Administrator' : email.split('@')[0],
      email,
      role,
      savedAddresses: user?.savedAddresses || [],
      orderHistory: orders,
    };
    setUser(profile);
    setIsAuthModalOpen(false);
    showToast(`Signed in as ${profile.name} (${profile.role})`);
    return true;
  };

  const register = (name: string, email: string) => {
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: 'customer',
      savedAddresses: [],
      orderHistory: [],
    };
    setUser(profile);
    setIsAuthModalOpen(false);
    showToast(`Account created for ${name}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out');
  };

  const isAdmin = user?.role === 'admin';

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        activeProducts,
        addProduct,
        updateProduct,
        toggleProductActive,
        deleteProduct,
        updateInventory,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        freeShippingThreshold,
        orders,
        placeOrder,
        updateOrderStatus,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        register,
        logout,
        isAdmin,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        activeProduct,
        openProductModal: (prod) => setActiveProduct(prod),
        closeProductModal: () => setActiveProduct(null),
        isSearchOpen,
        setIsSearchOpen,
        wishlist,
        toggleWishlist,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Backwards-compatibility alias for useCart
export const useCart = useStore;
