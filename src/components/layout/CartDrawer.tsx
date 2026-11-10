import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    itemCount,
    freeShippingThreshold,
    clearCart,
  } = useCart();

  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === 'ATELIER10' || code === 'AETHER10') {
      setDiscountPercent(10);
      setCouponSuccess('10% VIP Atelier Discount Applied');
      setCouponError('');
    } else if (code === 'ORIGINE20') {
      setDiscountPercent(20);
      setCouponSuccess('20% Exclusive Collector Discount Applied');
      setCouponError('');
    } else {
      setCouponError('Invalid or expired promotional key');
      setCouponSuccess('');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => {
          setIsCartOpen(false);
          setOrderComplete(false);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-wider text-neutral-900">
                BAG
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-semibold">
                {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderComplete(false);
              }}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress */}
          <div className="px-6 py-3.5 bg-neutral-50/80 border-b border-neutral-100">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Truck className="w-3.5 h-3.5 text-brown-600" />
                {isFreeShipping ? (
                  <span className="text-brown-700 font-semibold">
                    You've unlocked Complimentary Express Delivery
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-neutral-900">${remainingForFree.toFixed(0)}</strong> for Free Worldwide Express
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brown-600 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Order Complete Success View */}
          {orderComplete ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-brown-100 text-brown-600 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                RESERVATION CONFIRMED
              </h3>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed max-w-xs">
                Your bespoke allocation order has been logged with our Milan fulfillment team. A tracking dispatch notice will arrive shortly.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  setIsCartOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-brown-600 transition"
              >
                Return to Showroom
              </button>
            </div>
          ) : cart.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="font-display text-base font-bold text-neutral-900 mb-1">
                YOUR BAG IS EMPTY
              </p>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Explore our dynamic 3D footwear models and select your bespoke size and colorway.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full bg-brown-600 text-white text-xs font-semibold hover:bg-brown-700 transition"
              >
                Explore Footwear
              </button>
            </div>
          ) : (
            /* Cart Items Scroll Area */
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-neutral-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200/60 p-1 flex items-center justify-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-neutral-700 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500 font-mono">
                        <span>Size: US {item.selectedSize}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-black/10"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-neutral-900">
                        {item.product.currency}
                        {(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Checkout Summary */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/60 space-y-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (try 'ATELIER10')"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white uppercase font-mono tracking-wider focus:outline-none focus:border-brown-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-brown-600 transition"
                >
                  Apply
                </button>
              </form>

              {couponSuccess && (
                <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200/60 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-900 font-semibold">${subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-brown-600">
                    <span>VIP Atelier Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-neutral-900 font-semibold">
                    {isFreeShipping ? 'FREE' : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span className="font-display uppercase tracking-wider">Total</span>
                  <span className="font-mono">${finalTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-brown-600 hover:bg-brown-700 text-white font-medium text-xs tracking-wider uppercase transition shadow-luxury disabled:opacity-75"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Reservation...</span>
                  </div>
                ) : (
                  <>
                    <span>Proceed to Dispatch Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-brown-600" /> Secure 256-Bit SSL
                </span>
                <span>&bull;</span>
                <span>30-Day Atelier Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
