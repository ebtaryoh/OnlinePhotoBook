import React from 'react';
import { X, Sparkles, Plus, RefreshCw, Check, BookOpen, Layers } from 'lucide-react';
import { BookFinish, BookSize, MoodTheme, PaperStock, PhotobookProject } from '../../types/photobook';
import { FINISH_OPTIONS, MOOD_THEMES, PAPER_STOCK_OPTIONS, SIZE_OPTIONS } from '../../data/presetThemes';
import { calculateBookPrice, formatNGN } from '../../utils/currency';
import { sounds } from '../../utils/audioHelper';

interface MoodToolbarProps {
  isOpen: boolean;
  project: PhotobookProject;
  onClose: () => void;
  onUpdateProject: (partial: Partial<PhotobookProject>) => void;
  onAutoArrange: () => void;
  onAddSpread: () => void;
}

export const MoodToolbar: React.FC<MoodToolbarProps> = ({
  isOpen,
  project,
  onClose,
  onUpdateProject,
  onAutoArrange,
  onAddSpread,
}) => {
  if (!isOpen) return null;

  const pricing = calculateBookPrice(
    project.spreads.length,
    project.coverFinish,
    project.paperStock,
    project.bookSize,
    1
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl max-w-xl w-full border border-[#DFD6C3] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400">Specifications & Pricing</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-stone-500 font-medium">FROM</span>
              <h3 className="font-serif font-black text-2xl text-[#1F1D1A]">
                {formatNGN(pricing.unitPrice)}
              </h3>
            </div>
            <p className="text-[11px] text-stone-500">Pick mood, size, luxury finish & paper stock</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* MOOD THEMES */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Book Aesthetic & Typography Mood
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(MOOD_THEMES).map((m) => {
                const isSelected = project.moodTheme === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      sounds.playPageFlip();
                      onUpdateProject({ moodTheme: m.id });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#C25E36] bg-[#FAF3E8] shadow-xs ring-1 ring-[#C25E36]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.accentHex }} />
                      <span className="font-bold text-[#1F1D1A] truncate">{m.name}</span>
                    </div>
                    <p className="text-[10px] text-stone-500 line-clamp-1">{m.tagline}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Book Size & Dimensions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SIZE_OPTIONS.map((sz) => {
                const isSelected = project.bookSize === sz.id;
                return (
                  <button
                    key={sz.id}
                    onClick={() => {
                      sounds.playPageFlip();
                      onUpdateProject({ bookSize: sz.id });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C25E36] bg-[#FAF3E8] shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1F1D1A]">{sz.title}</span>
                        {sz.badge && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                            {sz.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">{sz.idealFor}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COVER FINISHES */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Cover Finish & Material
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FINISH_OPTIONS.map((fn) => {
                const isSelected = project.coverFinish === fn.id;
                return (
                  <button
                    key={fn.id}
                    onClick={() => {
                      sounds.playPageFlip();
                      onUpdateProject({ coverFinish: fn.id });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#C25E36] bg-[#FAF3E8] shadow-xs ring-1 ring-[#C25E36]'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <img src={fn.image} alt={fn.title} className="w-12 h-12 rounded object-cover shrink-0" />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1F1D1A]">{fn.title}</span>
                      </div>
                      <span className="text-[10px] text-[#C25E36] font-semibold">{fn.priceNote}</span>
                      <p className="text-[10px] text-stone-500 mt-0.5">{fn.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PAPER STOCK */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Archival Paper Stock
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PAPER_STOCK_OPTIONS.map((stk) => {
                const isSelected = project.paperStock === stk.id;
                return (
                  <button
                    key={stk.id}
                    onClick={() => {
                      sounds.playPageFlip();
                      onUpdateProject({ paperStock: stk.id });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#C25E36] bg-[#FAF3E8] shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1F1D1A]">{stk.title}</span>
                      <span className="text-[10px] text-[#C25E36] font-semibold">{stk.addon}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-0.5">{stk.gsm}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Arrange & Add Page Buttons (from video) */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playCelebrationChime();
                onAutoArrange();
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-[#C25E36]" />
              <span>Auto-arrange Spreads</span>
            </button>

            <button
              onClick={() => {
                sounds.playPageFlip();
                onAddSpread();
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-[#C25E36]" />
              <span>+ Add page spread</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-400 text-center">
            Each additional spread adds ₦3,500 (₦7,000 for 4 pages).
          </p>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D5] flex flex-col items-center gap-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-semibold text-sm shadow-md transition-all text-center"
          >
            Done
          </button>
          <p className="text-[10px] text-stone-400">
            Nothing to save — your changes apply as you make them
          </p>
        </div>

      </div>
    </div>
  );
};

