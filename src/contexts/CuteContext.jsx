import React, { createContext, useContext, useState, useEffect } from 'react';

const CuteContext = createContext();

const CAT_CATEGORIES = ['Fofo', 'Assustador', 'Preguiçoso', 'Ativo', 'Misterioso'];

export function CuteProvider({ children }) {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('cateFavorites');
    return favs ? JSON.parse(favs) : [];
  });
  const [comparison, setComparison] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  useEffect(() => {
    localStorage.setItem('cateFavorites', JSON.stringify(favorites));
  }, [favorites]);

  async function fetchCat() {
    setLoading(true);
    setError('');
    setCat(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch('https://api.thecatapi.com/v1/images/search', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      if (data && data[0] && data[0].url) {
        setCat(data[0]);
      } else {
        setError('Nenhuma imagem encontrada.');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('A busca demorou muito tempo. Tente novamente.');
      } else {
        setError('Erro ao buscar imagem de gatinho. Tente novamente.');
        console.error('Cat fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(catData, catName) {
    const newFav = { url: catData.url, name: catName, id: Date.now() };
    const exists = favorites.some(f => f.id === newFav.id || f.url === newFav.url);
    if (exists) {
      setFavorites(favorites.filter(f => f.url !== newFav.url));
    } else {
      setFavorites([...favorites, newFav]);
    }
  }

  function isFavorited(catUrl) {
    return favorites.some(f => f.url === catUrl);
  }

  function addToComparison(catData, catName) {
    const newItem = { url: catData.url, name: catName, id: Date.now() };
    if (comparison.length < 2) {
      setComparison([...comparison, newItem]);
    } else {
      setComparison([newItem]);
    }
  }

  function clearComparison() {
    setComparison([]);
  }

  function removeFavorite(catUrl) {
    setFavorites(favorites.filter(f => f.url !== catUrl));
  }

  return (
    <CuteContext.Provider value={{
      cat,
      loading,
      error,
      fetchCat,
      favorites,
      toggleFavorite,
      isFavorited,
      comparison,
      addToComparison,
      clearComparison,
      removeFavorite,
      categoryFilter,
      setCategoryFilter,
      CAT_CATEGORIES
    }}>
      {children}
    </CuteContext.Provider>
  );
}

export function useCute() {
  const context = useContext(CuteContext);
  if (!context) {
    throw new Error('useCute deve ser usado dentro de CuteProvider');
  }
  return context;
}
