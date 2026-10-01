import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Letter', href: '#outlook-tribute' },
    { label: 'The Heart', href: '#tribute-heart' },
    { label: 'Greetings', href: '#greetings' },
    { label: 'Pillars', href: '#pillars' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
    >
      <nav
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'border-[#422F0E]/12 bg-white/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.1)]'
            : 'border-[#422F0E]/8 bg-white/60 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
        }`}
      >
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="pl-2 pr-1.5 text-xs font-bold text-[#EF6545] flex items-center gap-1.5 select-none hover:opacity-80 transition-opacity"
        >
          <span className="text-sm">✦</span>
          <span className="hidden sm:inline font-extrabold text-[#2A1810] tracking-tight">Mini Ma'am</span>
        </a>

        <div className="h-3.5 w-[1px] bg-[#422F0E]/12 mx-1 hidden sm:block" />

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold text-[#5C4A38] hover:text-[#EF6545] hover:bg-[#EF6545]/10 transition-all duration-200 tracking-tight"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
