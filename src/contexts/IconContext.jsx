import React, { createContext, useContext, useState } from 'react';

const IconContext = createContext();

const CATEGORIES = [
  'waifu', 'neko', 'shinobu', 'megumin', 'awoo', 'foxgirl', 'bully', 'cuddle', 'cry', 'blush', 'smile', 'happy', 'wink', 'dance', 'hug'
];

const EXPORT_FORMATS = [
  { id: 'png', label: 'PNG', type: 'image/png' },
  { id: 'jpg', label: 'JPG', type: 'image/jpeg' },
  { id: 'webp', label: 'WEBP', type: 'image/webp' }
];

const FILTER_OPTIONS = {
  brightness: { min: 0.5, max: 1.5, default: 1 },
  contrast: { min: 0.5, max: 1.5, default: 1 },
  saturation: { min: 0, max: 2, default: 1 },
  blur: { min: 0, max: 10, default: 0 },
  sepia: { min: 0, max: 1, default: 0 }
};

export function IconProvider({ children }) {
  const [category, setCategory] = useState('waifu');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    brightness: FILTER_OPTIONS.brightness.default,
    contrast: FILTER_OPTIONS.contrast.default,
    saturation: FILTER_OPTIONS.saturation.default,
    blur: FILTER_OPTIONS.blur.default,
    sepia: FILTER_OPTIONS.sepia.default
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('iconFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  async function fetchIcon(cat = category) {
    setLoading(true);
    setError('');
    setIcon(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(`https://api.waifu.pics/sfw/${cat}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      if (data.url) {
        setIcon(data.url);
      } else {
        setError('Nenhuma imagem encontrada para essa categoria.');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('A busca demorou muito tempo. Tente novamente.');
      } else {
        setError('Erro ao buscar ícone. Tente outra categoria.');
        console.error('Icon fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  }

  function changeCategory(cat) {
    setCategory(cat);
    fetchIcon(cat);
  }

  function updateFilter(filterName, value) {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }

  function resetFilters() {
    setFilters({
      brightness: FILTER_OPTIONS.brightness.default,
      contrast: FILTER_OPTIONS.contrast.default,
      saturation: FILTER_OPTIONS.saturation.default,
      blur: FILTER_OPTIONS.blur.default,
      sepia: FILTER_OPTIONS.sepia.default
    });
  }

  function toggleFavorite() {
    if (!icon) return;
    
    setFavorites(prev => {
      const newFavorites = prev.includes(icon)
        ? prev.filter(fav => fav !== icon)
        : [...prev, icon];
      
      localStorage.setItem('iconFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }

  function isFavorited(iconUrl) {
    return favorites.includes(iconUrl);
  }

  function exportIcon(format) {
    if (!icon) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;

      // Aplicar filtros no canvas
      ctx.filter = `
        brightness(${filters.brightness}) 
        contrast(${filters.contrast}) 
        saturate(${filters.saturation}) 
        blur(${filters.blur}px) 
        sepia(${filters.sepia})
      `;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `yume-icon-${category}-${Date.now()}.${format}`;
        link.click();
        URL.revokeObjectURL(url);
      }, EXPORT_FORMATS.find(f => f.id === format)?.type || 'image/png');
    };
    img.src = icon;
  }

  return (
    <IconContext.Provider value={{
      category,
      setCategory: changeCategory,
      icon,
      loading,
      error,
      fetchIcon,
      CATEGORIES,
      filters,
      updateFilter,
      resetFilters,
      FILTER_OPTIONS,
      favorites,
      toggleFavorite,
      isFavorited,
      exportIcon,
      EXPORT_FORMATS
    }}>
      {children}
    </IconContext.Provider>
  );
}

export function useIcon() {
  const context = useContext(IconContext);
  if (!context) {
    throw new Error('useIcon deve ser usado dentro de IconProvider');
  }
  return context;
}
