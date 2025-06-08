import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroCanvas from './three/HeroCanvas';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Enhanced 3D Canvas Background */}
      <div className="canvas-container">
        <HeroCanvas />
      </div>

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-transparent to-slate-950/10 pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        className="container mx-auto container-padding z-10 text-center relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-slate-300">
            Limitless Possibilities, Above Imagination
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants}
          className="heading-xl mb-8"
        >
          <span className="block">
            <span className="text-gradient">3D Models</span>
            <span className="text-slate-300">.</span>
          </span>
          <span className="block">
            <span className="text-gradient">Web Design</span>
            <span className="text-slate-300">.</span>
          </span>
          <span className="block">
            <span className="text-gradient">AI Solutions</span>
            <span className="text-slate-300">.</span>
          </span>
          <span className="block mt-4 text-white">
            Your <span className="text-gradient font-black">VISION</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Driven by vision. Powered by intelligence.
          <br />
          <span className="text-lg text-slate-500">
            Transforming ideas into extraordinary digital experiences
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
        >
          <motion.a 
            href="#portfolio" 
            className="btn-primary group inline-flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
          
          <motion.a 
            href="#contact" 
            className="btn-secondary group inline-flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Project</span>
            <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </motion.a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "50+", label: "Projects Delivered" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center items-start p-2">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-violet-400 to-purple-500 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">Scroll to explore</p>
      </motion.div>
    </section>
  );
};

export default Hero;