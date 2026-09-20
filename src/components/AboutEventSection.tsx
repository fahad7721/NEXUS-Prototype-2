import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Landmark, Award, Shield, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export function AboutEventSection() {
  return (
    <section id="about" className="relative z-10 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Side-by-side layout directly on global black background - completely borderless */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Borderless High-Fidelity Architectural Visual */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-950">
              <img
                src="/sps-main-building.jpg"
                alt="Sadiq Public School Historic Red-Brick Architecture"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/sps-campus.jpg')) {
                    e.currentTarget.src = '/sps-campus.jpg';
                  }
                }}
              />
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-800">
                <div className="font-serif text-lg sm:text-xl font-bold text-white">
                  The Historic Sadiq Public School Campus
                </div>
                <div className="text-xs text-purple-400 mt-1 font-medium">
                  450+ Acres of Intellectual Sanctuary &bull; Established 1954
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: White text sitting directly on global black background */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>About The Conclave</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              South Punjab's Premier <span className="text-purple-400">Science & Technology</span> Olympiad
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              <p>
                {SITE_CONFIG.name} stands as South Punjab’s flagship collegiate science and innovation conclave, convening the sharpest young minds from prestigious schools and colleges across Pakistan onto the historic 450-acre grounds of Sadiq Public School, Bahawalpur.
              </p>
              <p>
                Founded in 1954 under royal charter by His Highness Sir Sadiq Muhammad Khan V Abbasi, Sadiq Public School has forged seven decades of national leadership. {SITE_CONFIG.name} carries this legacy forward into the frontiers of pure sciences, algorithmic computation, applied engineering, aerospace rocketry, and tactical problem-solving.
              </p>
              <p>
                Spanning four intense days ({SITE_CONFIG.dates}), contingents engage in 14 rigorous academic disciplines alongside an exhilarating social calendar—including collegiate laser combat, live musical concerts, traditional Qawali nights, and a distinguished black-tie awards gala.
              </p>
            </div>

            {/* Feature highlights without enclosed boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-zinc-300">
                  <strong className="text-white block">14 Olympiad Arenas</strong>
                  From the Sikandar Challenge to Robotics and Theoretical Physics.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-zinc-300">
                  <strong className="text-white block">4-Day Social Experience</strong>
                  Concert, Grand Qawali, Laser Tag, and Formal Gala included.
                </span>
              </div>
            </div>

            {/* Outlined Purple Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/categories"
                className="px-7 py-3.5 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-900/20 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.15)]"
              >
                <span>Explore Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="px-6 py-3.5 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <span>Read Full SPS Heritage &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
