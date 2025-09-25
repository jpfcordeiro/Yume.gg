import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimeExplorerPage from './pages/AnimeExplorerPage';
import GifGalleryPage from './pages/GifGalleryPage';
import IconGeneratorPage from './pages/IconGeneratorPage';
import CuteCornerPage from './pages/CuteCornerPage';


import { AnimeProvider } from './contexts/AnimeContext';
import { CuteProvider } from './contexts/CuteContext';
import { GifProvider } from './contexts/GifContext';

function Home() {
  return (
    <div className="dashboard-container">
      <h1>Yume.gg Dashboard</h1>
      <p style={{textAlign: 'center', marginBottom: '2rem'}}>Bem-vindo(a) ao seu cantinho aesthetic! Use o menu para navegar pelas features.</p>
    </div>
  );
}


export default function App() {
  return (
    <AnimeProvider>
      <CuteProvider>
        <GifProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/animes" element={<AnimeExplorerPage />} />
              <Route path="/gifs" element={<GifGalleryPage />} />
              <Route path="/icon" element={<IconGeneratorPage />} />
              <Route path="/cute" element={<CuteCornerPage />} />
            </Routes>
          </Router>
        </GifProvider>
      </CuteProvider>
    </AnimeProvider>
  );
}
