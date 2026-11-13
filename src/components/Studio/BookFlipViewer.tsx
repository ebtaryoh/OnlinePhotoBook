import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck,
  Sliders,
  Plus,
  Trash2,
  Music,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { MoodTheme, PhotobookProject, SpreadPage } from '../../types/photobook';
import { MOOD_THEMES } from '../../data/presetThemes';
import { sounds } from '../../utils/audioHelper';

interface BookFlipViewerProps {
  project: PhotobookProject;
  activeSpreadIndex: number;
  onSelectSpread: (index: number) => void;
  onOpenSpreadEditor: () => void;
  onOpenPrintCheck: () => void;
  onOpenMoodModal: () => void;
  onAddSpread: () => void;
}

export const BookFlipViewer: React.FC<BookFlipViewerProps> = ({
  project,
  activeSpreadIndex,
  onSelectSpread,
  onOpenSpreadEditor,
  onOpenPrintCheck,
  onOpenMoodModal,
  onAddSpread,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const currentSpread = project.spreads[activeSpreadIndex] || project.spreads[0];
  const theme = MOOD_THEMES[project.moodTheme] || MOOD_THEMES.warm;
  const isCover = activeSpreadIndex === 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSpreadIndex, project.spreads.length]);

  const handleNext = () => {
    if (activeSpreadIndex < project.spreads.length - 1) {
      setFlipDirection('next');
      setIsFlipping(true);
      sounds.playPageFlip();
      setTimeout(() => {
        onSelectSpread(activeSpreadIndex + 1);
        setIsFlipping(false);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (activeSpreadIndex > 0) {
      setFlipDirection('prev');
      setIsFlipping(true);
      sounds.playPageFlip();
      setTimeout(() => {
        onSelectSpread(activeSpreadIndex - 1);
        setIsFlipping(false);
      }, 150);
    }
  };

  return (
    <div className={`relative flex flex-col justify-between flex-1 transition-all ${isFullscreen ? 'fixed inset-0 z-50 bg-[#161514] p-4 sm:p-8' : 'p-3 sm:p-6 bg-[#FAF7F2]'
      }`}>

      {/* Top Context Bar */}
      <div className="flex items-center justify-between text-xs text-stone-600 mb-3 max-w-5xl mx-auto w-full px-2">
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-sm text-[#1F1D1A]">
            {isCover ? 'Front Cover' : `Spread ${activeSpreadIndex} of ${project.spreads.length - 1}`}
          </span>
          <span className="text-stone-300">•</span>
          <span className="capitalize text-stone-500 font-medium">
            {project.coverFinish.replace('-', ' ')} • {project.bookSize}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick theme trigger */}
          <button
            onClick={onOpenMoodModal}
            className="px-2.5 py-1 rounded-lg bg-white border border-[#DFD6C3] hover:bg-[#F2ECE0] text-stone-700 font-medium flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
            <span className="text-[11px]">{theme.name}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white border border-[#DFD6C3] text-stone-600 hover:text-stone-900 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main 3D Book Stage */}
      <div className="relative flex-1 flex items-center justify-center min-h-[360px] sm:min-h-[480px] lg:min-h-[530px] w-full max-w-5xl mx-auto perspective-1000">

        {/* Left Arrow Button */}
        <button
          disabled={activeSpreadIndex === 0}
          onClick={handlePrev}
          title="Previous Spread"
          className="absolute left-1 sm:left-4 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl border border-[#DFD5C2] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          disabled={activeSpreadIndex === project.spreads.length - 1}
          onClick={handleNext}
          title="Next Spread"
          className="absolute right-1 sm:right-4 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl border border-[#DFD5C2] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Spread Container */}
        <div className={`relative transition-all duration-300 transform ${isFlipping ? (flipDirection === 'next' ? 'scale-[0.98] -rotate-1' : 'scale-[0.98] rotate-1') : 'scale-100 rotate-0'
          } ${isCover ? 'w-full max-w-md aspect-square' : 'w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9]'}`}>

          {/* External Book Drop Shadow */}
          <div className="absolute inset-0 book-shadow rounded-2xl pointer-events-none -z-10" />

          {/* COVER SPREAD (Spread 0) */}
          {isCover ? (
            <div
              onClick={onOpenSpreadEditor}
              className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-[#DFD5C2] shadow-2xl flex flex-col justify-between cursor-pointer group select-none"
            >
              {/* Finished wrap texture */}
              {project.coverFinish === 'linen' && (
                <div className="absolute inset-0 bg-[#3B2C24]/90 mix-blend-multiply opacity-20 pointer-events-none" />
              )}
              {project.coverFinish === 'leatherette' && (
                <div className="absolute inset-0 bg-[#2B1E16]/80 mix-blend-color-burn opacity-30 pointer-events-none" />
              )}
              {project.coverFinish === 'acrylic' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20 pointer-events-none border-4 border-white/50" />
              )}

              {/* Cover Image */}
              <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 text-white">
                {currentSpread.rightPhoto?.url ? (
                  <img
                    src={currentSpread.rightPhoto.url}
                    alt="Book Cover Photo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
                )}

                {/* Dark gradient for high contrast readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

                {/* Top Foil Stamp */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`text-[11px] uppercase tracking-widest px-3 py-1 rounded-full font-bold backdrop-blur-md ${project.foilColor === 'gold' ? 'text-amber-200 bg-amber-950/40 border border-amber-400/40' : 'text-stone-200 bg-black/40 border border-white/20'
                    }`}>
                    {project.coverFinish.toUpperCase()} • {project.foilColor.toUpperCase()} FOIL
                  </span>

                  <span className="text-[11px] text-stone-200 bg-black/40 backdrop-blur px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#C25E36]" />
                    <span>Click to edit cover</span>
                  </span>
                </div>

                {/* Bottom Title & Event Details */}
                <div className="relative z-10 space-y-2">
                  <p className="text-xs tracking-[0.25em] uppercase text-amber-200 font-semibold">
                    {project.celebrantNames || 'Celebration Keepsake'}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                    {currentSpread.title || project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 font-light max-w-sm drop-shadow">
                    {currentSpread.subtitle || project.subtitle}
                  </p>
                </div>

                {/* Realistic left spine shadow */}
                <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          ) : (
            // INSIDE TWO-PAGE SPREAD (Spreads 1 to N)
            <div
              onClick={onOpenSpreadEditor}
              className="relative w-full h-full rounded-xl overflow-hidden bg-white border border-[#DFD6C3] shadow-2xl flex cursor-pointer group select-none"
            >

              {/* LEFT PAGE */}
              <div className="w-1/2 h-full bg-[#FAF7F2] p-4 sm:p-8 flex flex-col justify-between relative border-r border-[#E0D7C5] overflow-hidden">

                {/* Left Page Content according to Layout */}
                {currentSpread.layout === 'story-quote' ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-4 sm:p-8 space-y-4">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-[#A67C52]">
                      {currentSpread.title || 'THE WORDS'}
                    </span>
                    <blockquote className="font-serif italic text-base sm:text-xl lg:text-2xl text-[#2B2620] leading-relaxed max-w-md">
                      {currentSpread.quote || '"In love and celebration, we write our family history."'}
                    </blockquote>
                    {currentSpread.hasAudioKeepsake && (
                      <div className="mt-4 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#8C3D1E] text-xs font-medium flex items-center gap-2">
                        <Music className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                        <span>Voice Note Attached • Scannable Soundwave</span>
                      </div>
                    )}
                  </div>
                ) : currentSpread.leftPhoto?.url ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center">
                    <img
                      src={currentSpread.leftPhoto.url}
                      alt="Left Page"
                      className="w-full h-full object-cover"
                    />
                    {currentSpread.leftPhoto.caption && (
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white p-2 rounded text-[11px]">
                        {currentSpread.leftPhoto.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-stone-400 border-2 border-dashed border-stone-200 rounded-xl">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Left Page Blank • Click to add content</span>
                  </div>
                )}

                {/* Left Page Number & Footer */}
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-2 shrink-0">
                  <span>{currentSpread.pageNumberLeft || activeSpreadIndex * 2 - 1}</span>
                  <span className="truncate max-w-[150px] uppercase tracking-wider">{project.title}</span>
                </div>

                {/* Page spine crease shadow right */}
                <div className="absolute top-0 right-0 w-6 h-full page-shadow-right pointer-events-none" />
              </div>

              {/* RIGHT PAGE */}
              <div className="w-1/2 h-full bg-[#FAF7F2] p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden">

                {/* Right Page Content according to Layout */}
                {currentSpread.layout === 'single-full' ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-100">
                    {currentSpread.rightPhoto?.url && (
                      <img
                        src={currentSpread.rightPhoto.url}
                        alt="Right Page Full Bleed"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : currentSpread.layout === 'three-grid' || currentSpread.layout === 'four-grid' ? (
                  <div className="grid grid-cols-2 gap-2 w-full h-full">
                    {currentSpread.rightPhoto?.url && (
                      <div className="rounded overflow-hidden bg-stone-100">
                        <img src={currentSpread.rightPhoto.url} alt="Grid 1" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {currentSpread.extraPhotos?.[0]?.url && (
                      <div className="rounded overflow-hidden bg-stone-100">
                        <img src={currentSpread.extraPhotos[0].url} alt="Grid 2" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {currentSpread.extraPhotos?.[1]?.url && (
                      <div className="col-span-2 rounded overflow-hidden bg-stone-100 h-28">
                        <img src={currentSpread.extraPhotos[1].url} alt="Grid 3" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ) : currentSpread.rightPhoto?.url ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={currentSpread.rightPhoto.url}
                      alt="Right Page Photo"
                      className="w-full h-full object-cover"
                    />
                    {currentSpread.rightPhoto.caption && (
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white p-2 rounded text-[11px]">
                        {currentSpread.rightPhoto.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-stone-400 border-2 border-dashed border-stone-200 rounded-xl">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Right Page Blank • Click to customize</span>
                  </div>
                )}

                {/* Right Page Number & Footer */}
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-2 shrink-0">
                  <span className="truncate max-w-[150px] uppercase tracking-wider">{currentSpread.title || 'Moments'}</span>
                  <span>{currentSpread.pageNumberRight || activeSpreadIndex * 2}</span>
                </div>

                {/* Page spine crease shadow left */}
                <div className="absolute top-0 left-0 w-6 h-full page-shadow-left pointer-events-none" />
              </div>

              {/* Central Spine Fold / Gutter Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full book-spine-crease pointer-events-none opacity-80" />

              {/* Hover overlay hint */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1.5 shadow-md">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Click to adjust layout & text</span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Bottom Spread Carousel / Filmstrip */}
      <div className="mt-4 max-w-5xl mx-auto w-full space-y-2">

        <div className="flex items-center justify-between px-2 text-xs text-stone-500">
          <span>Swipe or click arrows to turn pages</span>
          <button
            onClick={onOpenPrintCheck}
            className="flex items-center gap-1 text-[#8C3D1E] hover:text-[#C25E36] font-semibold underline underline-offset-2"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Print check</span>
          </button>
        </div>

        {/* Filmstrip thumbnail strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 no-scrollbar">
          {project.spreads.map((spread, idx) => {
            const isActive = idx === activeSpreadIndex;
            const thumbImg = spread.layout === 'cover'
              ? spread.rightPhoto?.url
              : spread.leftPhoto?.url || spread.rightPhoto?.url;

            return (
              <button
                key={spread.id}
                onClick={() => {
                  sounds.playPageFlip();
                  onSelectSpread(idx);
                }}
                className={`relative shrink-0 rounded-lg overflow-hidden transition-all text-center group ${idx === 0 ? 'w-14 h-14' : 'w-20 h-14'
                  } ${isActive
                    ? 'ring-2 ring-[#C25E36] shadow-md scale-105 bg-white'
                    : 'opacity-70 hover:opacity-100 bg-stone-200'
                  }`}
              >
                {thumbImg ? (
                  <img src={thumbImg} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 text-[10px] text-stone-400 font-serif">
                    {idx === 0 ? 'Cover' : `${idx * 2 - 1}-${idx * 2}`}
                  </div>
                )}

                {/* Badge Number */}
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono">
                  {idx === 0 ? 'C' : idx}
                </div>
              </button>
            );
          })}

          {/* Add Spread Button */}
          <button
            onClick={() => {
              sounds.playPageFlip();
              onAddSpread();
            }}
            title="Add a new spread"
            className="shrink-0 w-16 h-14 rounded-lg border-2 border-dashed border-stone-300 hover:border-[#C25E36] hover:bg-[#FAF3E8] flex flex-col items-center justify-center text-stone-400 hover:text-[#C25E36] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">+ Spread</span>
          </button>
        </div>

      </div>

    </div>
  );
};

