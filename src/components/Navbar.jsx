import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFETTI_PALETTE } from '../data/tributeData';

export default function Navbar({ onCelebrate }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: CONFETTI_PALETTE
    });
    if (onCelebrate) onCelebrate();
  };

  return (
    <header className="site-nav-header">
      <div className="site-nav-inner">
        <a
          href="#hero"
          className="site-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="logo-indicator-dot"></span>
          <span className="site-logo-text">Boss Tribute &bull; Vol. 22</span>
        </a>

        <nav className="nav-menu-links">
          <a href="#hero">Home</a>
          <a href="#pillars">Pillars</a>
          <a href="#greetings">22 Greetings</a>
          <a href="#guestbook">Sign Note</a>
        </nav>

        <div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerConfetti}
            className="minimal-btn primary-btn"
          >
            Celebrate
          </motion.button>
        </div>
      </div>
    </header>
  );
}
