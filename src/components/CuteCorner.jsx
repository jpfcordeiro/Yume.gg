
import React, { useEffect, useRef, useState } from 'react';
import { useCute } from '../contexts/CuteContext';
import cuteNamesDict from '../utils/cuteNames';

import { fetchCatFactAndTranslate } from '../utils/catFactApi';

const cuteNames = cuteNamesDict.gatos;

function getRandomName() {
  return cuteNames[Math.floor(Math.random() * cuteNames.length)];
}


function getRandomFact() {
  // fallback local caso API falhe
  return 'Gatos são incríveis!';
}

export default function CuteCorner() {
  const { cat, loading, error, fetchCat } = useCute();
  const [catName, setCatName] = useState(getRandomName());
  const [imgKey, setImgKey] = useState(0);
  const [catFact, setCatFact] = useState(getRandomFact());
  const [factLoading, setFactLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('cuteFavorites');
    return favs ? JSON.parse(favs) : [];
  });
  const [viewedCount, setViewedCount] = useState(() => {
    const count = localStorage.getItem('cuteViewedCount');
    return count ? parseInt(count, 10) : 0;
  });
  const imgRef = useRef();

  useEffect(() => {
    fetchCat();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (cat) {
      setCatName(getRandomName());
      setImgKey(k => k + 1);
      setViewedCount(count => {
        const newCount = count + 1;
        localStorage.setItem('cuteViewedCount', newCount);
        return newCount;
      });
      setFactLoading(true);
      fetchCatFactAndTranslate()
        .then(fact => setCatFact(fact))
        .catch(() => setCatFact(getRandomFact()))
        .finally(() => setFactLoading(false));
    }
  }, [cat]);

  function handleNewCat() {
    fetchCat();
  }

  function handleFavorite() {
    if (cat) {
      const newFavs = [...favorites, { url: cat.url, name: catName }];
      setFavorites(newFavs);
      localStorage.setItem('cuteFavorites', JSON.stringify(newFavs));
    }
  }

  return (
    <section className="feature-card">
      <h2>Momento Fofura</h2>
      <div className="cute-corner-content">
        <button
          className={loading ? 'btn-primary cute-btn loading' : 'btn-primary cute-btn'}
          onClick={handleNewCat}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Nova foto de gatinho'}
        </button>
        <span style={{ marginLeft: 12, fontSize: 14 }}>Gatinhos vistos: {viewedCount}</span>
        {error && <div className="anime-error">{error}</div>}
        {cat && (
          <div className="cute-img-wrapper" key={imgKey}>
            <span className="cute-badge">Fofura +100</span>
            <img
              ref={imgRef}
              src={cat.url}
              alt="Gatinho fofo"
              className="cute-img"
            />
            <div className="cute-name">{catName}</div>
            <button className="btn-secondary" style={{ marginTop: 8 }} onClick={handleFavorite}>
              Favoritar 🧡
            </button>
            <div className="cute-fact" style={{ marginTop: 10, fontStyle: 'italic', fontSize: 15 }}>
              Curiosidade: {factLoading ? 'Carregando curiosidade...' : catFact}
            </div>
          </div>
        )}
      </div>
      {favorites.length > 0 && (
        <div className="cute-favorites" style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 18 }}>Favoritos</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {favorites.map((fav, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <img src={fav.url} alt={fav.name} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ fontSize: 12 }}>{fav.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
