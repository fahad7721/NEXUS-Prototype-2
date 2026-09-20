import { Link } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import { SITE_CONFIG, ASSETS_CONFIG } from '../config/siteConfig';

export function Footer() {
  const { openRegistration } = useRegistration();

  return (
    <footer className="py-16 relative z-10 border-t border-zinc-900 bg-black text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <img
              src={ASSETS_CONFIG.logoUrl || '/logo.png'}
              alt={`${SITE_CONFIG.name} Logo`}
              className="w-10 h-12 object-contain rounded-lg filter drop-shadow-[0_0_10px_rgba(147,51,234,0.4)]"
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('/logo.jpg')) {
                  e.currentTarget.src = '/logo.jpg';
                }
              }}
            />
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
                {SITE_CONFIG.name}
              </div>
              <div className="text-xs text-purple-400 mt-0.5 font-medium">{SITE_CONFIG.location}</div>
              <div className="text-[11px] text-zinc-400 tracking-wider uppercase mt-0.5">Think &bull; Develop &bull; Innovate</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-purple-400 transition-colors">Categories</Link>
            <Link to="/about?tab=us" className="hover:text-purple-400 transition-colors">About Us</Link>
            <Link to="/about?tab=sadiq" className="hover:text-purple-400 transition-colors">About Sadiq</Link>
            <Link to="/about?tab=nexus" className="hover:text-purple-400 transition-colors">About Nexus</Link>
            <Link to="/socials" className="hover:text-purple-400 transition-colors">Socials</Link>
            <button
              type="button"
              onClick={() => openRegistration()}
              className="hover:text-purple-400 transition-colors font-semibold text-purple-300 cursor-pointer"
            >
              Register
            </button>
            <Link to="/conduct" className="hover:text-purple-400 transition-colors">Code of Conduct</Link>
            <Link to="/waiver" className="hover:text-purple-400 transition-colors">Liability Waiver</Link>
          </div>

          <div className="text-xs text-zinc-400 text-center md:text-right">
            <div className="text-white font-medium">{SITE_CONFIG.dates}</div>
            <div className="mt-1">{SITE_CONFIG.location}, Pakistan</div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>&copy; {SITE_CONFIG.eventYear} {SITE_CONFIG.host}. All rights reserved.</div>
          <div className="text-zinc-400">South Punjab's Premier Science & Technology Olympiad.</div>
        </div>
      </div>
    </footer>
  );
}
