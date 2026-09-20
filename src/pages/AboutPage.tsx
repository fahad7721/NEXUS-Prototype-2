import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Sparkles,
  Award,
  Landmark,
  MapPin,
  Users,
  Compass,
  GraduationCap,
  Shield,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { LEADERSHIP_DATA } from '../data/olympiadData';
import { AUDIENCE_SOLUTIONS } from '../components/SolutionsSection';
import { SITE_CONFIG } from '../config/siteConfig';
import { useRegistration } from '../context/RegistrationContext';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

type AboutTab = 'us' | 'sadiq' | 'nexus';

export function AboutPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openRegistration } = useRegistration();

  // Read tab from query parameter (default to 'us')
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<AboutTab>(() => {
    if (tabParam === 'sadiq' || tabParam === 'nexus' || tabParam === 'us') {
      return tabParam;
    }
    return 'us';
  });

  useEffect(() => {
    if (tabParam === 'sadiq' || tabParam === 'nexus' || tabParam === 'us') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: AboutTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-black text-white">
      {/* Top Section Header & Segmented Tab Navigation */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Institutional Conclave & Heritage</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          {activeTab === 'us' && (
            <>
              The <span className="text-purple-400">Executive Council</span>
            </>
          )}
          {activeTab === 'sadiq' && (
            <>
              About <span className="text-purple-400">Sadiq Public School</span>
            </>
          )}
          {activeTab === 'nexus' && (
            <>
              About <span className="text-purple-400">Sadiq Nexus '26</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-2xl mx-auto">
          {activeTab === 'us' &&
            'Meet the Executive Council (EC) members steering governance, collegiate arenas, hospitality, and execution for Sadiq Nexus \'26.'}
          {activeTab === 'sadiq' &&
            'Seven decades of royal patronage, 450+ acres of historic red-brick heritage, and intellectual eminence since 1954.'}
          {activeTab === 'nexus' &&
            'Discover why Sadiq Nexus was built, its 14 multidimensional competitive arenas, and dedicated participation tracks.'}
        </p>

        {/* Segmented Pill Tabs */}
        <div className="pt-3 flex justify-center">
          <div className="p-1.5 rounded-full bg-zinc-950 border border-zinc-800 shadow-xl flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              id="about-tab-us"
              onClick={() => handleTabChange('us')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'us'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>About Us (EC)</span>
            </button>

            <button
              type="button"
              id="about-tab-sadiq"
              onClick={() => handleTabChange('sadiq')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'sadiq'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>About Sadiq (SPS)</span>
            </button>

            <button
              type="button"
              id="about-tab-nexus"
              onClick={() => handleTabChange('nexus')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'nexus'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>About Nexus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {/* ========================================================================= */}
        {/* TAB 1: ABOUT US (EXECUTIVE COUNCIL MEMBERS & ROLE DESCRIPTIONS)           */}
        {/* ========================================================================= */}
        {activeTab === 'us' && (
          <motion.div
            key="tab-us"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={springPhysics}
            className="space-y-16"
          >
            {/* Leadership Conclave Notice */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-purple-900/40 shadow-xl max-w-4xl mx-auto text-center space-y-2">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Collegiate Conclave Directorate</span>
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Executive Secretariat & Council Leadership
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                The Executive Council (EC) governs {SITE_CONFIG.name} under the high patron authority of the Principal and Board of Governors of Sadiq Public School. Each council officer stewards a vital directorate ensuring collegiate excellence, integrity, and safety.
              </p>
            </div>

            {/* Complete EC Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LEADERSHIP_DATA.map((member, idx) => (
                <motion.div
                  key={member.name}
                  id={`ec-member-${idx}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, ...springPhysics }}
                  className="rounded-3xl p-6 sm:p-7 bg-zinc-950/90 border border-zinc-900 hover:border-purple-600/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_25px_rgba(147,51,234,0.15)]"
                >
                  <div>
                    {/* Member Image with smooth hover & fallback */}
                    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-5 bg-zinc-900 shadow-md">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={`${member.name} - ${member.role}`}
                          className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center bg-purple-950/30 text-purple-300 font-serif text-4xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-950/80 border border-purple-600/40 text-purple-300 backdrop-blur-md">
                          {member.department || 'Executive Directorate'}
                        </span>
                      </div>
                    </div>

                    {/* Member Name */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {member.name}
                    </h3>

                    {/* Role Title */}
                    <div className="mt-1.5 inline-block text-xs font-semibold text-purple-400">
                      {member.role}
                    </div>

                    {/* Role Description */}
                    <p className="mt-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans border-t border-zinc-900 pt-3">
                      {member.description ||
                        `Responsible for executing collegiate mandates and overseeing operational directorates for ${SITE_CONFIG.name}.`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ABOUT SADIQ (THINGS ABOUT SPS WHICH WE ALREADY HAVE)               */}
        {/* ========================================================================= */}
        {activeTab === 'sadiq' && (
          <motion.div
            key="tab-sadiq"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={springPhysics}
            className="space-y-16"
          >
            {/* Editorial Split Hero: Heritage of Sadiq Public School */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springPhysics}
                className="lg:col-span-5 relative"
              >
                {/* Borderless High-Fidelity Architectural Image with Subtle Gradient Fade */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-950">
                  <img
                    src="/sps-main-building.jpg"
                    alt="Sadiq Public School Historic Red-Brick Architecture"
                    className="w-full h-[450px] sm:h-[520px] object-cover object-center filter contrast-115"
                    onError={(e) => {
                      if (!e.currentTarget.src.endsWith('/sps-campus.jpg')) {
                        e.currentTarget.src = '/sps-campus.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-800">
                    <div className="font-serif text-lg font-bold text-white">The Historic Sadiq Campus</div>
                    <div className="text-xs text-purple-400 mt-0.5 font-medium">
                      450+ Acres of Intellectual Sanctuary &bull; Established 1954
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springPhysics}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>The Legacy of Sadiq Public School</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Seven Decades of <span className="text-purple-400">Institutional Prestige</span> & Academic Mastery
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  <p>
                    Founded in February 1954 by His Highness Sir Sadiq Muhammad Khan V Abbasi, the revered Amir of Bahawalpur, Sadiq Public School was conceived as an institution of peerless eminence—a crucible where intellectual discipline, character, and leadership would be forged for generations.
                  </p>
                  <p>
                    Spread across an expansive 450-acre estate of historic colonial red-brick architecture, manicured sports fields, and advanced academic sanctuaries, Sadiq Public School stands as one of South Asia's largest and most prestigious residential institutions. For over seventy years, its hallowed halls have nurtured national leaders, scientists, jurists, and luminaries.
                  </p>
                  <p>
                    <strong>{SITE_CONFIG.name}</strong> marks the vanguard of this legacy. It bridges timeless institutional tradition with the frontiers of 21st-century discovery—bringing together the finest minds in pure sciences, robotics, artificial intelligence, structural engineering, and tactical strategy across Pakistan.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="https://sps.edu.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-7 py-3.5 border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2.5 shadow-[0_0_15px_rgba(147,51,234,0.2)]"
                  >
                    <span>Visit Official School Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </section>

            {/* Institutional Highlights */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/50 flex items-center justify-center text-purple-400">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Historic Colonial Estate</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  450+ acres featuring regal red-brick architecture, clock towers, and world-class collegiate science laboratories.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/50 flex items-center justify-center text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">70 Years of Luminaries</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Established in 1954 under royal charter, nurturing prime ministers, federal ministers, scientists, and military generals.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/50 flex items-center justify-center text-purple-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Bahawalpur's Crown Jewel</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Anchored in the historic princely city of Bahawalpur, serving as the cultural and intellectual epicenter of South Punjab.
                </p>
              </div>
            </section>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ABOUT NEXUS (WHAT SADIQ NEXUS IS BUILT FOR & ITS VISION)          */}
        {/* ========================================================================= */}
        {activeTab === 'nexus' && (
          <motion.div
            key="tab-nexus"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={springPhysics}
            className="space-y-16"
          >
            {/* Vision Manifesto */}
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/90 border border-purple-900/40 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-4xl space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Nexus Manifesto</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  What Is Sadiq Nexus '26 About?
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <strong>{SITE_CONFIG.name}</strong> is Pakistan's premier all-inclusive collegiate Olympiad. Conceived to break down educational silos, it gathers the nation's brightest young scholars across 14 multidimensional competitive arenas spanning pure sciences, robotics, artificial intelligence, structural engineering, bilingual debate, legal advocacy, mathematics speed circuits, photography, and competitive e-sports.
                </p>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Rooted in the timeless campus of Sadiq Public School, Bahawalpur, the Olympiad unites over 1,500 delegates from over 80 prestigious institutions nationwide for four days of intensive academic trials and electrifying signature evening socials.
                </p>

                {/* 4 Core Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-800">
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">14</div>
                    <div className="text-xs text-zinc-400">Academic Arenas</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">4 Nights</div>
                    <div className="text-xs text-zinc-400">Signature Socials</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">ACSEC XI</div>
                    <div className="text-xs text-zinc-400">Collegiate Protocol</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">450+</div>
                    <div className="text-xs text-zinc-400">Acres Sanctuary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* "Who Is Sadiq Nexus Built For?" - 6 Participation Tracks shifted from HomePage */}
            <div className="space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tailored Participation Tracks</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Who Is Sadiq Nexus '26 Built For?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  Whether assembling an elite 5–8 member school delegation, competing individually in solo arenas, or escorting students as a faculty mentor, find your dedicated solution below.
                </p>
              </div>

              {/* 6 Solutions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {AUDIENCE_SOLUTIONS.map((solution, index) => {
                  const Icon = solution.icon;
                  return (
                    <motion.div
                      key={solution.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, ...springPhysics }}
                      className="rounded-3xl p-7 bg-zinc-950 border border-zinc-900 hover:border-purple-600/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-purple-950/70 border border-purple-600/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-purple-300">
                            {solution.teamSize}
                          </span>
                        </div>

                        <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-widest block mb-1">
                          {solution.badge}
                        </span>

                        <h4 className="font-serif text-xl font-bold text-white mb-2">
                          {solution.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                          {solution.description}
                        </p>

                        <div className="space-y-2.5 pt-4 border-t border-zinc-900">
                          <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                            Key Inclusions:
                          </span>
                          {solution.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-start gap-2 text-xs text-zinc-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-zinc-900">
                        <button
                          type="button"
                          onClick={() => openRegistration({ delegationType: solution.delegationType })}
                          className="w-full py-3 rounded-full bg-zinc-900 hover:bg-purple-600 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-800 hover:border-purple-500"
                        >
                          <span>{solution.actionText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
