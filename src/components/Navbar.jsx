import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Yume.gg</div>
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
