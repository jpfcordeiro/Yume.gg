import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share } from 'tabler-icons-react';
import { useGif } from '../contexts/GifContext';
import Toast from './Toast';
import ShareButton from './ShareButton';
import OptimizedImage from './OptimizedImage';

const SKELETON_COUNT = 8;

export default function GifGallery() {
  const {
    query,
    setQuery,
    results,
    loading,
    error,
    searchGifs,
    randomGif,
    favorites,
    toggleFavorite,
    isFavorited,
    comparison,
    addToComparison,
    clearComparison,
    removeFavorite,
    categoryFilter,
    setCategoryFilter,
    GIF_CATEGORIES
  } = useGif();

  const inputRef = useRef();
  const [toast, setToast] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    searchGifs(query);
    inputRef.current && inputRef.current.blur();
  }

  function handleRandom() {
    randomGif();
    setQuery('');
    inputRef.current && inputRef.current.blur();
  }

  function handleFavorite(gif) {
    toggleFavorite(gif);
    setToast({ icon: '❤️', message: isFavorited(gif.id) ? 'Removido dos favoritos' : 'Adicionado aos favoritos' });
  }

  function handleAddComparison(gif) {
    addToComparison(gif);
    setToast({ icon: '✓', message: 'Adicionado à comparação!' });
  }

  return (
    <section className="gif-gallery-section">
      {toast && <Toast icon={toast.icon} message={toast.message} onClose={() => setToast(null)} />}

      <motion.div
        className="gif-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="gif-title">🎬 Galeria de GIFs</h2>
        <div className="gif-header-controls">
          <motion.button
            className={`btn-icon ${comparison.length > 0 ? 'active' : ''}`}
            onClick={() => setShowComparison(!showComparison)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Comparação"
          >
            ⚖️ {comparison.length}
          </motion.button>
          <motion.button
            className="btn-icon"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Filtros"
          >
            🎛️
          </motion.button>
        </div>
      </motion.div>

      {/* Painel de Filtros */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="gif-filters-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="gif-filter-group">
              <label>Categoria:</label>
              <div className="gif-filter-options">
                {['Todos', ...GIF_CATEGORIES].map((cat, idx) => (
                  <motion.button
                    key={idx}
                    className={`gif-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form de Busca */}
      <form onSubmit={handleSearch} className="gif-form">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Pesquise GIFs kawaii, anime, Sanrio..."
          className="gif-input"
          autoFocus
        />
        <motion.button
          className="btn-primary gif-btn"
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
        >
          {loading ? 'Buscando...' : '🔍 Buscar'}
        </motion.button>
        <motion.button
          className="btn-primary gif-btn random"
          type="button"
          onClick={handleRandom}
          disabled={loading}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
        >
          🎲 Aleatório
        </motion.button>
      </form>

      {error && (
        <motion.div className="gif-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.div>
      )}

      {/* Resultados */}
      <div className="gif-results">
        {loading && Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <motion.div
            className="gif-skeleton"
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
        {!loading && results.length === 0 && !error && (
          <motion.div
            className="gif-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✨ Pesquise ou clique em Aleatório para ver GIFs aesthetic!
          </motion.div>
        )}
        <AnimatePresence>
          {results.map((gif, idx) => (
            <motion.div
              key={gif.id}
              className="gif-card-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="gif-card">
                <a
                  href={gif.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={gif.title || 'Ver no GIPHY'}
                >
                  <OptimizedImage
                    src={gif.images?.fixed_height?.url || gif.images?.original?.url}
                    alt={`GIF: ${gif.title || 'GIF aesthetic'}`}
                    className="gif-img"
                    width={240}
                    height={135}
                    placeholderColor="#0a0e27"
                  />
                  <span className="gif-tooltip">Abrir no GIPHY ↗</span>
                </a>
                <div className="gif-card-actions">
                  <motion.button
                    className={`btn-icon-small ${isFavorited(gif.id) ? 'favorited' : ''}`}
                    onClick={() => handleFavorite(gif)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title={isFavorited(gif.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart
                      size={20}
                      color="#F72585"
                      fill={isFavorited(gif.id) ? '#F72585' : 'none'}
                      stroke={2}
                    />
                  </motion.button>
                  <motion.button
                    className="btn-icon-small"
                    onClick={() => handleAddComparison(gif)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Comparar"
                  >
            <Share size={20} color="#90A8ED" stroke={2} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Favoritos */}
      {favorites.length > 0 && (
        <motion.div
          className="gif-favorites-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="gif-section-title">❤️ Favoritos ({favorites.length})</h3>
          <motion.div className="gif-favorites-grid" layout>
            <AnimatePresence>
              {favorites.map((fav, idx) => (
                <motion.div
                  key={fav.id}
                  className="gif-fav-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <a href={fav.url} target="_blank" rel="noopener noreferrer">
                    <OptimizedImage
                      src={fav.url}
                      alt={`GIF favorito: ${fav.title}`}
                      className="gif-fav-img"
                      placeholderColor="#0a0e27"
                    />
                  </a>
                  <div className="gif-fav-name">{fav.title}</div>
                  <div className="gif-fav-actions">
                    <motion.button
                      className="btn-icon-small"
                      onClick={() => removeFavorite(fav.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="Remover"
                    >
                      ✕
                    </motion.button>
                    <ShareButton url={fav.url} name={fav.title} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* Painel de Comparação */}
      <AnimatePresence>
        {showComparison && comparison.length > 0 && (
          <motion.div
            className="gif-comparison-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="gif-comparison-header">
              <h3>⚖️ Comparação de GIFs</h3>
              <motion.button
                className="btn-icon"
                onClick={clearComparison}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>
            <motion.div className="gif-comparison-grid" layout>
              <AnimatePresence>
                {comparison.map((gif, idx) => (
                  <motion.div
                    key={gif.id}
                    className="gif-comparison-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <OptimizedImage
                      src={gif.url}
                      alt={`GIF em comparação: ${gif.title}`}
                      className="gif-comp-img"
                      placeholderColor="#0a0e27"
                    />
                    <div className="gif-comp-info">
                      <strong>{gif.title}</strong>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gif-powered">
        <img src="https://giphy.com/static/img/giphy_logo_square_social.png" alt="GIPHY logo" className="gif-giphy-logo" />
        <span>Powered by GIPHY</span>
      </div>
    </section>
  );
}
