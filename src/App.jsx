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

import { AnimeProvider } from './contexts/AnimeContext';
import { CuteProvider } from './contexts/CuteContext';
import { GifProvider } from './contexts/GifContext';
import { IconProvider } from './contexts/IconContext';

export default function App() {
  return (
    <AnimeProvider>
      <CuteProvider>
        <GifProvider>
          <IconProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/animes" element={<AnimeExplorerPage />} />
                <Route path="/gifs" element={<GifGalleryPage />} />
                <Route path="/icon" element={<IconGeneratorPage />} />
                <Route path="/cute" element={<CuteCornerPage />} />
              </Routes>
              <Footer />
              <Mascot />
              <MusicWidget />
            </Router>
          </IconProvider>
        </GifProvider>
      </CuteProvider>
    </AnimeProvider>
  );
}
