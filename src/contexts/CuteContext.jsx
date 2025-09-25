import React, { createContext, useContext, useState } from 'react';

const CuteContext = createContext();

export function CuteProvider({ children }) {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchCat() {
    setLoading(true);
    setError('');
    setCat(null);
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();
      if (data && data[0] && data[0].url) {
        setCat(data[0]);
      } else {
        setError('Nenhuma imagem encontrada.');
      }
    } catch (err) {
      setError('Erro ao buscar imagem de gatinho.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CuteContext.Provider value={{ cat, loading, error, fetchCat }}>
      {children}
    </CuteContext.Provider>
  );
}

export function useCute() {
  return useContext(CuteContext);
}
