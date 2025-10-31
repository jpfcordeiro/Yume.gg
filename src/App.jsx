import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Mascot from './components/Mascot';
import MusicWidget from './components/MusicWidget';

import AnimeExplorerPage from './pages/AnimeExplorerPage';
import GifGalleryPage from './pages/GifGalleryPage';
import IconGeneratorPage from './pages/IconGeneratorPage';
import CuteCornerPage from './pages/CuteCornerPage';
import HomePage from './pages/HomePage';
import StayAwayPage from './pages/StayAwayPage';

import { AnimeProvider } from './contexts/AnimeContext';
import { CuteProvider } from './contexts/CuteContext';
import { GifProvider } from './contexts/GifContext';
import { IconProvider } from './contexts/IconContext';
import { ThemeProvider } from './contexts/ThemeContext';
import useThemeKeyboard from './hooks/useThemeKeyboard';

// Componente interno para usar o hook dentro do ThemeProvider
const AppContent = () => {
  useThemeKeyboard(); // Atalho de teclado 'T' para alternar temas

  return (
    <AnimeProvider>
      <CuteProvider>
        <GifProvider>
          <IconProvider>
            <Router>
              <Navbar />
              <main style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/animes" element={<AnimeExplorerPage />} />
                  <Route path="/gifs" element={<GifGalleryPage />} />
                  <Route path="/icon" element={<IconGeneratorPage />} />
                  <Route path="/cute" element={<CuteCornerPage />} />
                  <Route path="/stay-away" element={<StayAwayPage />} />
                </Routes>
              </main>
              <Footer />
              <Mascot />
              <MusicWidget />
            </Router>
          </IconProvider>
        </GifProvider>
      </CuteProvider>
    </AnimeProvider>
  );
};

export default function App() {
  // Debug: log render
  console.log('App render');
  try {
    return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    );
  } catch (err) {
    return <div style={{color: 'var(--neon-pink)', fontWeight: 700, padding: 32}}>Erro ao renderizar App: {String(err)}</div>;
  }
}
