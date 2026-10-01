import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFETTI_PALETTE } from '../data/tributeData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', targetId: null },
    { id: 'letter', label: 'Letter', targetId: 'outlook-tribute' },
    { id: 'heart', label: 'The Heart', targetId: 'tribute-heart' },
    { id: 'greetings', label: 'Greetings', targetId: 'greetings' },
    { id: 'pillars', label: 'Pillars', targetId: 'pillars' },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Section positions
      if (scrollY < 300) {
        setActiveSection('home');
        return;
      }

      const sections = [
        { id: 'pillars', el: document.getElementById('pillars') },
        { id: 'greetings', el: document.getElementById('greetings') },
        { id: 'heart', el: document.getElementById('tribute-heart') },
        { id: 'letter', el: document.getElementById('outlook-tribute') },
      ];

      for (const sec of sections) {
        if (sec.el) {
          const rect = sec.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
            setActiveSection(sec.id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveSection(item.id);

    if (!item.targetId || item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(item.targetId);
    if (!target) return;

    if (item.id === 'letter') {
      const top = target.getBoundingClientRect().top + window.scrollY;
      const targetScroll = top + target.offsetHeight * 0.4;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const triggerCelebrate = (e) => {
    e.stopPropagation();
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.15 },
      colors: CONFETTI_PALETTE,
      ticks: 200,
      gravity: 1.1,
      scalar: 0.9,
    });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3.5 sm:top-5 inset-x-0 z-[100] flex justify-center pointer-events-none px-3 sm:px-6"
    >
      <nav
        className={`pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 select-none max-w-fit shadow-[0_10px_35px_rgba(66,47,14,0.08)] ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-[#422F0E]/12 shadow-[0_12px_36px_rgba(66,47,14,0.12)]'
            : 'bg-white/80 backdrop-blur-lg border-[#422F0E]/8'
        }`}
      >
        {/* Brand Chip */}
        <button
          onClick={(e) => handleNavClick(e, navItems[0])}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold text-[#1F150E] hover:bg-black/[0.04] transition-colors cursor-pointer shrink-0"
        >
          <span className="text-[#EF6545] font-black text-sm">✦</span>
          <span className="font-extrabold tracking-tight hidden sm:inline">Mini Ma'am</span>
        </button>

        <div className="h-4 w-[1px] bg-[#422F0E]/10 mx-0.5 shrink-0 hidden sm:block" />

        {/* Nav Links with Generous Horizontal Spacing */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#EF6545] font-bold'
                    : 'text-[#5C4A38] hover:text-[#1F150E] hover:bg-black/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#EF6545]/10 rounded-full -z-10 border border-[#EF6545]/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="h-4 w-[1px] bg-[#422F0E]/10 mx-0.5 shrink-0 hidden md:block" />

        {/* Celebration Popping Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={triggerCelebrate}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#EF6545] to-[#F49625] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
          title="Shoot celebratory confetti!"
        >
          <span className="text-xs">🎉</span>
          <span className="hidden md:inline">Celebrate</span>
        </motion.button>
      </nav>
    </motion.header>
  );
}
