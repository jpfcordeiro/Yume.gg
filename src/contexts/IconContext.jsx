import React, { createContext, useContext, useState } from 'react';

const IconContext = createContext();

const CATEGORIES = [
  'waifu', 'neko', 'shinobu', 'megumin', 'awoo', 'foxgirl', 'bully', 'cuddle', 'cry', 'blush', 'smile', 'happy', 'wink', 'dance', 'hug'
];

export function IconProvider({ children }) {
  const [category, setCategory] = useState('waifu');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchIcon(cat = category) {
    setLoading(true);
    setError('');
    setIcon(null);
    try {
      const res = await fetch(`https://api.waifu.pics/sfw/${cat}`);
      const data = await res.json();
      if (data.url) {
        setIcon(data.url);
      } else {
        setError('Nenhuma imagem encontrada.');
      }
    } catch (err) {
      setError('Erro ao buscar ícone.');
    } finally {
      setLoading(false);
    }
  }

  function changeCategory(cat) {
    setCategory(cat);
    fetchIcon(cat);
  }

  return (
    <IconContext.Provider value={{ category, setCategory: changeCategory, icon, loading, error, fetchIcon, CATEGORIES }}>
      {children}
    </IconContext.Provider>
  );
}

export function useIcon() {
  return useContext(IconContext);
}
