import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageEnterEffect({ children, type = 'fade', delay = 0 }) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -40 },
    },
    slideDown: {
      initial: { opacity: 0, y: -40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 40 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
    },
    slideRight: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 40 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    bounce: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -60 },
      transition: { type: 'spring', stiffness: 120, damping: 14 },
    },
  };

  const variant = variants[type] || variants.fade;

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={
        variant.transition || {
          duration: 0.6,
          ease: [0.4, 1.4, 0.6, 1],
          delay,
        }
      }
    >
      {children}
    </motion.div>
  );
}
