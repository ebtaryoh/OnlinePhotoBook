import React from 'react';
import { BookOpen, Volume2, VolumeX, Sparkles, QrCode, ShoppingBag, ShieldCheck, Users, Home } from 'lucide-react';
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
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => {
              sounds.playPageFlip();
              onNavigate('landing');
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#C25E36] flex items-center justify-center text-white font-serif font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-[#1F1D1A]">
                  Printsakes
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold bg-[#EFE9DC] text-[#C25E36] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full border border-[#DFD5C2]">
                  PRO
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#7A746B] hidden sm:block">Heirloom Photobooks & Event Kept Memories</p>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
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
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Sound Effect Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Tactile sounds enabled' : 'Mute tactile sounds'}
              className="p-1.5 sm:p-2 rounded-full text-[#6B655B] hover:text-[#1F1D1A] hover:bg-[#EFE9DC] transition-colors"
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
              className="relative flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-medium bg-[#EFE9DC] hover:bg-[#E5DDCB] text-[#1F1D1A] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#C25E36]" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C25E36] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center">
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
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#C25E36] hover:bg-[#A94F2B] text-white shadow-xs hover:shadow transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Studio</span>
            </button>

          </div>

        </div>
      </header>

      {/* Sleek Mobile Bottom Navigation Bar (app-like experience for phones) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#DFD6C3] px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            sounds.playPageFlip();
            onNavigate('landing');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentTab === 'landing' ? 'text-[#C25E36] font-bold' : 'text-stone-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            sounds.playPageFlip();
            onNavigate('studio');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentTab === 'studio' ? 'text-[#C25E36] font-bold' : 'text-stone-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3D Studio</span>
        </button>

        <button
          onClick={() => {
            sounds.playPageFlip();
            onNavigate('organizer');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentTab === 'organizer' ? 'text-[#C25E36] font-bold' : 'text-stone-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Planners</span>
        </button>

        <button
          onClick={() => {
            sounds.playPageFlip();
            onNavigate('guest');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentTab === 'guest' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Guest QR</span>
        </button>
      </nav>
    </>
  );
};
