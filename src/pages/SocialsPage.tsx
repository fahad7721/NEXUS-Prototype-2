import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Check,
  Trophy,
  Lock,
  Sparkles,
  Ticket
} from 'lucide-react';
import { SOCIALS_DATA } from '../data/olympiadData';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export function SocialsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 bg-black text-white">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPhysics}
          className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-purple-950/40 border border-purple-600/30 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Collegiate Camaraderie & After Hours</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ...springPhysics }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
        >
          The 4-Day <span className="text-purple-400">Social Programme</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...springPhysics }}
          className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed"
        >
          Every delegation registration fully includes all 4 evening socials.
          Non-delegate guest passes are also available for outside guests and alumni.
        </motion.p>

        <div className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-purple-950/40 border border-purple-600/35 text-white text-xs sm:text-sm font-semibold">
          <Check className="w-4 h-4 text-purple-400 stroke-[3]" />
          <span>Included automatically with every delegation registration.</span>
        </div>
      </div>

      {/* 4 Social Events - Borderless High-Fidelity Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {SOCIALS_DATA.map((event, idx) => {
          const EventIcon = event.icon;
          return (
            <motion.div
              key={event.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ...springPhysics }}
              className="rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 flex flex-col group shadow-2xl hover:border-purple-600/40 transition-colors"
            >
              {/* Full-Bleed Imagery with Cinematic Gradient Overlay */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2.5">
                  <span className="px-4 py-1.5 rounded-full bg-purple-600 text-white font-serif text-xs font-bold uppercase tracking-wider shadow-lg">
                    {event.day}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-semibold backdrop-blur-md border border-zinc-700">
                    {event.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 right-5 flex items-center gap-1.5 text-xs font-medium text-white bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-zinc-700">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-950/50 flex items-center justify-center text-purple-400">
                      <EventIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-3">
                    {event.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-900 flex items-center justify-between text-xs">
                  {event.isDelegateExclusive ? (
                    <span className="text-purple-400 font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Exclusively for Registered Delegations</span>
                    </span>
                  ) : (
                    <Link
                      to="/register"
                      className="text-purple-400 hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Guest Passes Available &rarr;</span>
                    </Link>
                  )}
                  <span className="text-zinc-500">SPS Historic Grounds</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Daylight Football Contingency */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-5xl mx-auto shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 flex items-center justify-center text-purple-400 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
              Daylight Athletic Contingency: The Nexus Football Cup
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
              Hosted on the lush SPS campus sports grounds as the scheduled daytime backup social in the event of inclement evening weather.
            </p>
          </div>
        </div>
        <Link
          to="/register"
          className="shrink-0 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.35)]"
        >
          Register for Conclave
        </Link>
      </div>
    </div>
  );
}
