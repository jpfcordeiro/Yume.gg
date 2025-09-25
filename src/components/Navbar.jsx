

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const logoUrl = '/assets/logo_yume.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo" tabIndex={0} aria-label="Página inicial">
        <motion.img
          src={logoUrl}
          alt="Logo Yume.gg"
          className="navbar-logo-img"
          draggable={false}
          whileHover={{ scale: 1.09, filter: 'drop-shadow(0 0 16px #F72585)' }}
          whileFocus={{ scale: 1.09, filter: 'drop-shadow(0 0 16px #F72585)' }}
          transition={{ type: 'spring', stiffness: 180, damping: 10 }}
        />
        <span className="navbar-logo-emoji" aria-hidden="true">✨</span>
      </NavLink>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Início</NavLink></li>
        <li><NavLink to="/animes">Animes</NavLink></li>
        <li><NavLink to="/gifs">GIFs</NavLink></li>
        <li><NavLink to="/icon">Ícones</NavLink></li>
        <li><NavLink to="/cute">Gatinhos</NavLink></li>
      </ul>
    </nav>
  );
}
