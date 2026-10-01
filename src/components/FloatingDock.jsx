import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFETTI_PALETTE } from '../data/tributeData';

export default function FloatingDock() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.8 },
      colors: CONFETTI_PALETTE
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-quick-dock">
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={scrollToTop}
        className="floating-dock-button"
      >
        Top
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={triggerConfetti}
        className="floating-dock-button"
        style={{ backgroundColor: '#422F0E', color: '#FAF6EE' }}
      >
        Toast
      </motion.button>
    </div>
  );
}
