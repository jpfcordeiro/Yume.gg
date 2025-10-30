import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Settings, Refresh, Copy, Star, Palette, Dice5 } from 'tabler-icons-react';
import { useIcon } from '../contexts/IconContext';

export default function IconGenerator() {
  const {
    category,
    setCategory,
    icon,
    loading,
    error,
    fetchIcon,
    CATEGORIES,
    filters,
    updateFilter,
    resetFilters,
    FILTER_OPTIONS,
    toggleFavorite,
    isFavorited,
    exportIcon,
    EXPORT_FORMATS
  } = useIcon();

  const [showFilters, setShowFilters] = React.useState(false);

  useEffect(() => {
    if (!icon && !loading && !error) {
      fetchIcon(category);
    }
    // eslint-disable-next-line
  }, []);

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${filters.brightness})
        contrast(${filters.contrast})
        saturate(${filters.saturation})
        blur(${filters.blur}px)
        sepia(${filters.sepia})
      `
    };
  };

  return (
    <section className="feature-card icon-generator">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
  <Star size={24} color="var(--neon-pink)" />
        Gerador de Ícones
      </motion.h2>

      {/* Seleção de Categoria */}
      <div className="icon-category-select">
        <label htmlFor="icon-category" className="icon-category-label">Categoria:</label>
        <div className="icon-category-buttons">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              className={`icon-category-btn${cat === category ? ' selected' : ''}`}
              onClick={() => setCategory(cat)}
              disabled={loading && cat === category}
              aria-pressed={cat === category}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Área de Exibição do Ícone */}
      <div className="icon-display-area">
        {loading && (
          <motion.div
            className="icon-skeleton shimmer"
            aria-busy="true"
            aria-label="Carregando ícone..."
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {!loading && icon && (
          <motion.div
            className="icon-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={icon}
              alt={`Ícone ${category}`}
              className="icon-img animated"
              draggable={false}
              style={getFilterStyle()}
            />
            <motion.button
              className={`icon-favorite-btn${isFavorited(icon) ? ' favorited' : ''}`}
              onClick={toggleFavorite}
              title={isFavorited(icon) ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {isFavorited(icon) ? '❤️' : '🤍'}
            </motion.button>
          </motion.div>
        )}
        {error && (
          <motion.div
            className="icon-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span role="img" aria-label="erro">⚠️</span> {error}
          </motion.div>
        )}
      </div>

      {/* Controles de Filtro */}
      {icon && !loading && (
        <motion.button
          className="icon-filters-toggle"
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Palette size={20} color="var(--pastel-blue)" />
          {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
        </motion.button>
      )}

      {showFilters && (
        <motion.div
          className="icon-filters-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="filters-container">
            {Object.entries(FILTER_OPTIONS).map(([filterName, options]) => (
              <div key={filterName} className="filter-group">
                <label className="filter-label">
                  {filterName.charAt(0).toUpperCase() + filterName.slice(1)}:
                  <span className="filter-value">{filters[filterName].toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min={options.min}
                  max={options.max}
                  step={0.1}
                  value={filters[filterName]}
                  onChange={(e) => updateFilter(filterName, parseFloat(e.target.value))}
                  className="filter-slider"
                />
              </div>
            ))}
            <motion.button
              className="icon-reset-filters-btn"
              onClick={resetFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
            >
              <Refresh size={18} color="var(--pastel-blue)" />
              Resetar Filtros
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Botões de Ação */}
      <div className="icon-actions">
        <motion.button
          className="icon-action-btn generate"
          onClick={() => fetchIcon(category)}
          disabled={loading}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
        >
          <Dice5 size={20} color="var(--pastel-blue)" />
          {loading ? 'Carregando...' : 'Gerar novo'}
        </motion.button>

        {icon && !loading && (
          <>
            <div className="icon-export-group">
              <span className="export-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={18} color="var(--pastel-blue)" />
                Exportar:
              </span>
              {EXPORT_FORMATS.map((format) => (
                <motion.button
                  key={format.id}
                  className="icon-export-btn"
                  onClick={() => exportIcon(format.id)}
                  title={`Exportar como ${format.label}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={16} color="var(--pastel-blue)" />
                  {format.label}
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
