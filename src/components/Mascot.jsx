import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  'Meow! Explore animes incríveis! ✨',
  'Dica: Use palavras-chave para achar animes raros!',
  'Sabia que gatos amam cultura otaku? 🐾',
  'Clique em mim para uma nova dica kawaii!',
  'Nyaa~ Já tomou água hoje? 💧',
  'Otaku também precisa descansar! 😸',
  'Busque por "Ghibli" e veja a magia! 🌸',
];

export default function Mascot() {
  const [phrase, setPhrase] = useState(phrases[0]);
  const [show, setShow] = useState(true);
  const location = useLocation();

  // Troca frase a cada 9s
  useEffect(() => {
    const timer = setInterval(() => {
      setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Troca frase ao mudar de página e faz mascote reaparecer
  useEffect(() => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    setShow(true);
    // eslint-disable-next-line
  }, [location.pathname]);


  function handleMascotClick() {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    setShow(false); // Mascote some ao clicar
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="yume-mascot-container" onClick={handleMascotClick} title="Clique para nova dica!">
          <motion.div
            className="yume-mascot-bubble"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            key={phrase}
          >
            {phrase}
          </motion.div>
          <motion.div
            className="yume-mascot-img"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12 }}
          >
            {/* SVG de gatinho kawaii */}
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="35" cy="45" rx="22" ry="18" fill="#fff" stroke="#23243a" strokeWidth="2"/>
              <ellipse cx="25" cy="40" rx="3.5" ry="4.5" fill="#23243a"/>
              <ellipse cx="45" cy="40" rx="3.5" ry="4.5" fill="#23243a"/>
              <ellipse cx="35" cy="52" rx="6" ry="3" fill="#f72585"/>
              <path d="M18 30 Q10 10 28 18" stroke="#23243a" strokeWidth="2" fill="none"/>
              <path d="M52 30 Q60 10 42 18" stroke="#23243a" strokeWidth="2" fill="none"/>
              <ellipse cx="20" cy="28" rx="4" ry="7" fill="#fff" stroke="#23243a" strokeWidth="2"/>
              <ellipse cx="50" cy="28" rx="4" ry="7" fill="#fff" stroke="#23243a" strokeWidth="2"/>
            </svg>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
