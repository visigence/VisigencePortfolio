import React, { useState, useEffect } from 'react';
import { Braces, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-black/80 backdrop-blur-md shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a 
            href="#" 
            className="flex items-center space-x-2 text-white"
            aria-label="Visigence Home"
          >
            <Braces className="h-8 w-8 text-accent-400" />
            <span className="text-xl font-orbitron font-bold">Visigence</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-accent-400 transition-colors">Home</a>
            <a href="#portfolio" className="text-white hover:text-accent-400 transition-colors">Portfolio</a>
            <a href="#about" className="text-white hover:text-accent-400 transition-colors">About</a>
            <a href="#contact" className="text-white hover:text-accent-400 transition-colors">Contact</a>
            <button className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-md transition-colors">
              Get in Touch
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-white hover:text-accent-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#portfolio" 
                className="text-white hover:text-accent-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-accent-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-accent-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <button className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-md transition-colors w-full">
                Get in Touch
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;