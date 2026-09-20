import { motion } from 'motion/react';
import {
  Users,
  GraduationCap,
  Cpu,
  Trophy,
  Camera,
  Home,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export const AUDIENCE_SOLUTIONS = [
  {
    id: 'school-delegations',
    icon: GraduationCap,
    badge: 'Contingent Category',
    title: 'School & College Delegations',
    teamSize: '5 to 8 Delegates',
    description:
      'Engineered for accredited secondary schools, grammar academies, and A-Level colleges aiming for the National Best Delegation Trophy.',
    benefits: [
      'Compulsory placement in core STEM, Arts, and Business arenas',
      'Free or subsidized delegation fee',
      'Dedicated faculty advisor and chaperone credentials',
      'Unified contingent portfolio and academic rankings'
    ],
    actionText: 'Register Delegation',
    delegationType: 'school_delegation' as const
  },
  {
    id: 'stem-innovators',
    icon: Cpu,
    badge: 'Engineering & STEM',
    title: 'STEM Innovators & Olympians',
    teamSize: 'Inter-Disciplinary',
    description:
      'Rigorous competitive arenas spanning Sci-Tech diagnostics, bridge load endurance, water rocketry, math speed-circuits, and business acumen.',
    benefits: [
      'Industrial-grade test rigs and laboratory environments',
      'Blind peer grading by leading university faculty',
      'High-impact medals and distinction certificates',
      'Hands-on collaborative problem-solving trials'
    ],
    actionText: 'Explore STEM Tracks',
    delegationType: 'school_delegation' as const
  },
  {
    id: 'debating-diplomacy',
    icon: Trophy,
    badge: 'Diplomacy & Oratory',
    title: 'Debaters & Model UN Diplomats',
    teamSize: 'Bilingual & MUN',
    description:
      'Debating chambers modeled after the United Nations General Assembly, alongside classical Urdu and English declamations in historic halls.',
    benefits: [
      'Authentic parliamentary rules of procedure & crisis updates',
      'National-tier executive board chairpersons and jurists',
      'Bilingual declamation trophies with independent adjudicators',
      'Gavel awards, best delegate citations, and team points'
    ],
    actionText: 'View MUN Arenas',
    delegationType: 'school_delegation' as const
  },
  {
    id: 'independent-talents',
    icon: Camera,
    badge: 'Individual Competitors',
    title: 'Independent Delegates (PnA & E-Sports)',
    teamSize: 'Solo Competitor',
    description:
      'Dedicated competitive pathways for single entrants seeking glory in Photography & Arts or National E-Sports tournaments without a full team.',
    benefits: [
      'Exempt from delegation fee',
      'Full access to all 4 evening entertainment socials',
      'Dedicated exhibition galleries for winning photography pieces',
      'Fast-track credentials and digital scoreboards'
    ],
    actionText: 'Register Solo Track',
    delegationType: 'individual_school' as const
  },
  {
    id: 'faculty-mentors',
    icon: Users,
    badge: 'Faculty & Patrons',
    title: 'Staff Advisors & Chaperones',
    teamSize: 'Institutional Leaders',
    description:
      'Comprehensive institutional protocols for headmasters, department chairs, and faculty chaperones escorting student contingents.',
    benefits: [
      'Accredited secretariat passes and private lounge access',
      'Reserved VIP seating at all 4 evening conclave galas',
      'Direct liaison with SPS senior administrative staff',
      'Official institutional appreciation plaques'
    ],
    actionText: 'Advisor Protocols',
    delegationType: 'school_delegation' as const
  },
  {
    id: 'residential-guests',
    icon: Home,
    badge: 'Residential Hospitality',
    title: 'Outstation Contingents & Boarders',
    teamSize: 'Optional Add-on',
    description:
      'All-inclusive historic boarding packages inside the 450-acre gated Sadiq Public School campus for teams traveling from across Pakistan.',
    benefits: [
      'Air-conditioned / heated historic hostel accommodations',
      'Four daily nutritious buffet meals curated by campus chefs',
      '24/7 fortified perimeter security and medical infirmary',
      'Zero commute time to competitive arenas and evening socials'
    ],
    actionText: 'Boarding Details',
    delegationType: 'school_delegation' as const
  }
];

export function SolutionsSection() {
  const { openRegistration } = useRegistration();

  return (
    <section
      id="solutions"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Subtle ambient gradient */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPhysics}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Participation Tracks</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ...springPhysics }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Who Is Sadiq Nexus '26 Built For?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...springPhysics }}
            className="text-zinc-300 text-sm sm:text-base mt-4 leading-relaxed"
          >
            Whether assembling an elite 5–8 member school delegation, competing individually in solo arenas, or guiding students as a faculty mentor, find your dedicated solution below.
          </motion.p>
        </div>

        {/* 6-Card Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AUDIENCE_SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <motion.div
                key={solution.id}
                id={`solution-${solution.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ...springPhysics }}
                className="rounded-3xl p-7 sm:p-8 bg-black/80 border border-zinc-800/90 hover:border-purple-600/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]"
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

                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    {solution.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {solution.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-zinc-900">
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                      Core Advantages:
                    </span>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => openRegistration({ delegationType: solution.delegationType })}
                    className="w-full py-3 px-4 rounded-full bg-zinc-900 hover:bg-purple-600 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider border border-zinc-800 hover:border-purple-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                  >
                    <span>{solution.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
