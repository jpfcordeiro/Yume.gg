// Função utilitária para buscar sugestões de animes da Jikan API
// Retorna até 5 sugestões baseadas no termo digitado
export async function fetchAnimeSuggestions(q) {
  if (!q.trim()) return [];
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=5`);
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    return data.data.map(anime => anime.title);
  }
  return [];
}
