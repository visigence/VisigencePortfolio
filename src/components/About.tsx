import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Cpu, Layers, Users, Zap, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
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

  const services = [
    {
      icon: <Layers className="h-8 w-8" />,
      title: "3D Modeling",
      description: "Photorealistic 3D models and immersive visualizations that bring concepts to life with stunning detail and precision.",
      color: "from-violet-500 to-purple-600",
      features: ["Product Visualization", "Architectural Rendering", "Character Design", "Animation"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Design",
      description: "Modern, responsive web applications with intuitive UX design, seamless interactions, and cutting-edge technology.",
      color: "from-blue-500 to-cyan-600",
      features: ["Responsive Design", "User Experience", "Performance Optimization", "SEO"]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI Solutions",
      description: "Custom artificial intelligence solutions for automation, data analytics, and intelligent decision-making systems.",
      color: "from-emerald-500 to-teal-600",
      features: ["Machine Learning", "Data Analytics", "Automation", "Predictive Modeling"]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Unwavering commitment to excellence in every project, ensuring the highest standards of quality and performance.",
      color: "from-orange-500 to-red-600",
      features: ["Quality Assurance", "Best Practices", "Code Review", "Testing"]
    }
  ];

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision",
      description: "Every detail matters in creating exceptional digital experiences."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology and creative solutions."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "Working closely with clients to understand and exceed their vision."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion",
      description: "Driven by genuine enthusiasm for creating meaningful digital experiences."
    }
  ];

  return (
    <section 
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-primary opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-transparent" />
      
      <motion.div 
        className="container mx-auto container-padding relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Users className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-slate-300">About Us</span>
          </div>
          
          <h2 className="heading-lg mb-8">
            About <span className="text-gradient">Visigence</span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            We transform visions into reality through cutting-edge technology, creative innovation, 
            and an unwavering commitment to excellence.
          </p>
        </motion.div>
        
        {/* Story Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Our Story
                </h3>
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                  <p>
                    Founded on the principle that technology should enhance creativity, Visigence brings together 
                    expertise in 3D modeling, web design, and artificial intelligence to deliver exceptional 
                    digital experiences.
                  </p>
                  <p>
                    Our approach is driven by a deep understanding of both technical capabilities and aesthetic 
                    design, allowing us to create solutions that are not only functional but visually stunning.
                  </p>
                  <p>
                    With a commitment to innovation and quality, we work closely with clients to understand 
                    their vision and bring it to life through meticulous attention to detail and professional excellence.
                  </p>
                </div>
                <div className="mt-8 text-right">
                  <p className="text-violet-400 font-orbitron font-medium">
                    — Omry Damari, Founder
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-gradient mb-2">50+</div>
                      <div className="text-sm text-slate-400">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                      <div className="text-sm text-slate-400">Client Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gradient mb-2">5+</div>
                      <div className="text-sm text-slate-400">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
                      <div className="text-sm text-slate-400">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Values
            </h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-6 text-center group hover:border-violet-400/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Services Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Services
            </h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="glass rounded-3xl p-8 group hover:border-violet-400/50 transition-all duration-500"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;