import React, { useEffect, useRef, useState } from 'react';
import { useCute } from '../contexts/CuteContext';
import cuteNamesDict from '../utils/cuteNames';

const cuteNames = cuteNamesDict.gatos;

function getRandomName() {
  return cuteNames[Math.floor(Math.random() * cuteNames.length)];
}

export default function CuteCorner() {
  const { cat, loading, error, fetchCat } = useCute();
  const [catName, setCatName] = useState(getRandomName());
  const [imgKey, setImgKey] = useState(0);
  const imgRef = useRef();

  useEffect(() => {
    fetchCat();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (cat) {
      setCatName(getRandomName());
      setImgKey(k => k + 1);
    }
  }, [cat]);

  function handleNewCat() {
    fetchCat();
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
          </div>
        )}
      </div>
    </section>
  );
}
