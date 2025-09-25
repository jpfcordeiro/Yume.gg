// Efeitos sonoros kawaii para ações do usuário
const sounds = {
  favoritar: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa.mp3', // tap/cute
  novoGato: 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e.mp3', // quick jump
  conquista: 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e.mp3', // quick jump
};

export function playSound(key) {
  try {
    const enabled = JSON.parse(localStorage.getItem('yumeSoundOn') ?? 'true');
    if (!enabled) return;
    const audio = new Audio(sounds[key]);
    audio.volume = 0.18;
    audio.play();
  } catch {}
}

export function toggleSound(on) {
  localStorage.setItem('yumeSoundOn', JSON.stringify(on));
}

export function isSoundOn() {
  return JSON.parse(localStorage.getItem('yumeSoundOn') ?? 'true');
}
