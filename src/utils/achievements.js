// Utilitário para conquistas e streaks diários (localStorage)
export function getAchievements() {
  return JSON.parse(localStorage.getItem('yumeAchievements') || '{}');
}

export function unlockAchievement(key) {
  const ach = getAchievements();
  if (!ach[key]) {
    ach[key] = { unlocked: true, date: new Date().toISOString() };
    localStorage.setItem('yumeAchievements', JSON.stringify(ach));
    return true;
  }
  return false;
}

export function getStreak() {
  const streak = JSON.parse(localStorage.getItem('yumeStreak') || '{"count":0,"lastDate":null}');
  return streak;
}

export function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  let streak = getStreak();
  if (streak.lastDate === today) return streak.count;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastDate === yesterday) {
    streak.count += 1;
  } else {
    streak.count = 1;
  }
  streak.lastDate = today;
  localStorage.setItem('yumeStreak', JSON.stringify(streak));
  return streak.count;
}

export const BADGES = {
  firstCat: { label: 'Primeiro Gatinho', desc: 'Veja seu primeiro gatinho fofo!' },
  fiveCats: { label: 'Cat Lover', desc: 'Veja 5 gatinhos diferentes.' },
  firstFav: { label: 'Favoritou!', desc: 'Favoritou um gatinho.' },
  streak3: { label: '3 Dias Seguidos', desc: 'Acesse o site 3 dias seguidos.' },
  streak7: { label: 'Uma Semana!', desc: 'Acesse o site 7 dias seguidos.' },
};
