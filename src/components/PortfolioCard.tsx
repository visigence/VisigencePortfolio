import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

interface PortfolioCardProps {
  project: Project;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (tiltRef.current && !isMobile) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        scale: 1.05,
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (tiltRef.current && !isMobile) {
        (tiltRef.current as any).vanillaTilt?.destroy();
      }
    };
  }, [isMobile]);

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

  return (
    <>
      <div
        ref={tiltRef}
        className="portfolio-card h-[450px] group relative overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsModalOpen(true);
            e.preventDefault();
          }
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <div className="shimmer-overlay absolute inset-0 z-10 opacity-0 group-hover:opacity-100" />
          <div className="digital-grid absolute inset-0 z-20" />
          <div className="data-flow absolute inset-0 z-30" />
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover h-full w-full transform transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 bg-primary-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
            {project.category}
          </div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-200 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-primary-800/50 backdrop-blur-sm px-2 py-1 rounded-full text-primary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
            role="dialog"
            aria-labelledby={`modal-${project.id}-title`}
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-primary-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white z-10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="h-[300px] md:h-[400px] relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 id={`modal-${project.id}-title`} className="text-2xl font-bold mb-4 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-800 rounded-full text-sm text-primary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-accent-600 hover:bg-accent-500 rounded-md transition-colors text-white">
                    View Live
                  </button>
                  <button className="px-6 py-2 border border-accent-600 hover:bg-accent-600/10 rounded-md transition-colors text-white">
                    Source Code
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioCard;