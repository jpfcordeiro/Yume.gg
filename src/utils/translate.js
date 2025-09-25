// Função utilitária para traduzir texto usando a mesma API do catFactApi.js (LibreTranslate)
// Pode ser usada para curiosidades e frases de vilões

export async function translateToPt(text) {
  if (!text) return '';
  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: 'en',
      target: 'pt',
      format: 'text'
    })
  });
  const data = await res.json();
  return data.translatedText || text;
}
