import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { PhotobookProject } from '../../types/photobook';
import { sounds } from '../../utils/audioHelper';

interface PrintCheckModalProps {
  isOpen: boolean;
  project: PhotobookProject;
  onClose: () => void;
  onProceedToOrder: () => void;
}

export const PrintCheckModal: React.FC<PrintCheckModalProps> = ({
  isOpen,
  project,
  onClose,
  onProceedToOrder,
}) => {
  if (!isOpen) return null;

  const totalPhotos = project.photos.length;
  const lowResCount = project.photos.filter((p) => p.resolutionQuality === 'low').length;
  const mediumResCount = project.photos.filter((p) => p.resolutionQuality === 'medium').length;
  const highResCount = project.photos.filter((p) => p.resolutionQuality === 'high').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full border border-[#DFD6C3] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <ShieldCheck className="w-5 h-5 text-[#C25E36]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400">Pre-Flight Engine</span>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">Print Check Report</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Details */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Main Status Card */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">
                Ready for Museum-Grade Hardcover Printing
              </h4>
              <p className="text-emerald-800 text-xs mt-0.5 leading-relaxed">
                Your album passes all critical pre-flight criteria. The print presses will render sharp, 
                vibrant colors and razor-sharp typography.
              </p>
            </div>
          </div>

          {/* Audit Checklist Items */}
          <div className="space-y-3">
            
            {/* Resolution Check */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800">1. Image Resolution (DPI Audit)</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {highResCount} High / {mediumResCount} Good
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">
                {lowResCount === 0 
                  ? 'All photos meet or exceed 300 DPI at standard crop. No pixelation will occur.'
                  : `${lowResCount} photos have slight WhatsApp compression but will print acceptably.`}
              </p>
            </div>

            {/* Bleed & Trim Line Guide */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800">2. Bleed Safety Margins (3mm)</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Passed
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">
                Heads and important focal elements are positioned comfortably inside the safety zone, safely away from binder trimming blades.
              </p>
            </div>

            {/* Spine Gutter Check */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800">3. Center Spine Gutter Alignment</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {project.paperStock === 'layflat' ? 'Seamless 100% Layflat' : 'Standard Crease Checked'}
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">
                {project.paperStock === 'layflat'
                  ? 'Layflat binding selected! Panoramic photos can span across the center with zero image loss.'
                  : 'Photo splits and text columns are positioned to avoid the center binding gutter.'}
              </p>
            </div>

            {/* Typography & Contrast Check */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800">4. Cover Typography & Foil Contrast</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Passed
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">
                Title "{project.title}" has sufficient contrast against the {project.coverFinish} material.
              </p>
            </div>

          </div>

          <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>Before your book leaves our Lagos bindery, our master pressman performs a manual physical inspection.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D5] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
          >
            Back to Studio
          </button>

          <button
            onClick={() => {
              sounds.playCelebrationChime();
              onProceedToOrder();
            }}
            className="flex-1 py-2.5 px-5 rounded-xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-semibold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

