
import React, { useState } from 'react';
import AnimatedCatsBg from '../components/AnimatedCatsBg';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import cuteNames from '../utils/cuteNames';
import { FaCat, FaFilm, FaSmile, FaImage } from 'react-icons/fa';

const logoUrl = '/assets/logo-yume.png';

const features = [
  {
    title: 'Anime Explorer',
    desc: 'Descubra animes, busque e explore detalhes.',
    icon: <FaFilm size={36} color="#90A8ED" />,
    route: '/animes',
    color: 'var(--pastel-blue)'
  },
  {
    title: 'Gif Gallery',
    desc: 'Procure e compartilhe GIFs divertidos.',
    icon: <FaImage size={36} color="#F72585" />,
    route: '/gifs',
    color: 'var(--neon-pink)'
  },
  {
    title: 'Icon Generator',
    desc: 'Gere ícones kawaii para seu perfil.',
    icon: <FaSmile size={36} color="#E0D3F0" />,
    route: '/icon',
    color: 'var(--ghost-white)'
  },
  {
    title: 'Cute Corner',
    desc: 'Veja fotos de gatinhos fofos aleatórios.',
    icon: <FaCat size={36} color="#F72585" />,
    route: '/cute',
    color: 'var(--neon-pink)'
  }
];

function getRandomCuteName() {
  return cuteNames[Math.floor(Math.random() * cuteNames.length)];
}

export default function HomePage() {
  const [catName, setCatName] = useState(getRandomCuteName());
  const navigate = useNavigate();

  return (
    <>
      <AnimatedCatsBg count={7} />
      <motion.div className="dashboard-container home-animated" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.4, 1.4, 0.6, 1] }}>
        <motion.img
          src={logoUrl}
          alt="Logo Yume.gg"
          className="home-logo"
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{
            opacity: 1,
            scale: [1, 1.08, 1],
            y: 0,
            filter: [
              'drop-shadow(0 2px 16px rgba(144,168,237,0.13))',
              'drop-shadow(0 4px 32px #F7258580)',
              'drop-shadow(0 2px 16px rgba(144,168,237,0.13))'
            ]
          }}
          transition={{
            duration: 0.7,
            delay: 0.05,
            type: 'spring',
            stiffness: 120,
            scale: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
            filter: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
          }}
          draggable={false}
        />
        <motion.h1 className="home-title" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>Yume.gg Dashboard</motion.h1>
        <motion.p className="home-greeting" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>Bem-vindo(a) ao seu cantinho aesthetic! ✨</motion.p>
        <motion.div className="home-cards" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="home-feature-card"
              style={{ borderColor: f.color }}
              tabIndex={0}
              onClick={() => navigate(f.route)}
              onKeyDown={e => e.key === 'Enter' && navigate(f.route)}
              whileHover={{ scale: 1.07, boxShadow: '0 6px 24px 0 var(--neon-pink)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, type: 'spring', stiffness: 120 }}
            >
              <div className="home-feature-icon">{f.icon}</div>
              <div className="home-feature-title">{f.title}</div>
              <div className="home-feature-desc">{f.desc}</div>
              <motion.button className="home-feature-btn" style={{ background: f.color }} whileHover={{ scale: 1.09 }} whileTap={{ scale: 0.96 }}>
                Acessar
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="home-catname-widget" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <span className="catname-label">Nome de gato aleatório:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={catName}
              className="catname-value"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {catName}
            </motion.span>
          </AnimatePresence>
          <motion.button className="catname-btn" whileHover={{ scale: 1.09 }} whileTap={{ scale: 0.96 }} onClick={() => setCatName(getRandomCuteName())}>
            Sortear outro
          </motion.button>
        </motion.div>
        <motion.div className="home-easteregg" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>🐾</motion.div>
      </motion.div>
    </>
  );
}
