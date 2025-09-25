// Função para buscar um anime aleatório da Jikan API
export async function fetchRandomAnime() {
  // Jikan não tem endpoint de random, então sorteamos um ID dentro de um range conhecido
  // O maior MAL_ID de anime é > 60000, mas muitos são inválidos. Tentamos até achar um válido.
  let tries = 0;
  while (tries < 8) {
    const randomId = Math.floor(Math.random() * 60000) + 1;
    const res = await fetch(`https://api.jikan.moe/v4/anime/${randomId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && data.data.title) {
        return data.data;
      }
    }
    tries++;
  }
  return null;
}
