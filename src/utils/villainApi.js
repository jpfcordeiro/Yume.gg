// Funções utilitárias para buscar curiosidades e frases de personagens de anime usando Jikan API
// e para buscar uma lista de personagens vilões populares

// Busca uma lista de personagens populares (pode ser filtrado por "malvados" ou "vilões" se a API permitir)
export async function fetchPopularVillains(limit = 6) {
  // Jikan não tem endpoint direto de "vilões", então buscamos personagens populares e filtramos por nome
  // SUGESTÃO: usar nomes conhecidos de vilãs/vilões para montar a lista
  const names = [
    'Esdeath', 'Yuno Gasai', 'Himiko Toga', 'Dio Brando', 'Enoshima Junko', 'Orochimaru', 'Griffith', 'Medusa', 'Queen Beryl', 'Light Yagami', 'Shou Tucker', 'Ragyo Kiryuin', 'Tomie', 'Monika', 'Kuromi'
  ];
  const promises = names.slice(0, limit).map(async (name) => {
    const res = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`);
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      const char = data.data[0];
      return {
        name: char.name,
        origin: char.anime && char.anime.length > 0 ? char.anime[0].name : 'Desconhecido',
        img: char.images?.jpg?.image_url || '',
        desc: char.about ? char.about.split('\n')[0] : 'Vilã misteriosa.',
        url: char.url,
        mal_id: char.mal_id
      };
    }
    return null;
  });
  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

// Busca curiosidades (about) de um personagem pelo MAL_ID
export async function fetchVillainCuriosities(mal_id) {
  const res = await fetch(`https://api.jikan.moe/v4/characters/${mal_id}/full`);
  const data = await res.json();
  if (data.data && data.data.about) {
    // Divide por frases/curiosidades (pode ser por ponto final ou quebra de linha)
    return data.data.about.split(/\n|\. /).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

// Busca frases (quotes) de um personagem pelo MAL_ID
export async function fetchVillainQuotes(mal_id) {
  const res = await fetch(`https://api.jikan.moe/v4/characters/${mal_id}/quotes`);
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    // Retorna as frases (quotes)
    return data.data.map(q => q.quote);
  }
  return [];
}
