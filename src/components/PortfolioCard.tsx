import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Calendar, Tag, Eye } from 'lucide-react';
import VanillaTilt from 'vanilla-tilt';
import type { PortfolioItem } from '../lib/supabase';

interface PortfolioCardProps {
  project: PortfolioItem;
  viewMode?: 'grid' | 'list';
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, viewMode = 'grid' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (tiltRef.current && !isMobile && viewMode === 'grid') {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.02,
        perspective: 1000,
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (tiltRef.current && !isMobile) {
        (tiltRef.current as any).vanillaTilt?.destroy();
      }
    };
  }, [isMobile, viewMode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  if (viewMode === 'list') {
    return (
      <>
        <motion.div
          variants={cardVariants}
          className="portfolio-card group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Image Section */}
            <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
              <div className="shimmer-overlay absolute inset-0 z-10 opacity-0 group-hover:opacity-100" />
              <div className="digital-grid absolute inset-0 z-20" />
              <div className="data-flow absolute inset-0 z-30" />
              
              <motion.img
                src={project.image_url}
                alt={project.title}
                className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute top-4 left-4 bg-violet-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                {project.category}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 text-xs bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full text-slate-300 border border-slate-700/50"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <motion.button 
                    className="btn-primary text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </motion.button>
                  
                  <motion.button 
                    className="btn-secondary text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <ProjectModal 
          project={project} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        ref={tiltRef}
        variants={cardVariants}
        className="portfolio-card h-[500px] group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          {/* Enhanced overlay effects */}
          <div className="shimmer-overlay absolute inset-0 z-10 opacity-0 group-hover:opacity-100" />
          <div className="digital-grid absolute inset-0 z-20" />
          <div className="data-flow absolute inset-0 z-30" />
          
          {/* Image */}
          <motion.img
            src={project.image_url}
            alt={project.title}
            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6 bg-violet-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg">
            {project.category}
          </div>
          
          {/* Content Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          >
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span className="text-sm text-slate-300">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">
                {project.title}
              </h3>
              
              <p className="text-slate-200 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-slate-200 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-slate-200 border border-white/20">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <motion.button 
                  className="btn-primary text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle view project
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View
                </motion.button>
                
                <motion.button 
                  className="btn-secondary text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle source code
                  }}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ProjectModal 
        project={project} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

// Enhanced Project Modal Component
const ProjectModal: React.FC<{
  project: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] relative"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full glass hover:bg-white/10 transition-colors text-white z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Image Section */}
            <div className="h-[300px] md:h-[500px] relative overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-violet-600 px-4 py-2 rounded-full text-sm font-semibold text-white">
                  {project.category}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                {project.title}
              </h3>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl text-sm text-slate-300 border border-slate-700/50"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="btn-primary flex-1 sm:flex-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-5 h-5 mr-3" />
                  View Live Project
                </motion.button>
                
                <motion.button 
                  className="btn-secondary flex-1 sm:flex-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5 mr-3" />
                  View Source Code
                </motion.button>

                <motion.button 
                  className="btn-secondary flex-1 sm:flex-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-5 h-5 mr-3" />
                  Case Study
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioCard;