import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Send, Braces, Loader2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields');
      return;
    }

    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ 
          email, 
          message,
          name: email.split('@')[0], // Extract name from email
          subject: 'Contact Form Submission'
        }]);

      if (error) throw error;

      setStatus('success');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
  ];

  const quickLinks = [
    { href: "#", label: "Home" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const services = [
    { href: "#", label: "3D Modeling" },
    { href: "#", label: "Web Design" },
    { href: "#", label: "AI Solutions" },
    { href: "#", label: "Consultation" },
  ];

  const contactInfo = [
    { icon: Mail, label: "hello@visigence.com", href: "mailto:hello@visigence.com" },
    { icon: Phone, label: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, label: "San Francisco, CA", href: "#" },
  ];

  return (
    <footer id="contact" className="relative bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-transparent to-purple-950/20" />
      
      <motion.div 
        className="container mx-auto container-padding pt-20 pb-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left Column - Company Info & Contact Form */}
          <motion.div variants={itemVariants}>
            {/* Logo and Description */}
            <div className="mb-12">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <Braces className="h-8 w-8 text-violet-400" />
                  <div className="absolute inset-0 h-8 w-8 text-violet-400 opacity-20 blur-sm">
                    <Braces className="h-8 w-8" />
                  </div>
                </div>
                <span className="text-2xl font-orbitron font-bold text-white">Visigence</span>
              </motion.div>
              
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-md">
                Limitless possibilities, above imagination. Transforming visions into reality through 
                cutting-edge technology and creative innovation.
              </p>

              {/* Contact Information */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-3 text-slate-400 hover:text-violet-400 transition-colors group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <contact.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{contact.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="form-input"
                    disabled={status === 'submitting'}
                  />
                </div>
                
                <div>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..." 
                    rows={4} 
                    className="form-textarea"
                    disabled={status === 'submitting'}
                  />
                </div>
                
                {status === 'error' && (
                  <motion.p 
                    className="text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errorMessage}
                  </motion.p>
                )}
                
                {status === 'success' && (
                  <motion.p 
                    className="text-emerald-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Message sent successfully! We'll get back to you soon.
                  </motion.p>
                )}
                
                <motion.button 
                  type="submit" 
                  className="btn-primary w-full group"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Links and Social */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Services</h3>
                <ul className="space-y-4">
                  {services.map((service, index) => (
                    <li key={index}>
                      <motion.a
                        href={service.href}
                        className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {service.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-white mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-3 glass rounded-xl text-slate-400 ${social.color} transition-all group`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest updates on our projects and insights.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input flex-1"
                />
                <motion.button
                  className="btn-primary px-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-slate-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Visigence. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <motion.a 
              href="#" 
              className="hover:text-violet-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-violet-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <p className="text-slate-600">
              Designed by Omry Damari
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;