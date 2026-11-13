import React from 'react';
import { Star, Heart, CheckCircle2, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Folake & Deji Alabi',
      role: 'Bride & Groom • Lekki, Lagos',
      event: 'Traditional & White Wedding',
      comment:
        'We had over 2,000 photos on Google Drive from our wedding photographer that sat there for 8 months. Within 15 minutes on Printsakes, we had an unbelievable 3D spread ready. When the linen book arrived at our Lekki home, my mother-in-law cried. It is pure royalty.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Bukky Balogun',
      role: 'Lead Planner • Zircon Luxe Events',
      event: 'Organized 40+ Weddings Annually',
      comment:
        'The Guest QR feature alone transformed our reception tables! Guests scanned and uploaded over 400 hilarious candid moments that our official photographer missed. The client proofing link saves me weeks of WhatsApp back-and-forth.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Chief Olatunji Adeleke',
      role: 'Celebrant • Victoria Island, Lagos',
      event: '60th Diamond Jubilee Celebration',
      comment:
        'The leatherette finish and gold foil debossing feel like something crafted in London or Florence. Seamless layflat pages mean my large group family portraits have no gutter crease. Worth every single kobo.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DFD6C3] text-[#C25E36] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-[#C25E36]" />
            <span>Loved by Celebrants & Top Planners</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1D1A]">
            "The photos were on our phones. Now they're our family treasure."
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Hear from newlyweds, families, and Lagos event coordinators who turned digital files into physical heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DFD6C3] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-stone-800 text-xs sm:text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#1F1D1A]">{rev.name}</h4>
                  <p className="text-[11px] text-stone-500">{rev.role}</p>
                  <span className="text-[10px] text-[#C25E36] font-semibold">{rev.event}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

