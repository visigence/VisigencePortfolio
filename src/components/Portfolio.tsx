import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';

// Define the projects data structure
const projects = [
  {
    id: 1,
    title: "3D Modeling",
    category: "web",
    description: "High-fidelity 3D models and visualizations with photorealistic rendering and animation capabilities",
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "TensorFlow.js", "D3.js"]
  },
  {
    id: 2,
    title: "Web Design",
    category: "software",
    description: "Educational platform for quantum computing concepts",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Python", "Qiskit", "WebAssembly"]
  },
  {
    id: 3,
    title: "Sustainable Smart Home",
    category: "iot",
    description: "IoT system for energy-efficient home automation",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["IoT", "React Native", "Node.js"]
  },
  {
    id: 4,
    title: "Blockchain Supply Chain",
    category: "blockchain",
    description: "Transparent supply chain tracking using blockchain",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Ethereum", "Solidity", "Web3.js"]
  },
  {
    id: 5,
    title: "AR Product Visualization",
    category: "ar",
    description: "Augmented reality app for product showcasing",
    image: "https://images.pexels.com/photos/8728560/pexels-photo-8728560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Unity", "ARKit", "Vuforia"]
  },
  {
    id: 6,
    title: "Neural Music Composer",
    category: "ai",
    description: "AI-powered music composition and generation",
    image: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["TensorFlow", "Web Audio API", "Python"]
  }
];

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" }
    })
  };

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
        style={{ y, opacity }}
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
          <div className="flex justify-center gap-4 mt-6">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
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