import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { greetingsData } from '../data/tributeData';

// Subtle 3D Tilt Card with Smooth Interactive Physics
function TiltGreetingCard({ item, idx }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth mouse spring physics for subtle tilt
  const mouseX = useSpring(x, { stiffness: 300, damping: 28 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 28 });

  // Reduced subtle tilt amplitude: 6 degrees rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  // Dynamic specular light reflection spotlight
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalize from -0.5 to 0.5
    x.set(clientX / width - 0.5);
    y.set(clientY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: (idx % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="teammate-greeting-card relative overflow-hidden select-none"
    >
      {/* Specular Spotlight Glare Overlay */}
      <motion.div
        style={{
          background: useTransform(
            [sheenX, sheenY],
            ([sx, sy]) =>
              `radial-gradient(circle at ${sx} ${sy}, rgba(255, 255, 255, 0.5) 0%, transparent 65%)`
          ),
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 pointer-events-none z-10 transition-opacity"
      />

      {/* Card Content with 3D Depth */}
      <div style={{ transform: 'translateZ(18px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="card-header-flex">
          <div
            style={{ backgroundColor: item.color }}
            className="card-monogram-circle shadow-sm"
          >
            {item.initials}
          </div>
          <div>
            <h4 className="card-author-title">{item.name}</h4>
          </div>
        </div>

        <div className="card-quote-callout" style={{ transform: 'translateZ(14px)' }}>
          <p>“{item.quote}”</p>
        </div>

        <p className="card-body-snippet" style={{ transform: 'translateZ(10px)' }}>
          {item.message}
        </p>
      </div>

      <div className="card-footer-flex" style={{ transform: 'translateZ(14px)' }}>
        <span className="card-verified-stamp flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#037F71]" />
          {item.stamp}
        </span>
      </div>
    </motion.div>
  );
}

export default function GreetingsWall() {
  return (
    <section id="greetings" className="site-section">
      <div className="site-section-container">
        <div className="site-section-header" style={{ marginBottom: '3rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] tracking-[-0.03em] mb-2"
          >
            What CCC has to say
          </motion.h2>
        </div>

        {/* 24 Cards Grid */}
        <div className="greetings-cards-grid">
          {greetingsData.map((item, idx) => (
            <TiltGreetingCard
              key={item.id}
              item={item}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
