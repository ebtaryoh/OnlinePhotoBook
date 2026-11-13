import { PhotoItem, SpreadLayoutType, SpreadPage } from '../types/photobook';

export function generateSmartSpreads(
  photos: PhotoItem[],
  title: string = 'Our Cherished Moments',
  subtitle: string = 'A Keepsake Collection'
): SpreadPage[] {
  if (!photos || photos.length === 0) {
    return [
      {
        id: 'spread-0',
        layout: 'cover',
        title,
        subtitle,
      },
    ];
  }

  const spreads: SpreadPage[] = [];

  // Spread 0: Cover
  spreads.push({
    id: `spread-cover-${Date.now()}`,
    layout: 'cover',
    title,
    subtitle,
    rightPhoto: photos[0],
  });

  const remainingPhotos = photos.slice(1);
  let pageCounter = 1;
  let photoIdx = 0;

  // If there are photos, add a formal Opening Dedication / Vows spread
  if (remainingPhotos.length > 0) {
    spreads.push({
      id: `spread-story-${Date.now()}-1`,
      layout: 'story-quote',
      title: 'THE DEDICATION',
      quote: '"These pages capture the smiles, the quiet tears of joy, and the people who made this day unforgettable."',
      leftPhoto: remainingPhotos[photoIdx],
      rightPhoto: remainingPhotos[photoIdx + 1],
      pageNumberLeft: pageCounter++,
      pageNumberRight: pageCounter++,
      hasAudioKeepsake: true,
      audioLabel: 'Event Welcome & Dedication Voice Note',
    });
    photoIdx += Math.min(2, remainingPhotos.length - photoIdx);
  }

  // Iterate through remaining photos and pick alternating editorial layouts
  const layoutCycle: SpreadLayoutType[] = [
    'single-full',
    'split-two',
    'three-grid',
    'split-two',
    'four-grid',
    'story-quote',
  ];

  let cycleIdx = 0;

  while (photoIdx < remainingPhotos.length) {
    const layout = layoutCycle[cycleIdx % layoutCycle.length];
    cycleIdx++;

    if (layout === 'single-full') {
      spreads.push({
        id: `spread-${Date.now()}-${spreads.length}`,
        layout: 'single-full',
        title: 'HIGHLIGHT MOMENT',
        subtitle: remainingPhotos[photoIdx]?.caption || 'Captured in timeless elegance',
        rightPhoto: remainingPhotos[photoIdx],
        pageNumberLeft: pageCounter++,
        pageNumberRight: pageCounter++,
      });
      photoIdx += 1;
    } else if (layout === 'split-two') {
      const p1 = remainingPhotos[photoIdx];
      const p2 = remainingPhotos[photoIdx + 1];
      spreads.push({
        id: `spread-${Date.now()}-${spreads.length}`,
        layout: 'split-two',
        title: 'IN TANDEM',
        subtitle: 'Side by side, step by step',
        leftPhoto: p1,
        rightPhoto: p2,
        pageNumberLeft: pageCounter++,
        pageNumberRight: pageCounter++,
      });
      photoIdx += p2 ? 2 : 1;
    } else if (layout === 'three-grid') {
      const p1 = remainingPhotos[photoIdx];
      const p2 = remainingPhotos[photoIdx + 1];
      const p3 = remainingPhotos[photoIdx + 2];
      spreads.push({
        id: `spread-${Date.now()}-${spreads.length}`,
        layout: 'three-grid',
        title: 'JOY IN MOTION',
        subtitle: 'Every angle of happiness',
        leftPhoto: p1,
        rightPhoto: p2,
        extraPhotos: p3 ? [p3] : undefined,
        pageNumberLeft: pageCounter++,
        pageNumberRight: pageCounter++,
      });
      photoIdx += p3 ? 3 : p2 ? 2 : 1;
    } else if (layout === 'four-grid') {
      const p1 = remainingPhotos[photoIdx];
      const p2 = remainingPhotos[photoIdx + 1];
      const p3 = remainingPhotos[photoIdx + 2];
      const p4 = remainingPhotos[photoIdx + 3];
      spreads.push({
        id: `spread-${Date.now()}-${spreads.length}`,
        layout: 'four-grid',
        title: 'COMMUNITY & CELEBRATION',
        subtitle: 'The warmth of loved ones gathered',
        leftPhoto: p1,
        rightPhoto: p2,
        extraPhotos: [p3, p4].filter(Boolean) as PhotoItem[],
        pageNumberLeft: pageCounter++,
        pageNumberRight: pageCounter++,
      });
      photoIdx += [p1, p2, p3, p4].filter(Boolean).length;
    } else {
      // story-quote
      const p1 = remainingPhotos[photoIdx];
      spreads.push({
        id: `spread-${Date.now()}-${spreads.length}`,
        layout: 'story-quote',
        title: 'REFLECTIONS',
        quote: '"What we remember most is not the schedule of the day, but how deeply we were loved."',
        leftPhoto: p1,
        pageNumberLeft: pageCounter++,
        pageNumberRight: pageCounter++,
      });
      photoIdx += 1;
    }
  }

  return spreads;
}

