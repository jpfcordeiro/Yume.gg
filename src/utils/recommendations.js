// Gera recomendações personalizadas de gatos com base nos favoritos do usuário
// (pode ser expandido para outros tipos de recomendação)

export function getCatRecommendations(favorites, allNames) {
  if (!favorites || favorites.length === 0) return [];
  // Recomenda nomes que o usuário ainda não viu/favoritou
  const favNames = new Set(favorites.map(f => f.name));
  const notSeen = allNames.filter(name => !favNames.has(name));
  // Retorna até 3 nomes aleatórios não vistos
  return notSeen.sort(() => 0.5 - Math.random()).slice(0, 3);
}
