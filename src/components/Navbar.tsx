import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Shield,
  FileText,
  ArrowRight,
  Menu,
  X,
  User,
  Users,
  Landmark,
  Compass
} from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { useSession } from '../context/AuthContext';
import { SITE_CONFIG, ASSETS_CONFIG } from '../config/siteConfig';

const springPhysics = {
  type: 'spring',
  stiffness: 110,
  damping: 16
} as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>(ASSETS_CONFIG.logoUrl || '/logo.png');

  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const legalDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { openRegistration } = useRegistration();
  const { isAuthenticated, openAuthModal, openPortalDashboard } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
      if (
        legalDropdownRef.current &&
        !legalDropdownRef.current.contains(event.target as Node)
      ) {
        setLegalDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setLegalDropdownOpen(false);
  }, [location.pathname, location.search]);

  const handlePortalClick = () => {
    if (isAuthenticated) {
      openPortalDashboard();
    } else {
      openAuthModal('portal');
    }
  };

  const isAboutActive = location.pathname === '/about';

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-20 transition-all duration-300">
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <nav
          id="global-navbar"
          className="w-full h-14 rounded-full bg-black/85 backdrop-blur-md border border-zinc-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.9)] px-4 sm:px-6 flex items-center justify-between transition-all duration-300"
        >
          {/* Logo & School Name - Replaceable Image (replaces SVG) */}
          <Link to="/" className="flex items-center gap-3 group text-left">
            <motion.div whileHover={{ rotate: 3, scale: 1.05 }} transition={springPhysics}>
              <img
                src={logoSrc}
                alt={`${SITE_CONFIG.name} Official Logo`}
                className="w-8 h-9 sm:w-9 sm:h-10 object-contain rounded-lg filter drop-shadow-[0_0_10px_rgba(147,51,234,0.4)]"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/logo.jpg')) {
                    e.currentTarget.src = '/logo.jpg';
                  }
                }}
              />
            </motion.div>
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase font-semibold text-purple-400 flex items-center gap-1.5">
                <span>{SITE_CONFIG.host}</span>
                <span className="hidden sm:inline text-zinc-600">&bull;</span>
                <span className="hidden sm:inline text-zinc-400">Est. {SITE_CONFIG.established}</span>
              </div>
              <div className="font-serif text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>SADIQ NEXUS</span>
                <span className="text-purple-400 font-sans text-xs font-semibold">'{SITE_CONFIG.edition}</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-zinc-300">
            {/* Home */}
            <Link
              to="/"
              className={`relative py-1 transition-colors hover:text-white ${
                location.pathname === '/' ? 'text-white font-semibold' : 'text-zinc-300'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                />
              )}
            </Link>

            {/* Categories */}
            <Link
              to="/categories"
              className={`relative py-1 transition-colors hover:text-white ${
                location.pathname === '/categories' ? 'text-white font-semibold' : 'text-zinc-300'
              }`}
            >
              Categories
              {location.pathname === '/categories' && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                />
              )}
            </Link>

            {/* About Us Dropdown with 3 Options: About Us, About Sadiq, About Nexus */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                type="button"
                id="about-us-dropdown-toggle"
                onClick={() => {
                  setAboutDropdownOpen(!aboutDropdownOpen);
                  setLegalDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 py-1 transition-colors hover:text-white focus:outline-none ${
                  isAboutActive ? 'text-white font-semibold' : 'text-zinc-300'
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                {isAboutActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                  />
                )}
              </button>

              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-3 w-64 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-2 z-50 flex flex-col gap-1 text-xs"
                  >
                    <Link
                      to="/about?tab=us"
                      onClick={() => setAboutDropdownOpen(false)}
                      className="w-full px-3.5 py-2.5 rounded-xl hover:bg-purple-950/50 text-left text-zinc-200 hover:text-white flex items-center gap-3 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">About Us</div>
                        <div className="text-[11px] text-zinc-400">EC members & role descriptions</div>
                      </div>
                    </Link>

                    <Link
                      to="/about?tab=sadiq"
                      onClick={() => setAboutDropdownOpen(false)}
                      className="w-full px-3.5 py-2.5 rounded-xl hover:bg-purple-950/50 text-left text-zinc-200 hover:text-white flex items-center gap-3 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">About Sadiq</div>
                        <div className="text-[11px] text-zinc-400">SPS 70-year heritage & campus</div>
                      </div>
                    </Link>

                    <Link
                      to="/about?tab=nexus"
                      onClick={() => setAboutDropdownOpen(false)}
                      className="w-full px-3.5 py-2.5 rounded-xl hover:bg-purple-950/50 text-left text-zinc-200 hover:text-white flex items-center gap-3 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">About Nexus</div>
                        <div className="text-[11px] text-zinc-400">What is Nexus & who it's built for</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Socials */}
            <Link
              to="/socials"
              className={`relative py-1 transition-colors hover:text-white ${
                location.pathname === '/socials' ? 'text-white font-semibold' : 'text-zinc-300'
              }`}
            >
              Socials
              {location.pathname === '/socials' && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded-full"
                />
              )}
            </Link>

            {/* Auth Guarded Portal Item */}
            <button
              type="button"
              id="portal-nav-link"
              onClick={handlePortalClick}
              className="py-1 transition-colors hover:text-purple-300 text-zinc-300 font-medium flex items-center gap-1.5"
            >
              <span>Portal</span>
              {isAuthenticated ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Session Active" />
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
                  Login
                </span>
              )}
            </button>

            {/* Legal / Resources Dropdown */}
            <div className="relative" ref={legalDropdownRef}>
              <button
                type="button"
                id="legal-dropdown-toggle"
                onClick={() => {
                  setLegalDropdownOpen(!legalDropdownOpen);
                  setAboutDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 py-1 transition-colors hover:text-white focus:outline-none ${
                  location.pathname === '/conduct' || location.pathname === '/waiver'
                    ? 'text-white font-semibold'
                    : 'text-zinc-300'
                }`}
              >
                <span>Legal/Resources</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${
                    legalDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {legalDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-56 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-2 z-50 flex flex-col gap-1 text-xs"
                  >
                    <Link
                      to="/conduct"
                      className="w-full px-4 py-2.5 rounded-xl hover:bg-purple-950/40 text-left text-zinc-200 hover:text-white flex items-center gap-2.5 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-purple-400" />
                      <span>Code of Conduct</span>
                    </Link>
                    <Link
                      to="/waiver"
                      className="w-full px-4 py-2.5 rounded-xl hover:bg-purple-950/40 text-left text-zinc-200 hover:text-white flex items-center gap-2.5 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span>Waiver of Liability</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Standardized Primary CTA: Single Register Now in Header */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="nav-register-cta"
              onClick={() => openRegistration()}
              className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-1.5"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={springPhysics}
              className="lg:hidden absolute top-20 left-4 right-4 rounded-3xl bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 p-5 space-y-3 shadow-2xl overflow-hidden z-50"
            >
              <div className="flex flex-col space-y-1.5 text-sm font-medium text-zinc-300">
                <Link
                  to="/"
                  className={`px-3.5 py-2.5 rounded-xl transition-colors ${
                    location.pathname === '/'
                      ? 'bg-purple-950/50 text-white font-semibold'
                      : 'hover:bg-zinc-900 text-zinc-300 hover:text-white'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/categories"
                  className={`px-3.5 py-2.5 rounded-xl transition-colors ${
                    location.pathname === '/categories'
                      ? 'bg-purple-950/50 text-white font-semibold'
                      : 'hover:bg-zinc-900 text-zinc-300 hover:text-white'
                  }`}
                >
                  Categories
                </Link>

                {/* Mobile About Us Sub-sections */}
                <div className="p-2.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 px-2 py-1">
                    About Sadiq Nexus
                  </div>
                  <Link
                    to="/about?tab=us"
                    className="px-3 py-2 rounded-xl text-left hover:bg-zinc-900 flex items-center gap-2.5 text-zinc-200 text-xs"
                  >
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>About Us (Executive Council)</span>
                  </Link>
                  <Link
                    to="/about?tab=sadiq"
                    className="px-3 py-2 rounded-xl text-left hover:bg-zinc-900 flex items-center gap-2.5 text-zinc-200 text-xs"
                  >
                    <Landmark className="w-4 h-4 text-purple-400" />
                    <span>About Sadiq (SPS Heritage)</span>
                  </Link>
                  <Link
                    to="/about?tab=nexus"
                    className="px-3 py-2 rounded-xl text-left hover:bg-zinc-900 flex items-center gap-2.5 text-zinc-200 text-xs"
                  >
                    <Compass className="w-4 h-4 text-purple-400" />
                    <span>About Nexus (Vision & Solutions)</span>
                  </Link>
                </div>

                <Link
                  to="/socials"
                  className={`px-3.5 py-2.5 rounded-xl transition-colors ${
                    location.pathname === '/socials'
                      ? 'bg-purple-950/50 text-white font-semibold'
                      : 'hover:bg-zinc-900 text-zinc-300 hover:text-white'
                  }`}
                >
                  Socials
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handlePortalClick();
                  }}
                  className="px-3.5 py-2.5 rounded-xl text-left hover:bg-zinc-900 flex items-center justify-between text-zinc-300 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    <span>Conclave Portal</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300">
                    {isAuthenticated ? 'Active' : 'Login'}
                  </span>
                </button>

                <div className="pt-2 border-t border-zinc-800 space-y-1">
                  <Link
                    to="/conduct"
                    className="px-3.5 py-2.5 rounded-xl text-left hover:bg-zinc-900 flex items-center gap-2 text-purple-400"
                  >
                    <Shield className="w-4 h-4" /> Code of Conduct
                  </Link>
                  <Link
                    to="/waiver"
                    className="px-3.5 py-2.5 rounded-xl text-left hover:bg-zinc-900 flex items-center gap-2 text-purple-400"
                  >
                    <FileText className="w-4 h-4" /> Waiver of Liability
                  </Link>
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openRegistration();
                  }}
                  className="w-full py-3 rounded-full bg-purple-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.35)]"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
