// Funções utilitárias para buscar dados de personagens (vilões) usando Jikan API v4
// Com timeout, error handling e fallback automático

// Lista de nomes populares de vilãs/vilões como fallback
const POPULAR_VILLAINS = [
  'Esdeath', 'Yuno Gasai', 'Himiko Toga', 'Dio Brando', 'Enoshima Junko', 
  'Orochimaru', 'Griffith', 'Medusa', 'Queen Beryl', 'Light Yagami', 
  'Shou Tucker', 'Ragyo Kiryuin', 'Tomie', 'Monika', 'Kuromi'
];

// Busca uma lista de personagens populares (vilões)
export async function fetchPopularVillains(limit = 6) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const names = POPULAR_VILLAINS.slice(0, limit);
    const promises = names.map(async (name) => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`,
          { signal: controller.signal }
        );
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          const char = data.data[0];
          return {
            name: char.name || 'Desconhecido',
            origin: (char.anime && char.anime.length > 0) ? char.anime[0].name : 'Desconhecido',
            img: char.images?.jpg?.image_url || 'https://via.placeholder.com/150?text=Vilão',
            desc: char.about ? char.about.split('\n')[0].substring(0, 100) : 'Vilã misteriosa.',
            url: char.url || '#',
            mal_id: char.mal_id || 0
          };
        }
        return null;
      } catch (err) {
        console.error(`Error fetching ${name}:`, err);
        return null;
      }
    });

    const results = await Promise.all(promises);
    clearTimeout(timeoutId);
    
    return results.filter(Boolean);
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Fetch villains timeout');
    } else {
      console.error('Error fetching popular villains:', err);
    }
    return [];
  }
}

// Busca curiosidades (about) de um personagem pelo MAL_ID
export async function fetchVillainCuriosities(mal_id) {
  try {
    if (!mal_id) return [];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://api.jikan.moe/v4/characters/${mal_id}/full`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    if (data.data && data.data.about) {
      return data.data.about
        .split(/\n|\. /)
        .map(s => s.trim())
        .filter(Boolean)
        .slice(0, 10);
    }
    return [];
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Fetch curiosities timeout');
    } else {
      console.error('Error fetching curiosities:', err);
    }
    return [];
  }
}

// Busca frases (quotes) de um personagem pelo MAL_ID
export async function fetchVillainQuotes(mal_id) {
  try {
    if (!mal_id) return [];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://api.jikan.moe/v4/characters/${mal_id}/quotes`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data
        .map(q => q.quote || '')
        .filter(Boolean)
        .slice(0, 10);
    }
    return [];
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Fetch quotes timeout');
    } else {
      console.error('Error fetching quotes:', err);
    }
    return [];
  }
}
