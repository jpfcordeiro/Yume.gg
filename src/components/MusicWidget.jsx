
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
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);

  // Detecta token OAuth no hash da URL
  React.useEffect(() => {
    if (window.location.hash.includes('access_token')) {
      const params = new URLSearchParams(window.location.hash.replace('#', '?'));
      const t = params.get('access_token');
      setToken(t);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Busca playlists do usuário autenticado
  React.useEffect(() => {
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
    window.open(getAuthUrl(), '_self');
  }

  return (
    <div className="music-widget-root">
      <motion.button
        className="music-widget-btn"
        onClick={() => setOpen(o => !o)}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.13 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Fechar player' : 'Abrir player de música'}
      >
        {open ? <FaTimes size={22} /> : <FaMusic size={22} />}
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
            {!token ? (
              <button className="btn-primary" style={{marginBottom: 12, width: '100%'}} onClick={handleLogin}>
                Conectar com Spotify
              </button>
            ) : loading ? (
              <div style={{color: '#90a8ed', margin: '1.2em 0'}}>Carregando playlists...</div>
            ) : playlists.length === 0 ? (
              <div style={{color: '#f72585', margin: '1.2em 0'}}>Nenhuma playlist encontrada.</div>
            ) : (
              <>
                <div className="music-widget-list">
                  {playlists.map(pl => (
                    <div
                      key={pl.id}
                      className={`music-widget-item${active === pl.id ? ' active' : ''}`}
                      onClick={() => setActive(pl.id)}
                    >
                      <img src={pl.images[0]?.url} alt={pl.name} className="music-widget-cover" />
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
