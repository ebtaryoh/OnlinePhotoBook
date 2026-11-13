import { BookFinish, BookSize, PaperStock, PricingConfig } from '../types/photobook';

export const DEFAULT_PRICING: PricingConfig = {
  basePrice: 52000,
  basePageCount: 20, // 10 spreads
  extraPagePrice: 3500, // per extra spread (2 pages)
  finishAddon: {
    hardcover: 0,
    linen: 18000,
    leatherette: 28000,
    acrylic: 45000,
  },
  stockAddon: {
    lustre: 0,
    matte: 12000,
    layflat: 26000,
  },
  sizeMultiplier: {
    '8x8': 1.0,
    '10x10': 1.35,
    '12x12': 1.65,
    landscape: 1.45,
  },
};

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

export function calculateBookPrice(
  spreadCount: number,
  finish: BookFinish = 'hardcover',
  stock: PaperStock = 'lustre',
  size: BookSize = '8x8',
  copies: number = 1,
  config: PricingConfig = DEFAULT_PRICING
): {
  unitPrice: number;
  totalPrice: number;
  discountPercentage: number;
  discountAmount: number;
} {
  const baseSpreads = config.basePageCount / 2;
  const extraSpreads = Math.max(0, spreadCount - baseSpreads);
  const extraCost = extraSpreads * config.extraPagePrice;

  const subtotalBeforeMultiplier = config.basePrice + extraCost + config.finishAddon[finish] + config.stockAddon[stock];
  const unitPrice = Math.round(subtotalBeforeMultiplier * config.sizeMultiplier[size]);

  // Bulk discount for event organizers / multiple copies
  let discountPercentage = 0;
  if (copies >= 10) {
    discountPercentage = 25;
  } else if (copies >= 5) {
    discountPercentage = 18;
  } else if (copies >= 3) {
    discountPercentage = 10;
  } else if (copies === 2) {
    discountPercentage = 5;
  }

  const rawTotal = unitPrice * copies;
  const discountAmount = Math.round(rawTotal * (discountPercentage / 100));
  const totalPrice = rawTotal - discountAmount;

  return {
    unitPrice,
    totalPrice,
    discountPercentage,
    discountAmount,
  };
}

