import React from 'react';
import { useAnime } from '../contexts/AnimeContext';

export default function AnimeExplorer() {
  const { query, setQuery, results, loading, error, searchAnime } = useAnime();

  function handleSearch(e) {
    e.preventDefault();
    searchAnime(query);
  }

  return (
    <section className="feature-card anime-explorer">
      <h2>Explorar Animes</h2>
      <form onSubmit={handleSearch} style={{display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap'}}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Digite o nome do anime..."
          className="anime-input"
          autoFocus
        />
        <button className="btn-primary" type="submit" disabled={loading} style={{minWidth: 90}}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {error && <div className="anime-error">{error}</div>}
      <div className="anime-results">
        {results.map(anime => (
          <div className="anime-card" key={anime.mal_id}>
            <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-img" />
            <div className="anime-info">
              <div className="anime-title">{anime.title}</div>
              <div className="anime-score">⭐ {anime.score ?? 'N/A'}</div>
              <div className="anime-synopsis">{anime.synopsis ? anime.synopsis.slice(0, 120) + (anime.synopsis.length > 120 ? '...' : '') : 'Sem sinopse.'}</div>
              <a href={anime.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{marginTop: 8, fontSize: '0.95rem', padding: '0.4em 1em'}}>Ver mais</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
