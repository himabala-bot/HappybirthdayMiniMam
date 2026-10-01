import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { paletteSpheres } from '../data/tributeData';

export default function InteractivePalette() {
  const [selectedSphere, setSelectedSphere] = useState(paletteSpheres[0]);

  const handleSelect = (item, e) => {
    setSelectedSphere(item);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: [item.color, '#422F0E', '#FAF6EE']
    });
  };

  return (
    <section id="swatches" className="site-section">
      <div className="site-section-container">
        <div className="site-section-header">
          <span className="section-eyebrow-tag">
            Palette Interactive
          </span>
          <h2 className="section-main-title">
            Interactive Color Swatches
          </h2>
          <p className="section-main-subtitle">
            Click each curated swatch to reveal a personalized dedication from the team.
          </p>
        </div>

        <div className="palette-interactive-box">
          <div className="swatches-flex-cluster">
            {paletteSpheres.map((item, idx) => {
              const isSelected = selectedSphere.name === item.name;
              return (
                <button
                  key={idx}
                  onClick={(e) => handleSelect(item, e)}
                  title={item.name}
                  className="swatch-circle-button"
                  style={{
                    backgroundColor: item.color,
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: isSelected
                      ? '0 0 0 3px #422F0E, 0 8px 16px rgba(66,47,14,0.18)'
                      : '0 4px 10px rgba(66,47,14,0.1)'
                  }}
                />
              );
            })}
          </div>

          <motion.div
            key={selectedSphere.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="swatch-reveal-message-card"
          >
            <span className="swatch-reveal-name">
              {selectedSphere.name}
            </span>
            <p className="swatch-reveal-text">
              “{selectedSphere.text}”
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
