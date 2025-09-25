import React, { useEffect, useState } from 'react';

// Gera um array de gatos animados com posições e velocidades aleatórias
function createCats(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    top: Math.random() * 80 + 5, // %
    left: Math.random() * 100,
    speed: 0.5 + Math.random() * 1.2,
    direction: Math.random() > 0.5 ? 1 : -1,
    emoji: Math.random() > 0.5 ? '🐈' : '🐾',
  }));
}

export default function AnimatedCatsBg({ count = 5 }) {
  const [cats, setCats] = useState(() => createCats(count));

  useEffect(() => {
    const interval = setInterval(() => {
      setCats(prev => prev.map(cat => {
        let newLeft = cat.left + cat.speed * cat.direction;
        if (newLeft > 110) newLeft = -10;
        if (newLeft < -10) newLeft = 110;
        return { ...cat, left: newLeft };
      }));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {cats.map(cat => (
        <span
          key={cat.id}
          style={{
            position: 'absolute',
            top: `${cat.top}%`,
            left: `${cat.left}%`,
            fontSize: 36,
            opacity: 0.7,
            filter: 'blur(0.2px)',
            transition: 'filter 0.2s',
            userSelect: 'none',
            transform: `scaleX(${cat.direction})`,
          }}
        >
          {cat.emoji}
        </span>
      ))}
    </div>
  );
}
