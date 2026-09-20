import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const HIGHLIGHTS = [
  {
    id: 1,
    title: 'The Sikandar Challenge & Pure Sciences',
    category: 'Academic Gauntlet',
    description: 'Premier mathematical deduction, theoretical physics, and high-speed discrete analytical proofs in historic colonial halls.',
    image: '/sps-main-building.jpg',
    badge: 'Compulsory Track'
  },
  {
    id: 2,
    title: 'Robotics, AI & Autonomous Flight',
    category: 'Engineering & Tech',
    description: 'Custom arena navigation, obstacle-avoiding autonomous drones, and line-following robotic combat challenges.',
    image: '/social-laser.jpg',
    badge: 'Engineering Arena'
  },
  {
    id: 3,
    title: 'The Nexus Live Concert',
    category: 'Day 2 Social Evening',
    description: 'High-energy live musical performance featuring top Pakistani artists on the illuminated main stage of Sadiq Public School.',
    image: '/social-concert.jpg',
    badge: 'Delegation Social'
  },
  {
    id: 4,
    title: 'Grand Traditional Qawali Night',
    category: 'Day 3 Cultural Heritage',
    description: 'Mystical sufi melodies echoing beneath the starlit Bahawalpur sky in the central historic courtyard.',
    image: '/social-qawali.jpg',
    badge: 'Sufi Heritage'
  },
  {
    id: 5,
    title: 'Collegiate Laser Tag Combat Arena',
    category: 'Day 1 Icebreaker',
    description: 'State-of-the-art infrared tactical combat across custom obstacles under atmospheric black-light illumination.',
    image: '/social-laser.jpg',
    badge: 'Tactical Arena'
  },
  {
    id: 6,
    title: 'Black-Tie Dinner & Awards Gala',
    category: 'Day 4 Grand Conclave',
    description: 'Formal presidential dinner, conferring prestigious trophies, shields, and delegation honors to the national champions.',
    image: '/social-dinner.jpg',
    badge: 'Delegate Exclusive'
  }
];

export function HighlightsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 3 cards at a time on desktop, 1 or 2 on smaller screens
  const maxIndex = HIGHLIGHTS.length - 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="highlights" className="relative z-10 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-950/40 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Conclave Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Moments of <span className="text-purple-400">Excellence & Camaraderie</span>
            </h2>
            <p className="mt-3 text-sm text-zinc-300 max-w-xl leading-relaxed">
              Explore the signature academic arenas, intense technical showdowns, and memorable evening socials of Sadiq Nexus.
            </p>
          </div>

          {/* Circular Left/Right Navigation Arrows in Purple */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] active:scale-95 focus:outline-none"
              aria-label="Previous Highlight"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] active:scale-95 focus:outline-none"
              aria-label="Next Highlight"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 3-Card Carousel Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[0, 1, 2].map((offset) => {
            const item = HIGHLIGHTS[(currentIndex + offset) % HIGHLIGHTS.length];
            return (
              <motion.div
                key={`${item.id}-${offset}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-zinc-900 overflow-hidden border border-zinc-800 flex flex-col justify-between group shadow-xl hover:border-purple-500/50 transition-all duration-300"
              >
                <div>
                  {/* High-Fidelity Imagery */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (!e.currentTarget.src.endsWith('/sps-main-building.jpg')) {
                            e.currentTarget.src = '/sps-main-building.jpg';
                          }
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-zinc-700 text-[11px] font-semibold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1.5">
                      {item.category}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <Link
                    to="/categories"
                    className="text-xs font-semibold text-purple-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Arena Details &rarr;</span>
                  </Link>
                  <span className="text-[11px] text-zinc-300 font-mono">
                    0{((currentIndex + offset) % HIGHLIGHTS.length) + 1} / 0{HIGHLIGHTS.length}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {HIGHLIGHTS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx > maxIndex ? maxIndex : idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-purple-500'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
