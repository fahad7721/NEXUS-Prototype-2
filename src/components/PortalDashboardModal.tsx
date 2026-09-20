import { X, ShieldCheck, Users, FileCheck, LogOut, Calendar, Award, ExternalLink } from 'lucide-react';
import { useSession } from '../context/AuthContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { useRegistration } from '../context/RegistrationContext';

export function PortalDashboardModal() {
  const { isPortalDashboardOpen, closePortalDashboard, user, logout } = useSession();
  const { openRegistration } = useRegistration();

  if (!isPortalDashboardOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-[#0d0914] border border-purple-900/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/40 bg-[#120c1d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-600/40 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-purple-400 uppercase">
                {SITE_CONFIG.name} Secretariat
              </span>
              <h2 className="text-lg font-bold text-white">Accredited Delegation Portal</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-red-400 hover:border-red-900 flex items-center gap-1.5 transition"
              title="Sign Out of Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={closePortalDashboard}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-purple-900/30 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* User Profile Card */}
          <div className="p-5 rounded-2xl bg-[#160f24] border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-900/50 text-[10px] font-bold text-purple-300 uppercase tracking-wide mb-1.5">
                Active Credential: {user.role === 'head_delegate' ? 'Head Delegate' : 'Faculty Advisor'}
              </div>
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <p className="text-xs text-zinc-300">{user.institution || 'Collegiate Delegation'}</p>
              <p className="text-[11px] font-mono text-purple-400 mt-1">Conclave ID: {user.delegationId}</p>
            </div>
            <div className="text-right sm:border-l sm:border-purple-900/40 sm:pl-6">
              <span className="text-xs text-zinc-400 block">Accreditation Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-sm mt-1">
                <ShieldCheck className="w-4 h-4" /> Cleared & Verified
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#120c1d] border border-purple-900/30">
              <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                <Users className="w-4 h-4" />
                <span>Contingent Roster</span>
              </div>
              <div className="text-xl font-bold text-white">{user.contingentSize || 7} Members</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">All CNIC scans verified</div>
            </div>

            <div className="p-4 rounded-xl bg-[#120c1d] border border-purple-900/30">
              <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                <Calendar className="w-4 h-4" />
                <span>Hostel Allotment</span>
              </div>
              <div className="text-xl font-bold text-white">SPS Hostels</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Boarding passes allocated</div>
            </div>

            <div className="p-4 rounded-xl bg-[#120c1d] border border-purple-900/30">
              <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                <Award className="w-4 h-4" />
                <span>Academic Arenas</span>
              </div>
              <div className="text-xl font-bold text-white">6 Modules</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Sikandar + Xponent + 4 Electives</div>
            </div>
          </div>

          {/* Actions & Roster Update */}
          <div className="p-4 rounded-xl bg-[#160f24] border border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-semibold text-white">Need to update your official delegation roster?</h4>
              <p className="text-[11px] text-zinc-400">Launch the registration wizard to modify team entries before the final roster lock.</p>
            </div>
            <button
              onClick={() => {
                closePortalDashboard();
                openRegistration();
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shrink-0 transition"
            >
              Open Registration Wizard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
