import React, { createContext, useContext, useState } from 'react';

const GifContext = createContext();

const GIPHY_API_KEY = 'dc6zaTOxFJmzC'; // Public beta key

export function GifProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchGifs(q) {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(q)}&limit=16&rating=pg`);
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setResults(data.data);
      } else {
        setError('Nenhum GIF encontrado.');
      }
    } catch (err) {
      setError('Erro ao buscar GIFs.');
    } finally {
      setLoading(false);
    }
  }

  async function randomGif() {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&rating=pg`);
      const data = await res.json();
      if (data.data && data.data.images) {
        setResults([data.data]);
      } else {
        setError('Nenhum GIF encontrado.');
      }
    } catch (err) {
      setError('Erro ao buscar GIF aleatório.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <GifContext.Provider value={{ query, setQuery, results, loading, error, searchGifs, randomGif }}>
      {children}
    </GifContext.Provider>
  );
}

export function useGif() {
  return useContext(GifContext);
}
