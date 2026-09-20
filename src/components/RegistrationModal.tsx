import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Building2,
  Users,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  Lock,
  Gamepad2,
  Atom,
  HelpCircle,
  CreditCard,
  Sparkles,
  BedDouble,
  FileText
} from 'lucide-react';
import { useRegistration, DelegationType, PricingTierId } from '../context/RegistrationContext';
import { MODULES_DATA, COMPULSORY_MODULE_IDS, PRICING_TIERS, getAutoPricingTier } from '../data/olympiadData';
import { ModuleData } from '../types';
import { SecureFileUpload, UploadedDocumentMeta } from './SecureFileUpload';

const springPhysics = {
  type: 'spring',
  stiffness: 120,
  damping: 18
} as const;

export function RegistrationModal() {
  const {
    isRegistrationOpen,
    closeRegistration,
    selectedTier,
    setSelectedTier,
    selectedDelegationType,
    setSelectedDelegationType
  } = useRegistration();

  // Wizard Step: 0 -> 1 -> 2 -> 3 (Summary) -> 4 (Success)
  const [step, setStep] = useState<number>(0);

  // Form State - Automatically defaults to date-based tier
  const autoTier = getAutoPricingTier();
  const [delegationType, setDelegationType] = useState<DelegationType>(
    selectedDelegationType || 'school_delegation'
  );
  const [tier, setTier] = useState<PricingTierId>(selectedTier || autoTier.id);

  // Delegation Info (5 to 8 delegates)
  const [institutionName, setInstitutionName] = useState('');
  const [teamName, setTeamName] = useState('Team A');
  const [delegationSize, setDelegationSize] = useState<5 | 6 | 7 | 8>(5);

  // Head Delegate
  const [headName, setHeadName] = useState('');
  const [headPhone, setHeadPhone] = useState('');
  const [headEmail, setHeadEmail] = useState('');
  const [headCnic, setHeadCnic] = useState('');
  const [headFileUploaded, setHeadFileUploaded] = useState(false);
  const [headFileDoc, setHeadFileDoc] = useState<UploadedDocumentMeta | null>(null);

  // Team Members (Dynamically populated up to delegationSize - 1, default 4 for size 5)
  const [members, setMembers] = useState<
    Array<{
      fullName: string;
      phone: string;
      cnicBForm: string;
      fileUploaded: boolean;
      fileDoc?: UploadedDocumentMeta | null;
    }>
  >([
    { fullName: '', phone: '', cnicBForm: '', fileUploaded: false, fileDoc: null },
    { fullName: '', phone: '', cnicBForm: '', fileUploaded: false, fileDoc: null },
    { fullName: '', phone: '', cnicBForm: '', fileUploaded: false, fileDoc: null },
    { fullName: '', phone: '', cnicBForm: '', fileUploaded: false, fileDoc: null }
  ]);

  // Staff Advisor
  const [advisorName, setAdvisorName] = useState('');
  const [advisorEmail, setAdvisorEmail] = useState('');
  const [advisorPhone, setAdvisorPhone] = useState('');

  // Address
  const [schoolAddress, setSchoolAddress] = useState('');
  const [city, setCity] = useState('');

  // Chaperone
  const [hasChaperone, setHasChaperone] = useState<boolean>(false);
  const [chaperoneName, setChaperoneName] = useState('');
  const [chaperoneEmail, setChaperoneEmail] = useState('');
  const [chaperonePhone, setChaperonePhone] = useState('');

  // Individual Fields
  const [indFullName, setIndFullName] = useState('');
  const [indPhone, setIndPhone] = useState('');
  const [indEmail, setIndEmail] = useState('');
  const [indCnic, setIndCnic] = useState('');
  const [indCity, setIndCity] = useState('');
  const [indInstitution, setIndInstitution] = useState('');
  const [indFileUploaded, setIndFileUploaded] = useState(false);
  const [indFileDoc, setIndFileDoc] = useState<UploadedDocumentMeta | null>(null);

  // Module Selection
  const [selectedModules, setSelectedModules] = useState<string[]>([...COMPULSORY_MODULE_IDS]);

  // Boarding
  const [includeBoarding, setIncludeBoarding] = useState<boolean>(false);

  // Validation Error & Reference ID
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string>('');

  // Sync with context changes
  useEffect(() => {
    if (selectedDelegationType) {
      setDelegationType(selectedDelegationType);
    }
  }, [selectedDelegationType]);

  useEffect(() => {
    if (selectedTier) {
      setTier(selectedTier);
    }
  }, [selectedTier]);

  // Adjust members count when delegationSize changes
  useEffect(() => {
    const requiredMemberCount = delegationSize - 1; // Head delegate is 1st member
    setMembers((prev) => {
      const current = [...prev];
      if (current.length < requiredMemberCount) {
        while (current.length < requiredMemberCount) {
          current.push({ fullName: '', phone: '', cnicBForm: '', fileUploaded: false, fileDoc: null });
        }
      } else if (current.length > requiredMemberCount) {
        return current.slice(0, requiredMemberCount);
      }
      return current;
    });
  }, [delegationSize]);

  // Reset or initialize modules when delegationType changes
  useEffect(() => {
    const isIndividual =
      delegationType === 'individual_school' || delegationType === 'individual_private';
    if (isIndividual) {
      // Individual can only choose pna-science or competitive-gaming
      setSelectedModules(['pna-science']);
    } else {
      // Delegation must have compulsory modules, cannot have pna-science
      setSelectedModules([...COMPULSORY_MODULE_IDS]);
    }
  }, [delegationType]);

  if (!isRegistrationOpen) return null;

  const activePricingTier = PRICING_TIERS.find((t) => t.id === tier) || PRICING_TIERS[0];
  const isIndividual =
    delegationType === 'individual_school' || delegationType === 'individual_private';

  // Fee calculation (Automatic date-based tier)
  const delegationFee = isIndividual ? 0 : activePricingTier.delegationFee;
  const memberFees = isIndividual
    ? activePricingTier.delegateFeePerMember
    : activePricingTier.delegateFeePerMember * delegationSize;
  const baseFee = delegationFee + memberFees;

  const boardingFee = includeBoarding ? (isIndividual ? 10000 : 10000 * delegationSize) : 0;
  const totalAmount = baseFee + boardingFee;

  // Handlers for Step Transitions
  const handleStep0Next = () => {
    setErrorMessage(null);
    setStep(1);
  };

  const handleStep1Next = () => {
    setErrorMessage(null);
    if (isIndividual) {
      if (!indFullName.trim()) {
        setErrorMessage('Please enter participant full legal name.');
        return;
      }
      if (!indPhone.trim()) {
        setErrorMessage('Please enter participant contact / WhatsApp phone number.');
        return;
      }
      if (!indEmail.trim() || !indEmail.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (!indCnic.trim()) {
        setErrorMessage('Please enter participant CNIC or B-Form number.');
        return;
      }
      if (!indCity.trim()) {
        setErrorMessage('Please enter city of residence.');
        return;
      }
      if (delegationType === 'individual_school' && !indInstitution.trim()) {
        setErrorMessage('Institution name is required for School Individual Delegates.');
        return;
      }
      if (!indFileUploaded) {
        setErrorMessage('Please upload and verify your CNIC / B-Form document scan.');
        return;
      }
    } else {
      // Delegation checks
      if (delegationType === 'school_delegation' && !institutionName.trim()) {
        setErrorMessage('Institution name is required for School Delegations.');
        return;
      }
      if (!headName.trim()) {
        setErrorMessage('Please enter Head Delegate full name.');
        return;
      }
      if (!headPhone.trim()) {
        setErrorMessage('Please enter Head Delegate contact phone number.');
        return;
      }
      if (!headEmail.trim() || !headEmail.includes('@')) {
        setErrorMessage('Please enter a valid Head Delegate email address.');
        return;
      }
      if (!headFileUploaded) {
        setErrorMessage('Please upload and verify the Head Delegate CNIC / B-Form document scan.');
        return;
      }
      if (!advisorName.trim()) {
        setErrorMessage('Please provide Staff Advisor / Mentor full name.');
        return;
      }
      if (!advisorPhone.trim() || !advisorEmail.trim()) {
        setErrorMessage('Please provide Staff Advisor contact phone and email.');
        return;
      }
      if (!city.trim()) {
        setErrorMessage('Please provide school/delegation city.');
        return;
      }
      if (hasChaperone && !chaperoneName.trim()) {
        setErrorMessage('Please provide accompanying chaperone name or toggle chaperone to No.');
        return;
      }
    }

    setStep(2);
  };

  const handleStep2Next = () => {
    setErrorMessage(null);
    if (isIndividual) {
      if (selectedModules.length === 0) {
        setErrorMessage('Please select at least one module (PnA or E-sports).');
        return;
      }
    } else {
      // Delegations must have compulsory modules and can select optional modules
      const hasCompulsory = COMPULSORY_MODULE_IDS.every((id) => selectedModules.includes(id));
      if (!hasCompulsory) {
        setErrorMessage('Core compulsory modules (The Sikandar Challenge & Xponent) are required.');
        return;
      }
      if (selectedModules.includes('pna-science')) {
        setErrorMessage('PnA is an Individual-Only module and cannot be chosen by Delegations.');
        return;
      }
    }
    setStep(3);
  };

  const handleFinalSubmit = () => {
    const prefix = isIndividual ? 'SN26-IND' : 'SN26-DEL';
    const randCode = Math.floor(100000 + Math.random() * 900000);
    const newRefId = `${prefix}-${randCode}`;
    setSubmittedRefId(newRefId);
    setStep(4);
  };

  const toggleOptionalModule = (modId: string) => {
    if (isIndividual) {
      // Only PnA or esports
      if (modId !== 'pna-science' && modId !== 'competitive-gaming') return;
      if (selectedModules.includes(modId)) {
        if (selectedModules.length === 1) {
          setErrorMessage('Individual delegates must select at least 1 module.');
          return;
        }
        setSelectedModules(selectedModules.filter((id) => id !== modId));
      } else {
        setSelectedModules([...selectedModules, modId]);
      }
      setErrorMessage(null);
      return;
    }

    // Delegations cannot choose PnA
    if (modId === 'pna-science') {
      setErrorMessage('Rule B: Delegations CANNOT register for PnA (Individual-Only).');
      return;
    }

    // Compulsory cannot be removed
    if (COMPULSORY_MODULE_IDS.includes(modId as any)) {
      return;
    }

    if (selectedModules.includes(modId)) {
      setSelectedModules(selectedModules.filter((id) => id !== modId));
    } else {
      setSelectedModules([...selectedModules, modId]);
    }
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={springPhysics}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-white"
      >
        {/* Modal Header */}
        <div className="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/70 border border-purple-600/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-widest uppercase text-purple-400">
                Sadiq Nexus '26 Conclave Portal
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Delegation Registration Wizard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Tier Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-600/40 text-[11px] text-purple-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>{activePricingTier.name} ({activePricingTier.badge})</span>
            </div>

            <button
              type="button"
              onClick={closeRegistration}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
              aria-label="Close Registration Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Stepper Bar (Steps 0, 1, 2, 3) */}
        {step < 4 && (
          <div className="px-6 sm:px-8 py-3 bg-zinc-900/40 border-b border-zinc-800/80 flex items-center justify-between text-xs">
            <div
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step >= 0 ? 'text-purple-400 font-bold' : 'text-zinc-500'
              }`}
              onClick={() => step > 0 && setStep(0)}
            >
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500 flex items-center justify-center text-[10px] text-purple-300">
                0
              </span>
              <span className="hidden sm:inline">Path Selection</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-zinc-800" />
            <div
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step >= 1 ? 'text-purple-400 font-bold' : 'text-zinc-500'
              }`}
              onClick={() => step > 1 && setStep(1)}
            >
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500 flex items-center justify-center text-[10px] text-purple-300">
                1
              </span>
              <span className="hidden sm:inline">Delegates & Details</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-zinc-800" />
            <div
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step >= 2 ? 'text-purple-400 font-bold' : 'text-zinc-500'
              }`}
              onClick={() => step > 2 && setStep(2)}
            >
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500 flex items-center justify-center text-[10px] text-purple-300">
                2
              </span>
              <span className="hidden sm:inline">Module Rules</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-zinc-800" />
            <div
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step === 3 ? 'text-purple-400 font-bold' : 'text-zinc-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500 flex items-center justify-center text-[10px] text-purple-300">
                3
              </span>
              <span className="hidden sm:inline">Summary & Review</span>
            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mx-6 sm:mx-8 mt-4 p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-6">
          {/* ========================================================================= */}
          {/* STEP 0: DELEGATION TYPE SELECTION (4 Explicit Pathways)                   */}
          {/* ========================================================================= */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Step 0 of 3 &bull; Delegation Pathway
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Choose Your Registration Pathway
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                  Select whether you are registering as a collegiate institution delegation, private delegation, or individual participant.
                </p>
              </div>

              {/* 4 Explicit Pathway Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. School Delegation */}
                <div
                  onClick={() => setDelegationType('school_delegation')}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    delegationType === 'school_delegation'
                      ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-950/70 text-purple-400 flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800 text-purple-300">
                        Team of 5–8
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      1. School Delegation
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                      Official institution-sponsored contingent representing a high school, grammar school, or college with a faculty advisor.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-purple-400 font-medium">
                    <span>Includes 4 Socials + Compulsory Tracks</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        delegationType === 'school_delegation'
                          ? 'text-purple-400 opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>

                {/* 2. Private Delegation */}
                <div
                  onClick={() => setDelegationType('private_delegation')}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    delegationType === 'private_delegation'
                      ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-950/70 text-purple-400 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800 text-purple-300">
                        Team of 5–8
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      2. Private Delegation
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                      Independent team formed across multiple schools or independent collegiate study groups without official school sponsorship.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-purple-400 font-medium">
                    <span>Includes 4 Socials + Compulsory Tracks</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        delegationType === 'private_delegation'
                          ? 'text-purple-400 opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>

                {/* 3. Individual School Delegate */}
                <div
                  onClick={() => setDelegationType('individual_school')}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    delegationType === 'individual_school'
                      ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-950/70 text-purple-400 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800 text-purple-300">
                        Single Delegate
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      3. Individual School Delegate
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                      Single participant affiliated with an academic school competing independently in PnA (Pure & Applied Sciences) and/or E-sports.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-purple-400 font-medium">
                    <span>PnA & E-sports Exclusive Pathway</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        delegationType === 'individual_school'
                          ? 'text-purple-400 opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>

                {/* 4. Private Individual Delegate */}
                <div
                  onClick={() => setDelegationType('individual_private')}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    delegationType === 'individual_private'
                      ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-950/70 text-purple-400 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800 text-purple-300">
                        Single Delegate
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">
                      4. Private Individual Delegate
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                      Independent competitor registering individually without institutional backing. Eligible exclusively for PnA and E-sports.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-purple-400 font-medium">
                    <span>PnA & E-sports Exclusive Pathway</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        delegationType === 'individual_private'
                          ? 'text-purple-400 opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Automated Pricing Tier Display */}
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Automated Date-Based Pricing Schedule</span>
                  </div>
                  <div className="text-xs text-zinc-300 mt-1">
                    Applied Tier: <strong className="text-white">{activePricingTier.name}</strong> ({activePricingTier.deadline}) &bull; Delegate Fee: PKR {activePricingTier.delegateFeePerMember.toLocaleString()} &bull; Delegation Fee: {activePricingTier.delegationFee === 0 ? 'FREE' : `PKR ${activePricingTier.delegationFee.toLocaleString()}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-600/40 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {activePricingTier.name} (Auto-Applied)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 1: DELEGATE & INSTITUTION DETAILS (ACSEC XI Form Layout)              */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Step 1 of 3 &bull; ACSEC XI Official Form Layout
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  {isIndividual ? 'Individual Delegate Particulars' : 'Delegation Roster & Institutional Particulars'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                  Provide verified contact credentials, government ID verification (CNIC/B-Form), and institutional documentation.
                </p>
              </div>

              {/* Individual Form View */}
              {isIndividual ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                        Participant Full Legal Name *
                      </label>
                      <input
                        type="text"
                        value={indFullName}
                        onChange={(e) => setIndFullName(e.target.value)}
                        placeholder="As shown on CNIC / B-Form"
                        className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={indPhone}
                        onChange={(e) => setIndPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={indEmail}
                        onChange={(e) => setIndEmail(e.target.value)}
                        placeholder="delegate@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                        CNIC or B-Form Number *
                      </label>
                      <input
                        type="text"
                        value={indCnic}
                        onChange={(e) => setIndCnic(e.target.value)}
                        placeholder="31202-xxxxxxx-x"
                        className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                        City of Residence *
                      </label>
                      <input
                        type="text"
                        value={indCity}
                        onChange={(e) => setIndCity(e.target.value)}
                        placeholder="e.g., Lahore, Bahawalpur, Karachi"
                        className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                        Institution Name {delegationType === 'individual_school' ? '*' : '(Optional)'}
                      </label>
                      <input
                        type="text"
                        value={indInstitution}
                        onChange={(e) => setIndInstitution(e.target.value)}
                        placeholder="School or College Name"
                        className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* CNIC Upload Handler */}
                  <SecureFileUpload
                    label="CNIC / B-Form Scanned Document"
                    isRequired={true}
                    value={indFileDoc}
                    documentCategory="INDIVIDUAL_CNIC"
                    onUploadSuccess={(meta) => {
                      setIndFileDoc(meta);
                      setIndFileUploaded(true);
                      setErrorMessage(null);
                    }}
                    onClear={() => {
                      setIndFileDoc(null);
                      setIndFileUploaded(false);
                    }}
                  />
                </div>
              ) : (
                /* Delegation Form View (School or Private) */
                <div className="space-y-6">
                  {/* Institution & Team Name & Delegation Size */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                          Institution Name {delegationType === 'school_delegation' ? '*' : '(Optional)'}
                        </label>
                        <input
                          type="text"
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          placeholder="e.g., Aitchison College Lahore"
                          className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
                          Team Designation / Name *
                        </label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="e.g., Team A, Team B, Alpha Squad"
                          className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Delegation Size Selector (Radio buttons: 5, 6, 7, or 8 delegates) */}
                    <div>
                      <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                        Delegation Size (5 to 8 Delegates) *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                        {([5, 6, 7, 8] as const).map((size) => (
                          <label
                            key={size}
                            className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between text-xs font-bold transition-all ${
                              delegationSize === size
                                ? 'bg-purple-950/60 border-purple-500 text-white shadow-[0_0_12px_rgba(147,51,234,0.3)]'
                                : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="radio"
                                name="delegationSize"
                                checked={delegationSize === size}
                                onChange={() => setDelegationSize(size)}
                                className="accent-purple-600 cursor-pointer"
                              />
                              <span>{size} Delegates</span>
                            </div>
                            <span className="text-[10px] text-purple-400 font-mono">
                              PKR {(activePricingTier.delegationFee + size * activePricingTier.delegateFeePerMember).toLocaleString()}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Head Delegate Particulars */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>Head Delegate (Delegate 1 of {delegationSize})</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          value={headName}
                          onChange={(e) => setHeadName(e.target.value)}
                          placeholder="Head Delegate Full Name"
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={headPhone}
                          onChange={(e) => setHeadPhone(e.target.value)}
                          placeholder="+92 300 0000000"
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={headEmail}
                          onChange={(e) => setHeadEmail(e.target.value)}
                          placeholder="headdelegate@school.edu.pk"
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          CNIC / B-Form Number *
                        </label>
                        <input
                          type="text"
                          value={headCnic}
                          onChange={(e) => setHeadCnic(e.target.value)}
                          placeholder="31202-xxxxxxx-x"
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Secure File Upload Field */}
                    <SecureFileUpload
                      label="Head Delegate CNIC / B-Form Scan"
                      isRequired={true}
                      value={headFileDoc}
                      documentCategory="HEAD_DELEGATE_CNIC"
                      onUploadSuccess={(meta) => {
                        setHeadFileDoc(meta);
                        setHeadFileUploaded(true);
                        setErrorMessage(null);
                      }}
                      onClear={() => {
                        setHeadFileDoc(null);
                        setHeadFileUploaded(false);
                      }}
                    />
                  </div>

                  {/* Dynamically Rendered Team Members (Delegates 2 through N) */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Additional Delegation Members ({delegationSize - 1} Delegates)</span>
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        Roster: 1 Head + {delegationSize - 1} Members = {delegationSize} Total
                      </span>
                    </div>

                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {members.map((member, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-black border border-zinc-800/90 space-y-3"
                        >
                          <div className="text-xs font-semibold text-purple-400">
                            Delegate {idx + 2} of {delegationSize}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={member.fullName}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[idx].fullName = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="Full Name"
                              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                            <input
                              type="tel"
                              value={member.phone}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[idx].phone = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="Phone Number"
                              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                            <input
                              type="text"
                              value={member.cnicBForm}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[idx].cnicBForm = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="CNIC / B-Form"
                              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <SecureFileUpload
                            label={`Delegate ${idx + 2} CNIC / B-Form Scan`}
                            isRequired={false}
                            value={member.fileDoc || null}
                            documentCategory={`DELEGATE_${idx + 2}_CNIC`}
                            hint="Optional at initial registration (PDF/JPG/PNG max 5MB)"
                            onUploadSuccess={(meta) => {
                              const newMembers = [...members];
                              newMembers[idx].fileDoc = meta;
                              newMembers[idx].fileUploaded = true;
                              setMembers(newMembers);
                            }}
                            onClear={() => {
                              const newMembers = [...members];
                              newMembers[idx].fileDoc = null;
                              newMembers[idx].fileUploaded = false;
                              setMembers(newMembers);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Staff Advisor & Address Details */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>Staff Advisor & Institutional Address</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Advisor Full Name *
                        </label>
                        <input
                          type="text"
                          value={advisorName}
                          onChange={(e) => setAdvisorName(e.target.value)}
                          placeholder="Faculty Advisor Name"
                          className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Advisor Email *
                        </label>
                        <input
                          type="email"
                          value={advisorEmail}
                          onChange={(e) => setAdvisorEmail(e.target.value)}
                          placeholder="advisor@institution.edu"
                          className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          Advisor Phone *
                        </label>
                        <input
                          type="tel"
                          value={advisorPhone}
                          onChange={(e) => setAdvisorPhone(e.target.value)}
                          placeholder="+92 300 1234567"
                          className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          School Physical Address *
                        </label>
                        <input
                          type="text"
                          value={schoolAddress}
                          onChange={(e) => setSchoolAddress(e.target.value)}
                          placeholder="Campus street address"
                          className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g., Bahawalpur, Multan, Lahore"
                          className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Chaperone Toggle (ACSEC XI requirement) */}
                    <div className="pt-2 border-t border-zinc-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-white">
                            Will a chaperone accompany your delegation?
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            Required for residential delegations with female delegates or junior scholars.
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setHasChaperone(false)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              !hasChaperone
                                ? 'bg-zinc-800 text-white border border-zinc-700'
                                : 'text-zinc-500 hover:text-white'
                            }`}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() => setHasChaperone(true)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              hasChaperone
                                ? 'bg-purple-600 text-white'
                                : 'text-zinc-500 hover:text-white'
                            }`}
                          >
                            Yes
                          </button>
                        </div>
                      </div>

                      {hasChaperone && (
                        <div className="mt-3 p-3 rounded-xl bg-black border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={chaperoneName}
                            onChange={(e) => setChaperoneName(e.target.value)}
                            placeholder="Chaperone Name"
                            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                          <input
                            type="email"
                            value={chaperoneEmail}
                            onChange={(e) => setChaperoneEmail(e.target.value)}
                            placeholder="Chaperone Email"
                            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                          <input
                            type="tel"
                            value={chaperonePhone}
                            onChange={(e) => setChaperonePhone(e.target.value)}
                            placeholder="Chaperone Phone"
                            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: MODULE SELECTION & CATEGORY RULES LOGIC                            */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Step 2 of 3 &bull; Module Rules Engine
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  {isIndividual ? 'Individual Academic Disciplines' : 'Delegation Competition Portfolio'}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                  Automated category filtering enforces Olympiad regulations according to your delegation classification.
                </p>
              </div>

              {/* Specific Rule Indicators */}
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-600/30 space-y-1.5 text-xs text-purple-300">
                {isIndividual ? (
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Rule A (Individual Delegates):</strong> You may register exclusively for{' '}
                      <strong>PnA (Pure & Applied Sciences)</strong> and/or <strong>E-sports (Competitive Gaming)</strong>. All team-only modules are locked.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Rule B (Delegations):</strong> Delegations CANNOT register for PnA (Individual-Only). PnA is locked.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Rule C (Compulsory vs. Optional):</strong> Core competition modules (The Sikandar Challenge & Xponent) are automatically assigned. Select optional modules below to augment your schedule.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modules List Grid */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {MODULES_DATA.map((mod) => {
                  const isCompulsoryForTeam =
                    !isIndividual && COMPULSORY_MODULE_IDS.includes(mod.id as any);
                  const isPnA = mod.id === 'pna-science';
                  const isEsports = mod.id === 'competitive-gaming';

                  // Rule A: Individual can only view/register for PnA and Esports
                  const isIndividualAllowed = isPnA || isEsports;
                  const isTeamAllowed = !isPnA;

                  const isEnabled = isIndividual ? isIndividualAllowed : isTeamAllowed;
                  const isSelected = selectedModules.includes(mod.id);
                  const ModIcon = mod.icon;

                  return (
                    <div
                      key={mod.id}
                      onClick={() => isEnabled && !isCompulsoryForTeam && toggleOptionalModule(mod.id)}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        !isEnabled
                          ? 'opacity-40 bg-zinc-950 border-zinc-900 cursor-not-allowed'
                          : isSelected
                          ? 'bg-purple-950/50 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.25)] cursor-pointer'
                          : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          <ModIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-sm sm:text-base font-bold text-white">
                              {mod.title}
                            </h4>
                            {isCompulsoryForTeam && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-300 border border-purple-600/50 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5" /> Compulsory
                              </span>
                            )}
                            {isPnA && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-600/40">
                                Individual Only
                              </span>
                            )}
                            {isEsports && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-purple-300">
                                Open Arena
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-1 max-w-xl">
                            {mod.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 ml-4">
                        {!isEnabled ? (
                          <span className="text-[10px] text-zinc-600 uppercase font-semibold">
                            Locked
                          </span>
                        ) : isCompulsoryForTeam ? (
                          <span className="text-[11px] font-bold text-purple-400">Enrolled</span>
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'border-zinc-700 bg-zinc-900'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: SUMMARY & CONFIRMATION                                            */}
          {/* ========================================================================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Step 3 of 3 &bull; Final Review & Itemized Audit
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Registration Summary & Verification
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                  Carefully audit your registration details, assigned modules, uploaded documentation status, and calculated financial schedule.
                </p>
              </div>

              {/* Itemized Breakdown Container */}
              <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-5">
                {/* Pathway and Team Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                      Pathway
                    </span>
                    <span className="font-bold text-white text-sm">
                      {delegationType === 'school_delegation' && 'School Delegation (5–8)'}
                      {delegationType === 'private_delegation' && 'Private Delegation (5–8)'}
                      {delegationType === 'individual_school' && 'Individual School Delegate'}
                      {delegationType === 'individual_private' && 'Private Individual Delegate'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                      {isIndividual ? 'Delegate Name' : 'Institution / Squad'}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {isIndividual
                        ? indFullName || 'Individual Delegate'
                        : `${institutionName || 'Private Group'} (${teamName})`}
                    </span>
                  </div>
                </div>

                {/* Team Roster / Contact Audit */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                      {isIndividual ? 'City' : 'Contingent Size'}
                    </span>
                    <span className="text-white font-medium">
                      {isIndividual ? indCity : `${delegationSize} Delegates`}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                      {isIndividual ? 'Contact Phone' : 'Head Delegate Contact'}
                    </span>
                    <span className="text-white font-medium">
                      {isIndividual ? indPhone : `${headName} (${headPhone})`}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-semibold">
                      {isIndividual ? 'CNIC / B-Form' : 'Staff Advisor'}
                    </span>
                    <span className="text-white font-medium">
                      {isIndividual ? indCnic : `${advisorName || 'N/A'}`}
                    </span>
                  </div>
                </div>

                {/* Enrolled Modules */}
                <div className="pb-4 border-b border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    Enrolled Modules & Competitions ({selectedModules.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedModules.map((mId) => {
                      const mod = MODULES_DATA.find((m) => m.id === mId);
                      return (
                        <span
                          key={mId}
                          className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-600/40 text-purple-300 text-xs font-medium"
                        >
                          {mod?.title || mId}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Uploaded Documents Status */}
                <div className="pb-4 border-b border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">Government ID Documentation</span>
                    <div className="text-[11px] text-zinc-400">
                      {isIndividual
                        ? indFileDoc
                          ? `${indFileDoc.fileName} (${(indFileDoc.fileSize / 1024).toFixed(0)} KB)`
                          : 'Pending Document Attachment'
                        : `${(headFileDoc ? 1 : 0) + members.filter((m) => m.fileUploaded).length} of ${delegationSize} CNIC / B-Form scans verified`}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-[11px] font-bold inline-flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    Verified Storage Keys
                  </span>
                </div>

                {/* Optional SPS Campus Boarding & Dining */}
                <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-950/70 text-purple-400 flex items-center justify-center">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        SPS On-Campus Boarding & Dining Package
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Includes AC dormitories, 3 daily meals, segregated wings & 24/7 security (PKR 10,000 / person).
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer bg-zinc-900 px-4 py-2 rounded-full border border-zinc-700">
                    <input
                      type="checkbox"
                      checked={includeBoarding}
                      onChange={(e) => setIncludeBoarding(e.target.checked)}
                      className="accent-purple-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-white">Include</span>
                  </label>
                </div>

                {/* Fee Calculation Breakdown */}
                <div className="pt-2 space-y-2 text-xs">
                  {isIndividual ? (
                    <div className="flex justify-between text-zinc-400">
                      <span>Individual Delegate Fee ({activePricingTier.name}):</span>
                      <span className="font-mono text-white">PKR {memberFees.toLocaleString()}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-zinc-400">
                        <span>
                          Delegate Fees ({delegationSize} &times; PKR {activePricingTier.delegateFeePerMember.toLocaleString()}):
                        </span>
                        <span className="font-mono text-white">PKR {memberFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Delegation Fee ({activePricingTier.name}):</span>
                        <span className="font-mono text-white">
                          {activePricingTier.delegationFee === 0 ? 'FREE' : `PKR ${activePricingTier.delegationFee.toLocaleString()}`}
                        </span>
                      </div>
                    </>
                  )}

                  {includeBoarding && (
                    <div className="flex justify-between text-purple-400">
                      <span>
                        SPS On-Campus Residential Hostel & Dining (
                        {isIndividual ? '1 Person' : `${delegationSize} Persons`} \u00d7 PKR 10,000):
                      </span>
                      <span className="font-mono font-bold">PKR {boardingFee.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-zinc-800 text-sm sm:text-base font-bold text-white">
                    <span>Total Payable Amount:</span>
                    <span className="font-mono text-purple-400 text-lg sm:text-xl">
                      PKR {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: SUBMITTED SUCCESS VIEW                                            */}
          {/* ========================================================================= */}
          {step === 4 && (
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-purple-950/70 border border-purple-500 text-purple-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(147,51,234,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                  Registration Successfully Logged
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  Welcome to Sadiq Nexus '26
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto mt-2 leading-relaxed">
                  Your formal registration dossier has been submitted to the Sadiq Public School Secretariat.
                  An official confirmation packet and verified bank voucher have been dispatched to your email.
                </p>
              </div>

              {/* Reference ID Box */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-600/40 max-w-sm mx-auto">
                <div className="text-[11px] text-purple-400 uppercase tracking-widest font-semibold">
                  Official Conclave Reference ID
                </div>
                <div className="font-mono text-2xl font-bold text-white mt-1 tracking-wider">
                  {submittedRefId}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={closeRegistration}
                  className="px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer (Steps 0, 1, 2, 3) */}
        {step < 4 && (
          <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setStep(step - 1);
                }}
                className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={closeRegistration}
                className="px-5 py-2.5 text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
            )}

            <div>
              {step === 0 && (
                <button
                  type="button"
                  onClick={handleStep0Next}
                  className="px-7 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.35)] flex items-center gap-2"
                >
                  <span>Proceed to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {step === 1 && (
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="px-7 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.35)] flex items-center gap-2"
                >
                  <span>Select Modules</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="px-7 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.35)] flex items-center gap-2"
                >
                  <span>Review Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Registration</span>
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
