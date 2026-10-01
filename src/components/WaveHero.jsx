import React from 'react';
import { motion } from 'framer-motion';
import RevealWaveImage from './ui/reveal-wave-image';
import { SparklesText } from './ui/sparkles-text';

export default function WaveHero() {
  return (
    <section
      className="relative w-full h-[100svh] min-h-screen overflow-hidden wave-hero-section select-none bg-white"
      style={{
        width: '100%',
        height: '100svh',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* z-10: RevealWaveImage / Center Canvas Layer with bottom fade */}
      <div
        className="absolute inset-0 z-10 w-full h-full pointer-events-auto"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, rgba(0,0,0,0.82) 84%, rgba(0,0,0,0.3) 90%, transparent 96%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, rgba(0,0,0,0.82) 84%, rgba(0,0,0,0.3) 90%, transparent 96%)',
        }}
      >
        <RevealWaveImage
          src="/mini-maam.png"
          waveSpeed={0.22}
          waveFrequency={1.8}
          waveAmplitude={0.08}
          revealRadius={0.32}
          revealSoftness={0.65}
          pixelSize={3}
          mouseRadius={0.3}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* z-20: Sparkling Split Typography without outline ("HAPPY" on Left, "BIRTHDAY" on Right) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center -translate-y-10 sm:-translate-y-14">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex items-center justify-between">
          
          {/* Left Side: HAPPY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start select-none w-[32%] max-w-[280px] sm:max-w-[380px]"
          >
            <SparklesText
              text="HAPPY"
              colors={{ first: "#D4AF37", second: "#EF6545" }}
              sparklesCount={7}
              className="hero-solid-title"
              style={{ fontSize: 'clamp(3.2rem, 7.2vw, 6.8rem)' }}
            />
          </motion.div>

          {/* Center Buffer Zone (Portrait Silhouette) */}
          <div className="w-[36%] pointer-events-none" aria-hidden="true" />

          {/* Right Side: BIRTHDAY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end select-none text-right w-[32%] max-w-[280px] sm:max-w-[380px]"
          >
            <SparklesText
              text="BIRTHDAY"
              colors={{ first: "#D4AF37", second: "#EF6545" }}
              sparklesCount={7}
              className="hero-solid-title"
              style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.8rem)' }}
            />
          </motion.div>

        </div>
      </div>

      {/* z-20: "MINI MA'AM" positioned clearly at the bottom in front */}
      <div className="absolute inset-x-0 bottom-0 sm:bottom-0.5 md:bottom-1 z-20 overflow-hidden pointer-events-none flex items-center justify-center">
        <h2 className="hero-static-mini-mam">
          MINI MA'AM
        </h2>
      </div>
    </section>
  );
}



