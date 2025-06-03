import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';
import { Loader2 } from 'lucide-react';
import { mockPortfolioItems, type PortfolioItem } from '../lib/supabase';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const projects = mockPortfolioItems;
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section 
      id="portfolio"
      className="py-24 relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950 to-black opacity-70 z-0"></div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            id="portfolio-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-accent-400">Portfolio</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Limitless possibilities, above imagination.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-md transition-all ${
                  filter === category ? 'bg-accent-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                aria-pressed={filter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-accent-400" />
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects?.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  layout
                  role="article"
                  aria-labelledby={`project-${project.id}-title`}
                >
                  <PortfolioCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a 
            href="#contact" 
            className="px-8 py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-400"
            aria-label="Discuss your project with us"
          >
            Discuss Your Project
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Portfolio;