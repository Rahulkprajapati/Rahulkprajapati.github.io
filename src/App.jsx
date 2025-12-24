import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-transparent transition-colors duration-300 relative">
          <BackgroundAnimation />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Experience />
                  <Contact />
                </>
              } />
              <Route path="/blogs" element={<Blogs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
