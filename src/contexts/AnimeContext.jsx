import React, { createContext, useContext, useState } from 'react';

const AnimeContext = createContext();

export function AnimeProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchAnime(q) {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=8`);
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setResults(data.data);
      } else {
        setError('Nenhum anime encontrado.');
      }
    } catch (err) {
      setError('Erro ao buscar animes.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimeContext.Provider value={{ query, setQuery, results, loading, error, searchAnime }}>
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnime() {
  return useContext(AnimeContext);
}
