
import { motion } from 'framer-motion';

const VILLAINS = [
  {
    name: 'Kuromi',
    origin: 'Sanrio/My Melody',
    img: 'https://static.wikia.nocookie.net/sanrio/images/2/2a/Kuromi.png',
    desc: 'Apesar de fofa, Kuromi é travessa, adora pregar peças e tem um lado rebelde!'
  },
  {
    name: 'Monika',
    origin: 'Doki Doki Literature Club',
    img: 'https://static.wikia.nocookie.net/doki-doki/images/6/6b/Monika_CG.png',
    desc: 'A presidente do clube literário que quebra a quarta parede e manipula tudo ao seu redor.'
  },
  {
    name: 'Himiko Toga',
    origin: 'Boku no Hero Academia',
    img: 'https://static.wikia.nocookie.net/bokunoheroacademia/images/2/2e/Himiko_Toga_Anime.png',
    desc: 'Vilã psicopata, obcecada por sangue e com um sorriso assustadoramente fofo.'
  },
  {
    name: 'Esdeath',
    origin: 'Akame ga Kill!',
    img: 'https://static.wikia.nocookie.net/akamegakill/images/2/2d/Esdeath_Anime.png',
    desc: 'General sádica, poderosa e carismática. Não se aproxime se valoriza sua vida!'
  },
  {
    name: 'Yuno Gasai',
    origin: 'Mirai Nikki',
    img: 'https://static.wikia.nocookie.net/mirai-nikki/images/7/7e/Yuno_Gasai_Anime.png',
    desc: 'A yandere suprema: fofa, apaixonada e... mortalmente perigosa.'
  },
];

const CURIOSITIES = [
  'Kuromi já foi rival da My Melody, mas também tem seu lado gentil.',
  'Monika é famosa por deletar as outras personagens do jogo para ficar sozinha com o jogador.',
  'Toga já foi considerada uma das vilãs mais populares do anime.',
  'Esdeath acredita que só os fortes sobrevivem e adora batalhas extremas.',
  'Yuno Gasai é referência em memes de yandere e stalker.'
];

const QUOTES = [
  '"Por que ser boazinha se ser má é tão divertido?" — Kuromi',
  '"Agora estamos só nós dois... para sempre." — Monika',
  '"Eu só quero ser como todo mundo... beber um pouco de sangue!" — Toga',
  '"O fraco deve obedecer ao forte." — Esdeath',
  '"Se for para te proteger, eu faço qualquer coisa." — Yuno Gasai'
];

export default function StayAwayPage() {
  return (
    <section
      className="stay-away-root"
      style={{
        minHeight: 'calc(100vh - 0px)',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 60% 30%, #f7258577 0%, #23243a 70%)',
        boxShadow: '0 0 0 100vw #23243a',
      }}
    >
      <style>{`
        .glitch {
          color: #f72585;
          font-size: 2.2rem;
          font-family: 'VT323', monospace;
          text-align: center;
          position: relative;
          letter-spacing: 2px;
          animation: glitch-skew 1.2s infinite linear alternate-reverse;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0; width: 100%;
          opacity: 0.7;
        }
        .glitch::before {
          color: #fff;
          top: -2px;
          left: 2px;
          text-shadow: 2px 0 #90a8ed;
          animation: glitch-top 1.2s infinite linear alternate-reverse;
        }
        .glitch::after {
          color: #23243a;
          top: 2px;
          left: -2px;
          text-shadow: -2px 0 #f72585;
          animation: glitch-bottom 1.2s infinite linear alternate-reverse;
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(2deg); }
          60% { transform: skew(-1deg); }
          80% { transform: skew(1deg); }
          100% { transform: skew(0deg); }
        }
        @keyframes glitch-top {
          0% { clip-path: inset(0 0 60% 0); }
          100% { clip-path: inset(0 0 10% 0); }
        }
        @keyframes glitch-bottom {
          0% { clip-path: inset(60% 0 0 0); }
          100% { clip-path: inset(10% 0 0 0); }
        }
        .stay-away-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 2vw;
          justify-content: center;
          margin-bottom: 2.5vw;
          width: 100vw;
          max-width: 1200px;
        }
        .stay-away-card {
          background: linear-gradient(120deg, #1a1a2e 80%, #f72585 120%);
          border-radius: 18px;
          box-shadow: 0 4px 24px #f7258533, 0 1px 8px #90a8ed33;
          padding: 2vw 1.2vw 1.7vw 1.2vw;
          min-width: 170px;
          max-width: 220px;
          width: 90vw;
          text-align: center;
          position: relative;
          margin-bottom: 1vw;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .stay-away-card:hover {
          transform: scale(1.04) translateY(-3px) rotate(-1deg);
          box-shadow: 0 8px 32px #f72585cc, 0 2px 12px #90a8ed88;
        }
        .stay-away-card img {
          width: 110px;
          height: 110px;
          border-radius: 14px;
          object-fit: cover;
          margin-bottom: 10px;
          filter: contrast(1.1) brightness(0.95) drop-shadow(0 2px 12px #f7258555);
        }
        .stay-away-card .name {
          font-weight: 700;
          color: #f72585;
          font-size: 1.18rem;
          margin-bottom: 2px;
        }
        .stay-away-card .origin {
          font-size: 0.98rem;
          color: #90a8ed;
          margin-bottom: 6px;
        }
        .stay-away-card .desc {
          font-size: 1.01rem;
          color: #fff;
        }
        @media (max-width: 700px) {
          .glitch { font-size: 1.3rem; }
          .stay-away-cards { gap: 3vw; }
          .stay-away-card { min-width: 120px; max-width: 98vw; padding: 3vw 2vw 2vw 2vw; }
          .stay-away-card img { width: 70px; height: 70px; }
        }
        .stay-away-section {
          background: #2b2d4d99;
          border-radius: 14px;
          padding: 1.2em 1.2em 0.7em 1.2em;
          margin: 0.7em auto 1.2em auto;
          max-width: 520px;
          width: 95vw;
          box-shadow: 0 2px 12px #f7258533;
        }
        .stay-away-section ul { margin: 0; padding-left: 18px; }
        .stay-away-section li { font-size: 1.01rem; color: #fff; }
        .stay-away-btn {
          background: #f72585;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.8em 2em;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 2px 8px #f7258555;
          cursor: pointer;
          margin-top: 1.5vw;
          transition: background 0.18s, color 0.18s, transform 0.13s;
        }
        .stay-away-btn:hover { background: #90a8ed; color: #f72585; transform: scale(1.06); }
      `}</style>
      <div className="glitch" data-text="FIQUE LONGE! 👿">FIQUE LONGE! 👿</div>
      <p style={{ textAlign: 'center', marginBottom: 18, color: '#fff', fontSize: 18, maxWidth: 600 }}>
        Entre por sua conta e risco. Aqui estão algumas das vilãs (e vilões) mais perigosas do universo kawaii e otaku!
      </p>
      <div className="stay-away-cards">
        {VILLAINS.map((v, idx) => (
          <motion.div
            key={v.name}
            className="stay-away-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 + idx * 0.12, type: 'spring', stiffness: 120, damping: 14 }}
            whileHover={{ scale: 1.07, rotate: -2 }}
            whileTap={{ scale: 0.97, rotate: 1 }}
          >
            <img src={v.img} alt={v.name} />
            <div className="name">{v.name}</div>
            <div className="origin">{v.origin}</div>
            <div className="desc">{v.desc}</div>
          </motion.div>
        ))}
      </div>
      <div className="stay-away-section">
        <div style={{ fontWeight: 600, color: '#f72585', marginBottom: 6 }}>Curiosidades Sombras:</div>
        <ul>
          {CURIOSITIES.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
      <div className="stay-away-section" style={{ background: '#23243aee' }}>
        <div style={{ fontWeight: 600, color: '#f72585', marginBottom: 6 }}>Frases Icônicas:</div>
        <ul>
          {QUOTES.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </div>
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <motion.button
          className="stay-away-btn"
          onClick={() => window.location.href = '/'}
          whileHover={{ scale: 1.11, rotate: 2 }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 14 }}
        >
          FUGIR AGORA!
        </motion.button>
      </div>
    </section>
  );
}
