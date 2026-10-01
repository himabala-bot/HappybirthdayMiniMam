import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import CursorTrail from './components/ui/cursor-trail';
import WaveHero from './components/WaveHero';
import Hero from './components/Hero';
import { MagicText } from './components/ui/magic-text';
import GreetingsWall from './components/GreetingsWall';
import LeadershipPillars from './components/LeadershipPillars';
import { CONFETTI_PALETTE } from './data/tributeData';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [finaleConfettiFired, setFinaleConfettiFired] = React.useState(false);

  const triggerAutomaticFinaleConfetti = () => {
    if (finaleConfettiFired) return;
    setFinaleConfettiFired(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: CONFETTI_PALETTE
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 30, startVelocity: 55 });
    fire(0.2, { spread: 65 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.85 });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.15 });
  };

  return (
    <div className="min-h-screen w-full relative bg-white text-[#422F0E] selection:bg-[#FCC4C0] selection:text-[#422F0E] overflow-x-clip">
      {/* Global Interactive Cursor Trail */}
      <CursorTrail color="bg-[#EF6545]" size={9} count={6} />

      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <main className="relative z-10">
        {/* Full-Viewport Interactive Dither & Wave Hero Section */}
        <WaveHero />

        {/* Increased Gap Before Outlook-style 3D Envelope Scroll Animation Section */}
        <div className="pt-24 sm:pt-32 md:pt-40">
          <Hero />
        </div>

        {/* Tribute Quote with Hover Image Previews Section */}
        <section id="tribute-heart" className="magic-text-section-wrapper pt-6 pb-0">
          <MagicText />
        </section>

        {/* 24 Birthday Greetings Section */}
        <GreetingsWall />

        {/* Core Leadership Pillars (3D Chronicle Book) */}
        <LeadershipPillars />

        {/* Finale Section with Automatic Confetti on Scroll */}
        <section className="finale-tribute-banner relative overflow-hidden py-24 sm:py-28">
          {/* Ambient Decorative Celebration Glows */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="w-96 h-96 rounded-full bg-gradient-to-tr from-[#EF6545]/20 via-[#FFD094]/30 to-[#F9D4F8]/25 blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            onViewportEnter={triggerAutomaticFinaleConfetti}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="finale-banner-inner relative z-10 text-center flex flex-col items-center justify-center max-w-3xl mx-auto px-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] tracking-[-0.03em]"
            >
              Once again, Happy Birthday Mini Ma'am!
            </motion.h2>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
