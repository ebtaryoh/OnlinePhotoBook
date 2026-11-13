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
  MessageSquare,
  Smartphone
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
  
  // Touch swipe state for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

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

  // Touch Swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Detect horizontal swipe if delta X is significantly larger than delta Y
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> flip forward
      } else {
        handlePrev(); // Swiped right -> flip backward
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div className={`relative flex flex-col justify-between flex-1 transition-all ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-[#161514] p-2 sm:p-6' 
        : 'p-2 sm:p-4 lg:p-6 bg-[#FAF7F2]'
    }`}>
      
      {/* Top Context Bar */}
      <div className="flex items-center justify-between text-xs text-stone-600 mb-2 max-w-5xl mx-auto w-full px-1 sm:px-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-serif font-bold text-xs sm:text-sm text-[#1F1D1A]">
            {isCover ? 'Front Cover' : `Spread ${activeSpreadIndex} of ${project.spreads.length - 1}`}
          </span>
          <span className="text-stone-300">•</span>
          <span className="capitalize text-stone-500 font-medium text-[11px] sm:text-xs truncate max-w-[120px] sm:max-w-none">
            {project.coverFinish.replace('-', ' ')} • {project.bookSize}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick theme trigger */}
          <button
            onClick={onOpenMoodModal}
            className="px-2 py-1 sm:px-2.5 rounded-lg bg-white border border-[#DFD6C3] hover:bg-[#F2ECE0] text-stone-700 font-medium flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
            <span className="text-[10px] sm:text-[11px] font-semibold">{theme.name}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white border border-[#DFD6C3] text-stone-600 hover:text-stone-900 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main 3D Book Stage with Touch Gesture Handlers */}
      <div 
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[440px] lg:min-h-[520px] w-full max-w-5xl mx-auto perspective-1000 px-1 select-none"
      >
        
        {/* Left Arrow Button */}
        <button
          disabled={activeSpreadIndex === 0}
          onClick={handlePrev}
          title="Previous Spread"
          className="absolute left-0.5 sm:left-2 lg:left-4 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 sm:bg-white text-stone-800 shadow-lg border border-[#DFD5C2] flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          disabled={activeSpreadIndex === project.spreads.length - 1}
          onClick={handleNext}
          title="Next Spread"
          className="absolute right-0.5 sm:right-2 lg:right-4 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 sm:bg-white text-stone-800 shadow-lg border border-[#DFD5C2] flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D Spread Container */}
        <div className={`relative transition-all duration-300 transform ${
          isFlipping ? (flipDirection === 'next' ? 'scale-[0.98] -rotate-1' : 'scale-[0.98] rotate-1') : 'scale-100 rotate-0'
        } ${isCover ? 'w-full max-w-xs sm:max-w-md aspect-square' : 'w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9]'}`}>
          
          {/* External Book Drop Shadow */}
          <div className="absolute inset-0 book-shadow rounded-xl sm:rounded-2xl pointer-events-none -z-10" />

          {/* COVER SPREAD (Spread 0) */}
          {isCover ? (
            <div 
              onClick={onOpenSpreadEditor}
              className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-[#DFD5C2] shadow-2xl flex flex-col justify-between cursor-pointer group"
            >
              {/* Finished wrap texture */}
              {project.coverFinish === 'linen' && (
                <div className="absolute inset-0 bg-[#3B2C24]/90 mix-blend-multiply opacity-20 pointer-events-none" />
              )}
              {project.coverFinish === 'leatherette' && (
                <div className="absolute inset-0 bg-[#2B1E16]/80 mix-blend-color-burn opacity-30 pointer-events-none" />
              )}
              {project.coverFinish === 'acrylic' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20 pointer-events-none border-2 sm:border-4 border-white/50" />
              )}

              {/* Cover Image */}
              <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-8 lg:p-10 text-white">
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
                  <span className={`text-[9px] sm:text-[11px] uppercase tracking-widest px-2.5 py-0.5 sm:py-1 rounded-full font-bold backdrop-blur-md ${
                    project.foilColor === 'gold' ? 'text-amber-200 bg-amber-950/40 border border-amber-400/40' : 'text-stone-200 bg-black/40 border border-white/20'
                  }`}>
                    {project.coverFinish.toUpperCase()} • {project.foilColor.toUpperCase()} FOIL
                  </span>
                  
                  <span className="text-[10px] text-stone-200 bg-black/40 backdrop-blur px-2 py-0.5 rounded opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#C25E36]" />
                    <span>Edit</span>
                  </span>
                </div>

                {/* Bottom Title & Event Details */}
                <div className="relative z-10 space-y-1 sm:space-y-2">
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-amber-200 font-semibold truncate">
                    {project.celebrantNames || 'Celebration Keepsake'}
                  </p>
                  <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
                    {currentSpread.title || project.title}
                  </h2>
                  <p className="text-[11px] sm:text-sm text-stone-200 font-light max-w-sm drop-shadow truncate">
                    {currentSpread.subtitle || project.subtitle}
                  </p>
                </div>

                {/* Realistic left spine shadow */}
                <div className="absolute top-0 left-0 w-4 sm:w-6 h-full bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          ) : (
            // INSIDE TWO-PAGE SPREAD (Spreads 1 to N)
            <div 
              onClick={onOpenSpreadEditor}
              className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-white border border-[#DFD6C3] shadow-2xl flex cursor-pointer group"
            >
              
              {/* LEFT PAGE */}
              <div className="w-1/2 h-full bg-[#FAF7F2] p-2 sm:p-5 lg:p-7 flex flex-col justify-between relative border-r border-[#E0D7C5] overflow-hidden">
                
                {/* Left Page Content according to Layout */}
                {currentSpread.layout === 'story-quote' ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-1 sm:p-4 space-y-2 sm:space-y-3">
                    <span className="text-[8px] sm:text-[10px] tracking-widest uppercase font-bold text-[#A67C52]">
                      {currentSpread.title || 'THE WORDS'}
                    </span>
                    <blockquote className="font-serif italic text-xs sm:text-base lg:text-xl text-[#2B2620] leading-snug sm:leading-relaxed max-w-md line-clamp-4 sm:line-clamp-none">
                      {currentSpread.quote || '"In love and celebration, we write our family history."'}
                    </blockquote>
                    {currentSpread.hasAudioKeepsake && (
                      <div className="mt-1 sm:mt-3 px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8C3D1E] text-[9px] sm:text-xs font-medium flex items-center gap-1.5">
                        <Music className="w-3 h-3 text-amber-600 animate-bounce shrink-0" />
                        <span className="truncate">Voice Note Attached</span>
                      </div>
                    )}
                  </div>
                ) : currentSpread.leftPhoto?.url ? (
                  <div className="relative w-full h-full rounded sm:rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center">
                    <img
                      src={currentSpread.leftPhoto.url}
                      alt="Left Page"
                      className="w-full h-full object-cover"
                    />
                    {currentSpread.leftPhoto.caption && (
                      <div className="hidden sm:block absolute bottom-1.5 left-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded text-[10px] truncate">
                        {currentSpread.leftPhoto.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-2 text-stone-400 border border-dashed border-stone-200 rounded-lg">
                    <ImageIcon className="w-5 h-5 sm:w-8 sm:h-8 mb-1 opacity-50" />
                    <span className="text-[9px] sm:text-xs">Left Page Blank</span>
                  </div>
                )}

                {/* Left Page Number & Footer */}
                <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-stone-400 pt-1 shrink-0">
                  <span>{currentSpread.pageNumberLeft || activeSpreadIndex * 2 - 1}</span>
                  <span className="truncate max-w-[80px] sm:max-w-[150px] uppercase tracking-wider">{project.title}</span>
                </div>

                {/* Page spine crease shadow right */}
                <div className="absolute top-0 right-0 w-3 sm:w-6 h-full page-shadow-right pointer-events-none" />
              </div>

              {/* RIGHT PAGE */}
              <div className="w-1/2 h-full bg-[#FAF7F2] p-2 sm:p-5 lg:p-7 flex flex-col justify-between relative overflow-hidden">
                
                {/* Right Page Content according to Layout */}
                {currentSpread.layout === 'single-full' ? (
                  <div className="relative w-full h-full rounded sm:rounded-lg overflow-hidden bg-stone-100">
                    {currentSpread.rightPhoto?.url && (
                      <img
                        src={currentSpread.rightPhoto.url}
                        alt="Right Page Full Bleed"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : currentSpread.layout === 'three-grid' || currentSpread.layout === 'four-grid' ? (
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 w-full h-full">
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
                      <div className="col-span-2 rounded overflow-hidden bg-stone-100 h-14 sm:h-28">
                        <img src={currentSpread.extraPhotos[1].url} alt="Grid 3" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ) : currentSpread.rightPhoto?.url ? (
                  <div className="relative w-full h-full rounded sm:rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={currentSpread.rightPhoto.url}
                      alt="Right Page Photo"
                      className="w-full h-full object-cover"
                    />
                    {currentSpread.rightPhoto.caption && (
                      <div className="hidden sm:block absolute bottom-1.5 left-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded text-[10px] truncate">
                        {currentSpread.rightPhoto.caption}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-2 text-stone-400 border border-dashed border-stone-200 rounded-lg">
                    <ImageIcon className="w-5 h-5 sm:w-8 sm:h-8 mb-1 opacity-50" />
                    <span className="text-[9px] sm:text-xs">Right Page Blank</span>
                  </div>
                )}

                {/* Right Page Number & Footer */}
                <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-stone-400 pt-1 shrink-0">
                  <span className="truncate max-w-[80px] sm:max-w-[150px] uppercase tracking-wider">{currentSpread.title || 'Moments'}</span>
                  <span>{currentSpread.pageNumberRight || activeSpreadIndex * 2}</span>
                </div>

                {/* Page spine crease shadow left */}
                <div className="absolute top-0 left-0 w-3 sm:w-6 h-full page-shadow-left pointer-events-none" />
              </div>

              {/* Central Spine Fold / Gutter Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 sm:w-6 h-full book-spine-crease pointer-events-none opacity-80" />

              {/* Hover overlay hint */}
              <div className="hidden sm:flex absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-xs items-center gap-1.5 shadow-md">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Adjust layout & text</span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Bottom Spread Carousel / Filmstrip */}
      <div className="mt-2 sm:mt-4 max-w-5xl mx-auto w-full space-y-1 sm:space-y-2">
        
        <div className="flex items-center justify-between px-1 text-[11px] sm:text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-[#C25E36] sm:hidden" />
            <span>Swipe or click arrows to turn</span>
          </span>
          <button
            onClick={onOpenPrintCheck}
            className="flex items-center gap-1 text-[#8C3D1E] hover:text-[#C25E36] font-semibold underline underline-offset-2"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Print check</span>
          </button>
        </div>

        {/* Filmstrip thumbnail strip */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 sm:py-2 px-1 no-scrollbar">
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
                className={`relative shrink-0 rounded-md sm:rounded-lg overflow-hidden transition-all text-center group ${
                  idx === 0 ? 'w-11 h-11 sm:w-14 sm:h-14' : 'w-16 h-11 sm:w-20 sm:h-14'
                } ${
                  isActive
                    ? 'ring-2 ring-[#C25E36] shadow-md scale-105 bg-white'
                    : 'opacity-70 hover:opacity-100 bg-stone-200'
                }`}
              >
                {thumbImg ? (
                  <img src={thumbImg} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 text-[9px] text-stone-400 font-serif">
                    {idx === 0 ? 'Cover' : `${idx * 2 - 1}-${idx * 2}`}
                  </div>
                )}

                {/* Badge Number */}
                <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 bg-black/70 text-white text-[8px] sm:text-[9px] px-1 rounded font-mono">
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
            className="shrink-0 w-12 h-11 sm:w-16 sm:h-14 rounded-md sm:rounded-lg border-2 border-dashed border-stone-300 hover:border-[#C25E36] hover:bg-[#FAF3E8] flex flex-col items-center justify-center text-stone-400 hover:text-[#C25E36] transition-colors"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[8px] sm:text-[9px] font-semibold mt-0.5">+ Spread</span>
          </button>
        </div>

      </div>

    </div>
  );
};
