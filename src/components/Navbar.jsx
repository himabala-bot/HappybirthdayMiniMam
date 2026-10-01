import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const navItems = [
    { id: 'home', name: 'Home', targetId: null },
    { id: 'letter', name: 'Letter', targetId: 'outlook-tribute' },
    { id: 'heart', name: 'The Heart', targetId: 'tribute-heart' },
    { id: 'greetings', name: 'Greetings', targetId: 'greetings' },
    { id: 'pillars', name: 'Pillars', targetId: 'pillars' },
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 60) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    // Determine active section
    if (latest < 300) {
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
  });

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveSection(item.id);
    setIsMobileMenuOpen(false);

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
    <header className="fixed inset-x-0 top-3 sm:top-5 z-[100] w-full flex justify-center pointer-events-none px-4 sm:px-6">
      {/* Desktop Resizable Navigation Bar */}
      <motion.nav
        animate={{
          backdropFilter: visible ? 'blur(16px)' : 'blur(8px)',
          boxShadow: visible
            ? '0 16px 40px rgba(66, 47, 14, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)'
            : '0 8px 24px rgba(66, 47, 14, 0.05)',
          width: visible ? '55%' : '80%',
          y: visible ? 8 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 36,
        }}
        style={{
          minWidth: '580px',
          maxWidth: '920px',
        }}
        className={`pointer-events-auto relative mx-auto hidden lg:flex flex-row items-center justify-between rounded-full border transition-colors duration-300 px-6 sm:px-8 py-4 sm:py-4.5 min-h-[62px] sm:min-h-[66px] select-none ${
          visible
            ? 'bg-white/90 border-[#422F0E]/12'
            : 'bg-white/80 border-[#422F0E]/8'
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={(e) => handleNavClick(e, navItems[0])}
          className="group relative z-20 flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#1F150E] tracking-tight hover:opacity-85 transition-all cursor-pointer shrink-0 py-1"
        >
          <span className="text-[#EF6545] font-black text-base transition-transform group-hover:scale-110">✦</span>
          <span>Mini Ma'am</span>
        </button>

        {/* Center Nav Items with Dynamic Hover & Active Pill */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="relative z-10 flex flex-1 flex-row items-center justify-center gap-1.5 sm:gap-2 text-sm font-semibold text-[#5C4A38]"
        >
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.targetId ? `#${item.targetId}` : '#'}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-4 py-2 sm:py-2.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#EF6545] font-bold'
                    : 'text-[#5C4A38] hover:text-[#1F150E]'
                }`}
              >
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="hovered-nav-pill"
                    className="absolute inset-0 h-full w-full rounded-full bg-black/[0.04] -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#EF6545]/10 rounded-full -z-20 border border-[#EF6545]/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-20 whitespace-nowrap">{item.name}</span>
              </a>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        animate={{
          backdropFilter: visible ? 'blur(16px)' : 'blur(8px)',
          boxShadow: visible
            ? '0 12px 30px rgba(66, 47, 14, 0.12)'
            : '0 6px 20px rgba(66, 47, 14, 0.05)',
          width: visible ? '92%' : '100%',
          y: visible ? 4 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 36,
        }}
        className={`pointer-events-auto relative mx-auto flex lg:hidden w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-full border px-5 py-3.5 sm:py-4 min-h-[56px] transition-colors duration-300 ${
          visible
            ? 'bg-white/90 border-[#422F0E]/12'
            : 'bg-white/80 border-[#422F0E]/8'
        }`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <button
            onClick={(e) => handleNavClick(e, navItems[0])}
            className="flex items-center gap-2 text-sm font-extrabold text-[#1F150E] tracking-tight"
          >
            <span className="text-[#EF6545] font-black text-sm">✦</span>
            <span>Mini Ma'am</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-full text-[#1F150E] hover:bg-black/[0.05] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-14 z-50 flex w-full flex-col items-start gap-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#422F0E]/12 p-5 shadow-[0_16px_40px_rgba(66,47,14,0.14)]"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={`mobile-${item.id}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#EF6545]/10 text-[#EF6545] font-bold border border-[#EF6545]/20'
                        : 'text-[#5C4A38] hover:bg-black/[0.03] hover:text-[#1F150E]'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
