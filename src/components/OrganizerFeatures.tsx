import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Check, 
  QrCode, 
  Share2, 
  Gift, 
  Building2, 
  Truck, 
  Percent, 
  ShieldCheck, 
  Play, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/audioHelper';
import { formatNGN } from '../utils/currency';

interface OrganizerFeaturesProps {
  onOpenGuestPortal: () => void;
  onOpenStudio: () => void;
  onOpenCheckout: () => void;
}

export const OrganizerFeatures: React.FC<OrganizerFeaturesProps> = ({
  onOpenGuestPortal,
  onOpenStudio,
  onOpenCheckout,
}) => {
  const [plannerCopies, setPlannerCopies] = useState(5);
  const basePricePerBook = 52000;
  const rawTotal = basePricePerBook * plannerCopies;
  const discountPercent = plannerCopies >= 10 ? 25 : plannerCopies >= 5 ? 18 : plannerCopies >= 3 ? 10 : 0;
  const discountedTotal = rawTotal * (1 - discountPercent / 100);

  return (
    <section className="py-16 px-4 lg:px-8 bg-[#F4EFE6] border-y border-[#DFD6C3]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DFD6C3] text-[#C25E36] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Dedicated Event Organizer & Studio Suite</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1D1A] tracking-tight">
            Designed for Celebrants. <br />
            <span className="text-[#C25E36] italic font-normal">Supercharged for Event Planners & Studios.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From Lagos wedding coordinators to luxury portrait photographers, streamline client approval, 
            gather guest memories live, and unlock wholesale bulk parent albums in one seamless workflow.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Live Guest QR Portal */}
          <div className="bg-white p-6 rounded-3xl border border-[#DFD6C3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">
                Live Guest QR Drop & Table Cards
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Generate printable QR tabletop cards for banquet tables. Guests upload spontaneous candid shots 
                and emotional blessings straight from their phone into your moderation inbox.
              </p>
            </div>
            <button
              onClick={() => {
                sounds.playPageFlip();
                onOpenGuestPortal();
              }}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start"
            >
              <span>Explore QR Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Client Proofing & Sign-Off */}
          <div className="bg-white p-6 rounded-3xl border border-[#DFD6C3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Share2 className="w-6 h-6 text-[#C25E36]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">
                1-Click Client Proofing & Approval
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Send a private, interactive 3D virtual proof to the celebrant or couple over WhatsApp. 
                They can flip spreads and click "Approve for Print" with digital verification seal.
              </p>
            </div>
            <button
              onClick={() => {
                sounds.playPageFlip();
                onOpenStudio();
              }}
              className="text-xs font-semibold text-[#C25E36] hover:text-[#AA4D28] flex items-center gap-1 self-start"
            >
              <span>View 3D Proof Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Wholesale Multi-Copy Calculator */}
          <div className="bg-white p-6 rounded-3xl border border-[#DFD6C3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
                <Gift className="w-6 h-6 text-[#C25E36]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">
                Multi-Copy Keepsakes for Parents
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Order 1 grand heirloom for the celebrant plus matching miniature editions for parents, in-laws, 
                and VIP entourage. Tiered discounts up to 25% applied automatically.
              </p>
            </div>
            <span className="text-xs font-bold text-[#C25E36]">
              Save up to ₦130,000 on bundles
            </span>
          </div>

          {/* Card 4: White-Label Studio Branding */}
          <div className="bg-white p-6 rounded-3xl border border-[#DFD6C3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">
                White-Label Studio & Planner Colophon
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Include your wedding planning agency or photography studio crest debossed on the inside back cover:
                "Curated by Your Brand • Handcrafted in Lagos".
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-800">
              Complimentary on all Pro plans
            </span>
          </div>

        </div>

        {/* Interactive Organizer Bulk Tier Calculator Widget */}
        <div className="bg-white rounded-3xl border border-[#DFD6C3] p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E8] text-[#C25E36] text-xs font-bold">
                <Percent className="w-3.5 h-3.5" />
                <span>Event Planner Bulk Pricing Simulator</span>
              </div>
              
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F1D1A]">
                Need Multiple Copies for Parents & Entourage?
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Select how many photobooks you need. Organizers ordering 3 or more copies receive wholesale factory pricing.
              </p>

              {/* Slider / Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>Number of Photobooks:</span>
                  <span className="text-base text-[#C25E36] font-bold">{plannerCopies} Books</span>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5, 8, 10, 15].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        sounds.playPageFlip();
                        setPlannerCopies(num);
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        plannerCopies === num
                          ? 'bg-[#C25E36] text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* What's included checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 Master Heirloom for Celebrant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{plannerCopies - 1} Keepsake Editions for VIPs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Free Express Doorstep Delivery in Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Complimentary Luxury Gift Boxes</span>
                </div>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-[#FAF7F2] p-6 rounded-2xl border border-[#DFD6C3] flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400">Wholesale Estimate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-serif font-black text-[#1F1D1A]">
                    {formatNGN(discountedTotal)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-sm line-through text-stone-400">
                      {formatNGN(rawTotal)}
                    </span>
                  )}
                </div>

                {discountPercent > 0 && (
                  <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {discountPercent}% Wholesale Discount Saved {formatNGN(rawTotal - discountedTotal)}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-[#DFD6C3]">
                <div className="flex justify-between">
                  <span>Price per book:</span>
                  <span className="font-semibold text-stone-800">{formatNGN(discountedTotal / plannerCopies)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lagos Delivery:</span>
                  <span className="font-semibold text-emerald-700">FREE Priority</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playCelebrationChime();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve Organizer Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

