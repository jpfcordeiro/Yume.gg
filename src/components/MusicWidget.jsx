
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes, FaMusic } from 'react-icons/fa';

import SpotifyPlayer from 'react-spotify-web-playback';
import OptimizedImage from './OptimizedImage';


// Playlists públicas fixas (sem login)
const PUBLIC_PLAYLISTS = [
  {
    id: '37i9dQZF1DXdPec7aLTmlC',
    name: 'Lofi Girl',
    cover: 'https://i.scdn.co/image/ab67706f00000002c4e3e6e6e6e6e6e6e6e6e6e6',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC',
  },
  {
    id: '37i9dQZF1DX7KNKjOK0o75',
    name: 'Anime Now',
    cover: 'https://i.scdn.co/image/ab67706f00000002b2e3e6e6e6e6e6e6e6e6e6e6',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX7KNKjOK0o75',
  },
  {
    id: '37i9dQZF1DX0SM0LYsmbMT',
    name: 'Kawaii Future Bass',
    cover: 'https://i.scdn.co/image/ab67706f00000002e3e6e6e6e6e6e6e6e6e6e6e6',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT',
  },
  {
    id: '37i9dQZF1DX7YCknf2jT6s',
    name: 'J-Pop Rising',
    cover: 'https://i.scdn.co/image/ab67706f00000002d2e3e6e6e6e6e6e6e6e6e6e6',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX7YCknf2jT6s',
  },
];

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = window.location.origin;
const SCOPES = 'playlist-read-private playlist-read-collaborative';

function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'true',
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}



export default function MusicWidget() {
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [token, setToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [active, setActive] = useState(PUBLIC_PLAYLISTS[0].id);
  const [loading, setLoading] = useState(false);
  const [showPublic, setShowPublic] = useState(true);


  // Detecta token OAuth no hash da URL
  useEffect(() => {
    if (window.location.hash.includes('access_token')) {
      const params = new URLSearchParams(window.location.hash.replace('#', '?'));
      const t = params.get('access_token');
      setToken(t);
      setShowPublic(false);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);


  // Busca playlists do usuário autenticado
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.items) {
          setPlaylists(data.items);
          setActive(data.items[0]?.id || null);
        }
      })
      .finally(() => setLoading(false));
  }, [token]);


  function handleLogin() {
    setShowPublic(false);
    window.open(getAuthUrl(), '_self');
  }

  return (
    <div className="music-widget-root">
      <motion.button
        className="music-widget-btn"
        onClick={() => setOpen(o => !o)}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.18, rotate: 8, boxShadow: '0 0 24px #f72585, 0 2px 16px #90a8ed' }}
        whileTap={{ scale: 0.93, rotate: -8 }}
        aria-label={open ? 'Fechar player' : 'Abrir player de música'}
        style={{
          background: open
            ? 'linear-gradient(120deg, #f72585 60%, #23243a 100%)'
            : 'linear-gradient(120deg, #23243a 70%, #f72585 100%)',
          boxShadow: open
            ? '0 4px 24px #f72585cc, 0 2px 12px #90a8ed88'
            : '0 2px 16px #f7258533, 0 1px 8px #90a8ed33',
          border: open ? '2.5px solid #f72585' : '2px solid #90a8ed',
          outline: open ? '2px solid #f72585' : 'none',
          transition: 'all 0.18s',
          position: 'relative',
        }}
      >
        <motion.span
          initial={{ scale: 1 }}
          animate={open ? { rotate: [0, 10, -10, 0], scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {open ? <FaTimes size={26} color="#fff" /> : <FaMusic size={26} color="#fff" style={{ filter: 'drop-shadow(0 0 8px #f72585)' }} />}
        </motion.span>
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            style={{
              position: 'absolute',
              left: '110%',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#23243aee',
              color: '#fff',
              borderRadius: 8,
              fontSize: 13,
              padding: '0.5em 1em',
              boxShadow: '0 2px 8px #f7258533',
              whiteSpace: 'nowrap',
              zIndex: 10,
              fontFamily: 'VT323, monospace',
            }}
          >
            <span style={{ color: '#f72585', fontWeight: 700 }}>Música:</span> <br />
            <span style={{ color: '#90a8ed' }}>Ouvir playlists públicas</span> <br />
            <span style={{ color: '#fff' }}>ou</span> <br />
            <span style={{ color: '#f72585' }}>Conectar Spotify</span>
          </motion.div>
        )}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="music-widget-panel"
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <div className="music-widget-title">Playlists Kawaii 🎶</div>
            {showPublic && (
              <>
                <div className="music-widget-list">
                  {PUBLIC_PLAYLISTS.map(pl => (
                    <div
                      key={pl.id}
                      className={`music-widget-item${active === pl.id ? ' active' : ''}`}
                      onClick={() => setActive(pl.id)}
                    >
                      <OptimizedImage
                        src={pl.cover}
                        alt={`Capa da playlist: ${pl.name}`}
                        className="music-widget-cover"
                        width={100}
                        height={100}
                        placeholderColor="#1A1A2E"
                      />
                      <span className="music-widget-name">{pl.name}</span>
                    </div>
                  ))}
                </div>
                <div className="music-widget-player">
                  <div style={{margin: '0.7em 0', textAlign: 'center'}}>
                    <a href={PUBLIC_PLAYLISTS.find(pl => pl.id === active)?.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{marginBottom: 8, display: 'inline-block'}}>
                      Ouvir no Spotify
                    </a>
                  </div>
                  <div className="music-widget-tip">Dica: Clique em uma playlist para ouvir no Spotify. Para playlists pessoais, conecte sua conta!</div>
                </div>
                <div style={{marginTop: 12, textAlign: 'center'}}>
                  <button className="btn-secondary" onClick={() => setShowPublic(false)} style={{marginRight: 8}}>Conectar Spotify</button>
                </div>
              </>
            )}
            {!showPublic && !token ? (
              <button className="btn-primary" style={{marginBottom: 12, width: '100%'}} onClick={handleLogin}>
                Conectar com Spotify
              </button>
            ) : loading ? (
              <div style={{color: '#90a8ed', margin: '1.2em 0'}}>
                <div className="cute-loader">
                  <div className="cute-paw"><span role="img" aria-label="Pata">🐾</span></div>
                  <div className="cute-loader-text">Carregando playlists...</div>
                </div>
              </div>
            ) : playlists.length === 0 && !showPublic && token ? (
              <div style={{color: '#f72585', margin: '1.2em 0'}}>Nenhuma playlist encontrada.</div>
            ) : !showPublic && token ? (
              <>
                <div className="music-widget-list">
                  {playlists.map(pl => (
                    <div
                      key={pl.id}
                      className={`music-widget-item${active === pl.id ? ' active' : ''}`}
                      onClick={() => setActive(pl.id)}
                    >
                      <OptimizedImage
                        src={pl.images[0]?.url}
                        alt={`Capa da playlist: ${pl.name}`}
                        className="music-widget-cover"
                        width={100}
                        height={100}
                        placeholderColor="#1A1A2E"
                      />
                      <span className="music-widget-name">{pl.name}</span>
                    </div>
                  ))}
                </div>
                <div className="music-widget-player">
                    <SpotifyPlayer
                      token={token}
                      uris={active ? [`spotify:playlist:${active}`] : []}
                      autoPlay={false}
                      showSaveIcon
                      styles={{
                        activeColor: '#fff',
                        bgColor: '#23243a',
                        color: '#fff',
                        loaderColor: '#f72585',
                        sliderColor: '#f72585',
                        trackArtistColor: '#90a8ed',
                        trackNameColor: '#fff',
                        height: 80,
                        borderRadius: 14,
                        boxShadow: '0 2px 18px #f7258533, 0 1px 8px #90a8ed33',
                        fontFamily: 'VT323, monospace',
                      }}
                      layout="responsive"
                      initialVolume={volume}
                      inlineVolume
                    />
                    <div className="music-widget-tip">Dica: O player é customizado e kawaii! Use o Spotify para controle total.</div>
                </div>
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
