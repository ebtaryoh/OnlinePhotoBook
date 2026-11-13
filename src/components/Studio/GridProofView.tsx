import React from 'react';
import { Plus, ArrowLeft, ArrowRight, Trash2, Sliders, BookOpen, Layers } from 'lucide-react';
import { PhotobookProject, SpreadPage } from '../../types/photobook';
import { sounds } from '../../utils/audioHelper';

interface GridProofViewProps {
  project: PhotobookProject;
  activeSpreadIndex: number;
  onSelectSpread: (index: number) => void;
  onAddSpread: () => void;
  onDeleteSpread: (id: string) => void;
  onMoveSpread: (fromIndex: number, toIndex: number) => void;
  onSwitchToFlip: () => void;
}

export const GridProofView: React.FC<GridProofViewProps> = ({
  project,
  activeSpreadIndex,
  onSelectSpread,
  onAddSpread,
  onDeleteSpread,
  onMoveSpread,
  onSwitchToFlip,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="bg-white p-6 rounded-2xl border border-[#DFD6C3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] text-[#C25E36] flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#1F1D1A]">
                Full Book Overview ({project.spreads.length} Spreads • {project.spreads.length * 2} Pages)
              </h2>
              <p className="text-xs text-stone-500">
                Click any spread to view in 3D flipbook mode or re-order pages to fine-tune your storytelling.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playPageFlip();
                onAddSpread();
              }}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4 text-[#C25E36]" />
              <span>Add Spread</span>
            </button>

            <button
              onClick={() => {
                sounds.playPageFlip();
                onSwitchToFlip();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#C25E36] hover:bg-[#AA4D28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to 3D View</span>
            </button>
          </div>
        </div>

        {/* Spreads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.spreads.map((spread, idx) => {
            const isCover = idx === 0;
            const isCurrent = idx === activeSpreadIndex;
            const leftImg = spread.leftPhoto?.url;
            const rightImg = spread.rightPhoto?.url;

            return (
              <div
                key={spread.id}
                className={`group bg-white rounded-2xl p-4 border-2 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                  isCurrent ? 'border-[#C25E36] ring-2 ring-[#C25E36]/20' : 'border-[#E8E2D5] hover:border-stone-400'
                }`}
              >
                {/* Header label & controls */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5">
                  <span className="font-serif font-bold text-sm text-[#1F1D1A]">
                    {isCover ? 'Front Cover' : `Spread ${idx} (P. ${idx * 2 - 1}-${idx * 2})`}
                  </span>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    {!isCover && idx > 1 && (
                      <button
                        onClick={() => {
                          sounds.playPageFlip();
                          onMoveSpread(idx, idx - 1);
                        }}
                        title="Move Earlier"
                        className="p-1 hover:bg-stone-100 rounded text-stone-600"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {!isCover && idx < project.spreads.length - 1 && (
                      <button
                        onClick={() => {
                          sounds.playPageFlip();
                          onMoveSpread(idx, idx + 1);
                        }}
                        title="Move Later"
                        className="p-1 hover:bg-stone-100 rounded text-stone-600"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {!isCover && (
                      <button
                        onClick={() => onDeleteSpread(spread.id)}
                        title="Delete Spread"
                        className="p-1 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Miniature Spread Preview */}
                <div 
                  onClick={() => {
                    sounds.playPageFlip();
                    onSelectSpread(idx);
                    onSwitchToFlip();
                  }}
                  className="relative aspect-[16/10] bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#DFD6C3] cursor-pointer flex shadow-inner group-hover:scale-[1.01] transition-transform"
                >
                  {isCover ? (
                    <div className="relative w-full h-full">
                      {rightImg ? (
                        <img src={rightImg} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-stone-800" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-end text-white">
                        <p className="font-serif font-bold text-sm truncate">{spread.title || project.title}</p>
                        <p className="text-[10px] text-stone-300 truncate">{spread.subtitle || project.subtitle}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Left half */}
                      <div className="w-1/2 h-full border-r border-[#E8E2D5] p-2 flex flex-col justify-between bg-white relative">
                        {spread.layout === 'story-quote' ? (
                          <div className="p-1 text-center my-auto">
                            <p className="font-serif italic text-[10px] text-stone-700 line-clamp-3">
                              {spread.quote || 'Vows and dedications'}
                            </p>
                          </div>
                        ) : leftImg ? (
                          <img src={leftImg} alt="Left" className="w-full h-full object-cover rounded" />
                        ) : (
                          <div className="w-full h-full bg-stone-100 rounded flex items-center justify-center text-[10px] text-stone-400">
                            Blank
                          </div>
                        )}
                        <span className="text-[8px] text-stone-400">{idx * 2 - 1}</span>
                      </div>

                      {/* Right half */}
                      <div className="w-1/2 h-full p-2 flex flex-col justify-between bg-white relative">
                        {rightImg ? (
                          <img src={rightImg} alt="Right" className="w-full h-full object-cover rounded" />
                        ) : (
                          <div className="w-full h-full bg-stone-100 rounded flex items-center justify-center text-[10px] text-stone-400">
                            Blank
                          </div>
                        )}
                        <span className="text-[8px] text-stone-400 text-right">{idx * 2}</span>
                      </div>

                      {/* Center spine */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full book-spine-crease pointer-events-none" />
                    </>
                  )}
                </div>

                {/* Subtitle / tag info */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="capitalize">{spread.layout.replace('-', ' ')}</span>
                  <button
                    onClick={() => {
                      sounds.playPageFlip();
                      onSelectSpread(idx);
                      onSwitchToFlip();
                    }}
                    className="text-[#C25E36] font-semibold hover:underline"
                  >
                    Open in 3D →
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

