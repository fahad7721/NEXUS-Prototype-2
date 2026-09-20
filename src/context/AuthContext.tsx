import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'head_delegate' | 'faculty_advisor' | 'secretariat';
  institution?: string;
  delegationId?: string;
  contingentSize?: number;
  token: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  isPortalDashboardOpen: boolean;
  openAuthModal: (intendedAction?: string) => void;
  closeAuthModal: () => void;
  openPortalDashboard: () => void;
  closePortalDashboard: () => void;
  login: (email: string, accessKey: string) => Promise<{ success: boolean; error?: string }>;
  loginDemo: (role?: 'head_delegate' | 'faculty_advisor') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, UserSession> = {
  head_delegate: {
    id: 'usr_hd_0918',
    name: 'Muhammad Fahad Afzal',
    email: 'head.delegate@acsec.edu.pk',
    role: 'head_delegate',
    institution: 'Aitchison College, Lahore',
    delegationId: 'NEXUS-27-AC889',
    contingentSize: 7,
    token: 'jwt_sec_token_fahad_2026',
  },
  faculty_advisor: {
    id: 'usr_fa_0421',
    name: 'Prof. Tariq Mahmud',
    email: 'advisor@sps.edu.pk',
    role: 'faculty_advisor',
    institution: 'Sadiq Public School (Host Delegation)',
    delegationId: 'NEXUS-27-SPS001',
    contingentSize: 8,
    token: 'jwt_sec_token_tariq_2026',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('sadiq_nexus_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPortalDashboardOpen, setIsPortalDashboardOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sadiq_nexus_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('sadiq_nexus_session');
    }
  }, [user]);

  const openAuthModal = (_intendedAction?: string) => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openPortalDashboard = () => {
    setIsPortalDashboardOpen(true);
  };

  const closePortalDashboard = () => {
    setIsPortalDashboardOpen(false);
  };

  const login = async (email: string, accessKey: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !accessKey) {
      setIsLoading(false);
      return { success: false, error: 'Please enter both email and institutional access key.' };
    }

    // Authenticate with sample valid credentials or any reasonable input
    const cleanEmail = email.trim().toLowerCase();
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email: cleanEmail,
      role: 'head_delegate',
      institution: 'Registered Collegiate Institution',
      delegationId: `NEXUS-27-${Math.floor(1000 + Math.random() * 9000)}`,
      contingentSize: 6,
      token: `jwt_token_${Math.random().toString(36).substring(2)}`,
    };

    setUser(newUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    setIsPortalDashboardOpen(true);
    return { success: true };
  };

  const loginDemo = (role: 'head_delegate' | 'faculty_advisor' = 'head_delegate') => {
    const demoUser = DEMO_USERS[role];
    setUser(demoUser);
    setIsAuthModalOpen(false);
    setIsPortalDashboardOpen(true);
  };

  const logout = () => {
    setUser(null);
    setIsPortalDashboardOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        isPortalDashboardOpen,
        openAuthModal,
        closeAuthModal,
        openPortalDashboard,
        closePortalDashboard,
        login,
        loginDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Session hook as requested: useSession()
export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
}
