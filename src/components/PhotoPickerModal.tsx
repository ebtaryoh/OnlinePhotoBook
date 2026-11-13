import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Camera, 
  Sparkles, 
  Check, 
  Trash2, 
  Star, 
  ArrowRight, 
  FolderPlus, 
  Clock, 
  Layers, 
  ShieldAlert,
  Plus
} from 'lucide-react';
import { PhotoItem } from '../types/photobook';
import { SAMPLE_WEDDING_PHOTOS } from '../data/sampleProjects';
import { sounds } from '../utils/audioHelper';

interface PhotoPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selectedPhotos: PhotoItem[]) => void;
  initialPhotos?: PhotoItem[];
}

export const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialPhotos = [],
}) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(
    initialPhotos.length > 0 ? initialPhotos : SAMPLE_WEDDING_PHOTOS.slice(0, 20)
  );
  const [sortOldestFirst, setSortOldestFirst] = useState(true);
  const [activeTab, setActiveTab] = useState<'upload' | 'samplePacks'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newItems: PhotoItem[] = files.map((file, idx) => ({
      id: `custom-upload-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      caption: file.name.replace(/\.[^/.]+$/, ''),
      timestamp: Date.now() + idx * 60000,
      resolutionQuality: file.size > 2 * 1024 * 1024 ? 'high' : 'medium',
      source: 'celebrant',
    }));

    sounds.playShutter();
    setPhotos((prev) => [...prev, ...newItems]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSetCover = (id: string) => {
    const target = photos.find((p) => p.id === id);
    if (!target) return;
    sounds.playPageFlip();
    setPhotos((prev) => [target, ...prev.filter((p) => p.id !== id)]);
  };

  const handleSortToggle = () => {
    setSortOldestFirst(!sortOldestFirst);
    sounds.playPageFlip();
    setPhotos((prev) => {
      const copy = [...prev];
      return copy.reverse();
    });
  };

  const handleLoadSamplePack = (type: 'wedding' | 'jubilee' | 'graduation') => {
    sounds.playShutter();
    if (type === 'wedding') {
      setPhotos(SAMPLE_WEDDING_PHOTOS.slice(0, 20));
    } else if (type === 'jubilee') {
      setPhotos([
        {
          id: 'jub-1',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          caption: 'Chief Adeleke 60th Birthday Celebration Portrait',
          resolutionQuality: 'high',
          timestamp: 1730000000000,
        },
        {
          id: 'jub-2',
          url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
          caption: 'Family Tributes & Champagne Toast',
          resolutionQuality: 'high',
          timestamp: 1730003600000,
        },
        {
          id: 'jub-3',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
          caption: 'Joyous dancing and celebratory band',
          resolutionQuality: 'high',
          timestamp: 1730007200000,
        },
        ...SAMPLE_WEDDING_PHOTOS.slice(3, 16),
      ]);
    } else {
      setPhotos([
        {
          id: 'grad-1',
          url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
          caption: 'Dr. Amina: Medical School Convocation Day',
          resolutionQuality: 'high',
          timestamp: 1730100000000,
        },
        ...SAMPLE_WEDDING_PHOTOS.slice(4, 18),
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full border border-[#DFD6C3] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D5] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#C25E36]">Step 2 of 3</span>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-stone-500 font-medium">Curate & Sequence</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1F1D1A]">
              {photos.length} photos in. {photos.length >= 20 ? "That's a full book." : `${20 - photos.length} more recommended.`}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions & Tools Bar */}
        <div className="px-6 py-3.5 bg-[#F4EFE6] border-b border-[#DFD6C3] flex flex-wrap items-center justify-between gap-3 text-xs text-[#595246] shrink-0">
          <p className="max-w-md leading-relaxed">
            Drag or tap <Star className="w-3.5 h-3.5 inline text-amber-500 fill-amber-500 -mt-0.5" /> to set your front cover photo.
            The book will layout chronologically to tell your event story forward.
          </p>

          <div className="flex items-center gap-2">
            {/* Sort Toggle */}
            <button
              onClick={handleSortToggle}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                sortOldestFirst
                  ? 'bg-white border-[#C25E36] text-[#C25E36] shadow-sm'
                  : 'bg-[#EAE4D7] border-stone-300 text-stone-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{sortOldestFirst ? '✓ Oldest first' : 'Newest first'}</span>
            </button>

            {/* Quick Demo Pack dropdown */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-stone-200">
              <button
                onClick={() => handleLoadSamplePack('wedding')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full hover:bg-[#FAF7F2] text-[#1F1D1A]"
              >
                Wedding
              </button>
              <button
                onClick={() => handleLoadSamplePack('jubilee')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full hover:bg-[#FAF7F2] text-[#1F1D1A]"
              >
                Birthday
              </button>
              <button
                onClick={() => handleLoadSamplePack('graduation')}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full hover:bg-[#FAF7F2] text-[#1F1D1A]"
              >
                Graduation
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Upload Dropzone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#D4C9B5] hover:border-[#C25E36] bg-white hover:bg-[#FDFBF7] rounded-2xl p-6 text-center cursor-pointer transition-all group"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E8] group-hover:bg-[#F4E3D1] text-[#C25E36] flex items-center justify-center transition-colors">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1F1D1A]">
                  Click to add photos or drag & drop from your phone / computer
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Supports High-Res JPG, PNG, HEIC from iPhone, Android & Pro Cameras
                </p>
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-[#1F1D1A] flex items-center gap-2">
                <span>Selected Photos ({photos.length})</span>
                {photos.length < 10 && (
                  <span className="text-amber-600 text-xs font-normal flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Add at least 10 photos for a balanced book
                  </span>
                )}
              </h3>
              <button
                onClick={() => setPhotos([])}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {photos.map((photo, idx) => {
                const isCover = idx === 0;
                return (
                  <div
                    key={photo.id}
                    className={`relative group rounded-xl overflow-hidden aspect-square bg-stone-200 border-2 transition-all ${
                      isCover ? 'border-[#C25E36] shadow-md ring-2 ring-[#C25E36]/30' : 'border-transparent hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || `Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2" />

                    {/* Order / Cover Indicator */}
                    <div className="absolute top-2 left-2 z-10">
                      {isCover ? (
                        <div className="bg-[#C25E36] text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 shadow">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Cover</span>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-black/60 text-white text-[10px] font-bold flex items-center justify-center backdrop-blur">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    {/* Action buttons on hover */}
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                      {!isCover && (
                        <button
                          onClick={() => handleSetCover(photo.id)}
                          title="Make Front Cover"
                          className="w-6 h-6 rounded-full bg-black/60 text-amber-300 hover:text-amber-100 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        title="Remove photo"
                        className="w-6 h-6 rounded-full bg-black/60 text-rose-300 hover:text-rose-100 hover:bg-rose-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Resolution indicator */}
                    <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/60 text-stone-200">
                        {photo.resolutionQuality} res
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Action & Next */}
        <div className="px-6 py-4 bg-white border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-[#C25E36] flex items-center justify-center font-serif font-bold text-[#C25E36] text-base bg-[#FBF7F2]">
              {photos.length}
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#1F1D1A]">
                Ready when you are
              </p>
              <p className="text-xs text-stone-500">
                {photos.length} photos selected — creating an elegant, balanced album
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add more photos</span>
            </button>

            <button
              disabled={photos.length === 0}
              onClick={() => {
                sounds.playCelebrationChime();
                onComplete(photos);
              }}
              className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-[#C25E36] hover:bg-[#AA4D28] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Lay out my book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

