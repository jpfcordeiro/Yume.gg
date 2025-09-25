
import React from 'react';
import { motion } from 'framer-motion';
import IconGenerator from '../components/IconGenerator';

export default function IconGeneratorPage() {
  return (
    <motion.div className="page-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.7, ease: [0.4, 1.4, 0.6, 1] }}>
      <IconGenerator />
    </motion.div>
  );
}
