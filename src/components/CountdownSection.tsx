import { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Conclave start date from centralized SITE_CONFIG
    const targetDate = new Date(SITE_CONFIG.countdownTarget).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, targetDate - now);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <section id="countdown" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Dark transparent container bg-zinc-900/50 */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>The Conclave Countdown</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                Time Remaining Until {SITE_CONFIG.name}
              </h2>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-zinc-300 bg-black/60 px-4 py-2 rounded-full border border-zinc-800">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{SITE_CONFIG.dates} &bull; {SITE_CONFIG.location}</span>
            </div>
          </div>

          {/* Four individual time boxes with matte black backgrounds and subtle purple borders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="bg-black rounded-2xl p-6 text-center border border-purple-600/30 shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:border-purple-500/60 transition-all duration-300 group"
              >
                <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  {block.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-zinc-400">
                  {block.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Delegation registrations and module allocations close strictly prior to convening.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
