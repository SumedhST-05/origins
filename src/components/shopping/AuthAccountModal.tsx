import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, User, Package, MapPin, Shield, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthAccountModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    user,
    login,
    register,
    logout,
    orders,
    setIsAdminPanelOpen,
  } = useStore();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      login(email, password);
    } else {
      register(name, email, password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E6E4E0] overflow-hidden my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#E6E4E0] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B5E3C] font-bold block">
              PDF MODULE 02 &bull; USER INTERFACE
            </span>
            <h3 className="font-editorial text-lg font-bold text-[#111111]">
              {user ? 'CUSTOMER PORTAL' : mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </h3>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full text-[#777777] hover:text-[#111111] hover:bg-[#F5F4F0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGGED IN VIEW */}
        {user ? (
          <div className="p-6 space-y-6">
            {/* User Identity Card */}
            <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-[#E6E4E0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#111111] text-white flex items-center justify-center font-editorial font-bold text-base">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#111111]">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-[#777777] font-mono">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setIsAdminPanelOpen(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-mono hover:bg-[#8B5E3C] transition"
                  title="Switch to Admin Panel"
                >
                  <Shield className="w-3 h-3 text-[#8B5E3C]" />
                  <span>Admin Panel</span>
                </button>

                <button
                  onClick={logout}
                  className="p-2 rounded-full border border-[#E6E4E0] text-[#777777] hover:text-[#111111] hover:border-[#111111]"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex space-x-6 border-b border-[#E6E4E0] pb-2 text-xs font-mono font-bold uppercase">
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-2 -mb-2 transition ${
                  activeTab === 'orders' ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]' : 'text-[#777777]'
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`pb-2 -mb-2 transition ${
                  activeTab === 'addresses' ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]' : 'text-[#777777]'
                }`}
              >
                Addresses ({user.savedAddresses.length})
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-2 -mb-2 transition ${
                  activeTab === 'profile' ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]' : 'text-[#777777]'
                }`}
              >
                Credentials
              </button>
            </div>

            {/* Orders Tab Content (PDF Slide 3, 5, 10: Step 4 Confirm & Track) */}
            {activeTab === 'orders' && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <p className="text-xs text-[#777777] text-center py-6">No previous orders logged.</p>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-white border border-[#E6E4E0] space-y-2 hover:border-[#8B5E3C] transition"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#111111]">{ord.id}</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px]">
                          {ord.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#777777] font-mono">
                        <span>Tracking: <strong className="text-[#8B5E3C]">{ord.trackingNumber}</strong></span>
                        <span>Total: <strong className="text-[#111111]">${ord.total.toFixed(0)}</strong></span>
                      </div>

                      <div className="text-[10px] text-[#777777] font-mono pt-1 border-t border-[#E6E4E0]/60">
                        {ord.items.map((it) => it.productName).join(', ')} (US {ord.items[0]?.selectedSize})
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab Content */}
            {activeTab === 'addresses' && (
              <div className="space-y-3">
                {user.savedAddresses.map((addr, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#E6E4E0] text-xs space-y-1">
                    <p className="font-bold text-[#111111]">{addr.fullName}</p>
                    <p className="text-[#777777]">{addr.street}</p>
                    <p className="text-[#777777]">{addr.city}, {addr.state} {addr.postalCode}</p>
                    <p className="text-[#777777]">{addr.country} &bull; {addr.phone}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Credentials Tab Content */}
            {activeTab === 'profile' && (
              <div className="text-xs space-y-2 p-4 rounded-2xl bg-[#F5F4F0] border border-[#E6E4E0]">
                <p><strong>Account Role:</strong> {user.role === 'admin' ? 'Administrator' : 'Verified Customer'}</p>
                <p><strong>Security:</strong> Encrypted Auth Token</p>
                <p><strong>Origins Privilege:</strong> VIP Member (10% Discount applied)</p>
              </div>
            )}
          </div>
        ) : (
          /* AUTH FORM (SIGN IN / REGISTER) */
          <div className="p-6 space-y-6">
            {/* Quick Demo Login Pills */}
            <div className="p-3 bg-[#F5F4F0] rounded-2xl border border-[#E6E4E0] space-y-2">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777777] font-bold">
                1-Click Instant Demo Access:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => login('customer@origins.com', 'demo', false)}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-[#E6E4E0] text-xs font-semibold text-[#111111] hover:border-[#8B5E3C]"
                >
                  Customer Demo
                </button>
                <button
                  type="button"
                  onClick={() => login('admin@origins.com', 'admin', true)}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#8B5E3C]"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-mono uppercase text-[#777777] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hanshal S."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E6E4E0] text-xs text-[#111111] focus:outline-none focus:border-[#8B5E3C]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-[#777777] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@origins-atelier.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E6E4E0] text-xs text-[#111111] focus:outline-none focus:border-[#8B5E3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#777777] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E6E4E0] text-xs text-[#111111] focus:outline-none focus:border-[#8B5E3C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-full bg-[#8B5E3C] hover:bg-[#63452F] text-white text-xs font-semibold uppercase tracking-wider transition shadow-origins"
              >
                {mode === 'signin' ? 'Sign In to Origins' : 'Create Account'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-[#E6E4E0]">
              <button
                onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
                className="text-xs text-[#8B5E3C] hover:underline font-mono"
              >
                {mode === 'signin'
                  ? 'No account yet? Register here'
                  : 'Already registered? Sign in here'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
