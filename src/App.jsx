import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { installLinkTracking, trackPageview } from './lib/analytics';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import PlatformLab from './components/PlatformLab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';

// The blog route is rarely the landing page; keep it out of the main bundle
const Blogs = lazy(() => import('./components/Blogs'));

// Counts a page view on first load and on every client-side route change
const RouteTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    installLinkTracking();
  }, []);
  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <RouteTracker />
        <div className="min-h-screen bg-transparent transition-colors duration-300 relative isolate overflow-x-hidden">
          <BackgroundAnimation />
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <PlatformLab />
                  <Experience />
                  <Contact />
                </>
              } />
              <Route path="/blogs" element={<Suspense fallback={<div className="min-h-screen" />}><Blogs /></Suspense>} />
            </Routes>
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
