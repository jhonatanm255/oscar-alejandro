import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AdminProvider } from './context/AdminContext';
import { initGsapDefaults } from './hooks/useGsapScroll';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expediciones from './components/Expediciones';
import Peliculas from './components/Peliculas';
import Historias from './components/Historias';
import Galeria from './components/Galeria';
import SobreMi from './components/SobreMi';
import AudienceSection from './components/AudienceSection';
import Partners from './components/Partners';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import AdminPanel from './pages/AdminPanel';

function PublicSite() {
  const [loading, setLoading] = useState(true);

  // Init GSAP globally
  useEffect(() => { initGsapDefaults(); }, []);

  // When loading finishes, we scroll to top just in case
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Global Cinematic Film Grain */}
        <div className="fixed inset-0 pointer-events-none bg-noise opacity-[0.035] mix-blend-multiply z-[9998]" />

        <div className="min-h-screen bg-background text-on-surface-variant font-body selection:bg-primary/30 selection:text-gray-900 relative z-0">
          <Navbar />
          <main>
            {/* Hero: dark video */}
            <Hero isReady={!loading} />
            <Expediciones />
            <Peliculas />
            <Historias />
            <Galeria />
            <AudienceSection />
            <SobreMi />
            <Partners />
            <CTA />
            <ContactForm />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

function Router() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#/admin');
  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return isAdmin ? <AdminPanel /> : <PublicSite />;
}

function App() {
  return (
    <AdminProvider>
      <Router />
    </AdminProvider>
  );
}

export default App;
