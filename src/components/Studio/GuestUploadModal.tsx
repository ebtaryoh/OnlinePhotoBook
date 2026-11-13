import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Upload, 
  Check, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Download, 
  Printer, 
  Share2,
  Trash2,
  Clock,
  Heart
} from 'lucide-react';
import { PhotobookProject } from '../../types/photobook';
import { sounds } from '../../utils/audioHelper';

interface GuestUploadModalProps {
  isOpen: boolean;
  project: PhotobookProject;
  onClose: () => void;
  onApproveGuestPhoto: (id: string) => void;
  onDeclineGuestPhoto: (id: string) => void;
  onSimulateGuestUpload: (guestName: string, message: string, photoUrl: string) => void;
}

export const GuestUploadModal: React.FC<GuestUploadModalProps> = ({
  isOpen,
  project,
  onClose,
  onApproveGuestPhoto,
  onDeclineGuestPhoto,
  onSimulateGuestUpload,
}) => {
  const [activeTab, setActiveTab] = useState<'qrCard' | 'inbox' | 'simulateGuest'>('qrCard');
  
  // Simulation form states
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState(
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80'
  );
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const eventLink = `https://printsakes.com/event/${project.guestAccessCode.toLowerCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(eventLink);
    setCopiedLink(true);
    sounds.playCelebrationChime();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    onSimulateGuestUpload(
      guestName.trim(),
      guestMessage.trim() || 'Wishing you both eternal happiness and unshakeable joy!',
      selectedPresetImage
    );
    sounds.playCelebrationChime();
    setGuestName('');
    setGuestMessage('');
    setActiveTab('inbox');
  };

  const pendingContributions = project.guestContributions.filter((c) => !c.approved);
  const approvedContributions = project.guestContributions.filter((c) => c.approved);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full border border-[#DFD6C3] shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[92vh] overflow-hidden">
        
        {/* Mobile handle indicator */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700">Live Event Portal</span>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">Guest QR Code & Live Drop</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('qrCard')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'qrCard'
                ? 'border-[#C25E36] text-[#C25E36]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Tabletop QR Placard</span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'inbox'
                ? 'border-[#C25E36] text-[#C25E36]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>
              Guest Photo Inbox ({project.guestContributions.length})
              {pendingContributions.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-bold">
                  {pendingContributions.length} new
                </span>
              )}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('simulateGuest')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'simulateGuest'
                ? 'border-[#C25E36] text-[#C25E36]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Test Guest Upload View</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: QR TABLETOP PLACARD */}
          {activeTab === 'qrCard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl border border-[#DFD6C3] shadow-sm">
                
                {/* Visual Placard Graphic */}
                <div className="w-52 p-4 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4C8B2] shadow-md text-center flex flex-col items-center space-y-2 shrink-0">
                  <span className="text-[9px] tracking-widest uppercase font-bold text-[#C25E36]">
                    Capture The Moments
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#1F1D1A]">
                    {project.celebrantNames || project.title}
                  </h4>
                  
                  {/* Simulated High-Res QR Graphic */}
                  <div className="w-32 h-32 bg-white p-2 rounded-xl border border-stone-300 shadow-inner flex flex-col items-center justify-center">
                    <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-stone-900 rounded-lg">
                      {[...Array(36)].map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-xs ${
                            (i % 2 === 0 && i % 3 === 0) || i < 8 || i > 28
                              ? 'bg-white'
                              : 'bg-stone-900'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[9px] text-stone-600 font-medium">
                    Scan with your phone camera to drop your photos into our keepsake book!
                  </p>
                  <span className="text-[10px] font-mono font-bold text-[#C25E36] bg-[#FAF3E8] px-2 py-0.5 rounded">
                    Code: {project.guestAccessCode}
                  </span>
                </div>

                {/* Placard Information & Download */}
                <div className="space-y-3 flex-1 text-left">
                  <h4 className="font-serif font-bold text-base text-[#1F1D1A]">
                    Print Table Cards for Guests & Reception Tables
                  </h4>
                  <p className="text-stone-600 leading-relaxed text-xs">
                    Place these elegant cards on dining tables and cocktail bars. Guests simply aim their 
                    phone camera at the QR code — no app download required. Their candid shots and heartfelt 
                    blessings stream straight into your organizer inbox!
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#C25E36]" />
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Guest Link'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playShutter();
                        window.print();
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1F1D1A] hover:bg-black text-white font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Table Cards (PDF)</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: ORGANIZER INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-stone-800 text-xs">
                  Guest Submissions ({project.guestContributions.length})
                </h4>
                <span className="text-[11px] text-stone-500">
                  {approvedContributions.length} approved into book
                </span>
              </div>

              <div className="space-y-3">
                {project.guestContributions.map((contrib) => (
                  <div
                    key={contrib.id}
                    className="p-3.5 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={contrib.photoUrl}
                        alt="Guest"
                        className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{contrib.guestName}</span>
                          <span className="text-[10px] text-stone-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {contrib.uploadedAt}
                          </span>
                        </div>
                        <p className="text-stone-600 text-xs italic mt-0.5 max-w-md">
                          "{contrib.message}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {contrib.approved ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Approved in Album</span>
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              sounds.playCelebrationChime();
                              onApproveGuestPhoto(contrib.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#C25E36] hover:bg-[#AA4D28] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Add to Book</span>
                          </button>
                          <button
                            onClick={() => onDeclineGuestPhoto(contrib.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Decline"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SIMULATE GUEST UPLOAD VIEW */}
          {activeTab === 'simulateGuest' && (
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400">Guest Experience View</span>
                <h4 className="font-serif font-bold text-base text-[#1F1D1A]">
                  Upload a Candid Photo & Wish
                </h4>
                <p className="text-stone-500 text-xs mt-0.5">
                  This is exactly what your wedding or birthday guests see on their mobile phones when they scan your QR code.
                </p>
              </div>

              <form onSubmit={handleGuestSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Uncle Segun, Tobi & Chidinma (Table 3)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#C25E36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Blessing or Note to the Celebrants</label>
                  <textarea
                    rows={2}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Write a sweet memory, congratulations or blessing..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#C25E36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Pick a Photo to Submit</label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {[
                      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
                      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80',
                    ].map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="pick"
                        onClick={() => setSelectedPresetImage(img)}
                        className={`w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition-all shrink-0 ${
                          selectedPresetImage === img ? 'border-[#C25E36] ring-2 ring-[#C25E36]/30' : 'border-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#C25E36] hover:bg-[#AA4D28] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Send Photo to Celebrants' Book</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

