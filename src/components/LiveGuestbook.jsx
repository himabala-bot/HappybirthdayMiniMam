import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PALETTE_COLORS } from '../data/tributeData';

export default function LiveGuestbook() {
  const [name, setName] = useState('');
  const [color, setColor] = useState(PALETTE_COLORS.shortcake);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([
    {
      id: 1,
      name: 'The Entire Team',
      color: PALETTE_COLORS.bahamasBeach,
      time: 'Today',
      message: 'Thank you for being the calm compass and driving force behind all 22 of us.'
    }
  ]);

  const colorOptions = [
    { label: 'Shortcake', value: PALETTE_COLORS.shortcake },
    { label: 'Dip at Twilight', value: PALETTE_COLORS.dipAtTwilight },
    { label: 'Beach Umbrella', value: PALETTE_COLORS.beachUmbrella },
    { label: 'Mint No Chip', value: PALETTE_COLORS.mintNoChip },
    { label: 'Baby Lavender', value: PALETTE_COLORS.babyLavender },
    { label: 'Baby Shower', value: PALETTE_COLORS.babyShower },
    { label: 'Bahamas Beach', value: PALETTE_COLORS.bahamasBeach },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newNote = {
      id: Date.now(),
      name: name.trim(),
      color,
      time: 'Just now',
      message: message.trim()
    };

    setNotes((prev) => [newNote, ...prev]);
    confetti({
      particleCount: 40,
      spread: 60,
      colors: [color, '#422F0E', '#FAF6EE']
    });

    setName('');
    setMessage('');
  };

  return (
    <section id="guestbook" className="site-section">
      <div className="site-section-container">
        <div className="site-section-header">
          {/* Small text above section heading removed as requested */}
          <h2 className="section-main-title">
            Leave a Live Note
          </h2>
          <p className="section-main-subtitle">
            Submit an additional birthday note to pin directly to the live message wall.
          </p>
        </div>

        <div className="guestbook-two-col-layout">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="guestbook-compose-form"
          >
            <div className="form-field-group">
              <label>Your Name / Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex R. or Engineering Squad"
                required
              />
            </div>

            <div className="form-field-group">
              <label>Select Note Accent</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {colorOptions.map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field-group">
              <label>Your Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a short tribute or wish..."
                required
              />
            </div>

            <button
              type="submit"
              className="minimal-btn primary-btn"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem' }}
            >
              Post Note to Wall
            </button>
          </form>

          {/* Live Notes Wall */}
          <div className="live-pinned-notes-list">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: -15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="live-pinned-note-item"
                  style={{ borderLeft: `5px solid ${note.color}` }}
                >
                  <div className="note-item-header">
                    <span className="note-item-author">
                      {note.name}
                    </span>
                    <span className="note-item-timestamp">
                      {note.time}
                    </span>
                  </div>
                  <p className="note-item-text">
                    “{note.message}”
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
