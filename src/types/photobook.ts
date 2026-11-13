export type BookFinish = 'hardcover' | 'linen' | 'leatherette' | 'acrylic';
export type PaperStock = 'lustre' | 'matte' | 'layflat';
export type BookSize = '8x8' | '10x10' | '12x12' | 'landscape';
export type MoodTheme = 'warm' | 'airy' | 'handwritten' | 'bold' | 'editorial' | 'monochrome';

export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
  timestamp?: number;
  width?: number;
  height?: number;
  resolutionQuality: 'high' | 'medium' | 'low';
  contributor?: string;
  source?: 'celebrant' | 'guest' | 'photographer';
  voiceNoteUrl?: string;
  voiceNoteDuration?: number;
}

export type SpreadLayoutType = 
  | 'cover'
  | 'single-full'
  | 'split-two'
  | 'three-grid'
  | 'four-grid'
  | 'story-quote'
  | 'polaroid-spread';

export interface SpreadPage {
  id: string;
  layout: SpreadLayoutType;
  leftPhoto?: PhotoItem;
  rightPhoto?: PhotoItem;
  extraPhotos?: PhotoItem[];
  title?: string;
  subtitle?: string;
  quote?: string;
  pageNumberLeft?: number;
  pageNumberRight?: number;
  backgroundColor?: string;
  hasAudioKeepsake?: boolean;
  audioLabel?: string;
  comments?: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
    resolved?: boolean;
  }>;
}

export interface PhotobookProject {
  id: string;
  title: string;
  subtitle: string;
  celebrantNames: string;
  eventType: 'wedding' | 'birthday' | 'anniversary' | 'graduation' | 'gala';
  eventDate: string;
  coverFinish: BookFinish;
  foilColor: 'gold' | 'silver' | 'rose-gold' | 'blind-deboss';
  paperStock: PaperStock;
  bookSize: BookSize;
  moodTheme: MoodTheme;
  coverPhotoId?: string;
  photos: PhotoItem[];
  spreads: SpreadPage[];
  organizerStudio?: string;
  isClientApproved?: boolean;
  approvedBy?: string;
  approvalDate?: string;
  guestAccessCode: string;
  guestContributions: Array<{
    id: string;
    guestName: string;
    photoUrl: string;
    message: string;
    uploadedAt: string;
    approved: boolean;
  }>;
}

export interface PricingConfig {
  basePrice: number; // in NGN
  basePageCount: number;
  extraPagePrice: number;
  finishAddon: Record<BookFinish, number>;
  stockAddon: Record<PaperStock, number>;
  sizeMultiplier: Record<BookSize, number>;
}

