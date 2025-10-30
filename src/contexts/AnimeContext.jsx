import React, { createContext, useContext, useState, useEffect } from 'react';

const AnimeContext = createContext();

const FILTER_OPTIONS = {
  status: ['all', 'airing', 'complete', 'upcoming'],
  type: ['all', 'TV', 'Movie', 'OVA', 'ONA', 'Special', 'Music'],
  season: ['all', 'spring', 'summer', 'fall', 'winter'],
};

export function AnimeProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('animeFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [comparison, setComparison] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    season: 'all',
    sortBy: 'score',
  });

  useEffect(() => {
    localStorage.setItem('animeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  async function searchAnime(q) {
    if (!q.trim()) {
      setError('Por favor, digite o nome de um anime.');
      return;
    }
    setQuery(q);
    setLoading(true);
    setError('');
    setResults([]);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      let url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=25&order_by=${filters.sortBy}&sort=desc`;
      
      if (filters.status !== 'all') {
        url += `&status=${filters.status}`;
      }
      if (filters.type !== 'all') {
        url += `&type=${filters.type}`;
      }
      if (filters.season !== 'all') {
        url += `&season=${filters.season}`;
      }
      
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setResults(data.data);
      } else {
        setError('Nenhum anime encontrado para sua busca.');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('A busca demorou muito tempo. Tente novamente.');
      } else {
        setError('Erro ao buscar animes. Verifique sua conexão.');
        console.error('Anime search error:', err);
      }
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(anime) {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.mal_id === anime.mal_id);
      if (exists) {
        return prev.filter(fav => fav.mal_id !== anime.mal_id);
      } else {
        return [...prev, anime];
      }
    });
  }

  function isFavorited(animeId) {
    return favorites.some(fav => fav.mal_id === animeId);
  }

  function addToComparison(anime) {
    if (comparison.length >= 2 && !comparison.some(a => a.mal_id === anime.mal_id)) {
      setError('Máximo 2 animes para comparar');
      return;
    }
    
    setComparison(prev => {
      const exists = prev.some(a => a.mal_id === anime.mal_id);
      if (exists) {
        return prev.filter(a => a.mal_id !== anime.mal_id);
      } else {
        return [...prev, anime];
      }
    });
  }

  function clearComparison() {
    setComparison([]);
  }

  function updateFilter(filterName, value) {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }

  return (
    <AnimeContext.Provider value={{
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
    }}>
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnime() {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnime deve ser usado dentro de AnimeProvider');
  }
  return context;
}
