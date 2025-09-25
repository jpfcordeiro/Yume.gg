import React, { useState, useRef, useEffect } from 'react';
import { useAnime } from '../contexts/AnimeContext';

import { fetchAnimeSuggestions } from '../utils/animeAutocomplete';
import { fetchTopAiringAnimes } from '../utils/animePopular';
import { fetchRandomAnime } from '../utils/animeRandom';

export default function AnimeExplorer() {
  const [randomAnime, setRandomAnime] = useState(null);
  const [randomLoading, setRandomLoading] = useState(false);

  const { query, setQuery, results, loading, error, searchAnime } = useAnime();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [topAnimes, setTopAnimes] = useState([]);
  const [topLoading, setTopLoading] = useState(false);
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

  return (
    <section className="feature-card anime-explorer" style={{ maxWidth: '1100px', margin: '32px auto', width: '100%', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ flex: 3, minWidth: 0 }}>
        <h2>Explorar Animes</h2>
        <form onSubmit={handleSearch} style={{display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', position: 'relative'}} autoComplete="off">
          <div style={{ position: 'relative', flex: 1 }}>
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
            {showSuggestions && suggestions.length > 0 && (
              <ul className="anime-suggestions" style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '100%',
                background: '#fff',
                border: '1px solid #eee',
                zIndex: 10,
                listStyle: 'none',
                margin: 0,
                padding: 0,
                maxHeight: 180,
                overflowY: 'auto',
                boxShadow: '0 2px 8px #0001',
              }}>
                {suggestions.map((sug, idx) => (
                  <li
                    key={sug}
                    onMouseDown={() => handleSuggestionClick(sug)}
                    style={{
                      padding: '7px 12px',
                      background: highlighted === idx ? '#f0f0ff' : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {sug}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="btn-primary" type="submit" disabled={loading} style={{minWidth: 90}}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
        {error && <div className="anime-error">{error}</div>}
        <div className="anime-results" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          marginTop: 18,
        }}>
          {(results.length > 0 ? results : []).map(anime => (
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
          {results.length === 0 && (
            <>
              <div style={{gridColumn: '1/-1', margin: '0 0 10px 0', fontWeight: 600, fontSize: 20, color: '#7a5af5'}}>Animes em alta agora</div>
              {topLoading && <div style={{gridColumn: '1/-1'}}>Carregando animes em alta...</div>}
              {topAnimes.map(anime => (
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
            </>
          )}
        </div>
      </div>
      <aside style={{ flex: 1, minWidth: 260, maxWidth: 340, background: '#f8f7ff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 18, marginTop: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, color: '#7a5af5' }}>Anime aleatório</div>
        {randomLoading && <div>Carregando...</div>}
        {randomAnime && !randomLoading && (
          <div style={{ textAlign: 'center' }}>
            <img src={randomAnime.images.jpg.image_url} alt={randomAnime.title} style={{ width: 120, height: 170, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
            <div style={{ fontWeight: 500, fontSize: 16 }}>{randomAnime.title}</div>
            <div style={{ fontSize: 13, color: '#888', margin: '4px 0 8px 0' }}>{randomAnime.type} {randomAnime.episodes ? `- ${randomAnime.episodes} eps` : ''}</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>{randomAnime.synopsis ? randomAnime.synopsis.slice(0, 90) + (randomAnime.synopsis.length > 90 ? '...' : '') : 'Sem sinopse.'}</div>
            <a href={randomAnime.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.95rem', padding: '0.4em 1em', marginBottom: 8, display: 'inline-block' }}>Ver mais</a>
            <button className="btn-secondary" style={{ marginTop: 8 }} onClick={loadRandomAnime}>Sortear outro</button>
          </div>
        )}
      </aside>
    </section>
  );
}
