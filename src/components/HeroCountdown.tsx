import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Conclave start date: 19 December 2026, 09:00:00 PKT
    const targetDate = new Date('2026-12-19T09:00:00').getTime();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ...springPhysics }}
      className="inline-flex items-center gap-3 sm:gap-6 px-5 sm:px-7 py-2.5 rounded-full bg-[#2D1154]/30 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] my-6 hover:border-[#D4AF37]/60 transition-colors"
    >
      <div className="flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">
        <Clock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        <span className="hidden sm:inline">Conclave Convenes In:</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 font-mono text-sm sm:text-base font-bold text-[#FDFBF7]">
        <div className="flex flex-col items-center">
          <span className="leading-tight text-[#FDFBF7]">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[9px] font-sans font-medium text-[#D4AF37]/80 uppercase tracking-widest">Days</span>
        </div>
        <span className="text-[#D4AF37]/60 text-xs font-light">:</span>
        <div className="flex flex-col items-center">
          <span className="leading-tight text-[#FDFBF7]">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[9px] font-sans font-medium text-[#D4AF37]/80 uppercase tracking-widest">Hours</span>
        </div>
        <span className="text-[#D4AF37]/60 text-xs font-light">:</span>
        <div className="flex flex-col items-center">
          <span className="leading-tight text-[#FDFBF7]">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[9px] font-sans font-medium text-[#D4AF37]/80 uppercase tracking-widest">Mins</span>
        </div>
        <span className="text-[#D4AF37]/60 text-xs font-light">:</span>
        <div className="flex flex-col items-center">
          <span className="leading-tight text-[#D4AF37]">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[9px] font-sans font-medium text-[#D4AF37]/80 uppercase tracking-widest">Secs</span>
        </div>
      </div>
    </motion.div>
  );
}
