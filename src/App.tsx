import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-primary-950">
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