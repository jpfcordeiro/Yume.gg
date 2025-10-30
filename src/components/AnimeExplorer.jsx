import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Scale, Dice5 } from 'tabler-icons-react';
import { useAnime } from '../contexts/AnimeContext';
import { fetchAnimeSuggestions } from '../utils/animeAutocomplete';
import { fetchTopAiringAnimes } from '../utils/animePopular';
import { fetchRandomAnime } from '../utils/animeRandom';
import OptimizedImage from './OptimizedImage';

export default function AnimeExplorer() {
  const {
    query,
    setQuery,
    results,
    loading,
    error,
    searchAnime,
    favorites,
    toggleFavorite,
    isFavorited,
    comparison,
    addToComparison,
    clearComparison,
    filters,
    updateFilter,
    FILTER_OPTIONS
  } = useAnime();

  const [randomAnime, setRandomAnime] = useState(null);
  const [randomLoading, setRandomLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [topAnimes, setTopAnimes] = useState([]);
  const [topLoading, setTopLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const inputRef = useRef();

  async function loadRandomAnime() {
    setRandomLoading(true);
    const anime = await fetchRandomAnime();
    setRandomAnime(anime);
    setRandomLoading(false);
  }

  useEffect(() => {
    loadRandomAnime();
  }, []);

  useEffect(() => {
    setTopLoading(true);
    fetchTopAiringAnimes().then(animes => {
      setTopAnimes(animes);
      setTopLoading(false);
    });
  }, []);

  async function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const sugs = await fetchAnimeSuggestions(value);
      setSuggestions(sugs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setHighlighted(-1);
  }

  function handleSearch(e) {
    e.preventDefault();
    searchAnime(query);
    setShowSuggestions(false);
  }

  function handleSuggestionClick(sug) {
    setQuery(sug);
    searchAnime(sug);
    setShowSuggestions(false);
  }

  function handleKeyDown(e) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlighted(h => (h + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setHighlighted(h => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlighted >= 0) {
      e.preventDefault();
      setQuery(suggestions[highlighted]);
      searchAnime(suggestions[highlighted]);
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }

  function handleBlur() {
    setTimeout(() => setShowSuggestions(false), 120);
  }

  const filteredResults = results.filter(anime => {
    if (filters.status !== 'all' && anime.status?.toLowerCase() !== filters.status) return false;
    if (filters.type !== 'all' && anime.type !== filters.type) return false;
    return true;
  });

  return (
    <section className="anime-explorer-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="anime-explorer-header"
      >
        <h2>🎌 Explorador de Animes</h2>
        <p>Descubra seus animes favoritos com busca inteligente e filtros avançados</p>
      </motion.div>

      {/* Busca e Filtros */}
      <motion.div
        className="anime-search-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <form onSubmit={handleSearch} className="anime-search-form">
          <div className="anime-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Digite o nome do anime..."
              className="anime-input"
              autoFocus
              ref={inputRef}
              autoComplete="off"
            />
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.ul
                  className="anime-suggestions"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {suggestions.map((sug, idx) => (
                    <motion.li
                      key={sug}
                      className={`suggestion-item ${highlighted === idx ? 'highlighted' : ''}`}
                      onMouseDown={() => handleSuggestionClick(sug)}
                      whileHover={{ backgroundColor: '#f0f0ff' }}
                    >
                      {sug}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            className="btn-primary"
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? '⏳ Buscando...' : '🔍 Buscar'}
          </motion.button>
        </form>

        {/* Botões de Ação */}
        <div className="anime-action-buttons">
          <motion.button
            className="btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚙️ {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </motion.button>

          {favorites.length > 0 && (
            <motion.button
              className="btn-secondary"
              onClick={() => {
                setQuery('');
                setResults(favorites);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ❤️ Favoritos ({favorites.length})
            </motion.button>
          )}

          {comparison.length > 0 && (
            <motion.button
              className="btn-secondary"
              onClick={() => setShowComparison(!showComparison)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Scale size={20} />
              Comparar ({comparison.length}/2)
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Painel de Filtros */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="anime-filters-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="filters-grid">
              {Object.entries(FILTER_OPTIONS).map(([filterName, options]) => (
                <div key={filterName} className="filter-group">
                  <label className="filter-label">
                    {filterName.charAt(0).toUpperCase() + filterName.slice(1)}:
                  </label>
                  <select
                    value={filters[filterName]}
                    onChange={(e) => updateFilter(filterName, e.target.value)}
                    className="filter-select"
                  >
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option === 'all' ? 'Todos' : option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="filter-group">
                <label className="filter-label">Ordenar por:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="filter-select"
                >
                  <option value="score">Pontuação</option>
                  <option value="title">Título</option>
                  <option value="airing">Data de Lançamento</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Painel de Comparação */}
      <AnimatePresence>
        {showComparison && comparison.length > 0 && (
          <motion.div
            className="anime-comparison-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="comparison-header">
              <h3>
                <Scale size={24} style={{ display: 'inline-block', marginRight: '0.5rem' }} />
                Comparador de Animes
              </h3>
              <motion.button
                onClick={clearComparison}
                className="btn-small"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Limpar comparação"
              >
                ✕ Limpar
              </motion.button>
            </div>
            <div className="comparison-grid">
              {comparison.map(anime => (
                <motion.div
                  key={anime.mal_id}
                  className="comparison-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <OptimizedImage
                    src={anime.images.jpg.image_url}
                    alt={`Capa do anime: ${anime.title}`}
                    width={225}
                    height={320}
                    placeholderColor="#1A1A2E"
                  />
                  <h4>{anime.title}</h4>
                  <div className="comparison-stats">
                    <p><strong>Pontuação:</strong> ⭐ {anime.score ?? 'N/A'}</p>
                    <p><strong>Tipo:</strong> {anime.type}</p>
                    <p><strong>Episódios:</strong> {anime.episodes ?? 'N/A'}</p>
                    <p><strong>Status:</strong> {anime.status}</p>
                    <p><strong>Lançamento:</strong> {anime.aired?.from?.split('T')[0] ?? 'N/A'}</p>
                  </div>
                  <motion.button
                    onClick={() => addToComparison(anime)}
                    className="btn-small"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✕ Remover
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          className="anime-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Resultados de Busca */}
      <motion.div className="anime-results-container">
        <div className="anime-results-grid">
          {filteredResults.length > 0 ? (
            filteredResults.map((anime, idx) => (
              <motion.div
                key={anime.mal_id}
                className="anime-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <div className="anime-card-image">
                  <OptimizedImage
                    src={anime.images.jpg.image_url}
                    alt={`Capa do anime: ${anime.title}`}
                    className="anime-card-img"
                    width={225}
                    height={320}
                    placeholderColor="#1A1A2E"
                  />
                  <motion.button
                    className={`anime-favorite-btn ${isFavorited(anime.mal_id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(anime)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title={isFavorited(anime.mal_id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart
                      size={24}
                      color="#F72585"
                      fill={isFavorited(anime.mal_id) ? '#F72585' : 'none'}
                      stroke={2}
                    />
                  </motion.button>
                  {comparison.some(a => a.mal_id === anime.mal_id) && (
                    <div className="comparison-badge">✓ Comparando</div>
                  )}
                </div>
                <div className="anime-card-content">
                  <div className="anime-title">{anime.title}</div>
                  <div className="anime-score">⭐ {anime.score ?? 'N/A'}</div>
                  <div className="anime-meta">
                    <span>{anime.type}</span>
                    {anime.episodes && <span>{anime.episodes} eps</span>}
                  </div>
                  <div className="anime-synopsis">
                    {anime.synopsis
                      ? anime.synopsis.slice(0, 110) + (anime.synopsis.length > 110 ? '...' : '')
                      : 'Sem sinopse.'}
                  </div>
                  <div className="anime-card-actions">
                    <motion.a
                      href={anime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver mais
                    </motion.a>
                    <motion.button
                      className="btn-secondary"
                      onClick={() => addToComparison(anime)}
                      disabled={comparison.length >= 2 && !comparison.some(a => a.mal_id === anime.mal_id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Adicionar à comparação"
                    >
                      <Scale size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : results.length === 0 ? (
            <>
              <motion.h3
                className="trending-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                🔥 Animes em Alta Agora
              </motion.h3>
              {topLoading && (
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  ⏳ Carregando animes em alta...
                </motion.div>
              )}
              {topAnimes.map((anime, idx) => (
                <motion.div
                  key={anime.mal_id}
                  className="anime-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="anime-card-image">
                    <OptimizedImage
                      src={anime.images.jpg.image_url}
                      alt={`Capa do anime: ${anime.title}`}
                      className="anime-card-img"
                      width={225}
                      height={320}
                      placeholderColor="#1A1A2E"
                    />
                    <motion.button
                      className={`anime-favorite-btn ${isFavorited(anime.mal_id) ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(anime)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={isFavorited(anime.mal_id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Heart
                        size={24}
                        color="#F72585"
                        fill={isFavorited(anime.mal_id) ? '#F72585' : 'none'}
                        stroke={2}
                      />
                    </motion.button>
                  </div>
                  <div className="anime-card-content">
                    <div className="anime-title">{anime.title}</div>
                    <div className="anime-score">⭐ {anime.score ?? 'N/A'}</div>
                    <div className="anime-meta">
                      <span>{anime.type}</span>
                      {anime.episodes && <span>{anime.episodes} eps</span>}
                    </div>
                    <div className="anime-synopsis">
                      {anime.synopsis
                        ? anime.synopsis.slice(0, 110) + (anime.synopsis.length > 110 ? '...' : '')
                        : 'Sem sinopse.'}
                    </div>
                    <div className="anime-card-actions">
                      <motion.a
                        href={anime.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver mais
                      </motion.a>
                      <motion.button
                        className="btn-secondary"
                        onClick={() => addToComparison(anime)}
                        disabled={comparison.length >= 2 && !comparison.some(a => a.mal_id === anime.mal_id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Adicionar à comparação"
                      >
                        <Scale size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          ) : null}
        </div>
      </motion.div>

      {/* Sidebar com Anime Aleatório */}
      <motion.aside
        className="anime-random-sidebar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="sidebar-header">
          <h3>
            <Dice5 size={24} style={{ display: 'inline-block', marginRight: '0.5rem' }} />
            Anime Aleatório
          </h3>
        </div>
        {randomLoading && (
          <div className="loading-spinner">⏳ Carregando...</div>
        )}
        {randomAnime && !randomLoading && (
          <motion.div
            className="random-anime-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <OptimizedImage
              src={randomAnime.images.jpg.image_url}
              alt={`Capa do anime: ${randomAnime.title}`}
              width={225}
              height={320}
              placeholderColor="#1A1A2E"
            />
            <div className="random-anime-info">
              <div className="title">{randomAnime.title}</div>
              <div className="meta">
                {randomAnime.type} {randomAnime.episodes ? `- ${randomAnime.episodes} eps` : ''}
              </div>
              <div className="score">⭐ {randomAnime.score ?? 'N/A'}</div>
              <div className="synopsis">
                {randomAnime.synopsis
                  ? randomAnime.synopsis.slice(0, 80) + (randomAnime.synopsis.length > 80 ? '...' : '')
                  : 'Sem sinopse.'}
              </div>
              <div className="sidebar-actions">
                <motion.a
                  href={randomAnime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver mais
                </motion.a>
                <motion.button
                  className={`btn-sidebar ${isFavorited(randomAnime.mal_id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(randomAnime)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isFavorited(randomAnime.mal_id) ? '❤️' : '🤍'}
                </motion.button>
              </div>
              <motion.button
                className="btn-secondary"
                onClick={loadRandomAnime}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Dice5 size={20} />
                Sortear outro
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </section>
  );
}
