import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './three/HeroCanvas';

const Hero: React.FC = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 }
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4 text-white"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <span className="text-primary-400">3D Models</span>. <span className="text-secondary-400">Web Design</span>. <span className="text-accent-400">AI</span>.
          <br />
          <span className="block mt-2">Your <span className="text-accent-400">VISION</span></span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          Driven by vision. Powered by intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a 
            href="#portfolio" 
            className="px-8 py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-md transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-accent-500/20"
          >
            View Portfolio
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 bg-transparent border border-white hover:border-accent-400 text-white rounded-md transition-all transform hover:scale-105"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;