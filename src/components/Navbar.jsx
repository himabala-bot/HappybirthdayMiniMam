import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 sm:top-6 inset-x-0 z-[100] flex justify-center pointer-events-none px-4 sm:px-6"
    >
      <nav
        className={`pointer-events-auto relative flex items-center justify-between gap-4 sm:gap-8 md:gap-10 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3.5 rounded-full border transition-all duration-300 select-none max-w-fit shadow-[0_14px_40px_rgba(66,47,14,0.08),0_2px_8px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.02] ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl border-[#422F0E]/12 shadow-[0_16px_45px_rgba(66,47,14,0.12)]'
            : 'bg-white/80 backdrop-blur-xl border-[#422F0E]/10'
        }`}
      >
        {/* Brand / Title - Clear Hierarchy */}
        <button
          onClick={(e) => handleNavClick(e, navItems[0])}
          className="group flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#1F150E] hover:opacity-85 transition-all cursor-pointer shrink-0 tracking-tight"
        >
          <span className="text-[#EF6545] font-black text-base transition-transform group-hover:scale-110">✦</span>
          <span>Mini Ma'am</span>
        </button>

        {/* Navigation Links with Spacious Natural Breathing Room */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 cursor-pointer whitespace-nowrap ${
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
      </nav>
    </motion.header>
  );
}
