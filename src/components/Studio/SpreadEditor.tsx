import React, { useState } from 'react';
import { 
  X, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  Mic, 
  Sparkles, 
  Check, 
  MessageSquare,
  RefreshCw,
  Sliders,
  Copy
} from 'lucide-react';
import { PhotoItem, SpreadLayoutType, SpreadPage } from '../../types/photobook';
import { sounds } from '../../utils/audioHelper';

interface SpreadEditorProps {
  isOpen: boolean;
  spread: SpreadPage;
  availablePhotos: PhotoItem[];
  onClose: () => void;
  onUpdateSpread: (updated: SpreadPage) => void;
  onDeleteSpread: (id: string) => void;
  onDuplicateSpread: (spread: SpreadPage) => void;
}

export const SpreadEditor: React.FC<SpreadEditorProps> = ({
  isOpen,
  spread,
  availablePhotos,
  onClose,
  onUpdateSpread,
  onDeleteSpread,
  onDuplicateSpread,
}) => {
  const [activeTab, setActiveTab] = useState<'layout' | 'text' | 'photos' | 'audio' | 'comments'>('layout');
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleLayoutChange = (layout: SpreadLayoutType) => {
    sounds.playPageFlip();
    onUpdateSpread({ ...spread, layout });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comments = spread.comments || [];
    onUpdateSpread({
      ...spread,
      comments: [
        ...comments,
        {
          id: `comment-${Date.now()}`,
          author: 'Celebrant / Client',
          text: newComment.trim(),
          date: 'Just now',
        },
      ],
    });
    setNewComment('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white border-l border-[#DFD6C3] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#C25E36]">Spread Customizer</span>
          <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">
            {spread.layout === 'cover' ? 'Front Cover Editor' : `Spread Settings`}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50 px-2 sm:px-4 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('layout')}
          className={`py-3 px-2.5 sm:px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'layout'
              ? 'border-[#C25E36] text-[#C25E36]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Layout</span>
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'text'
              ? 'border-[#C25E36] text-[#C25E36]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Text & Vows</span>
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'photos'
              ? 'border-[#C25E36] text-[#C25E36]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Photos</span>
        </button>
        <button
          onClick={() => setActiveTab('audio')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'audio'
              ? 'border-[#C25E36] text-[#C25E36]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Voice QR</span>
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'comments'
              ? 'border-[#C25E36] text-[#C25E36]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Notes {spread.comments?.length ? `(${spread.comments.length})` : ''}</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* LAYOUT TAB */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Select Spread Layout Template
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'single-full', label: 'Single Full Bleed', desc: 'Dramatic hero photo spanning right page' },
                { id: 'split-two', label: 'Split Two Photos', desc: 'Classic paired left & right portraits' },
                { id: 'three-grid', label: '3-Photo Storyboard', desc: 'Hero photo plus dual candid thumbnails' },
                { id: 'four-grid', label: '4-Photo Party Grid', desc: 'Dynamic grid for reception and dancing' },
                { id: 'story-quote', label: 'Vows & Quote Dedication', desc: 'Editorial typography with vows or toast' },
              ].map((template) => {
                const isSelected = spread.layout === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => handleLayoutChange(template.id as SpreadLayoutType)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C25E36] bg-[#FAF3E8] shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-xs text-[#1F1D1A]">{template.label}</p>
                      <p className="text-[10px] text-stone-500 mt-1">{template.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="self-end mt-2 text-[#C25E36]">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TEXT & VOWS TAB */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Spread Title</label>
              <input
                type="text"
                value={spread.title || ''}
                onChange={(e) => onUpdateSpread({ ...spread, title: e.target.value })}
                placeholder="e.g. THE VOWS, GRAND ENTRANCE, AFTERPARTY"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-serif focus:outline-none focus:border-[#C25E36]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Subtitle / Moment Context</label>
              <input
                type="text"
                value={spread.subtitle || ''}
                onChange={(e) => onUpdateSpread({ ...spread, subtitle: e.target.value })}
                placeholder="e.g. In the presence of God and our families"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#C25E36]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Dedication Quote / Couple Vows / Toast Message
              </label>
              <textarea
                rows={4}
                value={spread.quote || ''}
                onChange={(e) => onUpdateSpread({ ...spread, quote: e.target.value })}
                placeholder="Enter personal vows, emotional toast, or scripture quote to be printed beautifully..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-serif italic focus:outline-none focus:border-[#C25E36]"
              />
            </div>
          </div>
        )}

        {/* PHOTOS TAB */}
        {activeTab === 'photos' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Assigned Photos
            </h4>

            {/* Left Photo */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-700 block mb-2">Left Page Image</span>
              {spread.leftPhoto ? (
                <div className="flex items-center gap-3">
                  <img src={spread.leftPhoto.url} alt="Left" className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-stone-800 truncate">{spread.leftPhoto.caption || 'Photo'}</p>
                    <button
                      onClick={() => onUpdateSpread({ ...spread, leftPhoto: undefined })}
                      className="text-[11px] text-rose-600 hover:underline mt-1"
                    >
                      Remove photo
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic">No image on left page</p>
              )}
            </div>

            {/* Right Photo */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-700 block mb-2">Right Page Image</span>
              {spread.rightPhoto ? (
                <div className="flex items-center gap-3">
                  <img src={spread.rightPhoto.url} alt="Right" className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-stone-800 truncate">{spread.rightPhoto.caption || 'Photo'}</p>
                    <button
                      onClick={() => onUpdateSpread({ ...spread, rightPhoto: undefined })}
                      className="text-[11px] text-rose-600 hover:underline mt-1"
                    >
                      Remove photo
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic">No image on right page</p>
              )}
            </div>

            {/* Quick swap button */}
            {spread.leftPhoto && spread.rightPhoto && (
              <button
                onClick={() => {
                  sounds.playPageFlip();
                  onUpdateSpread({
                    ...spread,
                    leftPhoto: spread.rightPhoto,
                    rightPhoto: spread.leftPhoto,
                  });
                }}
                className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Swap Left and Right Photos</span>
              </button>
            )}

            {/* Pick from library */}
            <div>
              <span className="text-xs font-semibold text-stone-700 block mb-2">
                Click any photo to place on Right Page:
              </span>
              <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                {availablePhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => {
                      sounds.playShutter();
                      onUpdateSpread({ ...spread, rightPhoto: photo });
                    }}
                    className="aspect-square rounded overflow-hidden border border-stone-200 hover:ring-2 hover:ring-[#C25E36] transition-all"
                  >
                    <img src={photo.url} alt="lib" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* AUDIO VOICE QR TAB */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900">
                <Mic className="w-4 h-4 text-[#C25E36]" />
                <h4 className="font-semibold text-xs">Audio Voice Keepsake Feature</h4>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                When enabled, a scannable Spotify-style Soundwave & QR code is embedded discreetly in the page corner.
                Anyone viewing the physical book can scan it to listen to the original audio recording of the vows,
                pastor's blessing, or celebrant's speech!
              </p>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={!!spread.hasAudioKeepsake}
                  onChange={(e) => onUpdateSpread({ ...spread, hasAudioKeepsake: e.target.checked })}
                  className="rounded text-[#C25E36] focus:ring-[#C25E36] w-4 h-4"
                />
                <span className="text-xs font-bold text-stone-800">
                  Embed Audio Keepsake on this Spread
                </span>
              </label>

              {spread.hasAudioKeepsake && (
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Voice Note Label / Title
                  </label>
                  <input
                    type="text"
                    value={spread.audioLabel || 'Vows Recited at the Altar'}
                    onChange={(e) => onUpdateSpread({ ...spread, audioLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMMENTS / CLIENT REVIEW NOTES TAB */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Celebrant & Organizer Proofing Notes
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {spread.comments?.map((comment) => (
                <div key={comment.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex items-center justify-between font-semibold text-stone-800 mb-1">
                    <span>{comment.author}</span>
                    <span className="text-[10px] text-stone-400 font-normal">{comment.date}</span>
                  </div>
                  <p className="text-stone-600">{comment.text}</p>
                </div>
              ))}
              {(!spread.comments || spread.comments.length === 0) && (
                <p className="text-xs text-stone-400 italic">No notes left on this spread yet.</p>
              )}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave a comment (e.g. Please swap photo)..."
                className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#C25E36]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#C25E36] hover:bg-[#AA4D28] text-white rounded-xl text-xs font-semibold"
              >
                Post
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-2">
        <button
          onClick={() => onDuplicateSpread(spread)}
          className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate Spread</span>
        </button>

        {spread.layout !== 'cover' && (
          <button
            onClick={() => onDeleteSpread(spread.id)}
            className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Spread</span>
          </button>
        )}
      </div>

    </div>
  );
};

