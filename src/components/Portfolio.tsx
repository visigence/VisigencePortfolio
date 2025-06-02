import React, { useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';

// Define the projects data structure
const projects = [
  {
    id: 1,
    title: "3D Character Models",
    category: "3d",
    description: "High-fidelity 3D character models with advanced rigging and animations for games and cinematics",
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Blender", "Maya", "ZBrush"]
  },
  {
    id: 2,
    title: "Modern Web Applications",
    category: "web",
    description: "Responsive and interactive web applications with modern UI/UX design principles",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "TypeScript", "Tailwind"]
  },
  {
    id: 3,
    title: "RPG Game Development",
    category: "gaming",
    description: "Immersive role-playing game with advanced combat mechanics and rich storytelling",
    image: "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Unity", "C#", "Game Design"]
  },
  {
    id: 4,
    title: "Arcade Game Collection",
    category: "gaming",
    description: "Collection of retro-inspired arcade games with modern twists",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Phaser.js", "WebGL", "Pixel Art"]
  }
];

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section 
      ref={sectionRef}
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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
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