import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Check, 
  ShieldCheck, 
  MessageCircle, 
  Copy, 
  ExternalLink, 
  Lock, 
  Sparkles,
  Award
} from 'lucide-react';
import { PhotobookProject } from '../../types/photobook';
import { sounds } from '../../utils/audioHelper';

interface ClientProofModalProps {
  isOpen: boolean;
  project: PhotobookProject;
  onClose: () => void;
  onApproveProof: (approvedBy: string) => void;
}

export const ClientProofModal: React.FC<ClientProofModalProps> = ({
  isOpen,
  project,
  onClose,
  onApproveProof,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [approverName, setApproverName] = useState(project.celebrantNames || 'Funke Adeleke (Bride)');

  if (!isOpen) return null;

  const proofLink = `https://printsakes.com/proof/${project.id}?clientKey=8823`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(proofLink);
    setCopiedLink(true);
    sounds.playCelebrationChime();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleApprove = () => {
    sounds.playCelebrationChime();
    onApproveProof(approverName);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl max-w-lg w-full border border-[#DFD6C3] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden">
        
        {/* Mobile handle indicator */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF0EB] text-[#C25E36] flex items-center justify-center border border-[#E9C7B8]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C25E36]">Studio Collaboration</span>
              <h3 className="font-serif font-bold text-lg text-[#1F1D1A]">Client Proofing & Sign-Off</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Approval Status Card */}
          {project.isClientApproved ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-start gap-3 shadow-xs">
              <Award className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Verified Digital Approval
                </span>
                <h4 className="font-serif font-bold text-emerald-950 text-base">
                  Approved For Printing Press
                </h4>
                <p className="text-emerald-800 text-xs mt-1">
                  Signed off by <strong>{project.approvedBy || approverName}</strong> on {project.approvalDate || 'Today'}.
                  The bindery team has received print clearance.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 text-xs">Awaiting Celebrant Sign-Off</h4>
                <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
                  Share this private interactive link with your client or spouse. They can flip through 
                  the full 3D proof on their phone or tablet and click "Approve" with zero back-and-forth email friction.
                </p>
              </div>
            </div>
          )}

          {/* Share Link Box */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2.5">
            <label className="block text-xs font-semibold text-stone-700">
              Private 3D Proof URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={proofLink}
                className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-600 font-mono text-[11px] truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="pt-1 flex items-center gap-3 text-[11px]">
              <a
                href={`https://wa.me/?text=Hello!%20Here%20is%20the%20interactive%203D%20photobook%20proof%20for%20our%20celebration:%20${encodeURIComponent(proofLink)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share to Client via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Client Sign-off Action */}
          {!project.isClientApproved && (
            <div className="p-4 bg-white rounded-2xl border border-[#DFD6C3] space-y-3">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Celebrant Sign-Off Seal
              </h4>
              <p className="text-stone-500 text-[11px]">
                Ready to confirm layout, spellings, and cover finishes for binding?
              </p>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Name of Signer / Approver
                </label>
                <input
                  type="text"
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                />
              </div>
              <button
                onClick={handleApprove}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Approve This Proof For Print</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

