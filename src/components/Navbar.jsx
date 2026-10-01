import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFETTI_PALETTE } from '../data/tributeData';

export default function Navbar() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.2 },
      colors: CONFETTI_PALETTE,
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <nav className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl bg-white/80 border border-[#422F0E]/12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] select-none">
        {/* Brand Pill */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] text-[#1F150E] font-bold text-xs sm:text-sm tracking-tight transition-all hover:bg-[#F2ECE1] cursor-pointer"
        >
          <span className="text-xs">👑</span>
          <span>Mini Ma'am</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#5C4A38]">
          <button
            onClick={() => scrollToSection('outlook-tribute')}
            className="px-3 py-1 rounded-full hover:text-[#EF6545] hover:bg-[#FAF6EE]/80 transition-all cursor-pointer"
          >
            Envelope
          </button>
          <button
            onClick={() => scrollToSection('greetings')}
            className="px-3 py-1 rounded-full hover:text-[#EF6545] hover:bg-[#FAF6EE]/80 transition-all cursor-pointer"
          >
            Greetings
          </button>
          <button
            onClick={() => scrollToSection('pillars')}
            className="px-3 py-1 rounded-full hover:text-[#EF6545] hover:bg-[#FAF6EE]/80 transition-all cursor-pointer"
          >
            Chronicle
          </button>
        </div>

        {/* Quick Celebration Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#EF6545] text-white font-bold text-xs shadow-sm hover:bg-[#E05232] transition-colors cursor-pointer"
        >
          <span>🎉</span>
          <span>Celebrate</span>
        </motion.button>
      </nav>
    </motion.header>
  );
}
