// Função utilitária para buscar um fato de gato em inglês e traduzir para pt usando LibreTranslate
// https://catfact.ninja/fact e https://libretranslate.com/docs/

export async function fetchCatFactAndTranslate() {
  // 1. Buscar fato em inglês
  const factRes = await fetch('https://catfact.ninja/fact');
  const factData = await factRes.json();
  const factEn = factData.fact;

  // 2. Traduzir para pt usando LibreTranslate (API pública, pode ter limite)
  const translateRes = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: factEn,
      source: 'en',
      target: 'pt',
      format: 'text'
    })
  });
  const translateData = await translateRes.json();
  return translateData.translatedText || factEn;
}
