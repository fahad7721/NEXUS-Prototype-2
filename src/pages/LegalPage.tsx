import { useLocation, Link } from 'react-router-dom';
import { Shield, FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';

const springPhysics = {
  type: 'spring',
  stiffness: 100,
  damping: 15
} as const;

export function LegalPage() {
  const location = useLocation();
  const isWaiver = location.pathname === '/waiver';

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springPhysics}
        className="p-6 sm:p-10 md:p-12 rounded-3xl bg-zinc-950 border border-zinc-900 shadow-2xl space-y-8"
      >
        {/* Integrated Navigation Bar inside the container grid */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <span className="text-[11px] text-zinc-500 font-mono">
            {SITE_CONFIG.name} &bull; Official Protocol
          </span>
        </div>

        {isWaiver ? (
          <>
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 flex items-center justify-center text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Waiver of Liability & Release</h1>
                <p className="text-xs text-purple-400 mt-0.5">Official {SITE_CONFIG.name} Conclave Legal Release</p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">1. Assumption of Risk</h3>
                <p>
                  Participation in {SITE_CONFIG.name} involves academic laboratories, engineering stress testing, rocketry, laser combat activities, and on-campus residential stay. Delegates and their institutions acknowledge the inherent nature of physical and laboratory activities conducted within SPS guidelines.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">2. Medical Authorization</h3>
                <p>
                  In the event of an injury or illness during the event ({SITE_CONFIG.dates}), the participant authorizes the Sadiq Public School Medical Staff and designated physicians to administer first-aid, emergency treatment, and hospital admission if deemed necessary.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">3. Institutional Likeness Release</h3>
                <p>
                  Delegates grant Sadiq Public School and the Secretariat the right to photograph, film, and broadcast recordings of Olympiad activities for educational, archival, and institutional promotional materials without royalty or claim.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">4. Disciplinary Compliance</h3>
                <p>
                  Any participant found violating hostel curfews, possessing unauthorized substances, or demonstrating academic misconduct shall be subject to immediate contingent disqualification without refund.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 flex items-center justify-center text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Code of Institutional Conduct</h1>
                <p className="text-xs text-purple-400 mt-0.5">{SITE_CONFIG.name} Delegation Standards & Behavioral Protocol</p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">1. Collegiate Decorum</h3>
                <p>
                  All delegates are expected to represent their home institutions with dignity, decorum, and intellectual sportsmanship. Harassment, verbal hostility, or vandalism will result in immediate contingent debarment.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">2. Academic Rigor & Anti-Plagiarism</h3>
                <p>
                  Theoretical solutions, robotic source code, and practical demonstrations must represent the contingent’s own authentic engineering. Any detected unauthorized communication or generative fraud will invoke automatic disqualification.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">3. Campus Access & Curfew</h3>
                <p>
                  Delegates residing in campus dormitories must strictly adhere to the 22:30 PKT curfew. Access to unassigned residential wings or off-limit administrative quadrangles is strictly prohibited.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-purple-400 text-base mb-2">4. Chaperone Oversight</h3>
                <p>
                  Accompanying faculty advisors and head delegates bear direct institutional responsibility for the welfare, punctuality, and conduct of their delegation members throughout the 4 days.
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
