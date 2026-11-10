import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Check, CreditCard, MapPin } from 'lucide-react';
import { UserAddress } from '../../types';

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
    placeOrder,
    user,
  } = useStore();

  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Address form
  const [address, setAddress] = useState<UserAddress>({
    fullName: user?.name || 'Hanshal S.',
    street: user?.savedAddresses[0]?.street || '12 Savile Row',
    city: user?.savedAddresses[0]?.city || 'London',
    state: user?.savedAddresses[0]?.state || 'Greater London',
    postalCode: user?.savedAddresses[0]?.postalCode || 'W1S 3PR',
    country: user?.savedAddresses[0]?.country || 'United Kingdom',
    phone: user?.savedAddresses[0]?.phone || '+44 20 7123 4567',
  });

  const [paymentMethod, setPaymentMethod] = useState('Apple Pay / Card');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === 'ORIGINS10' || code === 'AETHER10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Origins Welcome Privilege Applied');
      setCouponError('');
    } else if (code === 'ORIGINS20') {
      setDiscountPercent(20);
      setCouponSuccess('20% Collector Discount Applied');
      setCouponError('');
    } else {
      setCouponError('Invalid promotion code');
      setCouponSuccess('');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(address, paymentMethod, discountAmount);
    setConfirmedOrder(order);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#111111]/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => {
          setIsCartOpen(false);
          setStep('cart');
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E6E4E0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-editorial font-bold text-lg tracking-wider text-[#111111]">
                {step === 'cart' ? 'SHOPPING BAG' : step === 'checkout' ? 'DISPATCH DETAILS' : 'CONFIRMATION'}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#F5F4F0] text-[#111111] font-semibold">
                {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setStep('cart');
              }}
              className="p-1.5 rounded-full text-[#777777] hover:text-[#111111] hover:bg-[#F5F4F0] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress */}
          {step !== 'confirmed' && (
            <div className="px-6 py-3 bg-[#F5F4F0] border-b border-[#E6E4E0]">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="flex items-center gap-1.5 text-[#111111]">
                  <Truck className="w-3.5 h-3.5 text-[#8B5E3C]" />
                  {isFreeShipping ? (
                    <span className="text-[#8B5E3C] font-semibold">
                      Unlocked Complimentary Global Express
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#111111]">${remainingForFree.toFixed(0)}</strong> for Free Express
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full bg-[#E6E4E0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#8B5E3C] h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* BODY: STEP 1 (Cart Items) */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F5F4F0] text-[#777777] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <p className="font-editorial text-base font-bold text-[#111111] mb-1">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs text-[#777777] max-w-xs mb-6">
                    Explore our 3D footwear models and select your size and colorway.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#8B5E3C] text-white text-xs font-semibold hover:bg-[#63452F] transition"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E6E4E0]">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-[#F5F4F0] overflow-hidden flex-shrink-0 border border-[#E6E4E0] p-1 flex items-center justify-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs uppercase tracking-wider font-bold text-[#111111]">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#777777] hover:text-[#111111] p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#777777] font-mono">
                            <span>US {item.selectedSize}</span>
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

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#E6E4E0] rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#F5F4F0] text-[#777777]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-semibold text-[#111111]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#F5F4F0] text-[#777777]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-mono font-bold text-[#111111]">
                            {item.product.currency}
                            {(item.product.price * item.quantity).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Cart Action Bar */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E6E4E0] bg-[#FAFAF8] space-y-4">
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Code (try 'ORIGINS10')"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#8B5E3C]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#111111] text-white rounded-xl text-xs font-semibold hover:bg-[#8B5E3C] transition"
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

                  <div className="space-y-1.5 text-xs text-[#777777] pt-2 border-t border-[#E6E4E0] font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#111111] font-semibold">${subtotal.toFixed(0)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#8B5E3C]">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-[#111111] font-semibold">
                        {isFreeShipping ? 'FREE' : `$${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E6E4E0]">
                      <span className="font-editorial uppercase">Total</span>
                      <span>${finalTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#8B5E3C] hover:bg-[#63452F] text-white font-medium text-xs tracking-wider uppercase transition shadow-origins hover:shadow-origins-hover"
                  >
                    <span>Proceed to Delivery &bull; ${finalTotal.toFixed(0)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* BODY: STEP 2 (Delivery Address & Payment) */}
          {step === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="flex-1 flex flex-col justify-between overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] uppercase pb-2 border-b border-[#E6E4E0]">
                  <MapPin className="w-4 h-4 text-[#8B5E3C]" />
                  <span>Delivery Address</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#777777] mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E4E0] bg-white focus:outline-none focus:border-[#8B5E3C]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E4E0] space-y-2">
                  <span className="block text-xs font-mono font-bold text-[#111111] uppercase">
                    Payment Selection
                  </span>
                  {['Apple Pay / Google Pay', 'Credit / Debit Card', 'Atelier Direct Invoice'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium cursor-pointer transition ${
                        paymentMethod === method
                          ? 'border-[#8B5E3C] bg-[#F7F2EE] text-[#63452F]'
                          : 'border-[#E6E4E0] hover:border-[#111111]'
                      }`}
                    >
                      <span>{method}</span>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-[#8B5E3C]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E4E0] space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span>Payable Now</span>
                  <span className="font-bold text-[#111111]">${finalTotal.toFixed(0)}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-4 py-3 rounded-full border border-[#E6E4E0] text-xs font-semibold hover:border-[#111111]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-full bg-[#8B5E3C] hover:bg-[#63452F] text-white text-xs font-semibold uppercase tracking-wider shadow-origins"
                  >
                    Confirm & Complete Dispatch
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* BODY: STEP 3 (Order Confirmation & Tracking - PDF Slide 3, 5, 10) */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F2EE] text-[#8B5E3C] flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B5E3C] font-bold">
                  PDF MODULE 07 &bull; ORDERS
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#111111] mt-1">
                  ORDER CONFIRMED
                </h3>
              </div>

              <div className="w-full bg-[#F5F4F0] rounded-2xl p-4 text-left font-mono text-xs space-y-2 border border-[#E6E4E0]">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Order Reference:</span>
                  <strong className="text-[#111111]">{confirmedOrder.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Tracking Code:</span>
                  <strong className="text-[#8B5E3C]">{confirmedOrder.trackingNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Est. Delivery:</span>
                  <span className="text-[#111111]">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Status:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    {confirmedOrder.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#777777] max-w-xs leading-relaxed">
                Dispatch telemetry notice sent to {address.fullName}. Track progress under your customer profile anytime.
              </p>

              <button
                onClick={() => {
                  setStep('cart');
                  setIsCartOpen(false);
                }}
                className="w-full py-3 px-6 rounded-full bg-[#111111] hover:bg-[#8B5E3C] text-white text-xs font-semibold uppercase tracking-wider transition"
              >
                Return to Showroom
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
