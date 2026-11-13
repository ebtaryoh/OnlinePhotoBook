import React from 'react';
import { BookOpen, Volume2, VolumeX, Sparkles, QrCode, ShoppingBag, ShieldCheck, Users } from 'lucide-react';
import { sounds } from '../utils/audioHelper';

interface NavbarProps {
  currentTab: 'landing' | 'studio' | 'organizer' | 'guest';
  onNavigate: (tab: 'landing' | 'studio' | 'organizer' | 'guest') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  cartCount: number;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  soundEnabled,
  onToggleSound,
  cartCount,
  onOpenCheckout,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D5] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            sounds.playPageFlip();
            onNavigate('landing');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C25E36] flex items-center justify-center text-white font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl tracking-tight text-[#1F1D1A]">
                Printsakes
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold bg-[#EFE9DC] text-[#C25E36] px-2 py-0.5 rounded-full border border-[#DFD5C2]">
                Studio PRO
              </span>
            </div>
            <p className="text-[11px] text-[#7A746B] hidden sm:block">Heirloom Photobooks & Event Kept Memories</p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F0EBE0] p-1 rounded-full border border-[#DFD6C3]">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentTab === 'landing'
                ? 'bg-white text-[#1F1D1A] shadow-sm font-semibold'
                : 'text-[#6B655B] hover:text-[#1F1D1A]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              sounds.playPageFlip();
              onNavigate('studio');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'studio'
                ? 'bg-white text-[#1F1D1A] shadow-sm font-semibold'
                : 'text-[#6B655B] hover:text-[#1F1D1A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C25E36]" />
            3D Studio
          </button>
          <button
            onClick={() => onNavigate('organizer')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'organizer'
                ? 'bg-white text-[#1F1D1A] shadow-sm font-semibold'
                : 'text-[#6B655B] hover:text-[#1F1D1A]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#C25E36]" />
            Organizer Suite
          </button>
          <button
            onClick={() => onNavigate('guest')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'guest'
                ? 'bg-white text-[#1F1D1A] shadow-sm font-semibold'
                : 'text-[#6B655B] hover:text-[#1F1D1A]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-700" />
            Guest QR Portal
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sound Effect Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Tactile sounds enabled' : 'Mute tactile sounds'}
            className="p-2 rounded-full text-[#6B655B] hover:text-[#1F1D1A] hover:bg-[#EFE9DC] transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#C25E36]" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {/* Cart / Order button */}
          <button
            onClick={onOpenCheckout}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#EFE9DC] hover:bg-[#E5DDCB] text-[#1F1D1A] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#C25E36]" />
            <span className="hidden sm:inline font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C25E36] text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Launch Studio CTA */}
          <button
            onClick={() => {
              sounds.playPageFlip();
              onNavigate('studio');
            }}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#C25E36] hover:bg-[#A94F2B] text-white shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Studio</span>
          </button>

        </div>

      </div>
    </header>
  );
};

