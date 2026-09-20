import { Link } from 'react-router-dom';
import { ArrowRight, Users, Sparkles, CheckCircle2, Shield, Calendar, MapPin } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';

export function FinalRegistrationCta() {
  const { openRegistration } = useRegistration();

  return (
    <section id="register-cta" className="relative z-10 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Glowing Ambient Backdrop */}
        <div className="relative p-8 sm:p-14 lg:p-16 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Subtle purple radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Conclave Registration 2026</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Ready to Compete at <span className="text-purple-400">Sadiq Nexus '26</span>?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">
              Form your delegation of 5 to 8 delegates or register as an individual competitor to represent your institution at South Punjab’s premier academic and technological olympiad.
            </p>

            {/* Institutional assurances */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-300 pt-2">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" /> 5-8 Delegates per Delegation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" /> All 4 Evening Socials Included
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" /> Optional SPS Campus Boarding
              </span>
            </div>

            {/* Glowing Purple Button - Universal Active Trigger */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openRegistration()}
                className="px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)] transition-all flex items-center gap-2.5 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Users className="w-4 h-4 text-white" />
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <Link
                to="/categories"
                className="px-7 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-zinc-700 transition-all flex items-center gap-2"
              >
                <span>View All Categories</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>19-22 December 2026</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Sadiq Public School, Bahawalpur</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Official Secretariat Registrar</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
