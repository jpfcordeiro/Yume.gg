// Função para buscar animes populares (top airing) usando Jikan API
export async function fetchTopAiringAnimes() {
  const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=8');
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    return data.data;
  }
  return [];
}
