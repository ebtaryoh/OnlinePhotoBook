import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Building, 
  Gift, 
  FileDown, 
  MessageCircle, 
  ArrowRight,
  Clock,
  Sparkles,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotobookProject } from '../../types/photobook';
import { calculateBookPrice, formatNGN } from '../../utils/currency';
import { sounds } from '../../utils/audioHelper';

interface CheckoutModalProps {
  isOpen: boolean;
  project: PhotobookProject;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  project,
  onClose,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [copies, setCopies] = useState(1);
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [includeRushProduction, setIncludeRushProduction] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'card'>('transfer');

  // Shipping Form State
  const [fullName, setFullName] = useState('Olufunke Adeleke');
  const [phone, setPhone] = useState('+234 803 123 4567');
  const [email, setEmail] = useState('funke.adeleke@example.com');
  const [deliveryArea, setDeliveryArea] = useState('Lagos Island (Ikoyi / VI / Lekki)');
  const [address, setAddress] = useState('14 Admiralty Way, Lekki Phase 1, Lagos');
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isOpen) return null;

  const pricing = calculateBookPrice(
    project.spreads.length,
    project.coverFinish,
    project.paperStock,
    project.bookSize,
    copies
  );

  const giftBoxTotal = includeGiftBox ? 8500 * copies : 0;
  const rushTotal = includeRushProduction ? 15000 : 0;
  const shippingFee = deliveryArea.includes('Lagos') ? 0 : 5000; // Free in Lagos!
  const grandTotal = pricing.totalPrice + giftBoxTotal + rushTotal + shippingFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playPageFlip();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    sounds.playCelebrationChime();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C25E36', '#D97706', '#10B981', '#F59E0B', '#6366F1'],
    });
    setStep('confirmed');
    onOrderSuccess();
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('1029384756');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full border border-[#DFD6C3] shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[94vh] overflow-hidden">
        
        {/* Mobile handle indicator */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF3E8] text-[#C25E36] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400">Checkout & Production</span>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">
                {step === 'details' && 'Order Summary & Delivery'}
                {step === 'payment' && 'Payment Verification'}
                {step === 'confirmed' && 'Order Placed Successfully! 🎉'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* STEP 1: DETAILS & SHIPPING */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Product Brief */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-4">
                <img
                  src={project.spreads[0]?.rightPhoto?.url || project.photos[0]?.url}
                  alt="Cover"
                  className="w-20 h-20 rounded-xl object-cover border border-stone-200 shadow-sm shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#1F1D1A]">{project.title}</h4>
                    <span className="font-serif font-bold text-sm text-[#C25E36]">{formatNGN(pricing.unitPrice)}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {project.bookSize} • {project.coverFinish.toUpperCase()} • {project.spreads.length * 2} Pages ({project.spreads.length} Spreads)
                  </p>
                  
                  {/* Quantity selector */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-stone-700">Copies:</span>
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          type="button"
                          onClick={() => setCopies(Math.max(1, copies - 1))}
                          className="px-2.5 py-1 hover:bg-stone-200 text-stone-700 font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-bold text-stone-900 bg-white text-xs">{copies}</span>
                        <button
                          type="button"
                          onClick={() => setCopies(copies + 1)}
                          className="px-2.5 py-1 hover:bg-stone-200 text-stone-700 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {pricing.discountPercentage > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {pricing.discountPercentage}% Multi-copy discount applied!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Finishing Upgrades
                </span>
                
                <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-[#C25E36] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeGiftBox}
                      onChange={(e) => setIncludeGiftBox(e.target.checked)}
                      className="rounded text-[#C25E36] focus:ring-[#C25E36] w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-stone-800 block">Handmade Velvet Gift Box + Silk Ribbon</span>
                      <span className="text-[10px] text-stone-400">Archival keepsake preservation box</span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-700">+{formatNGN(8500 * copies)}</span>
                </label>

                <label className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-[#C25E36] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeRushProduction}
                      onChange={(e) => setIncludeRushProduction(e.target.checked)}
                      className="rounded text-[#C25E36] focus:ring-[#C25E36] w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-stone-800 block">48-Hour Priority Express Binding</span>
                      <span className="text-[10px] text-stone-400">Jumps to front of bindery queue</span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-700">+{formatNGN(15000)}</span>
                </label>
              </div>

              {/* Shipping Address Form */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Doorstep Delivery Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Delivery Region</label>
                    <select
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    >
                      <option>Lagos Island (Ikoyi / VI / Lekki)</option>
                      <option>Lagos Mainland (Ikeja / Surulere / Yaba)</option>
                      <option>Abuja FCT Priority Courier (+₦5,000)</option>
                      <option>Port Harcourt / Rivers State (+₦5,000)</option>
                      <option>Nationwide Inter-State (+₦5,000)</option>
                      <option>International DHL Express (UK / US / Canada)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Street Address & Landmarks</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>
              </div>

              {/* Total breakdown */}
              <div className="p-4 bg-stone-100 rounded-2xl space-y-2 text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal ({copies} books):</span>
                  <span className="font-semibold text-stone-800">{formatNGN(pricing.totalPrice)}</span>
                </div>
                {includeGiftBox && (
                  <div className="flex justify-between">
                    <span>Velvet Gift Box ({copies}x):</span>
                    <span>{formatNGN(giftBoxTotal)}</span>
                  </div>
                )}
                {includeRushProduction && (
                  <div className="flex justify-between">
                    <span>48h Express Production:</span>
                    <span>{formatNGN(rushTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Doorstep Courier:</span>
                  <span className={shippingFee === 0 ? 'text-emerald-700 font-bold' : ''}>
                    {shippingFee === 0 ? 'FREE in Lagos' : formatNGN(shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-stone-900">
                  <span>Total Amount Due:</span>
                  <span className="font-serif text-xl text-[#C25E36]">{formatNGN(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

          {/* STEP 2: PAYMENT VERIFICATION */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* Payment selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-[#C25E36] bg-[#FAF3E8] shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#C25E36] mb-1.5" />
                  <p className="font-bold text-stone-900">Direct Bank Transfer</p>
                  <p className="text-[10px] text-stone-500">Nigeria Instant NGN Transfer (Preferred)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#C25E36] bg-[#FAF3E8] shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C25E36] mb-1.5" />
                  <p className="font-bold text-stone-900">Debit Card / Paystack</p>
                  <p className="text-[10px] text-stone-500">Mastercard, Visa, Verve & Apple Pay</p>
                </button>
              </div>

              {/* Bank Transfer Details */}
              {paymentMethod === 'transfer' ? (
                <div className="bg-white p-6 rounded-2xl border border-[#DFD6C3] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400">Official Bindery Account</span>
                      <h4 className="font-serif font-bold text-base text-stone-900">Providus Bank / GTBank</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#C25E36] bg-[#FAF3E8] px-2.5 py-1 rounded-md">
                      Ref: PRINTS-{Date.now().toString().slice(-5)}
                    </span>
                  </div>

                  <div className="space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Account Number:</span>
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <span>1029384756</span>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className="p-1 hover:bg-stone-200 rounded text-stone-600"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Account Name:</span>
                      <span className="font-bold text-stone-900">Printsakes Lagos Studio Ltd</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Amount to Transfer:</span>
                      <span className="font-bold text-[#C25E36]">{formatNGN(grandTotal)}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant automatic bank reconciliation. You will receive an SMS and WhatsApp receipt immediately.</span>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>I Have Made The Transfer • Confirm Order</span>
                  </button>
                </div>
              ) : (
                /* Card Payment Simulation */
                <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-semibold text-stone-800">Secure Paystack Gateway</span>
                    <span className="font-serif font-bold text-stone-900">{formatNGN(grandTotal)}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      readOnly
                      value="5399 2384 •••• 9012"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        readOnly
                        value="11/29"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">CVV</label>
                      <input
                        type="password"
                        readOnly
                        value="•••"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs text-center"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-4 rounded-2xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {formatNGN(grandTotal)} Securely</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-stone-500 hover:text-stone-800 text-xs font-semibold block text-center mx-auto"
              >
                ← Back to Order Summary
              </button>

            </div>
          )}

          {/* STEP 3: CONFIRMED */}
          {step === 'confirmed' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-emerald-700">Order #PS-884920 Confirmed</span>
                <h3 className="font-serif font-black text-2xl text-[#1F1D1A] mt-1">
                  Your Photobook Is Headed To The Bindery!
                </h3>
                <p className="text-stone-600 text-xs mt-1.5 max-w-md mx-auto leading-relaxed">
                  We have dispatched your high-resolution spreads to our master bookbinder in Lagos. 
                  You will receive a WhatsApp photo of your physical book before it ships!
                </p>
              </div>

              {/* Production timeline */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 text-left space-y-3">
                <h4 className="font-semibold text-xs text-stone-800">Production & Delivery Timeline:</h4>
                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Day 1: Fine-Art Pigment Printing & UV Archival Coating</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Day 2: Hand-binding {project.coverFinish} Cover & Metallic Foil Stamping</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Day 3: Studio Inspection Photo Sent to {phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Day 4: Doorstep Delivery to {address}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/?text=Hello%20Printsakes!%20I%20have%20placed%20order%20%23PS-884920%20for%20${encodeURIComponent(project.title)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    sounds.playShutter();
                    window.print();
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Digital PDF Proof</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

