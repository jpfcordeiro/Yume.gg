import React, { useEffect } from 'react';
import { useIcon } from '../contexts/IconContext';

export default function IconGenerator() {
  const { category, setCategory, icon, loading, error, fetchIcon, CATEGORIES } = useIcon();

  useEffect(() => {
    if (!icon && !loading && !error) {
      fetchIcon(category);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="feature-card icon-generator">
      <h2>Gerador de Ícones</h2>
      <div className="icon-category-select">
        <label htmlFor="icon-category" className="icon-category-label">Categoria:</label>
        <div className="icon-category-buttons">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`icon-category-btn${cat === category ? ' selected' : ''}`}
              onClick={() => setCategory(cat)}
              disabled={loading && cat === category}
              aria-pressed={cat === category}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="icon-display-area">
        {loading && (
          <div className="icon-skeleton shimmer" aria-busy="true" aria-label="Carregando ícone..." />
        )}
        {!loading && icon && (
          <img
            src={icon}
            alt={`Ícone ${category}`}
            className="icon-img animated"
            draggable={false}
            style={{ maxWidth: 220, maxHeight: 220, borderRadius: '1.2rem', boxShadow: '0 0 24px #1a1a2f88' }}
          />
        )}
        {error && (
          <div className="icon-error">
            <span role="img" aria-label="erro">⚠️</span> {error}
          </div>
        )}
        <div className="icon-actions">
          <button
            className="icon-action-btn generate"
            onClick={() => fetchIcon(category)}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Gerar novo ícone'}
          </button>
          {icon && !loading && (
            <a
              href={icon}
              download={`yume-icon-${category}.jpg`}
              className="icon-action-btn download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
