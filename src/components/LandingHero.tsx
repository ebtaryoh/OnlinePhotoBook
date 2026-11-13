import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Truck, 
  CreditCard, 
  Eye, 
  QrCode, 
  MessageCircle, 
  Mail, 
  ChevronRight,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import { sounds } from '../utils/audioHelper';
import { formatNGN } from '../utils/currency';

interface LandingHeroProps {
  onStartBook: () => void;
  onExploreDemo: () => void;
  onOpenOrganizerSuite: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartBook,
  onExploreDemo,
  onOpenOrganizerSuite,
}) => {
  const [emailDiscount, setEmailDiscount] = useState('');
  const [discountSubmitted, setDiscountSubmitted] = useState(false);
  const [heroFlipState, setHeroFlipState] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailDiscount) {
      setDiscountSubmitted(true);
      sounds.playCelebrationChime();
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-16 px-4 lg:px-8">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F2EADB]/60 to-transparent pointer-events-none -z-10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        
        {/* Urgency Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EDE2] border border-[#DFD3C0] text-[#8C3D1E] text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C25E36] animate-pulse" />
            <span>Order by Thu 17 Dec for Holiday Delivery • Lagos Express Courier</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1D1A] leading-[1.12]">
              Everyone has the photos. <br />
              <span className="text-[#C25E36] italic font-normal">Nobody has the book.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#666055] max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Pick your photos, our smart studio lays out every page automatically, and we deliver 
              a museum-grade heirloom photobook right to your doorstep in Lagos and nationwide.
              <span className="font-semibold text-[#1F1D1A]"> From ₦52,000.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start pt-2">
              <button
                onClick={() => {
                  sounds.playPageFlip();
                  onStartBook();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-medium text-base shadow-lg shadow-[#C25E36]/25 hover:shadow-xl hover:shadow-[#C25E36]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start your photobook</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sounds.playPageFlip();
                  onExploreDemo();
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-[#F9F5EC] text-[#1F1D1A] border border-[#D9D0BD] font-medium text-base shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#C25E36]" />
                <span>Explore 3D Demo Book</span>
              </button>
            </div>

            {/* Trust bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E8E2D5] max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-[#4D483F] font-medium">
                  Pay by bank transfer or card (Instant NGN receipt)
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-[#4D483F] font-medium">
                  See a 3D proof & photo before it ships
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-[#4D483F] font-medium">
                  Lagos Island, Mainland & Nationwide courier
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-[#4D483F] font-medium">
                  Guest QR portal for tables & afterparty candids
                </span>
              </div>
            </div>

            {/* Event Organizer / Planner Banner */}
            <div 
              onClick={onOpenOrganizerSuite}
              className="p-3.5 rounded-2xl bg-[#EFE9DC]/70 border border-[#DFD5C2] hover:bg-[#EFE9DC] transition-all cursor-pointer flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#C25E36]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F1D1A] flex items-center gap-1.5">
                    <span>Are you an Event Planner, Bride, or Studio?</span>
                    <span className="bg-[#C25E36] text-white text-[9px] uppercase px-1.5 py-0.2 rounded font-bold">
                      20% Wholesale
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B655B]">
                    Client proofing links, guest QR code uploads, and multi-copy parent gift packages.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C25E36] group-hover:translate-x-1 transition-transform shrink-0" />
            </div>

            {/* Lead capture discount row */}
            <div className="pt-2">
              {!discountSubmitted ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#7A746B] justify-center lg:justify-start">
                  <form onSubmit={handleEmailSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="email"
                      value={emailDiscount}
                      onChange={(e) => setEmailDiscount(e.target.value)}
                      placeholder="Enter email for 10% off voucher"
                      className="px-3.5 py-2 rounded-xl border border-[#DFD6C3] bg-white text-xs text-[#1F1D1A] focus:outline-none focus:border-[#C25E36] w-full sm:w-56"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-[#595246] hover:bg-[#3D372E] text-white font-medium shrink-0 transition-colors"
                    >
                      Claim
                    </button>
                  </form>
                  <span className="hidden sm:inline text-stone-400">•</span>
                  <a
                    href="https://wa.me/?text=Hello%20Printsakes!%20I%20would%20like%20a%20reminder%20about%20my%20event%20photobook."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Get a reminder on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Promo voucher code <strong>PRINTSAKES10</strong> applied! 10% will be deducted at checkout.</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Realistic 3D Interactive Photobook Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative w-full max-w-md perspective-1000 group">
              
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-2 z-20 bg-white/95 backdrop-blur shadow-md border border-[#E8E2D5] rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-semibold text-[#8C3D1E]">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Interactive 3D Spread</span>
              </div>

              {/* Photobook Card Container */}
              <div 
                onClick={() => {
                  sounds.playPageFlip();
                  setHeroFlipState(!heroFlipState);
                }}
                className="relative cursor-pointer bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#DFD5C2] transition-transform duration-500 hover:scale-[1.02]"
              >
                
                {/* Book Spine & Outer Binding Graphic */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 shadow-inner flex">
                  
                  {!heroFlipState ? (
                    // Front Cover State
                    <div className="relative w-full h-full">
                      <img 
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" 
                        alt="Photobook Front Cover"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 flex flex-col justify-between p-5 text-white">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase tracking-widest font-bold bg-white/20 backdrop-blur px-2.5 py-1 rounded">
                            Linen & Gold Foil
                          </span>
                          <span className="text-xs text-stone-200">Tap to open spread ↻</span>
                        </div>
                        <div>
                          <p className="text-[10px] tracking-widest uppercase text-amber-200 font-medium">The Wedding Keepsake</p>
                          <h3 className="font-serif text-2xl font-bold tracking-tight">TUNDE & FUNKE</h3>
                          <p className="text-xs text-stone-300">Saturday, Nov 28 • Eko Hotel & Suites</p>
                        </div>
                      </div>

                      {/* Spine texture */}
                      <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/40 via-transparent to-black/20" />
                    </div>
                  ) : (
                    // Open Spread State
                    <div className="relative w-full h-full flex bg-[#FAF7F2]">
                      
                      {/* Left Page */}
                      <div className="w-1/2 h-full p-3.5 border-r border-[#D9D0BD] flex flex-col justify-between relative bg-white">
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase tracking-wider text-[#A39988] font-bold">The Vows</span>
                          <p className="font-serif italic text-xs text-[#2A2621] leading-relaxed">
                            "I found the one my soul loves. From our first quiet conversation to this sacred altar..."
                          </p>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80" 
                          alt="Left Page"
                          className="w-full h-24 object-cover rounded shadow-sm"
                        />
                        <div className="text-[9px] text-[#A39988] flex justify-between">
                          <span>2</span>
                          <span>Vows & Rings</span>
                        </div>
                        {/* Page curl shadow */}
                        <div className="absolute top-0 right-0 w-3 h-full page-shadow-right" />
                      </div>

                      {/* Right Page */}
                      <div className="w-1/2 h-full p-3.5 flex flex-col justify-between relative bg-white">
                        <img 
                          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80" 
                          alt="Right Page"
                          className="w-full h-32 object-cover rounded shadow-sm"
                        />
                        <div className="space-y-1 text-right">
                          <p className="font-serif text-[11px] font-semibold text-[#1F1D1A]">Two Families Become One</p>
                          <div className="text-[9px] text-[#A39988] flex justify-between">
                            <span>Traditional Rites</span>
                            <span>3</span>
                          </div>
                        </div>
                        {/* Page curl shadow */}
                        <div className="absolute top-0 left-0 w-3 h-full page-shadow-left" />
                      </div>

                      {/* Center crease */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full pointer-events-none book-spine-crease opacity-70" />
                    </div>
                  )}

                </div>

                {/* Subtitle instructions below mockup */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#6B655B]">
                  <span className="flex items-center gap-1 font-medium">
                    <Eye className="w-3.5 h-3.5 text-[#C25E36]" />
                    {heroFlipState ? 'Spread 2 of 10 (Tap to close cover)' : 'Front Cover (Tap to preview inside)'}
                  </span>
                  <span className="font-serif font-bold text-[#C25E36] text-sm">
                    {formatNGN(52000)}
                  </span>
                </div>

              </div>

              {/* Client rating pill */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B655B]">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#1F1D1A]">4.9 / 5</span>
                <span>• Over 4,200 photobooks delivered</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

