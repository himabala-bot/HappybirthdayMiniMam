import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ text, className = "", delay = 0, highlightWord = "" }) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i }
    })
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 14, stiffness: 100 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 14, stiffness: 100 }
    }
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ display: "inline-flex", flexWrap: "wrap", columnGap: "0.45em", rowGap: "0.2em" }}
    >
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <motion.span
            key={index}
            variants={childVariants}
            className="inline-block"
            style={isHighlight ? { color: "#EF6545" } : {}}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
