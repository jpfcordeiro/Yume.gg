import React, { useRef } from 'react';
import { useGif } from '../contexts/GifContext';

const SKELETON_COUNT = 8;

export default function GifGallery() {
  const { query, setQuery, results, loading, error, searchGifs, randomGif } = useGif();
  const inputRef = useRef();

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

  return (
    <section className="feature-card gif-gallery">
      <h2>Galeria de GIFs</h2>
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
        <button className="btn-primary gif-btn" type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        <button className="btn-primary gif-btn random" type="button" onClick={handleRandom} disabled={loading}>
          Aleatório
        </button>
      </form>
      {error && <div className="anime-error">{error}</div>}
      <div className="gif-results">
        {loading && Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div className="gif-skeleton" key={i} />
        ))}
        {!loading && results.length === 0 && !error && (
          <div className="gif-placeholder">
            <span role="img" aria-label="sparkles">✨</span> Pesquise ou clique em Aleatório para ver GIFs aesthetic!
          </div>
        )}
        {results.map(gif => (
          <a
            key={gif.id}
            href={gif.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gif-card"
            title={gif.title || 'Ver no GIPHY'}
          >
            <img
              src={gif.images?.fixed_height?.url || gif.images?.original?.url}
              alt={gif.title || 'GIF aesthetic'}
              className="gif-img gif-animate"
            />
            <span className="gif-tooltip">Abrir no GIPHY</span>
          </a>
        ))}
      </div>
      <div className="gif-powered">
        <img src="https://giphy.com/static/img/giphy_logo_square_social.png" alt="GIPHY logo" className="gif-giphy-logo" />
        <span>Powered by GIPHY</span>
      </div>
    </section>
  );
}
