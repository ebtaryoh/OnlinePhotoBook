import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { PricingTiers } from './components/PricingTiers';
import { OrganizerFeatures } from './components/OrganizerFeatures';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Modals & Studio
import { PhotoPickerModal } from './components/PhotoPickerModal';
import { LayoutLoadingModal } from './components/LayoutLoadingModal';
import { StudioHeader } from './components/Studio/StudioHeader';
import { BookFlipViewer } from './components/Studio/BookFlipViewer';
import { SpreadEditor } from './components/Studio/SpreadEditor';
import { GridProofView } from './components/Studio/GridProofView';
import { MoodToolbar } from './components/Studio/MoodToolbar';
import { PrintCheckModal } from './components/Studio/PrintCheckModal';
import { GuestUploadModal } from './components/Studio/GuestUploadModal';
import { ClientProofModal } from './components/Studio/ClientProofModal';
import { CheckoutModal } from './components/Checkout/CheckoutModal';

// Utilities & Data
import { PhotoItem, PhotobookProject, SpreadPage } from './types/photobook';
import { INITIAL_PROJECT, SAMPLE_WEDDING_PHOTOS } from './data/sampleProjects';
import { generateSmartSpreads } from './utils/layoutEngine';
import { calculateBookPrice } from './utils/currency';
import { sounds } from './utils/audioHelper';

export const App: React.FC = () => {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'landing' | 'studio' | 'organizer' | 'guest'>('landing');
  const [viewMode, setViewMode] = useState<'flip' | 'grid'>('flip');

  // Project state with local storage persistence
  const [project, setProject] = useState<PhotobookProject>(() => {
    try {
      const saved = localStorage.getItem('printsakes_current_project');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROJECT;
  });

  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);

  // Modals state
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [isLayoutLoading, setIsLayoutLoading] = useState(false);
  const [tempPhotosForLayout, setTempPhotosForLayout] = useState<PhotoItem[]>([]);
  const [isSpreadEditorOpen, setIsSpreadEditorOpen] = useState(false);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isPrintCheckOpen, setIsPrintCheckOpen] = useState(false);
  const [isGuestUploadOpen, setIsGuestUploadOpen] = useState(false);
  const [isClientProofOpen, setIsClientProofOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync project to local storage
  useEffect(() => {
    try {
      localStorage.setItem('printsakes_current_project', JSON.stringify(project));
    } catch {}
  }, [project]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // Pricing
  const pricing = calculateBookPrice(
    project.spreads.length,
    project.coverFinish,
    project.paperStock,
    project.bookSize,
    1
  );

  // Handlers
  const handleStartNewBook = () => {
    setIsPhotoPickerOpen(true);
  };

  const handlePhotosSelected = (selectedPhotos: PhotoItem[]) => {
    setIsPhotoPickerOpen(false);
    setTempPhotosForLayout(selectedPhotos);
    setIsLayoutLoading(true);
  };

  const handleFinishLayoutGeneration = () => {
    const newSpreads = generateSmartSpreads(
      tempPhotosForLayout,
      project.title || 'Our Cherished Story',
      project.subtitle || 'A Keepsake Collection'
    );
    setProject((prev) => ({
      ...prev,
      photos: tempPhotosForLayout,
      spreads: newSpreads,
    }));
    setIsLayoutLoading(false);
    setActiveSpreadIndex(0);
    setCurrentTab('studio');
    setViewMode('flip');
  };

  const handleAutoArrange = () => {
    const arrangedSpreads = generateSmartSpreads(
      project.photos,
      project.title,
      project.subtitle
    );
    setProject((prev) => ({
      ...prev,
      spreads: arrangedSpreads,
    }));
    setIsMoodModalOpen(false);
    setActiveSpreadIndex(0);
  };

  const handleAddSpread = () => {
    const newSpread: SpreadPage = {
      id: `spread-manual-${Date.now()}`,
      layout: 'split-two',
      title: 'CHERISHED MOMENTS',
      subtitle: 'Added page spread',
      leftPhoto: project.photos[project.photos.length % project.photos.length],
      rightPhoto: project.photos[(project.photos.length + 1) % project.photos.length],
      pageNumberLeft: project.spreads.length * 2 - 1,
      pageNumberRight: project.spreads.length * 2,
    };
    setProject((prev) => ({
      ...prev,
      spreads: [...prev.spreads, newSpread],
    }));
    setActiveSpreadIndex(project.spreads.length);
  };

  const handleDeleteSpread = (spreadId: string) => {
    setProject((prev) => ({
      ...prev,
      spreads: prev.spreads.filter((s) => s.id !== spreadId),
    }));
    if (activeSpreadIndex >= project.spreads.length - 1) {
      setActiveSpreadIndex(Math.max(0, project.spreads.length - 2));
    }
  };

  const handleDuplicateSpread = (spreadToDuplicate: SpreadPage) => {
    const clone: SpreadPage = {
      ...spreadToDuplicate,
      id: `spread-dup-${Date.now()}`,
      title: `${spreadToDuplicate.title || 'Moments'} (Copy)`,
    };
    setProject((prev) => ({
      ...prev,
      spreads: [...prev.spreads, clone],
    }));
    setActiveSpreadIndex(project.spreads.length);
    sounds.playPageFlip();
  };

  const handleMoveSpread = (fromIndex: number, toIndex: number) => {
    if (fromIndex <= 0 || toIndex <= 0) return; // Prevent moving cover
    const newSpreads = [...project.spreads];
    const [moved] = newSpreads.splice(fromIndex, 1);
    newSpreads.splice(toIndex, 0, moved);
    setProject((prev) => ({ ...prev, spreads: newSpreads }));
    setActiveSpreadIndex(toIndex);
  };

  const handleUpdateCurrentSpread = (updated: SpreadPage) => {
    setProject((prev) => ({
      ...prev,
      spreads: prev.spreads.map((s) => (s.id === updated.id ? updated : s)),
    }));
  };

  const handleApproveProof = (approverName: string) => {
    setProject((prev) => ({
      ...prev,
      isClientApproved: true,
      approvedBy: approverName,
      approvalDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }));
    setIsClientProofOpen(false);
  };

  const handleSimulateGuestUpload = (guestName: string, message: string, photoUrl: string) => {
    const newContribution = {
      id: `gc-${Date.now()}`,
      guestName,
      message,
      photoUrl,
      uploadedAt: 'Just now',
      approved: false,
    };
    setProject((prev) => ({
      ...prev,
      guestContributions: [newContribution, ...prev.guestContributions],
    }));
  };

  const handleApproveGuestPhoto = (id: string) => {
    const target = project.guestContributions.find((c) => c.id === id);
    if (!target) return;

    // Mark contribution approved
    const updatedContributions = project.guestContributions.map((c) =>
      c.id === id ? { ...c, approved: true } : c
    );

    // Add as new PhotoItem to project library
    const newPhotoItem: PhotoItem = {
      id: `guest-approved-${Date.now()}`,
      url: target.photoUrl,
      caption: `${target.message} — ${target.guestName}`,
      source: 'guest',
      contributor: target.guestName,
      resolutionQuality: 'high',
    };

    setProject((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhotoItem],
      guestContributions: updatedContributions,
    }));
  };

  const handleDeclineGuestPhoto = (id: string) => {
    setProject((prev) => ({
      ...prev,
      guestContributions: prev.guestContributions.filter((c) => c.id !== id),
    }));
  };

  const handleStartWithTier = (size: '8x8' | '10x10' | '12x12') => {
    setProject((prev) => ({
      ...prev,
      bookSize: size,
    }));
    setIsPhotoPickerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F1D1A]">
      
      {/* Global Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'guest') {
            setIsGuestUploadOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        cartCount={1}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Main Body Switcher with mobile bottom bar offset */}
      <main className={`flex-1 flex flex-col ${currentTab !== 'studio' ? 'pb-16 md:pb-0' : 'pb-14 md:pb-0'}`}>
        
        {/* VIEW 1: LANDING & OVERVIEW */}
        {currentTab === 'landing' && (
          <>
            <LandingHero
              onStartBook={handleStartNewBook}
              onExploreDemo={() => {
                setCurrentTab('studio');
                setViewMode('flip');
              }}
              onOpenOrganizerSuite={() => setCurrentTab('organizer')}
            />

            <PricingTiers onStartWithTier={handleStartWithTier} />

            <OrganizerFeatures
              onOpenGuestPortal={() => setIsGuestUploadOpen(true)}
              onOpenStudio={() => {
                setCurrentTab('studio');
                setViewMode('flip');
              }}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
            />

            <Testimonials />
          </>
        )}

        {/* VIEW 2: 3D VIRTUAL STUDIO */}
        {currentTab === 'studio' && (
          <div className="flex-1 flex flex-col min-h-[calc(100vh-65px)]">
            <StudioHeader
              title={project.title}
              onUpdateTitle={(title) => setProject((p) => ({ ...p, title }))}
              onBack={() => setCurrentTab('landing')}
              onShareProof={() => setIsClientProofOpen(true)}
              onOpenPrintCheck={() => setIsPrintCheckOpen(true)}
              onOpenGuestUpload={() => setIsGuestUploadOpen(true)}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode(viewMode === 'flip' ? 'grid' : 'flip')}
              totalPrice={pricing.unitPrice}
              isClientApproved={project.isClientApproved}
            />

            {viewMode === 'flip' ? (
              <BookFlipViewer
                project={project}
                activeSpreadIndex={activeSpreadIndex}
                onSelectSpread={setActiveSpreadIndex}
                onOpenSpreadEditor={() => setIsSpreadEditorOpen(true)}
                onOpenPrintCheck={() => setIsPrintCheckOpen(true)}
                onOpenMoodModal={() => setIsMoodModalOpen(true)}
                onAddSpread={handleAddSpread}
              />
            ) : (
              <GridProofView
                project={project}
                activeSpreadIndex={activeSpreadIndex}
                onSelectSpread={setActiveSpreadIndex}
                onAddSpread={handleAddSpread}
                onDeleteSpread={handleDeleteSpread}
                onMoveSpread={handleMoveSpread}
                onSwitchToFlip={() => setViewMode('flip')}
              />
            )}
          </div>
        )}

        {/* VIEW 3: ORGANIZER SUITE */}
        {currentTab === 'organizer' && (
          <div className="pt-6">
            <OrganizerFeatures
              onOpenGuestPortal={() => setIsGuestUploadOpen(true)}
              onOpenStudio={() => {
                setCurrentTab('studio');
                setViewMode('flip');
              }}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
            />
            <PricingTiers onStartWithTier={handleStartWithTier} />
            <Testimonials />
          </div>
        )}

      </main>

      {/* Global Footer (shown on landing and organizer tabs) */}
      {currentTab !== 'studio' && (
        <Footer onNavigate={(tab) => setCurrentTab(tab)} />
      )}

      {/* MODALS */}

      {/* Photo Picker Modal */}
      <PhotoPickerModal
        isOpen={isPhotoPickerOpen}
        initialPhotos={project.photos}
        onClose={() => setIsPhotoPickerOpen(false)}
        onComplete={handlePhotosSelected}
      />

      {/* "Creating something beautiful..." Automated Layout Assembly Animation */}
      <LayoutLoadingModal
        isOpen={isLayoutLoading}
        photoCount={tempPhotosForLayout.length || 20}
        samplePhotos={tempPhotosForLayout.map((p) => p.url)}
        onFinished={handleFinishLayoutGeneration}
      />

      {/* Spread Editor Drawer */}
      <SpreadEditor
        isOpen={isSpreadEditorOpen}
        spread={project.spreads[activeSpreadIndex] || project.spreads[0]}
        availablePhotos={project.photos}
        onClose={() => setIsSpreadEditorOpen(false)}
        onUpdateSpread={handleUpdateCurrentSpread}
        onDeleteSpread={handleDeleteSpread}
        onDuplicateSpread={handleDuplicateSpread}
      />

      {/* Mood, Finishes & Sizing Modal */}
      <MoodToolbar
        isOpen={isMoodModalOpen}
        project={project}
        onClose={() => setIsMoodModalOpen(false)}
        onUpdateProject={(partial) => setProject((p) => ({ ...p, ...partial }))}
        onAutoArrange={handleAutoArrange}
        onAddSpread={handleAddSpread}
      />

      {/* Print Check Pre-Flight Verification Modal */}
      <PrintCheckModal
        isOpen={isPrintCheckOpen}
        project={project}
        onClose={() => setIsPrintCheckOpen(false)}
        onProceedToOrder={() => {
          setIsPrintCheckOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Guest Upload & Tabletop QR Placard Modal */}
      <GuestUploadModal
        isOpen={isGuestUploadOpen}
        project={project}
        onClose={() => setIsGuestUploadOpen(false)}
        onApproveGuestPhoto={handleApproveGuestPhoto}
        onDeclineGuestPhoto={handleDeclineGuestPhoto}
        onSimulateGuestUpload={handleSimulateGuestUpload}
      />

      {/* Client Proof & Approval Modal */}
      <ClientProofModal
        isOpen={isClientProofOpen}
        project={project}
        onClose={() => setIsClientProofOpen(false)}
        onApproveProof={handleApproveProof}
      />

      {/* Checkout & Production Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        project={project}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => {}}
      />

    </div>
  );
};

export default App;

