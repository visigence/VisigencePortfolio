import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let rafId: number;

    const updateCursor = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      });
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, input, textarea, select'));
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleInteraction);
    window.addEventListener('mousedown', () => setIsClicked(true));
    window.addEventListener('mouseup', () => setIsClicked(false));

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleInteraction);
      window.removeEventListener('mousedown', () => setIsClicked(true));
      window.removeEventListener('mouseup', () => setIsClicked(false));
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-primary-950">
      <div 
        className={`custom-cursor ${isHovering ? 'active' : ''} ${isClicked ? 'clicked' : ''}`}
        style={{ 
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`
        }}
      >
        <div className="cursor-ring"></div>
      </div>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;