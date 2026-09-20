import { useState } from 'react';
import { X, Lock, Shield, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useSession } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/siteConfig';

export function PortalAuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, loginDemo, isLoading } = useSession();
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, accessCode);
    if (!res.success) {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-[#0d0914] border border-purple-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/40 bg-[#120c1d]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-600/40 flex items-center justify-center text-purple-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-purple-400 uppercase">
                {SITE_CONFIG.name} Guard
              </span>
              <h2 className="text-base font-bold text-white">Delegation Portal Access</h2>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-purple-900/30 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-zinc-300 leading-relaxed">
            The Conclave Portal is protected. Sign in with your registered Head Delegate or Faculty Advisor credentials to manage your contingent roster and room allotments.
          </p>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Institutional / Head Delegate Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="delegate@institution.edu.pk"
                className="w-full px-3.5 py-2.5 bg-[#160f24] border border-purple-800/40 rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Portal Passcode / Access Token *
              </label>
              <input
                type="password"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#160f24] border border-purple-800/40 rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-purple-900/30 disabled:opacity-50"
            >
              <Shield className="w-4 h-4" />
              <span>{isLoading ? 'Verifying Session...' : 'Authenticate & Enter Portal'}</span>
            </button>
          </form>

          {/* Quick Demo Access Buttons */}
          <div className="pt-3 border-t border-purple-900/30 space-y-2">
            <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider text-center">
              Quick Test Sign-In
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginDemo('head_delegate')}
                className="px-3 py-2 rounded-xl bg-[#160f24] border border-purple-800/40 hover:border-purple-500 text-[11px] text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Head Delegate</span>
              </button>
              <button
                type="button"
                onClick={() => loginDemo('faculty_advisor')}
                className="px-3 py-2 rounded-xl bg-[#160f24] border border-purple-800/40 hover:border-purple-500 text-[11px] text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Faculty Advisor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
