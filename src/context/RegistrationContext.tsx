import React, { createContext, useContext, useState } from 'react';

export type DelegationType =
  | 'school_delegation'
  | 'private_delegation'
  | 'individual_school'
  | 'individual_private';

export type PricingTierId = 'early_bird' | 'regular' | 'late';

interface OpenRegistrationOptions {
  delegationType?: DelegationType;
  tier?: PricingTierId;
}

interface RegistrationContextType {
  isRegistrationOpen: boolean;
  selectedTier: PricingTierId;
  selectedDelegationType: DelegationType | null;
  openRegistration: (options?: OpenRegistrationOptions) => void;
  closeRegistration: () => void;
  setIsRegistrationOpen: (open: boolean) => void;
  setSelectedTier: (tier: PricingTierId) => void;
  setSelectedDelegationType: (type: DelegationType | null) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTierId>('early_bird');
  const [selectedDelegationType, setSelectedDelegationType] = useState<DelegationType | null>(null);

  const openRegistration = (options?: OpenRegistrationOptions) => {
    if (options?.tier) {
      setSelectedTier(options.tier);
    }
    if (options?.delegationType) {
      setSelectedDelegationType(options.delegationType);
    }
    setIsRegistrationOpen(true);
  };

  const closeRegistration = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <RegistrationContext.Provider
      value={{
        isRegistrationOpen,
        selectedTier,
        selectedDelegationType,
        openRegistration,
        closeRegistration,
        setIsRegistrationOpen,
        setSelectedTier,
        setSelectedDelegationType
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
