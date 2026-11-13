import React from 'react';
import { BookOpen, MessageCircle, Mail, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioHelper';

interface FooterProps {
  onNavigate: (tab: 'landing' | 'studio' | 'organizer' | 'guest') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1E1B18] text-stone-300 pt-16 pb-12 px-4 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C25E36] flex items-center justify-center text-white font-serif font-black text-xl shadow-md">
                P
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-tight">
                  Printsakes Studio
                </span>
                <p className="text-xs text-stone-400">Heirloom Photobooks & Keepsake Bindery</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Everyone has the photos. Nobody has the book. We bridge the gap between digital camera rolls 
              and timeless, hand-bound heirloom albums delivered across Lagos, Abuja, and worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/?text=Hello%20Printsakes!%20I%20have%20an%20inquiry%20about%20a%20photobook."
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Create & Explore</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    sounds.playPageFlip();
                    onNavigate('studio');
                  }}
                  className="hover:text-white transition-colors"
                >
                  3D Virtual Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sounds.playPageFlip();
                    onNavigate('guest');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Guest QR Code Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sounds.playPageFlip();
                    onNavigate('organizer');
                  }}
                  className="hover:text-white transition-colors"
                >
                  For Event Planners & Studios
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sounds.playPageFlip();
                    onNavigate('landing');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pricing & Finishes
                </button>
              </li>
            </ul>
          </div>

          {/* Luxury Finishes */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Materials & Craft</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Velvet Matte Hardcover</li>
              <li>Italian Woven Linen + Gold Foil</li>
              <li>Artisan Bonded Leatherette</li>
              <li>Crystal Acrylic Front Plate</li>
              <li>Seamless Layflat Panoramic</li>
              <li>Soundwave Audio Keepsakes</li>
            </ul>
          </div>

          {/* Bindery & Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white">Studio & Delivery</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C25E36] shrink-0 mt-0.5" />
                <span>Lekki Phase 1 / Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>100% Reprint Guarantee before shipping</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Same-Week Express Delivery in Lagos</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Printsakes Studio. Handcrafted in Lagos for life's greatest moments.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Lagos Delivery Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

