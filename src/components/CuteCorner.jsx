
import React, { useEffect, useRef, useState } from 'react';
import { useCute } from '../contexts/CuteContext';
import cuteNamesDict from '../utils/cuteNames';



import { getAchievements, unlockAchievement, getStreak, updateStreak, BADGES } from '../utils/achievements';
import { playSound, isSoundOn, toggleSound } from '../utils/sounds';
import Toast from './Toast';
import Loader from './Loader';
import ShareButton from './ShareButton';
import { getCatRecommendations } from '../utils/recommendations';

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
  const [achievements, setAchievements] = useState(getAchievements());
  const [streak, setStreak] = useState(getStreak().count);
  const [soundOn, setSoundOn] = useState(isSoundOn());
  const [toast, setToast] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    // Atualiza streak diário
    setStreak(updateStreak());
    // Primeira visita do dia
    if (updateStreak() >= 3 && unlockAchievement('streak3')) setToast({ icon: '🏅', message: 'Conquista: 3 dias seguidos!' });
    if (updateStreak() >= 7 && unlockAchievement('streak7')) setToast({ icon: '🏅', message: 'Conquista: 1 semana de streak!' });
    setAchievements(getAchievements());
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
        // Conquistas de visualização
        if (newCount === 1 && unlockAchievement('firstCat')) setToast({ icon: '🏅', message: 'Conquista: Primeiro gatinho!' });
        if (newCount === 5 && unlockAchievement('fiveCats')) setToast({ icon: '🏅', message: 'Conquista: Cat Lover!' });
        setAchievements(getAchievements());
        setToast(t => (!t ? { icon: '🐱', message: 'Novo gatinho!' } : t));
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
    playSound('novoGato');
    fetchCat();
  }

  function handleFavorite() {
    if (cat) {
      playSound('favoritar');
      const newFavs = [...favorites, { url: cat.url, name: catName }];
      setFavorites(newFavs);
      localStorage.setItem('cuteFavorites', JSON.stringify(newFavs));
      if (unlockAchievement('firstFav')) {
        setAchievements(getAchievements());
        playSound('conquista');
        setToast({ icon: '🏅', message: 'Conquista: Favoritou um gatinho!' });
      }
      setShowRecommendations(true);
    }
  }

  return (
    <section className="feature-card">
      {toast && <Toast icon={toast.icon} message={toast.message} onClose={() => setToast(null)} />}
      <h2>Momento Fofura
        <button
          onClick={() => {
            toggleSound(!soundOn);
            setSoundOn(!soundOn);
          }}
          style={{ marginLeft: 16, fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: soundOn ? '#f72585' : '#bbb' }}
          title={soundOn ? 'Desligar sons' : 'Ligar sons'}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 2, minWidth: 220 }}>
          <div className="cute-corner-content">
            <button
              className={loading ? 'btn-primary cute-btn loading' : 'btn-primary cute-btn'}
              onClick={handleNewCat}
              disabled={loading}
            >
              {loading ? <Loader text="Carregando fofura..." /> : 'Nova foto de gatinho'}
            </button>
            <span style={{ marginLeft: 12, fontSize: 14 }}>Gatinhos vistos: {viewedCount}</span>
            <span style={{ marginLeft: 12, fontSize: 14, color: '#7a5af5' }}>Streak: {streak} 🔥</span>
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
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                  <button className="btn-secondary" style={{ marginTop: 8 }} onClick={handleFavorite}>
                    Favoritar 🧡
                  </button>
                  <ShareButton url={cat.url} name={catName} />
                </div>
                <div className="cute-fact" style={{ marginTop: 10, fontStyle: 'italic', fontSize: 15 }}>
                  Curiosidade: {factLoading ? <Loader text="Carregando curiosidade..." /> : catFact}
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
                    <ShareButton url={fav.url} name={fav.name} />
                  </div>
                ))}
              </div>
              {/* Recomendações personalizadas */}
              {showRecommendations && (
                <div style={{ marginTop: 18, background: '#f3e8ff', borderRadius: 8, padding: 10, boxShadow: '0 1px 4px #0001' }}>
                  <div style={{ fontWeight: 600, color: '#7a5af5', marginBottom: 6 }}>Sugestões para você:</div>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15 }}>
                    {getCatRecommendations(favorites, cuteNames).map((name, i) => (
                      <li key={i}>Veja um gatinho chamado <b>{name}</b>!</li>
                    ))}
                  </ul>
                  <button className="btn-secondary" style={{ marginTop: 8 }} onClick={() => setShowRecommendations(false)}>
                    Fechar sugestões
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Painel de conquistas */}
        <div style={{ flex: 1, minWidth: 180, background: '#f8f7ff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: 12, marginTop: 8, color: '#23243a' }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#7a5af5' }}>Conquistas</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Object.entries(BADGES).map(([key, badge]) => (
              <li key={key} style={{ marginBottom: 10, opacity: achievements[key]?.unlocked ? 1 : 0.45, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{achievements[key]?.unlocked ? '🏅' : '🔒'}</span>
                <span>
                  <b>{badge.label}</b>
                  <div style={{ fontSize: 13 }}>{badge.desc}</div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
