
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fetchPopularVillains, fetchVillainCuriosities, fetchVillainQuotes } from '../utils/villainApi';
import { translateToPt } from '../utils/translate';

export default function StayAwayPage() {
  const [villains, setVillains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [curiosities, setCuriosities] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [curiositiesPt, setCuriositiesPt] = useState([]);
  const [quotesPt, setQuotesPt] = useState([]);
  const [selectedVillain, setSelectedVillain] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('villainFavorites');
    return favs ? JSON.parse(favs) : [];
  });
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Cleanup em unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Carrega lista inicial de vilões populares com timeout
  useEffect(() => {
    loadPopularVillains();
  }, []);

  async function loadPopularVillains() {
    if (!isMountedRef.current) return;
    setLoading(true);
    setError('');
    try {
      const controller = new AbortController();
      timeoutRef.current = setTimeout(() => controller.abort(), 10000);
      
      const vs = await fetchPopularVillains(6);
      clearTimeout(timeoutRef.current);
      
      if (isMountedRef.current) {
        if (vs && vs.length > 0) {
          setVillains(vs);
          setTotalResults(vs.length);
        } else {
          setError('Nenhuma vilã populare encontrada.');
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        if (err.name === 'AbortError') {
          setError('Timeout: A busca demorou muito tempo.');
        } else {
          setError('Erro ao carregar vilãs populares.');
          console.error('Fetch villains error:', err);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }

  // Busca vilão por nome com timeout
  async function fetchVillain(name) {
    if (!name.trim()) {
      setError('Por favor, digite o nome de um personagem.');
      return;
    }
    
    if (!isMountedRef.current) return;
    setLoading(true);
    setError('');
    setCuriosities([]);
    setQuotes([]);
    setCuriositiesPt([]);
    setQuotesPt([]);
    setSelectedVillain(null);
    setPage(1);
    
    try {
      const controller = new AbortController();
      timeoutRef.current = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`, 
        { signal: controller.signal });
      clearTimeout(timeoutRef.current);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      
      if (!isMountedRef.current) return;
      
      if (data.data && data.data.length > 0) {
        const char = data.data[0];
        const villain = {
          name: char.name,
          origin: char.anime && char.anime.length > 0 ? char.anime[0].name : 'Desconhecido',
          img: char.images?.jpg?.image_url || 'https://via.placeholder.com/150?text=Vilão',
          desc: char.about ? char.about.split('\n')[0] : 'Vilã misteriosa.',
          url: char.url,
          mal_id: char.mal_id
        };
        setVillains([villain]);
        setSelectedVillain(villain);
        await loadVillainDetails(villain.mal_id);
      } else {
        setVillains([]);
        setError('Nenhuma vilã encontrada.');
      }
    } catch (err) {
      if (isMountedRef.current) {
        if (err.name === 'AbortError') {
          setError('A busca demorou muito tempo. Tente novamente.');
        } else {
          setError('Erro ao buscar vilã. Verifique sua conexão.');
          console.error('Search villain error:', err);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }

  async function loadVillainDetails(mal_id) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const curiositiesEn = await fetchVillainCuriosities(mal_id);
      const quotesEn = await fetchVillainQuotes(mal_id);
      
      clearTimeout(timeoutId);
      
      setCuriosities(curiositiesEn);
      setQuotes(quotesEn);
      
      const curiositiesPtArr = await Promise.all(
        curiositiesEn.slice(0, 5).map(c => translateToPt(c).catch(() => c))
      );
      setCuriositiesPt(curiositiesPtArr);
      
      const quotesPtArr = await Promise.all(
        quotesEn.slice(0, 5).map(q => translateToPt(q).catch(() => q))
      );
      setQuotesPt(quotesPtArr);
    } catch (err) {
      console.error('Load details error:', err);
      // Fallback: usar dados em inglês se tradução falhar
      setCuriositiesPt(curiosities);
      setQuotesPt(quotes);
    }
  }

  // Clica em um card para ver detalhes
  async function handleCardClick(villain) {
    setSelectedVillain(villain);
    setCuriosities([]);
    setQuotes([]);
    setCuriositiesPt([]);
    setQuotesPt([]);
    setLoading(true);
    await loadVillainDetails(villain.mal_id);
    setLoading(false);
  }

  // Vilão aleatório
  function handleRandom() {
    if (!villains.length) return;
    const v = villains[Math.floor(Math.random() * villains.length)];
    setSearch(v.name);
    fetchVillain(v.name);
  }

  // Favoritar vilão
  function handleFavorite(villain) {
    const exists = favorites.some(f => f.mal_id === villain.mal_id);
    let newFavs;
    if (exists) {
      newFavs = favorites.filter(f => f.mal_id !== villain.mal_id);
    } else {
      newFavs = [...favorites, villain];
    }
    setFavorites(newFavs);
    localStorage.setItem('villainFavorites', JSON.stringify(newFavs));
  }

  function isFavorited(villain) {
    return favorites.some(f => f.mal_id === villain.mal_id);
  }

  // Enviar formulário
  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      fetchVillain(search.trim());
    }
  }

  const displayVillains = villains.slice(0, 6);
  const displayCuriosities = curiositiesPt.slice((page - 1) * 3, page * 3);
  const displayQuotes = quotesPt.slice((page - 1) * 3, page * 3);
  const totalCuriositiesPages = Math.ceil(curiositiesPt.length / 3);
  const totalQuotesPages = Math.ceil(quotesPt.length / 3);
  return (
    <section className="stay-away-root">
      {/* Título com efeito glitch */}
      <motion.div 
        className="glitch" 
        data-text="FIQUE LONGE! 👿"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        FIQUE LONGE! 👿
      </motion.div>

      <p className="stay-away-desc">
        Entre por sua conta e risco. Busque por qualquer vilã (ou vilão) de anime, ou descubra uma aleatória!
      </p>

      {/* Formulário de busca */}
      <form className="stay-away-form" onSubmit={handleSearch} autoComplete="off">
        <input
          className="stay-away-input"
          type="text"
          placeholder="Digite o nome de uma vilã ou vilão..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ fontFamily: 'VT323, monospace', fontSize: 18 }}
        />
        <div className="stay-away-buttons">
          <button className="btn-primary" type="submit">
            🔍 Buscar
          </button>
          <button className="btn-secondary" type="button" onClick={handleRandom}>
            🎲 Aleatória
          </button>
        </div>
      </form>

      {/* Mensagens de erro */}
      {error && (
        <motion.div 
          className="stay-away-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Cards dos vilões */}
      <div className="stay-away-cards">
        {loading ? (
          <motion.div 
            className="stay-away-loading"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ⏳ Carregando vilãs perigosas...
          </motion.div>
        ) : displayVillains.length > 0 ? (
          displayVillains.map((v, idx) => (
            <motion.div
              key={v.name + idx}
              className="stay-away-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.05 + idx * 0.1, type: 'spring', stiffness: 120, damping: 14 }}
              whileHover={{ scale: 1.07, rotate: -2, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(v)}
            >
              <div className="stay-away-card-inner">
                <div className="stay-away-card-image">
                  <img src={v.img} alt={v.name} />
                  <button
                    className="favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(v);
                    }}
                  >
                    {isFavorited(v) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="stay-away-card-content">
                  <div className="name">{v.name}</div>
                  <div className="origin">{v.origin}</div>
                  <div className="desc">{v.desc}</div>
                </div>
                <a 
                  href={v.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  🔗 MAL
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="stay-away-empty">
            <p>Nenhuma vilã encontrada. Tente outro nome!</p>
          </div>
        )}
      </div>

      {/* Seção de detalhes do vilão selecionado */}
      {selectedVillain && (
        <motion.div 
          className="stay-away-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="details-title">
            ✨ Detalhes de {selectedVillain.name}
          </h3>

          {/* Curiosidades */}
          <div className="stay-away-section">
            <div className="section-header">
              <span>🌑 Curiosidades Sombrias</span>
              <span className="section-counter">
                {displayCuriosities.length > 0 ? page : 0}/{totalCuriositiesPages}
              </span>
            </div>
            {loading ? (
              <div className="loading-text">⏳ Carregando curiosidades...</div>
            ) : displayCuriosities.length > 0 ? (
              <>
                <ul className="details-list">
                  {displayCuriosities.map((c, i) => (
                    <li key={i}>
                      <span className="bullet">•</span> {c}
                    </li>
                  ))}
                </ul>
                {totalCuriositiesPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      ← Anterior
                    </button>
                    <span>{page}/{totalCuriositiesPages}</span>
                    <button 
                      onClick={() => setPage(Math.min(totalCuriositiesPages, page + 1))}
                      disabled={page === totalCuriositiesPages}
                    >
                      Próxima →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="loading-text">Sem curiosidades disponíveis</div>
            )}
          </div>

          {/* Frases Icônicas */}
          <div className="stay-away-section stay-away-quotes">
            <div className="section-header">
              <span>💬 Frases Icônicas</span>
              <span className="section-counter">
                {displayQuotes.length > 0 ? page : 0}/{totalQuotesPages}
              </span>
            </div>
            {loading ? (
              <div className="loading-text">⏳ Carregando frases...</div>
            ) : displayQuotes.length > 0 ? (
              <>
                <ul className="details-list quotes-list">
                  {displayQuotes.map((q, i) => (
                    <li key={i} className="quote-item">
                      <span className="quote-mark">"</span>
                      {q}
                      <span className="quote-mark">"</span>
                    </li>
                  ))}
                </ul>
                {totalQuotesPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      ← Anterior
                    </button>
                    <span>{page}/{totalQuotesPages}</span>
                    <button 
                      onClick={() => setPage(Math.min(totalQuotesPages, page + 1))}
                      disabled={page === totalQuotesPages}
                    >
                      Próxima →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="loading-text">Sem frases disponíveis</div>
            )}
          </div>
        </motion.div>
      )}

      {/* Botão de fuga */}
      <div className="stay-away-footer">
        <motion.button
          className="stay-away-btn"
          onClick={() => window.location.href = '/'}
          whileHover={{ scale: 1.11, rotate: 2 }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
        >
          🏃 FUGIR AGORA!
        </motion.button>
      </div>
    </section>
  );
}
