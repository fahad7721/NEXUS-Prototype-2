import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Users, Clock, CheckCircle2 } from 'lucide-react';
import { PRICING_TIERS, getAutoPricingTier } from '../data/olympiadData';
import { useRegistration } from '../context/RegistrationContext';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export function PricingCardsSection() {
  const { openRegistration } = useRegistration();
  const currentActiveTier = getAutoPricingTier();

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden border-t border-zinc-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPhysics}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Registration Pricing & Deadlines</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ...springPhysics }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Official Tiered Fee Schedule
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...springPhysics }}
            className="text-zinc-300 text-sm sm:text-base mt-4 leading-relaxed"
          >
            Rates are automatically determined based on the date your delegation applies. All contingents include entry to all 14 competitive tracks and all 4 evening socials.
          </motion.p>
        </div>

        {/* 3 Dynamic Tiers Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_TIERS.map((tier, index) => {
            const isCurrentActive = tier.id === currentActiveTier.id;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, ...springPhysics }}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isCurrentActive
                    ? 'bg-zinc-950 border-2 border-purple-500 shadow-[0_0_35px_rgba(147,51,234,0.3)] md:-translate-y-2 ring-1 ring-purple-400/30'
                    : 'bg-zinc-950/80 border border-zinc-800/90'
                }`}
              >
                {/* Active Highlight Banner */}
                {isCurrentActive && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Currently Active Rate</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {tier.name}
                    </h3>
                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                        isCurrentActive
                          ? 'bg-purple-950 text-purple-300 border border-purple-600/40'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-6">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{tier.deadline}</span>
                  </div>

                  {/* Clean, Transparent Price Structure */}
                  <div className="space-y-3.5 py-4 border-y border-zinc-800/80">
                    {/* 1. Delegate Fee FIRST (Prominent) */}
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                        Delegate Fee (Per Member)
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                          PKR {tier.delegateFeePerMember.toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-400">/ delegate</span>
                      </div>
                    </div>

                    {/* 2. Delegation Fee BELOW (Smaller than Delegate Fee) */}
                    <div className="pt-2 border-t border-zinc-900">
                      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block mb-0.5">
                        Delegation Fee
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-bold font-mono text-purple-300">
                          {tier.delegationFee === 0 ? 'FREE' : `PKR ${tier.delegationFee.toLocaleString()}`}
                        </span>
                        {tier.delegationFee === 0 ? (
                          <span className="text-[11px] text-emerald-400 font-semibold">(100% Waived)</span>
                        ) : (
                          <span className="text-[10px] text-zinc-400">/ team contingent</span>
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-400 pt-1">
                      Standard Contingent Size: <span className="text-white font-medium">5 to 8 Delegates</span>
                    </div>
                  </div>

                  {/* Date-based status indicator */}
                  <div className="pt-5 pb-2">
                    <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2.5 ${
                      isCurrentActive
                        ? 'bg-purple-950/40 border-purple-800/50 text-purple-300'
                        : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400'
                    }`}>
                      {isCurrentActive ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Applies to submissions received today</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                          <span>Scheduled window: {tier.deadline}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Single Universal Call-to-Action for Registration */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-purple-900/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Automated Date-Based Pricing</span>
            </div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
              Current Active Tier: {currentActiveTier.name}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Delegate fee is <span className="text-white font-medium">PKR {currentActiveTier.delegateFeePerMember.toLocaleString()}</span> / delegate &bull; Delegation fee is <span className="text-purple-300 font-medium">{currentActiveTier.delegationFee === 0 ? 'FREE' : `PKR ${currentActiveTier.delegationFee.toLocaleString()}`}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openRegistration()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(147,51,234,0.45)] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Users className="w-4 h-4 text-white" />
            <span>Register Your Delegation</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Footnote on Delegation Rules */}
        <div className="mt-8 text-center text-xs text-zinc-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
          <span>
            Official SPS Conclave Protocol: Delegations comprise 5 to 8 delegates. No on-spot registrations permitted.
          </span>
        </div>
      </div>
    </section>
  );
}
