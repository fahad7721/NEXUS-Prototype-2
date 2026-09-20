import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Gamepad2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Globe2
} from 'lucide-react';
import { MODULES_DATA } from '../data/olympiadData';
import { ModuleData } from '../types';
import { useRegistration } from '../context/RegistrationContext';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export function CategoriesPage() {
  const [activeTrack, setActiveTrack] = useState('All');
  const [selectedStudyGuide, setSelectedStudyGuide] = useState<ModuleData | null>(null);
  const { openRegistration } = useRegistration();

  const tracks = ['All', 'Pure Sciences & Math', 'Engineering & Tech', 'Forensics & Cooking', 'Core & Optional'];

  const filteredModules = activeTrack === 'All'
    ? MODULES_DATA
    : MODULES_DATA.filter((m) => m.track === activeTrack);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-black text-white">
      {/* Editorial Header - Sleek Open-Canvas */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPhysics}
          className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-purple-950/40 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Competitive Academic Arenas &bull; Sadiq Nexus '26</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ...springPhysics }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
        >
          14 Olympiad <span className="text-purple-400">Categories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...springPhysics }}
          className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed"
        >
          The first two modules (The Sikandar Challenge & Xponent) are compulsory for every delegation.
          Delegations select optional modules, while Individual delegates compete exclusively in PnA & E-sports.
        </motion.p>
      </div>

      {/* Track Filter Tabs: Borderless Fluid Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
        {tracks.map((track) => (
          <button
            key={track}
            type="button"
            onClick={() => setActiveTrack(track)}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTrack === track
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] scale-105'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {track}
          </button>
        ))}
      </div>

      {/* BORDERLESS, SLEEK OPEN-CANVAS LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredModules.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, ...springPhysics }}
              className="relative p-8 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-purple-600/40 transition-all duration-500 flex flex-col justify-between group shadow-xl"
            >
              {/* Subtle Ambient Purple Underglow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/10 transition-colors" />

              <div>
                {/* Top Row: Integrated Minimalist Vector & Badges */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  {item.isCompulsory ? (
                    <span className="px-3.5 py-1 rounded-full bg-purple-950/80 text-purple-300 text-[11px] font-bold uppercase tracking-wider border border-purple-600/40 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-purple-400" />
                      <span>Delegation Compulsory</span>
                    </span>
                  ) : item.isIndividualOnly ? (
                    <span className="px-3.5 py-1 rounded-full bg-blue-950/80 text-blue-300 text-[11px] font-bold uppercase tracking-wider border border-blue-600/40 flex items-center gap-1.5">
                      <Globe2 className="w-3 h-3 text-blue-400" />
                      <span>Individual Only</span>
                    </span>
                  ) : item.isEsports ? (
                    <span className="px-3.5 py-1 rounded-full bg-zinc-900 text-purple-300 text-[11px] font-bold uppercase tracking-wider border border-zinc-800 flex items-center gap-1.5">
                      <Gamepad2 className="w-3 h-3 text-purple-400" />
                      <span>Open Esports</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-zinc-900/80 text-zinc-400 text-[11px] font-medium border border-zinc-800">
                      Optional Competition
                    </span>
                  )}
                </div>

                {/* Track Eyebrow */}
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1.5">
                  {item.track}
                </div>

                {/* Bold Module Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>

                {/* Fluid Description */}
                <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Bottom Actions: Universal Register Modal Trigger */}
              <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedStudyGuide(item)}
                  className="group/btn text-sm font-semibold text-purple-400 hover:text-white transition-colors flex items-center gap-2 focus:outline-none cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="relative">
                    Study Guide & Syllabus &rarr;
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover/btn:w-full transition-all duration-300" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openRegistration({
                    delegationType: item.isIndividualOnly ? 'individual_school' : 'school_delegation'
                  })}
                  className="px-5 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold uppercase tracking-wider border border-purple-600/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* STUDY GUIDE MODAL */}
      <AnimatePresence>
        {selectedStudyGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={springPhysics}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-purple-600/40 shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                    Official Module Syllabus & Regulations
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                    {selectedStudyGuide.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudyGuide(null)}
                  className="p-2 rounded-full hover:bg-zinc-800 text-zinc-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5 text-xs sm:text-sm text-zinc-300">
                <div>
                  <h4 className="font-semibold text-purple-400 uppercase tracking-wider text-xs">Module Overview</h4>
                  <p className="mt-1.5 leading-relaxed">{selectedStudyGuide.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 uppercase tracking-wider text-xs">Round Structure & Timeline</h4>
                  <p className="mt-1.5 leading-relaxed bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                    Round 1: Rapid Theoretical/Analytical Gauntlet (60 Mins) &bull; Round 2: Advanced Practical Demonstration / Rig Setup (90 Mins).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 uppercase tracking-wider text-xs">Permitted Equipment</h4>
                  <p className="mt-1.5 leading-relaxed">
                    Standard scientific non-programmable calculators, analytical stationery, and approved laboratory coats for chemistry & biological rounds.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStudyGuide(null)}
                  className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const guide = selectedStudyGuide;
                    setSelectedStudyGuide(null);
                    openRegistration({
                      delegationType: guide.isIndividualOnly ? 'individual_school' : 'school_delegation'
                    });
                  }}
                  className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                >
                  Register in Module
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
