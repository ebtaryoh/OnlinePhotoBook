import { BookFinish, BookSize, MoodTheme, PaperStock } from '../types/photobook';

export interface ThemeOption {
  id: MoodTheme;
  name: string;
  description: string;
  fontFamily: string;
  headingClass: string;
  bodyClass: string;
  bgHex: string;
  cardBgHex: string;
  accentHex: string;
  tagline: string;
}

export const MOOD_THEMES: Record<MoodTheme, ThemeOption> = {
  warm: {
    id: 'warm',
    name: 'Warm & Golden',
    description: 'Rich earthy tones, timeless editorial serif, perfect for traditional weddings and milestones.',
    fontFamily: 'serif',
    headingClass: 'font-serif text-amber-950',
    bodyClass: 'font-sans text-stone-700',
    bgHex: '#FAF7F0',
    cardBgHex: '#FFFFFF',
    accentHex: '#C25E36',
    tagline: 'Warmth and heartfelt remembrance',
  },
  airy: {
    id: 'airy',
    name: 'Airy & Minimal',
    description: 'Clean whitespace, ethereal soft borders, modern luxury museum catalogue look.',
    fontFamily: 'sans-serif',
    headingClass: 'font-sans font-light tracking-wide text-neutral-900',
    bodyClass: 'font-sans text-neutral-600',
    bgHex: '#FBFBFB',
    cardBgHex: '#FFFFFF',
    accentHex: '#4A5568',
    tagline: 'Breathing room for your dearest moments',
  },
  handwritten: {
    id: 'handwritten',
    name: 'Handwritten & Organic',
    description: 'Intimate script accents, polaroid scrapbook feel with genuine personal warmth.',
    fontFamily: 'cursive',
    headingClass: 'font-serif italic text-stone-900',
    bodyClass: 'font-sans text-stone-800',
    bgHex: '#F7F4EB',
    cardBgHex: '#FFFDF9',
    accentHex: '#9C4221',
    tagline: 'Like an heirloom journal passed down generations',
  },
  editorial: {
    id: 'editorial',
    name: 'Vogue Editorial',
    description: 'High-contrast typography, bold full-bleed layouts for high-fashion celebrants.',
    fontFamily: 'serif',
    headingClass: 'font-serif font-black tracking-tight text-black uppercase',
    bodyClass: 'font-sans text-neutral-800',
    bgHex: '#F5F5F5',
    cardBgHex: '#FFFFFF',
    accentHex: '#111111',
    tagline: 'Cover-story glamour and high fashion',
  },
  bold: {
    id: 'bold',
    name: 'Bold Celebration',
    description: 'Vibrant celebratory framing, dynamic asymmetric photo grids for afterparties and galas.',
    fontFamily: 'sans-serif',
    headingClass: 'font-sans font-extrabold text-stone-900',
    bodyClass: 'font-sans text-stone-700',
    bgHex: '#FDF8F3',
    cardBgHex: '#FFFFFF',
    accentHex: '#D97706',
    tagline: 'High energy, joy and vibrant memories',
  },
  monochrome: {
    id: 'monochrome',
    name: 'Classic Noir & Ivory',
    description: 'Fine art gallery presentation with subtle monochromatic dignity and poise.',
    fontFamily: 'serif',
    headingClass: 'font-serif text-neutral-900',
    bodyClass: 'font-sans text-neutral-700',
    bgHex: '#F6F6F6',
    cardBgHex: '#FFFFFF',
    accentHex: '#262626',
    tagline: 'Pure black & white timeless photography',
  },
};

export const FINISH_OPTIONS: Array<{
  id: BookFinish;
  title: string;
  tagline: string;
  priceNote: string;
  image: string;
  features: string[];
}> = [
  {
    id: 'hardcover',
    title: 'Velvet Matte Hardcover',
    tagline: 'Scratch-resistant laminate with crisp wrap-around photo front & back.',
    priceNote: 'Included with all sizes',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    features: ['High-definition wrap-around photo cover', 'Anti-scuff matte soft-touch finish', 'Sturdy 3mm Dutch binder board core'],
  },
  {
    id: 'linen',
    title: 'Italian Woven Linen + Gold Foil',
    tagline: 'Hand-bound in archival Milanese fabric with hot-stamped metallic typography.',
    priceNote: '+₦18,000',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    features: ['100% natural European woven linen', 'Choice of Gold, Silver, or Rose-Gold foil', 'Timeless bespoke heirloom texture'],
  },
  {
    id: 'leatherette',
    title: 'Artisan Bonded Leather',
    tagline: 'Full-grain feel with deep blind debossing and saddle-stitched durability.',
    priceNote: '+₦28,000',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    features: ['Rich leatherette grain in Obsidian, Cognac, or Forest', 'Deep debossed initials or wedding crest', 'Stain-resistant heirloom longevity'],
  },
  {
    id: 'acrylic',
    title: 'Crystal Acrylic Glass Front',
    tagline: 'Museum-grade diamond-polished acrylic cover with rich luminous depth.',
    priceNote: '+₦45,000',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    features: ['4mm diamond-polished crystalline glass front', 'Coupled with genuine leatherette spine & back', 'The ultimate showstopper wedding centerpiece'],
  },
];

export const PAPER_STOCK_OPTIONS: Array<{
  id: PaperStock;
  title: string;
  description: string;
  gsm: string;
  addon: string;
}> = [
  {
    id: 'lustre',
    title: 'Pearl Lustre Archival',
    description: 'Subtle sheen, vibrant skin tones, and fingerprint resistance.',
    gsm: '250 gsm heavy stock',
    addon: 'Standard',
  },
  {
    id: 'matte',
    title: 'Fine Art Velvet Matte',
    description: 'Zero glare, velvety tactile feel, preferred by editorial wedding photographers.',
    gsm: '270 gsm fine-art cotton',
    addon: '+₦12,000',
  },
  {
    id: 'layflat',
    title: 'Seamless Panoramic Layflat',
    description: 'Opens 100% flat with zero center gutter gutter loss. Double-thick pages that never bend.',
    gsm: '420 gsm ultra-thick board',
    addon: '+₦26,000',
  },
];

export const SIZE_OPTIONS: Array<{
  id: BookSize;
  title: string;
  dims: string;
  idealFor: string;
  badge?: string;
}> = [
  {
    id: '8x8',
    title: '8" × 8" Studio Square',
    dims: '20 × 20 cm',
    idealFor: 'Intimate gifts, parents’ keepsake editions, birthdays & baby milestones',
    badge: 'Popular for Gifting',
  },
  {
    id: '10x10',
    title: '10" × 10" Signature Square',
    dims: '25 × 25 cm',
    idealFor: 'The quintessential wedding photobook, anniversary & gala album',
    badge: 'Most Popular',
  },
  {
    id: '12x12',
    title: '12" × 12" Grand Heirloom',
    dims: '30 × 30 cm',
    idealFor: 'Monumental traditional weddings, coffee table centerpiece with epic spreads',
    badge: 'Luxury Statement',
  },
  {
    id: 'landscape',
    title: '11" × 8.5" Classic Landscape',
    dims: '28 × 21 cm',
    idealFor: 'Cinematic wide ceremony shots, group portraits, and destination weddings',
  },
];

