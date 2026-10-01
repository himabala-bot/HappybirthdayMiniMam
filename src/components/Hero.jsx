import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import WatercolorBalloons from './WatercolorBalloons';
import { siteConfig, CONFETTI_PALETTE } from '../data/tributeData';

export default function Hero() {
  const containerRef = useRef(null);
  const [confettiFired, setConfettiFired] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Outlook Notification Badge (Visible initially at scroll 0, completely vanishes on any scroll)
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.025], [1, 0]);
  const badgeScale = useTransform(scrollYProgress, [0, 0.025], [1, 0]);
  const badgeDisplay = useTransform(scrollYProgress, (val) => (val > 0.025 ? 'none' : 'flex'));

  // 2. Top Flap flips open 180 degrees upwards (0.02 -> 0.18 scroll)
  const flapRotateX = useTransform(scrollYProgress, [0.02, 0.18], [0, 180]);
  const flapZIndex = useTransform(scrollYProgress, (val) => (val > 0.10 ? 1 : 20));

  // 3. Letter moves straight UP out of the envelope and then expands to fill viewport
  // Starts tucked inside at 0, rises up out of envelope, then centers and scales up big
  const letterY = useTransform(scrollYProgress, [0.08, 0.32, 0.68], [0, -220, 0]);
  const letterScale = useTransform(scrollYProgress, [0.08, 0.32, 0.68], [0.96, 1.06, 1.75]);
  const letterZIndex = useTransform(scrollYProgress, (val) => (val > 0.18 ? 40 : 4));

  // 4. Envelope body shifts down and gently fades as the letter expands to fill viewport
  const envelopeY = useTransform(scrollYProgress, [0.12, 0.55], [0, 120]);
  const envelopeScale = useTransform(scrollYProgress, [0.12, 0.60], [1, 0.85]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.32, 0.62], [1, 0]);
  const shadowOpacity = useTransform(scrollYProgress, [0.1, 0.50], [0.45, 0]);

  // Auto-confetti trigger when letter emerges & expands
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.32 && !confettiFired) {
        setConfettiFired(true);
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.45 },
          colors: CONFETTI_PALETTE,
        });
      } else if (latest < 0.12 && confettiFired) {
        setConfettiFired(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, confettiFired]);

  return (
    <section ref={containerRef} id="outlook-tribute" className="envelope-hero-scroll-container relative">
      {/* Ambient Floating Watercolor Particles in Hero */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { x: '12%', y: '18%', size: 14, color: '#F9D4F8', delay: 0 },
          { x: '85%', y: '22%', size: 18, color: '#AECFD0', delay: 1 },
          { x: '18%', y: '75%', size: 16, color: '#FFD094', delay: 2 },
          { x: '82%', y: '70%', size: 22, color: '#FCC4C0', delay: 0.5 },
          { x: '48%', y: '12%', size: 12, color: '#DDF2B8', delay: 1.5 },
          { x: '92%', y: '45%', size: 15, color: '#F7E9B2', delay: 2.5 },
          { x: '8%', y: '48%', size: 20, color: '#EA5E86', delay: 3 },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 4.5 + i * 0.7,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              borderRadius: '50%',
              backgroundColor: bubble.color,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* Sticky Stage */}
      <div className="envelope-sticky-stage">
        
        {/* Centered Perspective Stage */}
        <div className="envelope-perspective-box">
          
          {/* Main Envelope Group */}
          <motion.div
            style={{
              y: envelopeY,
              scale: envelopeScale,
            }}
            className="envelope-wrapper"
          >
            {/* Outlook Notification Badge (Exact red circle with '1', vanishes immediately on scroll) */}
            <motion.div
              style={{
                opacity: badgeOpacity,
                scale: badgeScale,
                display: badgeDisplay,
              }}
              className="outlook-notification-badge"
            >
              1
            </motion.div>

            {/* 1. Envelope Back Pocket (Inside of envelope) */}
            <motion.div
              style={{ opacity: envelopeOpacity }}
              className="envelope-back-pocket"
            />

            {/* 2. The Letter / Paper Inside (Watercolor Balloon tribute matching reference) */}
            <motion.div
              style={{
                x: '-50%',
                y: letterY,
                scale: letterScale,
                zIndex: letterZIndex,
              }}
              className="envelope-letter-card shadow-2xl"
            >
              {/* Watercolor Balloon Cluster Illustration (Enlarged) */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <WatercolorBalloons className="letter-balloons-art" />
              </motion.div>

              {/* Greeting Header */}
              <div className="letter-greeting-header px-2">
                <h1 className="letter-giant-title">A Notification from Everyone at CCC</h1>
                <p className="letter-script-subtitle">Delivered with gratitude, warmth & all our love ✦</p>
              </div>
            </motion.div>

            {/* 3. Envelope Front Pocket (SVG Left, Right, Bottom flaps) */}
            <motion.svg
              style={{ opacity: envelopeOpacity }}
              className="envelope-front-pocket-svg"
              viewBox="0 0 540 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Flap */}
              <polygon
                points="0,0 270,185 0,340"
                fill="#2BA7E2"
              />
              {/* Right Flap */}
              <polygon
                points="540,0 270,185 540,340"
                fill="#2094D2"
              />
              {/* Bottom Flap */}
              <polygon
                points="0,340 270,150 540,340"
                fill="#38B6EE"
              />
              {/* Subtle inner fold shadow line */}
              <polyline
                points="0,340 270,150 540,340"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="2"
              />
            </motion.svg>

            {/* 4. Envelope Top Flap (Flips Open 180deg) */}
            <motion.div
              style={{
                rotateX: flapRotateX,
                zIndex: flapZIndex,
                opacity: envelopeOpacity,
                originY: 0,
                transformOrigin: 'top center',
              }}
              className="envelope-top-flap-wrapper"
            >
              <svg
                className="envelope-top-flap-svg"
                viewBox="0 0 540 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="0,0 270,195 540,0"
                  fill="#2EB2EE"
                />
                <polyline
                  points="0,0 270,195 540,0"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Soft Ground Shadow */}
          <motion.div
            style={{
              y: envelopeY,
              scale: envelopeScale,
              opacity: shadowOpacity,
            }}
            className="envelope-ground-shadow"
          />
        </div>
      </div>
    </section>
  );
}

