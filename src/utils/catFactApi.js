// Função utilitária para buscar um fato de gato em inglês e traduzir para pt usando LibreTranslate
// https://catfact.ninja/fact e https://libretranslate.com/docs/

export async function fetchCatFactAndTranslate() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 1. Buscar fato em inglês
    const factRes = await fetch('https://catfact.ninja/fact', {
      signal: controller.signal
    });
    
    if (!factRes.ok) throw new Error(`HTTP ${factRes.status}`);
    const factData = await factRes.json();
    const factEn = factData.fact;

    // 2. Tentar traduzir usando Google Translate API (sem chave - pode ter limitações)
    // Se falhar, tenta LibreTranslate como fallback
    try {
      const translateRes = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: factEn,
          source: 'en',
          target: 'pt',
          format: 'text'
        }),
        signal: controller.signal
      });

      if (!translateRes.ok) throw new Error('Translation service unavailable');
      const translateData = await translateRes.json();
      clearTimeout(timeoutId);
      return translateData.translatedText || factEn;
    } catch {
      // Se tradução falhar, retorna fato em inglês (melhor que nada)
      clearTimeout(timeoutId);
      return factEn;
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn('Cat fact fetch timeout');
    } else {
      console.error('Cat fact fetch error:', err);
    }
    // Retorna fatos padrão em português como fallback
    const fallbackFacts = [
      'Gatos têm 9 vidas e são muito ágeis!',
      'Gatos podem dormir até 16 horas por dia.',
      'Os olhos dos gatos podem ver no escuro até 6 vezes melhor que os humanos.',
      'Gatos têm mais de 20 músculos diferentes nas orelhas.',
      'Um gato pode correr a uma velocidade máxima de cerca de 47 quilômetros por hora.'
    ];
    return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  }
}

