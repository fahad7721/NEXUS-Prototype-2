import {
  Atom,
  Binary,
  FlaskConical,
  Dna,
  Hammer,
  Bot,
  Terminal,
  Rocket,
  Search,
  UtensilsCrossed,
  Lightbulb,
  Video,
  Globe2,
  Gamepad2,
  Compass,
  Crosshair,
  Music,
  Flame,
  Utensils,
  Shield,
  BedDouble,
  BookOpen
} from 'lucide-react';
import { ModuleData, Leader, SocialEvent, RuleSection } from '../types';

export const COMPULSORY_MODULE_IDS = ['sikandar-challenge', 'xponent'] as const;

export const MODULES_DATA: ModuleData[] = [
  // Compulsory Modules for Delegations
  {
    id: 'sikandar-challenge',
    title: 'The Sikandar Challenge',
    track: 'Pure Sciences & Math',
    icon: Binary,
    description: 'An elite Olympiad round testing mathematical proof deduction, discrete logic, number theory, and speed analytical problem solving.',
    isCompulsory: true,
    tag: 'Delegation Compulsory'
  },
  {
    id: 'xponent',
    title: 'Xponent (Theoretical Physics)',
    track: 'Pure Sciences & Math',
    icon: Atom,
    description: 'A theoretical and experimental physics gauntlet covering classical mechanics, optics, circuit analysis, and electrodynamics.',
    isCompulsory: true,
    tag: 'Delegation Compulsory'
  },

  // Individual-Only Module: PnA (Pure & Applied Sciences)
  {
    id: 'pna-science',
    title: 'PnA (Pure & Applied Sciences)',
    track: 'Pure Sciences & Math',
    icon: Globe2,
    description: 'Exclusive individual testing arena synthesizing pure foundational sciences, experimental logic, and applied diagnostic theory. Available only for Individual Delegates.',
    isIndividualOnly: true,
    tag: 'Individual Only'
  },

  // Esports: Competitive Gaming (Both Individual & Delegation)
  {
    id: 'competitive-gaming',
    title: 'E-sports (Competitive Gaming)',
    track: 'Core & Optional',
    icon: Gamepad2,
    description: 'Tactical multiplayer esports championship testing strategy, spatial coordination, reflex execution, and competitive resilience. Available for both Individual Delegates and Delegations.',
    isEsports: true,
    isOptional: true,
    tag: 'Esports Open Arena'
  },

  // Optional Competitions for Delegations
  {
    id: 'project-x-videography',
    title: 'Project X & Short Film',
    track: 'Core & Optional',
    icon: Video,
    description: 'A cinematic filmmaking and documentary module testing creative visual storytelling, camera composition, and rapid post-production editing.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'scavenger-hunt',
    title: 'Science Scavenger Hunt',
    track: 'Core & Optional',
    icon: Compass,
    description: 'High-speed cryptic clue solving and geo-tactical navigation across the 450-acre historic SPS campus grounds.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'sparkx-truss-wars',
    title: 'SparkX & Truss Wars',
    track: 'Engineering & Tech',
    icon: Hammer,
    description: 'Structural engineering trial demanding optimization of load-bearing truss bridges tested under progressive hydraulic stress.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'robo-x',
    title: 'Robo-X Mechatronics',
    track: 'Engineering & Tech',
    icon: Bot,
    description: 'Autonomous robotics trial requiring custom circuit design, PID sensor line-tracking, and obstacle traversal across an arena course.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'hackathon-ai-arena',
    title: 'Hackathon & AI Arena',
    track: 'Engineering & Tech',
    icon: Terminal,
    description: 'An intensive software development sprint focused on building algorithmic programs, machine learning models, and rapid functional prototypes.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'cholistan-skies',
    title: 'Cholistan Skies (Aerospace)',
    track: 'Engineering & Tech',
    icon: Rocket,
    description: 'Aerospace trial challenging participants to engineer aerodynamic rockets, pneumatic launch systems, and parachute recovery systems.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'cid',
    title: 'CID (Forensic Investigation)',
    track: 'Forensics & Cooking',
    icon: Search,
    description: 'Simulated crime scene investigation involving latent fingerprint recovery, ballistics trajectory geometry, and deductive interrogation.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'cooking-competition',
    title: 'Culinary Chemistry',
    track: 'Forensics & Cooking',
    icon: UtensilsCrossed,
    description: 'Gastronomic culinary tournament testing molecular gastronomy techniques, temperature balancing, and presentation.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'alchemist',
    title: 'Alchemist (Chemistry)',
    track: 'Pure Sciences & Math',
    icon: FlaskConical,
    description: 'A wet-laboratory chemistry tournament emphasizing precision titration, reaction mechanisms, and unknown compound synthesis.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'bioblade',
    title: 'BioBlade (Genetics)',
    track: 'Pure Sciences & Math',
    icon: Dna,
    description: 'Investigative life-sciences module exploring molecular genetics, CRISPR technology, anatomical dissection, and cellular biochemistry.',
    isOptional: true,
    tag: 'Optional Competition'
  },
  {
    id: 'innovation-expo',
    title: 'Innovation Expo',
    track: 'Core & Optional',
    icon: Lightbulb,
    description: 'Showcase of original physical working hardware inventions, sustainable green-technology devices, and commercial venture prototypes.',
    isOptional: true,
    tag: 'Optional Competition'
  }
];

export interface PricingTier {
  id: 'early_bird' | 'regular' | 'late';
  name: string;
  deadline: string;
  badge: string;
  startDate: string;
  endDate: string;
  delegationFee: number; // Free (0), 5000, 6000
  delegateFeePerMember: number; // 6000, 7000, 8000
  isActive?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'early_bird',
    name: 'Early Bird Tier',
    deadline: 'Active until Oct 15',
    badge: 'Active & Discounted',
    startDate: '2026-08-01T00:00:00+05:00',
    endDate: '2026-10-15T23:59:59+05:00',
    delegationFee: 0, // Free for early bird
    delegateFeePerMember: 6000, // PKR 6,000 per member
    isActive: true
  },
  {
    id: 'regular',
    name: 'Regular Tier',
    deadline: 'Oct 16 – Nov 25',
    badge: 'Upcoming Standard',
    startDate: '2026-10-16T00:00:00+05:00',
    endDate: '2026-11-25T23:59:59+05:00',
    delegationFee: 5000, // 5k delegation fee
    delegateFeePerMember: 7000,
    isActive: false
  },
  {
    id: 'late',
    name: 'Late Tier',
    deadline: 'Nov 26 – Final Deadline',
    badge: 'Final Window',
    startDate: '2026-11-26T00:00:00+05:00',
    endDate: '2026-12-15T23:59:59+05:00',
    delegationFee: 6000, // 6k delegation fee
    delegateFeePerMember: 8000,
    isActive: false
  }
];

export function getAutoPricingTier(currentDate: Date = new Date()): PricingTier {
  const cur = currentDate.getTime();
  const earlyEnd = new Date('2026-10-15T23:59:59+05:00').getTime();
  const regEnd = new Date('2026-11-25T23:59:59+05:00').getTime();

  if (cur <= earlyEnd) {
    return PRICING_TIERS[0];
  } else if (cur <= regEnd) {
    return PRICING_TIERS[1];
  } else {
    return PRICING_TIERS[2];
  }
}

export const LEADERSHIP_DATA: Leader[] = [
  {
    name: 'Muhammad Fahad Afzal',
    role: 'Chancellor',
    department: 'Secretariat Executive',
    description: 'Presides over the supreme executive mandate of Sadiq Nexus \'26, steering institutional patronage liaison with the Principal and Board of Governors of Sadiq Public School, ratifying constitutional bylaws, and directing strategic conclave protocol.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Aayan Amir',
    role: 'President',
    department: 'Secretariat Executive',
    description: 'Chief executive directing overall Olympiad operations, cross-directorate execution, national collegiate invitations, institutional delegation outreach, and ensuring operational alignment across all 14 arena directorates.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Daniyal Rasheed',
    role: 'Vice President',
    department: 'Secretariat Executive',
    description: 'Leads day-to-day internal administration, campus resource deployment, delegate logistics coordination, crisis management protocols, and multi-venue readiness across the 450-acre residential estate.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Director General',
    role: 'Director General & Academic Dean',
    department: 'Academics & Arenas',
    description: 'Oversees the collegiate syllabus design, rubric calibration, jury panels, and fair-play enforcement across all 14 pure sciences, robotics, computational intelligence, and humanities arenas.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Registrar & Head of Delegate Affairs',
    role: 'Director of Delegate Relations',
    department: 'Registrations & Conclave',
    description: 'Manages delegation accreditations, government ID document verifications (CNIC/B-Form), head delegate liaison, institutional invoicing, and on-ground helpdesk operations.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Head of Socials & Evening Conclaves',
    role: 'Director of Socials & Culture',
    department: 'Social Events & Protocols',
    description: 'Directs staging, artist hospitality, crowd safety, and night programming for the 4-night signature socials: Laser Tag Arena, The Nexus Concert, Grand Qawali Night, and the Formal Gala.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Chief of Campus Logistics & Housing',
    role: 'Director of Logistics',
    department: 'Campus Logistics',
    description: 'Supervises residential boarding facilities, shuttle transports connecting Bahawalpur terminals to campus, collegiate dining services, and arena equipment mobilization.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80'
  },
  {
    name: 'Head of Media & Digital Communications',
    role: 'Director of Media & Press',
    department: 'Broadcast & Media',
    description: 'Coordinates official photo/video coverage, live streaming feeds, press briefings, and digital social media channels documenting the historic Olympiad.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80'
  }
];

export const SOCIALS_DATA: SocialEvent[] = [
  {
    day: 'Day 1',
    title: 'Laser Tag Arena',
    time: '20:00 - 23:00',
    description: 'A tactical night combat simulation hosted inside a customized, neon-illuminated arena with digital sensor scoring and squad strategies.',
    icon: Crosshair,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
    badge: 'Opening Night'
  },
  {
    day: 'Day 2',
    title: 'The Nexus Concert',
    time: '19:30 - 23:30',
    description: 'A live headline musical showcase on the historic Sadiq Public School amphitheater lawn featuring celebrated artists and soundscapes.',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
    badge: 'Musical Showcase'
  },
  {
    day: 'Day 3',
    title: 'Grand Qawali Night',
    time: '20:00 - 00:00',
    description: 'An evening of classical Sufi poetry, traditional harmonium melodies, and transcendent vocal artistry under the winter Bahawalpur sky.',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
    badge: 'Heritage Evening'
  },
  {
    day: 'Day 4',
    title: 'Formal Dinner & Awards Gala',
    time: '19:30 - 22:30',
    description: 'The valedictory banquet honoring outstanding delegations, Best Delegate trophies, and closing speeches in the historic SPS dining hall.',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
    badge: 'Grand Finale',
    isDelegateExclusive: true
  }
];

export const RULE_SECTIONS: RuleSection[] = [
  {
    id: 'dress-code',
    title: 'Official Dress Code & Attire Standards',
    icon: Shield,
    summary: 'Decorum, modesty, and institutional elegance are foundational at Sadiq Public School.',
    points: [
      'Daytime Academic Modules: Western business formal (suit, tie, tailored blazer) or pristine traditional formal (white/cream Shalwar Kameez with structured dark waistcoat).',
      'Laboratory & Technical Rounds: Standard white laboratory coats must be worn inside chemical and biological research suites. Closed-toe footwear is mandatory.',
      'Evening Social Events: Elegant smart-casual or themed evening attire for Concert and Laser Tag; dignified traditional sherwani or formal waistcoat for Qawali Night.',
      'Closing Gala & Formal Dinner: Strict Black-Tie or Western Formal Suit / Traditional Formal Sherwani.'
    ]
  },
  {
    id: 'boarding-rules',
    title: 'Campus Hostels, Safety & Curfew Protocol',
    icon: BedDouble,
    summary: 'Residential guidelines guaranteeing safety, round-the-clock proctoring, and strict hostel segregation.',
    points: [
      'Strictly segregated boys and girls residential boarding houses with gated security and dedicated housemasters and matrons.',
      'Mandatory Campus Curfew: All delegates must return to their designated residential houses by 22:30 hours each evening.',
      'Delegates may not leave the Sadiq Public School perimeter without signed written authorization from their accompanying Faculty Advisor and the Secretariat.',
      '24/7 on-campus medical clinic and dedicated emergency response personnel available throughout the four days.'
    ]
  },
  {
    id: 'academic-integrity',
    title: 'Academic Integrity & Olympiad Ethics',
    icon: BookOpen,
    summary: 'Absolute zero tolerance for unauthorized collaboration, digital plagiarism, or unfair advantage.',
    points: [
      'Strict prohibition of unauthorized electronic devices during offline mathematical and scientific analytical rounds.',
      'Generative AI or online model assistance is explicitly prohibited in non-open-network modules; violations yield immediate contingent disqualification.',
      'Any altercation, abusive speech, or damage to Sadiq Public School historic property will result in immediate expulsion and institutional notification.'
    ]
  }
];
