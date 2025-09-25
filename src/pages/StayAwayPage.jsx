
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPopularVillains, fetchVillainCuriosities, fetchVillainQuotes } from '../utils/villainApi';
import { translateToPt } from '../utils/translate';

export default function StayAwayPage() {
  const [villains, setVillains] = useState([]); // lista de vilões exibidos
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [curiosities, setCuriosities] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [curiositiesPt, setCuriositiesPt] = useState([]);
  const [quotesPt, setQuotesPt] = useState([]);
  const [selectedVillain, setSelectedVillain] = useState(null); // vilão para exibir curiosidades/frases

  // Carrega lista inicial de vilões populares
  useEffect(() => {
    setLoading(true);
    fetchPopularVillains(6).then(vs => {
      setVillains(vs);
      setLoading(false);
    });
  }, []);

  // Busca vilão por nome
  async function fetchVillain(name) {
    setLoading(true);
    setError('');
    setCuriosities([]);
    setQuotes([]);
    setCuriositiesPt([]);
    setQuotesPt([]);
    setSelectedVillain(null);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`);
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        const char = data.data[0];
        const villain = {
          name: char.name,
          origin: char.anime && char.anime.length > 0 ? char.anime[0].name : 'Desconhecido',
          img: char.images?.jpg?.image_url || '',
          desc: char.about ? char.about.split('\n')[0] : 'Vilã misteriosa.',
          url: char.url,
          mal_id: char.mal_id
        };
        setVillains([villain]);
        setSelectedVillain(villain);
        // Busca curiosidades e frases e traduz
        const curiositiesEn = await fetchVillainCuriosities(villain.mal_id);
        setCuriosities(curiositiesEn);
        const curiositiesPtArr = await Promise.all(curiositiesEn.slice(0, 5).map(c => translateToPt(c)));
        setCuriositiesPt(curiositiesPtArr);
        const quotesEn = await fetchVillainQuotes(villain.mal_id);
        setQuotes(quotesEn);
        const quotesPtArr = await Promise.all(quotesEn.slice(0, 5).map(q => translateToPt(q)));
        setQuotesPt(quotesPtArr);
      } else {
        setVillains([]);
        setError('Nenhuma vilã encontrada.');
      }
    } catch {
      setError('Erro ao buscar vilã.');
      setVillains([]);
    }
    setLoading(false);
  }

  // Busca curiosidades e frases ao clicar em um card
  async function handleCardClick(villain) {
    setSelectedVillain(villain);
    setCuriosities([]);
    setQuotes([]);
    setCuriositiesPt([]);
    setQuotesPt([]);
    setLoading(true);
    const curiositiesEn = await fetchVillainCuriosities(villain.mal_id);
    setCuriosities(curiositiesEn);
    const curiositiesPtArr = await Promise.all(curiositiesEn.slice(0, 5).map(c => translateToPt(c)));
    setCuriositiesPt(curiositiesPtArr);
    const quotesEn = await fetchVillainQuotes(villain.mal_id);
    setQuotes(quotesEn);
    const quotesPtArr = await Promise.all(quotesEn.slice(0, 5).map(q => translateToPt(q)));
    setQuotesPt(quotesPtArr);
    setLoading(false);
  }

  function handleRandom() {
    if (!villains.length) return;
    const v = villains[Math.floor(Math.random() * villains.length)];
    setSearch(v.name);
    fetchVillain(v.name);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) fetchVillain(search.trim());
  }
  return (
    <section
      className="stay-away-root"
    >
      <div className="glitch" data-text="FIQUE LONGE! 👿">FIQUE LONGE! 👿</div>
      <p className="stay-away-desc">
        Entre por sua conta e risco. Busque por qualquer vilã (ou vilão) de anime, ou descubra uma aleatória!
      </p>
      <form className="stay-away-form" onSubmit={handleSearch} autoComplete="off">
        <input
          className="stay-away-input"
          type="text"
          placeholder="Digite o nome de uma vilã ou vilão..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ fontFamily: 'VT323, monospace', fontSize: 18 }}
        />
        <button className="btn-primary" type="submit">Buscar</button>
        <button className="btn-secondary" type="button" onClick={handleRandom} style={{ marginLeft: 8 }}>Aleatória</button>
      </form>
      <div className="stay-away-cards">
        {loading ? (
          <div style={{ color: '#f72585', fontWeight: 700, fontSize: 18, margin: '2em auto' }}>Carregando...</div>
        ) : error ? (
          <div style={{ color: '#f72585', fontWeight: 700, fontSize: 16, margin: '2em auto' }}>{error}</div>
        ) : (
          villains.map((v, idx) => (
            <motion.div
              key={v.name}
              className="stay-away-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.12, type: 'spring', stiffness: 120, damping: 14 }}
              whileHover={{ scale: 1.07, rotate: -2 }}
              whileTap={{ scale: 0.97, rotate: 1 }}
              onClick={() => handleCardClick(v)}
              style={{ cursor: 'pointer' }}
            >
              <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={v.img} alt={v.name} />
                <div className="name">{v.name}</div>
                <div className="origin">{v.origin}</div>
                <div className="desc">{v.desc}</div>
              </a>
            </motion.div>
          ))
        )}
      </div>
      {/* Curiosidades e frases do vilão selecionado */}
      {selectedVillain && (
        <>
          <div className="stay-away-section">
            <div style={{ fontWeight: 600, color: '#f72585', marginBottom: 6 }}>Curiosidades Sombras:</div>
            <ul>
              {curiositiesPt.length === 0 && <li>Carregando curiosidades...</li>}
              {curiositiesPt.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div className="stay-away-section stay-away-quotes">
            <div style={{ fontWeight: 600, color: '#f72585', marginBottom: 6 }}>Frases Icônicas:</div>
            <ul>
              {quotesPt.length === 0 && <li>Carregando frases...</li>}
              {quotesPt.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
        </>
      )}
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <motion.button
          className="stay-away-btn"
          onClick={() => window.location.href = '/'}
          whileHover={{ scale: 1.11, rotate: 2 }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 14 }}
        >
          FUGIR AGORA!
        </motion.button>
      </div>
    </section>
  );
}
