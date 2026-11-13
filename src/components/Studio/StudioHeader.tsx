import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Share2, 
  ShoppingBag, 
  RotateCcw, 
  RotateCw, 
  Edit2, 
  ShieldCheck, 
  QrCode, 
  LayoutGrid, 
  BookOpen, 
  Sparkles,
  Users
} from 'lucide-react';
import { sounds } from '../../utils/audioHelper';
import { formatNGN } from '../../utils/currency';

interface StudioHeaderProps {
  title: string;
  onUpdateTitle: (title: string) => void;
  onBack: () => void;
  onShareProof: () => void;
  onOpenPrintCheck: () => void;
  onOpenGuestUpload: () => void;
  onOpenCheckout: () => void;
  viewMode: 'flip' | 'grid';
  onToggleViewMode: () => void;
  totalPrice: number;
  isClientApproved?: boolean;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  title,
  onUpdateTitle,
  onBack,
  onShareProof,
  onOpenPrintCheck,
  onOpenGuestUpload,
  onOpenCheckout,
  viewMode,
  onToggleViewMode,
  totalPrice,
  isClientApproved,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTitle(tempTitle || 'Our Keepsake Photobook');
    setIsEditingTitle(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E8E2D5] px-2.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 shadow-xs">
      
      {/* Left: Back & Saved status */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button
          onClick={onBack}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-[#EFE9DC] text-stone-700 flex items-center gap-1 text-xs font-semibold transition-colors"
          title="Back to Overview"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Saved</span>
        </div>

        {isClientApproved && (
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#C25E36] font-bold bg-[#FAF0EB] px-2.5 py-1 rounded-full border border-[#E9C7B8]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Celebrant Approved</span>
          </div>
        )}
      </div>

      {/* Center: Title with quick inline edit */}
      <div className="flex-1 max-w-[130px] sm:max-w-sm md:max-w-md mx-1 sm:mx-2 text-center">
        {isEditingTitle ? (
          <form onSubmit={handleTitleSubmit} className="flex items-center justify-center gap-1">
            <input
              type="text"
              autoFocus
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              className="font-serif font-bold text-xs sm:text-base text-center bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-[#C25E36] focus:outline-none w-full shadow-inner"
            />
          </form>
        ) : (
          <div
            onClick={() => setIsEditingTitle(true)}
            className="inline-flex items-center justify-center gap-1 cursor-pointer group hover:bg-[#EFE9DC] px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-lg transition-colors max-w-full"
          >
            <h1 className="font-serif font-bold text-xs sm:text-base text-[#1F1D1A] truncate">
              {title}
            </h1>
            <Edit2 className="w-3 h-3 text-stone-400 group-hover:text-stone-700 shrink-0" />
          </div>
        )}
      </div>

      {/* Right: Mode switcher & Actions */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        
        {/* Toggle Flip vs Grid Proof */}
        <button
          onClick={() => {
            sounds.playPageFlip();
            onToggleViewMode();
          }}
          title={viewMode === 'flip' ? 'Switch to Grid Spread Organizer' : 'Switch to 3D Flip View'}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-stone-300 hover:bg-[#EFE9DC] text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          {viewMode === 'flip' ? (
            <>
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C25E36]" />
              <span className="hidden sm:inline">Grid Proof</span>
            </>
          ) : (
            <>
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C25E36]" />
              <span className="hidden sm:inline">3D Flip</span>
            </>
          )}
        </button>

        {/* Live Guest QR portal button */}
        <button
          onClick={onOpenGuestUpload}
          title="Live Guest Event QR Code & Photo Drop"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-stone-300 hover:bg-[#EFE9DC] text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-colors"
        >
          <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden md:inline">Guest QR</span>
        </button>

        {/* Client Proof Share link */}
        <button
          onClick={onShareProof}
          title="Share interactive proof with celebrant"
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-stone-300 hover:bg-[#EFE9DC] text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden md:inline">Share</span>
        </button>

        {/* Print Check Pre-Flight Button */}
        <button
          onClick={onOpenPrintCheck}
          title="Pre-flight print quality check"
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Print Check</span>
        </button>

        {/* Order / Continue Button */}
        <button
          onClick={onOpenCheckout}
          className="px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-[#C25E36] hover:bg-[#AA4D28] text-white text-[11px] sm:text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1 sm:gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline sm:inline">Order •</span>
          <span>{formatNGN(totalPrice)}</span>
        </button>

      </div>

    </header>
  );
};
