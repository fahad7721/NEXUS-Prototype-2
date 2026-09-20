import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConstellationCanvas } from './components/ConstellationCanvas';
import { RegistrationModal } from './components/RegistrationModal';
import { PortalAuthModal } from './components/PortalAuthModal';
import { PortalDashboardModal } from './components/PortalDashboardModal';
import { RegistrationProvider } from './context/RegistrationContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { SocialsPage } from './pages/SocialsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LegalPage } from './pages/LegalPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <BrowserRouter>
          <div className="relative min-h-screen bg-black text-white font-sans antialiased selection:bg-purple-600 selection:text-white overflow-x-hidden">
            {/* Ambient Constellation Network Starfield */}
            <ConstellationCanvas />

            {/* Persistent Global Navigation */}
            <Navbar />

            {/* Dynamic Route Scroll Fix */}
            <ScrollToTop />

            {/* Global Multi-Step ACSEC XI Registration Modal (Triggered universally) */}
            <RegistrationModal />

            {/* Portal Authentication Guard & Accredited Dashboard Modals */}
            <PortalAuthModal />
            <PortalDashboardModal />

            {/* Modular Page Routing */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HomePage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/categories"
                element={
                  <>
                    <CategoriesPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <AboutPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/socials"
                element={
                  <>
                    <SocialsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <RegisterPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/conduct"
                element={
                  <>
                    <LegalPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/waiver"
                element={
                  <>
                    <LegalPage />
                    <Footer />
                  </>
                }
              />

              {/* Catch-all Fallback */}
              <Route
                path="*"
                element={
                  <>
                    <HomePage />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </RegistrationProvider>
    </AuthProvider>
  );
}
