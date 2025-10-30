import React, { createContext, useContext, useState, useEffect } from 'react';

const GifContext = createContext();

const GIF_CATEGORIES = ['Cute', 'Funny', 'Anime', 'Dance', 'Love', 'Wow', 'Cool', 'Awesome'];

export function GifProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('gifFavorites');
    return favs ? JSON.parse(favs) : [];
  });
  const [comparison, setComparison] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  // URLs de GIFs de fallback em caso de erro de API
  const fallbackGifs = [
    { id: '1', title: 'Cute Cat', url: 'https://media.giphy.com/media/JIX9RW7U0UcKDnmTV2/giphy.gif' },
    { id: '2', title: 'Happy Dance', url: 'https://media.giphy.com/media/g9GUuK2K19e3C/giphy.gif' },
    { id: '3', title: 'Funny Pet', url: 'https://media.giphy.com/media/l0HlDy9x8FZo0XO1i/giphy.gif' },
    { id: '4', title: 'Cute Anime', url: 'https://media.giphy.com/media/3o7TKNy2F6g0SVqRd6/giphy.gif' },
    { id: '5', title: 'Awesome', url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif' }
  ];

  useEffect(() => {
    localStorage.setItem('gifFavorites', JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(gifData) {
    const newFav = { url: gifData.images?.fixed_height?.url || gifData.images?.original?.url, title: gifData.title, id: gifData.id };
    const exists = favorites.some(f => f.id === newFav.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== newFav.id));
    } else {
      setFavorites([...favorites, newFav]);
    }
  }

  function isFavorited(gifId) {
    return favorites.some(f => f.id === gifId);
  }

  function addToComparison(gifData) {
    const newItem = { url: gifData.images?.fixed_height?.url || gifData.images?.original?.url, title: gifData.title, id: gifData.id };
    if (comparison.length < 2) {
      setComparison([...comparison, newItem]);
    } else {
      setComparison([newItem]);
    }
  }

  function clearComparison() {
    setComparison([]);
  }

  function removeFavorite(gifId) {
    setFavorites(favorites.filter(f => f.id !== gifId));
  }

  async function searchGifs(q) {
    if (!q.trim()) {
      setError('Por favor, digite algo para buscar GIFs.');
      return;
    }
    setQuery(q);
    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      // Tentando usar a API pública do Giphy (sem chave, com limite baixo)
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(q)}&limit=20&rating=pg&api_key=xKLpjvnJ6pGPgv6sQk0EqE0Qr2l5qWKb`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setResults(data.data);
          return;
        }
      }
      
      // Se falhar, usar fallback de gifs locais
      const filtered = fallbackGifs.filter(gif => 
        gif.title.toLowerCase().includes(q.toLowerCase()) || 
        Math.random() < 0.5
      );
      
      if (filtered.length > 0) {
        setResults(filtered);
      } else {
        setError('Nenhum GIF encontrado para sua busca. Tente outra palavra.');
        setResults(fallbackGifs.slice(0, 5));
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('A busca demorou muito tempo. Usando GIFs de fallback...');
      } else {
        setError('Erro ao buscar GIFs. Usando GIFs de fallback...');
        console.error('GIF search error:', err);
      }
      // Mostrar alguns GIFs de fallback mesmo com erro
      setResults(fallbackGifs.slice(0, 5));
    } finally {
      setLoading(false);
    }
  }

  async function randomGif() {
    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      // Array de queries para busca aleatória
      const randomQueries = ['cute', 'funny', 'happy', 'dance', 'love', 'wow', 'cool', 'awesome', 'kawaii', 'adorable'];
      const randomQ = randomQueries[Math.floor(Math.random() * randomQueries.length)];
      
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${randomQ}&limit=1&rating=pg&api_key=xKLpjvnJ6pGPgv6sQk0EqE0Qr2l5qWKb`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setResults([data.data[0]]);
          return;
        }
      }
      
      // Se falhar, usar um GIF de fallback aleatório
      const randomGifFallback = fallbackGifs[Math.floor(Math.random() * fallbackGifs.length)];
      setResults([{
        id: randomGifFallback.id,
        title: randomGifFallback.title,
        images: {
          downsized: {
            url: randomGifFallback.url
          }
        }
      }]);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('A busca demorou muito tempo. Usando GIF aleatório...');
      } else {
        setError('Erro ao buscar GIF aleatório.');
        console.error('Random GIF error:', err);
      }
      // Mostrar um GIF de fallback aleatório mesmo com erro
      const randomGifFallback = fallbackGifs[Math.floor(Math.random() * fallbackGifs.length)];
      setResults([{
        id: randomGifFallback.id,
        title: randomGifFallback.title,
        images: {
          downsized: {
            url: randomGifFallback.url
          }
        }
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GifContext.Provider value={{
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
    }}>
      {children}
    </GifContext.Provider>
  );
}

export function useGif() {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error('useGif deve ser usado dentro de GifProvider');
  }
  return context;
}


