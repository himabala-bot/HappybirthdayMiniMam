import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorFollower() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('.interactive-clickable') ||
        target.closest('.palette-circle') ||
        target.closest('.greeting-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Skip on mobile touch devices
  }

  return (
    <>
      {/* Central Dot */}
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.1 }}
      />

      {/* Outer Smooth Trailing Ring */}
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? '#EF6545' : '#422F0E'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 180, mass: 0.2 }}
      />
    </>
  );
}
