
import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Dice5 } from 'tabler-icons-react';
import { useCute } from '../contexts/CuteContext';
import cuteNamesDict from '../utils/cuteNames';
import { fetchCatFactAndTranslate } from '../utils/catFactApi';
import { getAchievements, unlockAchievement, getStreak, updateStreak, BADGES } from '../utils/achievements';
import { playSound, isSoundOn, toggleSound } from '../utils/sounds';
import Toast from './Toast';
import Loader from './Loader';
import ShareButton from './ShareButton';
import OptimizedImage from './OptimizedImage';
import { getCatRecommendations } from '../utils/recommendations';

const cuteNames = cuteNamesDict.gatos;

function getRandomName() {
  return cuteNames[Math.floor(Math.random() * cuteNames.length)];
}

function getRandomFact() {
  return 'Gatos são incríveis!';
}

export default function CuteCorner() {
  const {
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
  } = useCute();

  const [catName, setCatName] = useState(getRandomName());
  const [imgKey, setImgKey] = useState(0);
  const [catFact, setCatFact] = useState(getRandomFact());
  const [factLoading, setFactLoading] = useState(false);
  const [viewedCount, setViewedCount] = useState(() => {
    const count = localStorage.getItem('cuteViewedCount');
    return count ? parseInt(count, 10) : 0;
  });
  const [achievements, setAchievements] = useState(getAchievements());
  const [streak, setStreak] = useState(getStreak().count);
  const [soundOn, setSoundOn] = useState(isSoundOn());
  const [toast, setToast] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    setStreak(updateStreak());
    if (updateStreak() >= 3 && unlockAchievement('streak3')) setToast({ icon: '🏅', message: 'Conquista: 3 dias seguidos!' });
    if (updateStreak() >= 7 && unlockAchievement('streak7')) setToast({ icon: '🏅', message: 'Conquista: 1 semana de streak!' });
    setAchievements(getAchievements());
    fetchCat();
  }, []);

  useEffect(() => {
    if (cat) {
      setCatName(getRandomName());
      setImgKey(k => k + 1);
      setViewedCount(count => {
        const newCount = count + 1;
        localStorage.setItem('cuteViewedCount', newCount);
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
      toggleFavorite(cat, catName);
      if (unlockAchievement('firstFav')) {
        setAchievements(getAchievements());
        playSound('conquista');
        setToast({ icon: '🏅', message: 'Conquista: Favoritou um gatinho!' });
      }
      setShowRecommendations(true);
    }
  }

  function handleAddComparison() {
    if (cat) {
      addToComparison(cat, catName);
      setToast({ icon: '✓', message: 'Adicionado à comparação!' });
    }
  }

  return (
    <section className="cute-corner-section">
      {toast && <Toast icon={toast.icon} message={toast.message} onClose={() => setToast(null)} />}
      
      <motion.div
        className="cute-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="cute-title">Momento Fofura</h2>
        <div className="cute-header-controls">
          <motion.button
            className="btn-icon"
            onClick={() => {
              toggleSound(!soundOn);
              setSoundOn(!soundOn);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={soundOn ? 'Desligar sons' : 'Ligar sons'}
          >
            {soundOn ? '🔊' : '🔇'}
          </motion.button>
          <motion.button
            className="btn-icon"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Filtros"
          >
            🎛️
          </motion.button>
          <motion.button
            className={`btn-icon ${comparison.length > 0 ? 'active' : ''}`}
            onClick={() => setShowComparison(!showComparison)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Comparação"
          >
            ⚖️ {comparison.length}
          </motion.button>
        </div>
      </motion.div>

      {/* Painel de Filtros */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="cute-filters-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cute-filter-group">
              <label>Categoria de Gatinho:</label>
              <div className="cute-filter-options">
                {['Todos', ...CAT_CATEGORIES].map((cat, idx) => (
                  <motion.button
                    key={idx}
                    className={`cute-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Painel Principal */}
      <div className="cute-main-container">
        {/* Conteúdo Principal */}
        <motion.div
          className="cute-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className={loading ? 'btn-primary cute-btn loading' : 'btn-primary cute-btn'}
            onClick={handleNewCat}
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? <Loader text="Carregando fofura..." /> : '🐱 Nova foto de gatinho'}
          </motion.button>

          <div className="cute-stats">
            <div className="cute-stat-item">
              <span className="cute-stat-label">Gatinhos vistos:</span>
              <span className="cute-stat-value">{viewedCount}</span>
            </div>
            <div className="cute-stat-item">
              <span className="cute-stat-label">Streak:</span>
              <span className="cute-stat-value">🔥 {streak}</span>
            </div>
            <div className="cute-stat-item">
              <span className="cute-stat-label">Favoritos:</span>
              <span className="cute-stat-value">❤️ {favorites.length}</span>
            </div>
          </div>

          {error && <motion.div className="anime-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}

          <AnimatePresence mode="wait">
            {cat && (
              <motion.div
                className="cute-img-wrapper"
                key={imgKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="cute-badge">Fofura +100</span>
                <OptimizedImage
                  ref={imgRef}
                  src={cat.url}
                  alt="Gatinho fofo"
                  className="cute-img"
                  placeholderColor="var(--deep-void)"
                />
                <motion.div className="cute-name" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  {catName}
                </motion.div>

                <div className="cute-fact-box">
                  <div className="cute-fact">
                    💡 Curiosidade: {factLoading ? <Loader text="Carregando..." /> : catFact}
                  </div>
                </div>

                <motion.div
                  className="cute-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    className={`btn-secondary cute-action-btn ${isFavorited(cat.url) ? 'favorited' : ''}`}
                    onClick={handleFavorite}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    title={isFavorited(cat.url) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart
                      size={20}
                      color="var(--neon-pink)"
                      fill={isFavorited(cat.url) ? 'var(--neon-pink)' : 'none'}
                      stroke={2}
                    />
                    <span>Favoritar</span>
                  </motion.button>
                  <motion.button
                    className="btn-secondary cute-action-btn"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    title="Comparar"
                  >
                    Compartilhar
                  </motion.button>
                  <ShareButton url={cat.url} name={catName} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Favoritos */}
          {favorites.length > 0 && (
            <motion.div
              className="cute-favorites-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="cute-section-title">❤️ Favoritos ({favorites.length})</h3>
              <motion.div className="cute-favorites-grid" layout>
                <AnimatePresence>
                  {favorites.map((fav, idx) => (
                    <motion.div
                      key={fav.id}
                      className="cute-fav-card"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <img src={fav.url} alt={fav.name} className="cute-fav-img" />
                      <div className="cute-fav-name">{fav.name}</div>
                      <div className="cute-fav-actions">
                        <motion.button
                          className="btn-icon-small"
                          onClick={() => removeFavorite(fav.url)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Remover"
                        >
                          ✕
                        </motion.button>
                        <ShareButton url={fav.url} name={fav.name} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {showRecommendations && (
                <motion.div
                  className="cute-recommendations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="cute-rec-title">💡 Sugestões para você:</div>
                  <ul className="cute-rec-list">
                    {getCatRecommendations(favorites, cuteNames).map((name, i) => (
                      <li key={i}>Veja um gatinho chamado <b>{name}</b>!</li>
                    ))}
                  </ul>
                  <motion.button
                    className="btn-secondary"
                    onClick={() => setShowRecommendations(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Fechar
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Painel Lateral - Conquistas */}
        <motion.div
          className="cute-achievements-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="cute-panel-title">🏅 Conquistas</h3>
          <motion.div className="cute-achievements-list" layout>
            <AnimatePresence>
              {Object.entries(BADGES).map(([key, badge], idx) => (
                <motion.div
                  key={key}
                  className={`cute-achievement-item ${achievements[key]?.unlocked ? 'unlocked' : 'locked'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="cute-achievement-icon">
                    {achievements[key]?.unlocked ? '🏅' : '🔒'}
                  </span>
                  <div className="cute-achievement-text">
                    <b>{badge.label}</b>
                    <small>{badge.desc}</small>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Painel de Comparação */}
      <AnimatePresence>
        {showComparison && comparison.length > 0 && (
          <motion.div
            className="cute-comparison-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cute-comparison-header">
              <h3>⚖️ Comparação de Gatinhos</h3>
              <motion.button
                className="btn-icon"
                onClick={clearComparison}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>
            <motion.div className="cute-comparison-grid" layout>
              <AnimatePresence>
                {comparison.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    className="cute-comparison-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <OptimizedImage
                      src={cat.url}
                      alt={`Gatinho em comparação: ${cat.name}`}
                      className="cute-comp-img"
                      placeholderColor="var(--deep-void)"
                    />
                    <div className="cute-comp-info">
                      <strong>{cat.name}</strong>
                      <small>Gatinho #1</small>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
