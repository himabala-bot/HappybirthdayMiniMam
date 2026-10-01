import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardModal({ card, onClose }) {
  if (!card) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="modal-backdrop-overlay"
        onClick={onClose}
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(66, 47, 14, 0.45)' }}
      >
        {/* Modal Window with Framer spring physics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="modal-dialog-window relative overflow-hidden shadow-2xl"
          style={{ maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Subtle Ambient Accent Header */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: card.color || '#EF6545' }}
          />

          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="modal-dismiss-button"
            aria-label="Close modal"
          >
            &times;
          </motion.button>

          <div className="modal-author-header">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 8 }}
              className="modal-monogram-avatar shadow-md"
              style={{ backgroundColor: card.color }}
            >
              {card.initials}
            </motion.div>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#422F0E' }}>
                {card.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B573E', fontWeight: 600 }}>
                {card.role || card.dept}
              </p>
            </div>
          </div>

          {/* Birthday Wish Quote */}
          {card.quote && (
            <div className="modal-quote-container shadow-xs">
              <p>“{card.quote}”</p>
            </div>
          )}

          {/* Message / Thank You Note */}
          {card.message && (
            <p className="modal-note-body" style={{ whiteSpace: 'pre-line' }}>
              {card.message}
            </p>
          )}

          {/* Key Leadership Traits Tags */}
          {card.traits && card.traits.length > 0 && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {card.traits.map((trait, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backgroundColor: '#FAF3E8',
                    border: '1px solid #E6D8C3',
                    color: '#634E39',
                  }}
                >
                  ✦ {trait}
                </span>
              ))}
            </div>
          )}

          <div className="modal-footer-action-row">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5"
              style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#968168' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#037F71]" />
              {card.stamp || 'Verified Team Member'}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={onClose}
              className="minimal-btn primary-btn"
              style={{ padding: '0.55rem 1.4rem', fontSize: '0.88rem' }}
            >
              Close Note
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
