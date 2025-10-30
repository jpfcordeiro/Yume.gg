import React from 'react';
import { motion } from 'framer-motion';

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemHidden = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export const cardHover = {
  scale: 1.05,
  boxShadow: '0 12px 32px rgba(247, 37, 133, 0.25)',
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

export const cardTap = {
  scale: 0.97,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

export function AnimatedSection({ children, stagger = true, delay = 0 }) {
  return (
    <motion.div
      variants={stagger ? staggerContainer : {}}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, delay = 0 }) {
  return (
    <motion.div variants={itemHidden} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, ...props }) {
  return (
    <motion.div
      whileHover={cardHover}
      whileTap={cardTap}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default { staggerContainer, itemHidden, cardHover, cardTap, AnimatedSection, AnimatedItem, AnimatedCard };
