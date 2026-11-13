import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audioHelper';

interface LayoutLoadingModalProps {
  isOpen: boolean;
  photoCount: number;
  samplePhotos: string[];
  onFinished: () => void;
}

export const LayoutLoadingModal: React.FC<LayoutLoadingModalProps> = ({
  isOpen,
  photoCount,
  samplePhotos,
  onFinished,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(1);
  const [statusText, setStatusText] = useState('Analyzing timeline & timestamps...');

  useEffect(() => {
    if (!isOpen) {
      setCurrentPhotoIndex(1);
      return;
    }

    // Play subtle tactile sounds during assembly
    sounds.playPageFlip();

    const steps = [
      'Sorting photos chronologically...',
      'Pairing vows and ceremony portraits...',
      'Calculating two-page panoramic spreads...',
      'Arranging reception and afterparty grids...',
      'Balancing color harmonies & margins...',
      'Binding 3D interactive virtual proof...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => {
        if (prev >= photoCount) {
          clearInterval(interval);
          setTimeout(() => {
            sounds.playCelebrationChime();
            onFinished();
          }, 600);
          return photoCount;
        }
        // Change status text periodically
        if (prev % Math.ceil(photoCount / steps.length) === 0 && currentStep < steps.length - 1) {
          currentStep++;
          setStatusText(steps[currentStep]);
          sounds.playPageFlip();
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isOpen, photoCount, onFinished]);

  if (!isOpen) return null;

  const currentPreviewImg = samplePhotos[currentPhotoIndex % samplePhotos.length] || samplePhotos[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        
        {/* Shuffling Deck of Photo Cards (Exactly like Printsakes in video) */}
        <div className="relative w-48 h-48 mb-8 perspective-1000 flex items-center justify-center">
          {/* Background card 1 */}
          <div className="absolute w-36 h-44 bg-white rounded-xl shadow-md border border-[#E8E2D5] -rotate-12 translate-y-2 opacity-60 overflow-hidden">
            <img 
              src={samplePhotos[1 % samplePhotos.length]} 
              alt="card 1" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Background card 2 */}
          <div className="absolute w-36 h-44 bg-white rounded-xl shadow-lg border border-[#E8E2D5] rotate-8 -translate-y-1 opacity-80 overflow-hidden">
            <img 
              src={samplePhotos[2 % samplePhotos.length]} 
              alt="card 2" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Foreground Active Card with shuffle keyframe */}
          <div className="relative w-40 h-48 bg-white rounded-2xl shadow-2xl border-2 border-[#DFD5C2] p-2 flex flex-col justify-between animate-card-shuffle overflow-hidden">
            <img
              src={currentPreviewImg}
              alt="Current Card"
              className="w-full h-36 object-cover rounded-xl"
            />
            <div className="flex items-center justify-between px-1 text-[10px] text-stone-500 font-medium">
              <span className="flex items-center gap-1 text-[#C25E36] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Story Layout</span>
              </span>
              <span>Photo #{currentPhotoIndex}</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-serif text-3xl font-bold text-[#1F1D1A] mb-2 tracking-tight">
          Creating something beautiful...
        </h3>

        {/* Progress Counter */}
        <p className="font-medium text-[#C25E36] text-sm mb-3">
          Photo {currentPhotoIndex} of {photoCount} is on the page
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-[#EAE4D7] rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#C25E36] to-[#E28059] rounded-full transition-all duration-150"
            style={{ width: `${(currentPhotoIndex / photoCount) * 100}%` }}
          />
        </div>

        {/* Substatus message */}
        <p className="text-xs text-stone-600 font-medium mb-1">
          {statusText}
        </p>

        {/* Reassurance from video */}
        <p className="text-[11px] text-stone-400 mt-2 max-w-xs">
          Stay with me a moment. Nothing is lost if your line drops.
        </p>

      </div>
    </div>
  );
};

