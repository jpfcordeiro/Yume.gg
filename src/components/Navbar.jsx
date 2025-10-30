

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Flame, Photo, Star, Paw, AlertCircle } from 'tabler-icons-react';
import ThemeSelector from './ThemeSelector';
import AnimatedLogo from './AnimatedLogo';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo" tabIndex={0} aria-label="Página inicial">
        <motion.div
          className="navbar-logo-animated"
          whileHover={{ scale: 1.09 }}
          whileFocus={{ scale: 1.09 }}
          transition={{ type: 'spring', stiffness: 180, damping: 10 }}
        >
          <AnimatedLogo />
        </motion.div>
      </NavLink>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className="navbar-link">
            <Home size={20} />
            <span>Início</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/animes" className="navbar-link">
            <Flame size={20} />
            <span>Animes</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/gifs" className="navbar-link">
            <Photo size={20} />
            <span>GIFs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/icon" className="navbar-link">
            <Star size={20} />
            <span>Ícones</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cute" className="navbar-link">
            <Paw size={20} />
            <span>Gatinhos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/stay-away" className="navbar-link danger">
            <AlertCircle size={20} />
            <span>FIQUE LONGE</span>
          </NavLink>
        </li>
      </ul>
      <ThemeSelector />
    </nav>
  );
}
