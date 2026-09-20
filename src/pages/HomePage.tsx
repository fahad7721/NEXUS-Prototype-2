import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Shield,
  ArrowRight,
  Sparkles,
  Compass,
  Music,
  GraduationCap
} from 'lucide-react';
import { CountdownSection } from '../components/CountdownSection';
import { PricingCardsSection } from '../components/PricingCardsSection';
import { AboutEventSection } from '../components/AboutEventSection';
import { HighlightsCarousel } from '../components/HighlightsCarousel';
import { FinalRegistrationCta } from '../components/FinalRegistrationCta';
import { useRegistration } from '../context/RegistrationContext';
import { SITE_CONFIG, ASSETS_CONFIG } from '../config/siteConfig';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export function HomePage() {
  const { openRegistration } = useRegistration();
  const [bgSrc, setBgSrc] = useState<string>(ASSETS_CONFIG.heroBackgroundUrl || '/sps-main-building.jpg');
  const [logoSrc, setLogoSrc] = useState<string>(ASSETS_CONFIG.logoUrl || '/logo.png');

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans antialiased overflow-x-hidden">
      {/* ========================================================================= */}
      {/* SECTION 1: THE HERO (CLEANED UP & BALANCED TYPOGRAPHY SIZING)             */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Background Image of School with Lower Opacity so it is clearly visible */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={bgSrc}
            alt="Sadiq Public School Historic Campus"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-95 scale-105 transition-transform duration-1000 ease-out opacity-45"
            onError={() => {
              if (bgSrc !== '/sps-main-building.jpg') {
                setBgSrc('/sps-main-building.jpg');
              }
            }}
          />
          {/* Subtle translucent dark overlay so text stays readable while school image shines through */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-purple-600/10 rounded-full blur-[140px]" />
        </div>

        {/* Hero Narrative Container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center text-center">
          {/* Replaceable Crest / Logo Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ...springPhysics }}
            className="mb-4"
          >
            <div className="p-3 sm:p-4 rounded-3xl bg-black/70 backdrop-blur-xl border border-purple-600/40 shadow-[0_0_35px_rgba(147,51,234,0.35)] flex items-center justify-center">
              <img
                src={logoSrc}
                alt={`${SITE_CONFIG.name} Official Logo`}
                className="w-14 h-14 sm:w-18 sm:h-18 object-contain rounded-2xl filter drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/logo.jpg')) {
                    e.currentTarget.src = '/logo.jpg';
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Sizing: Balanced, ultra-readable scale text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ...springPhysics }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
          >
            <span>SADIQ </span>
            <span className="text-white">NEXUS </span>
            <span className="text-purple-400 font-serif italic">'{SITE_CONFIG.edition}</span>
          </motion.h1>

          {/* Streamlined Single Structured Row of Badges & Info below heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ...springPhysics }}
            className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300 font-medium"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-600/30 text-purple-300 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{SITE_CONFIG.host} &bull; Est. {SITE_CONFIG.established}</span>
            </span>
            <span className="hidden sm:inline text-zinc-600">&bull;</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px]">
              <Calendar className="w-3 h-3 text-purple-400" />
              <span className="font-semibold text-white">{SITE_CONFIG.dates}</span>
            </span>
            <span className="hidden sm:inline text-zinc-600">&bull;</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-[11px]">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span className="font-semibold text-white">{SITE_CONFIG.location}</span>
            </span>
          </motion.div>

          {/* Tagline: Crisp Light Gray / Pure White */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ...springPhysics }}
            className="mt-4 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base font-sans text-zinc-400 tracking-[0.25em] uppercase font-semibold"
          >
            <span>THINK.</span>
            <span className="text-purple-400">&bull;</span>
            <span>DEVELOP.</span>
            <span className="text-purple-400">&bull;</span>
            <span>INNOVATE.</span>
          </motion.div>

          {/* Action-Oriented Gateways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ...springPhysics }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 max-w-4xl"
          >
            {/* Direct Gateway to Categories */}
            <Link
              to="/categories"
              className="px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Explore 14 Arenas</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            {/* Secondary Link: 4-Day Socials */}
            <Link
              to="/socials"
              className="px-6 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs uppercase tracking-wider border border-zinc-800 flex items-center gap-2 transition-all"
            >
              <Music className="w-3.5 h-3.5 text-purple-400" />
              <span>4-Day Socials</span>
            </Link>

            {/* Secondary Link: Heritage */}
            <Link
              to="/about"
              className="px-6 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs uppercase tracking-wider border border-zinc-800 flex items-center gap-2 transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>About SPS</span>
            </Link>
          </motion.div>
        </div>

        {/* Footnote on Patronage */}
        <div className="relative z-10 text-center pt-6 text-[11px] sm:text-xs text-zinc-500 flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-purple-500" />
          <span>{SITE_CONFIG.patronage}</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE COUNTDOWN TIMER                                            */}
      {/* ========================================================================= */}
      <CountdownSection />

      {/* ========================================================================= */}
      {/* SECTION 3: TIERED DATE-BASED PRICING CARDS (EARLY BIRD, REGULAR, LATE)    */}
      {/* ========================================================================= */}
      <PricingCardsSection />

      {/* ========================================================================= */}
      {/* SECTION 4: ABOUT THE EVENT                                                */}
      {/* ========================================================================= */}
      <AboutEventSection />

      {/* ========================================================================= */}
      {/* SECTION 5: HIGHLIGHTS & GALLERY (CAROUSEL)                                 */}
      {/* ========================================================================= */}
      <HighlightsCarousel />

      {/* ========================================================================= */}
      {/* SECTION 6: FINAL REGISTRATION CTA ("READY TO COMPETE?")                   */}
      {/* ========================================================================= */}
      <FinalRegistrationCta />
    </div>
  );
}
