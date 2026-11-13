import React from 'react';
import { Check, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { formatNGN } from '../utils/currency';
import { sounds } from '../utils/audioHelper';

interface PricingTiersProps {
  onStartWithTier: (size: '8x8' | '10x10' | '12x12') => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onStartWithTier }) => {
  const tiers = [
    {
      id: '8x8',
      name: 'Studio Square',
      size: '8" × 8" (20 × 20 cm)',
      price: 52000,
      description: 'The beloved classic. Compact, beautiful, and heartfelt for milestone birthdays and gifts.',
      badge: null,
      features: [
        '20 pages / 10 spreads included',
        'Velvet matte scratch-resistant hardcover',
        '250 gsm archival lustre photo paper',
        'Free automated storytelling layout engine',
        'Express doorstep delivery across Lagos',
      ],
      popular: false,
    },
    {
      id: '10x10',
      name: 'Signature Heirloom',
      size: '10" × 10" (25 × 25 cm)',
      price: 80000,
      description: 'The ultimate wedding & anniversary center-piece. Handcrafted with room for grandeur.',
      badge: 'Most Popular for Celebrants',
      features: [
        '24 pages / 12 spreads included',
        'Italian Woven Linen or Matte Hardcover',
        'Choice of Gold, Silver, or Rose-gold Foil Stamping',
        '270 gsm Fine Art Velvet Paper',
        'Live Guest QR Code & Table Placard Generator',
        'Private 3D Client Proofing Link',
        'Free Priority Lagos & Nationwide Courier',
      ],
      popular: true,
    },
    {
      id: '12x12',
      name: 'Grand Royal Statement',
      size: '12" × 12" (30 × 30 cm)',
      price: 135000,
      description: 'Monumental coffee-table luxury for royal traditional weddings, corporate galas & jubilees.',
      badge: 'Luxury Masterpiece',
      features: [
        '30 pages / 15 spreads included',
        'Artisan Bonded Leather or Crystal Acrylic Front',
        'Seamless 100% Panoramic Layflat Binding (420 gsm)',
        'Deep Debossed Monogram Crest',
        'Audio Voice Keepsake (Embedded Soundwave QR)',
        'Handmade Velvet Presentation Box & Silk Ribbon',
        'White-label Event Planner Colophon',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C25E36]">Transparent Pricing</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1D1A]">
            No Hidden Fees. Genuine Nigerian Craftsmanship.
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Every photobook is hand-bound in our Lagos studio using acid-free archival materials 
            built to last over 100 years without fading.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                t.popular
                  ? 'bg-white border-2 border-[#C25E36] shadow-xl scale-[1.02] ring-4 ring-[#C25E36]/10'
                  : 'bg-white/80 border border-[#DFD6C3] shadow-sm hover:shadow-md'
              }`}
            >
              {t.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C25E36] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                  {t.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1F1D1A]">{t.name}</h3>
                  <span className="text-xs text-stone-500 font-medium">{t.size}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-[#1F1D1A]">
                    {formatNGN(t.price)}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">/ book</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pb-4 border-b border-stone-100">
                  {t.description}
                </p>

                {/* Features */}
                <div className="space-y-2.5 pt-2">
                  {t.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    sounds.playPageFlip();
                    onStartWithTier(t.id as '8x8' | '10x10' | '12x12');
                  }}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    t.popular
                      ? 'bg-[#C25E36] hover:bg-[#AA4D28] text-white shadow-md'
                      : 'bg-[#F2ECE0] hover:bg-[#EAE2D2] text-[#1F1D1A]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Customize {t.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

