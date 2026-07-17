import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { InteractiveGlobe } from '../ui/InteractiveGlobe';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-hw-bg/80 backdrop-blur-md border-b border-hw-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-9 w-9 overflow-hidden rounded-full border border-hw-accent/30 bg-black shadow-[0_0_20px_rgba(177,255,0,0.12)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <InteractiveGlobe compact />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Hello World.</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-hw-muted">
          {['Services', 'Work', 'Hosting', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-hw-text transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
          Start a Project
        </Button>
      </div>
    </motion.header>
  );
}
