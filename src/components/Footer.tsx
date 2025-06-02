import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Instagram, Send, Braces, Loader2 } from 'lucide-react';
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
        .insert([{ email, message }]);

      if (error) throw error;

      setStatus('success');
      setEmail('');
      setMessage('');
      
      // Reset success status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
    }
  };

  return (
    <footer id="contact" className="bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      
      <div className="container mx-auto px-6 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Braces className="h-6 w-6 text-accent-400" />
              <span className="text-xl font-orbitron font-bold">Visigence</span>
            </div>
            <p className="text-gray-400 mb-6">
              Limitless possibilities, above imagination.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-orbitron font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">3D Modeling</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">Web Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">AI Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">Consultation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-orbitron font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-accent-400 transition-colors">Home</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-accent-400 transition-colors">Portfolio</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-accent-400 transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-accent-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-orbitron font-bold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email" 
                  className="w-full px-4 py-2 bg-primary-900/50 border border-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-400"
                  aria-label="Your email"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message" 
                  rows={3} 
                  className="w-full px-4 py-2 bg-primary-900/50 border border-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-400"
                  aria-label="Your message"
                  disabled={status === 'submitting'}
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              
              {status === 'success' && (
                <p className="text-green-500 text-sm">Message sent successfully!</p>
              )}
              
              <button 
                type="submit" 
                className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-md transition-colors flex items-center justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Visigence. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Designed by Omry Damari
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;