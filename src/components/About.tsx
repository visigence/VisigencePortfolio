import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Cpu, Layers } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const services = [
    {
      icon: <Layers className="h-8 w-8 text-accent-400" />,
      title: "3D Modeling",
      description: "High-fidelity 3D models and visualizations with photorealistic rendering and animation capabilities."
    },
    {
      icon: <Code className="h-8 w-8 text-secondary-400" />,
      title: "Web Design",
      description: "Modern, responsive web applications with intuitive UX design, animation, and interactive elements."
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary-400" />,
      title: "AI Solutions",
      description: "Custom artificial intelligence solutions for data analytics, predictive modeling, and automation."
    },
    {
      icon: <Award className="h-8 w-8 text-accent-400" />,
      title: "Premium Quality",
      description: "Commitment to excellence in every project, ensuring the highest standards of quality and performance."
    }
  ];

  return (
    <section 
      id="about"
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-primary-950 opacity-70 z-0"></div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            About <span className="text-accent-400">Visigence</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We transform visions into reality through cutting-edge technology and creative innovation.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="glass p-8 rounded-xl mb-16">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Founded on the principle that technology should enhance creativity, Visigence brings together expertise in 3D modeling, web design, and artificial intelligence to deliver exceptional digital experiences. Our approach is driven by a deep understanding of both technical capabilities and aesthetic design, allowing us to create solutions that are not only functional but visually stunning.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With a commitment to innovation and quality, we work closely with clients to understand their vision and bring it to life. Our team of specialists combines technical excellence with creative insight, ensuring that every project exceeds expectations.
            </p>
            <p className="text-right mt-4 text-accent-400 font-orbitron">
              - By Omry Damari
            </p>
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-2xl md:text-3xl font-orbitron font-bold mb-8 text-center"
          variants={itemVariants}
        >
          Our Services
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-xl hover:border-accent-400/50 transition-all"
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;