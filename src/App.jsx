import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import PlatformLab from './components/PlatformLab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <ThemeProvider>
      <Router>
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
              <Route path="/blogs" element={<Blogs />} />
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
