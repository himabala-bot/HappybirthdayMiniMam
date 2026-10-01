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
    <div className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center items-center pointer-events-none px-3">
      <motion.header
        initial={{ y: -25, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <nav className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-white/90 border border-[#422F0E]/12 shadow-[0_8px_30px_rgba(66,47,14,0.08)] ring-1 ring-black/[0.02] select-none">
          {/* Brand Pill */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EE] text-[#1F150E] font-bold text-xs sm:text-sm tracking-tight transition-all hover:bg-[#F2ECE1] cursor-pointer"
          >
            <span className="text-xs transition-transform group-hover:scale-110">👑</span>
            <span>Mini Ma'am</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-0.5 sm:gap-1 text-xs font-semibold text-[#5C4A38]">
            <button
              onClick={() => scrollToSection('outlook-tribute')}
              className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-[#EF6545] hover:bg-[#FAF6EE] transition-all cursor-pointer"
            >
              Envelope
            </button>
            <button
              onClick={() => scrollToSection('greetings')}
              className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-[#EF6545] hover:bg-[#FAF6EE] transition-all cursor-pointer"
            >
              Greetings
            </button>
            <button
              onClick={() => scrollToSection('pillars')}
              className="px-2.5 sm:px-3 py-1.5 rounded-full hover:text-[#EF6545] hover:bg-[#FAF6EE] transition-all cursor-pointer"
            >
              Chronicle
            </button>
          </div>

          {/* Quick Celebration Trigger */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerConfetti}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#EF6545] to-[#F49625] text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all cursor-pointer ml-0.5"
          >
            <span className="text-xs">🎉</span>
            <span>Celebrate</span>
          </motion.button>
        </nav>
      </motion.header>
    </div>
  );
}
