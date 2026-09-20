import React from 'react';

export type ModuleTrack =
  | 'All'
  | 'Pure Sciences & Math'
  | 'Engineering & Tech'
  | 'Forensics & Cooking'
  | 'Core & Optional';

export interface ModuleData {
  id: string;
  title: string;
  track: 'Pure Sciences & Math' | 'Engineering & Tech' | 'Forensics & Cooking' | 'Core & Optional';
  icon: React.ElementType;
  description: string;
  isCompulsory?: boolean; // Compulsory for delegations
  isIndividualOnly?: boolean; // PnA only for individuals
  isEsports?: boolean; // Esports open for both
  isOptional?: boolean; // Optional for delegations
  isCore?: boolean;
  tag?: string;
}

export interface Leader {
  name: string;
  role: string;
  image: string;
  description?: string;
  department?: string;
}

export interface SocialEvent {
  day: string;
  title: string;
  time: string;
  description: string;
  icon: React.ElementType;
  image: string;
  badge: string;
  isDelegateExclusive?: boolean;
}

export interface RuleSection {
  id: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  points: string[];
}

export type DelegationCategory =
  | 'school_delegation'
  | 'private_delegation'
  | 'individual_school'
  | 'individual_private';

export interface DelegateEntry {
  fullName: string;
  phone: string;
  cnicBForm: string;
  idProofFile?: File | string;
}

export interface RegistrationFormData {
  category: DelegationCategory;
  tier: 'early_bird' | 'regular' | 'late';
  
  // Delegation fields
  institutionName: string;
  teamName: string;
  delegationSize: 6 | 7 | 8;
  
  // Head delegate
  headDelegate: {
    fullName: string;
    phone: string;
    email: string;
    cnicBForm: string;
    idProofFile?: File | string;
  };
  
  // Additional delegates (5, 6, or 7 more depending on size 6, 7, 8)
  members: DelegateEntry[];
  
  // Staff Advisor
  staffAdvisor: {
    fullName: string;
    email: string;
    phone: string;
  };
  
  // Address
  address: {
    schoolAddress: string;
    city: string;
  };
  
  // Chaperone
  hasChaperone: boolean;
  chaperone?: {
    fullName: string;
    email: string;
    phone: string;
  };
  
  // Individual fields
  individual: {
    fullName: string;
    phone: string;
    email: string;
    cnicBForm: string;
    city: string;
    institutionName?: string;
    idProofFile?: File | string;
  };
  
  // Modules
  selectedModuleIds: string[];
  
  // Boarding
  includeBoarding: boolean;
}
