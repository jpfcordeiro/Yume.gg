
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="yume-footer">
      <div className="footer-divider" />
      <div className="footer-content">
        <span className="footer-made">
          <span className="footer-emoji" aria-hidden="true">🐾</span>
          <span className="footer-txt">Feito com</span>
          <motion.span
            className="footer-heart"
            animate={{ scale: [1, 1.18, 1], color: ["#F72585", "#F72585", "#F72585"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <FaHeart style={{ verticalAlign: 'middle' }} />
          </motion.span>
          <span className="footer-txt">por</span>
          <span className="footer-username">@jpfcordeiro</span>
        </span>
        <motion.a href="https://github.com/jpfcordeiro" target="_blank" rel="noopener noreferrer" className="footer-link" whileHover={{ scale: 1.18, color: '#90A8ED' }}><FaGithub /> GitHub</motion.a>
        <motion.a href="https://linkedin.com/in/jpfcordeiro" target="_blank" rel="noopener noreferrer" className="footer-link" whileHover={{ scale: 1.18, color: '#90A8ED' }}><FaLinkedin /> LinkedIn</motion.a>
        <motion.a href="https://instagram.com/jpfcordeiro" target="_blank" rel="noopener noreferrer" className="footer-link" whileHover={{ scale: 1.18, color: '#F72585' }}><FaInstagram /> Instagram</motion.a>
      </div>
      <div className="footer-bottom-emoji" aria-hidden="true">✨</div>
    </footer>
  );
}
