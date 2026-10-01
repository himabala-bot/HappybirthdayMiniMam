import React from 'react';
import { motion } from 'framer-motion';
import { milestoneNotes } from '../data/tributeData';

export default function MilestonesArchive() {
  return (
    <section id="milestones" className="site-section">
      <div className="site-section-container">
        
        <div className="site-section-header">
          <span className="section-eyebrow-tag">
            Timeline Archive
          </span>
          <h2 className="section-main-title">
            Leadership Highlights
          </h2>
          <p className="section-main-subtitle">
            Shared moments of triumph, guidance, and unwavering dedication.
          </p>
        </div>

        <div className="milestones-cards-grid">
          {milestoneNotes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="milestone-highlight-card"
              style={{ borderTop: `4px solid ${item.accent}` }}
            >
              <div>
                <span className="milestone-order-tag">
                  {item.code}
                </span>
                <h4>
                  {item.title}
                </h4>
                <div className="milestone-sub-topic">
                  {item.subtitle}
                </div>
                <p>
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
