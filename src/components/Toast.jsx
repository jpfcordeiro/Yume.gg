import React from 'react';

export default function Toast({ message, icon, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 9999,
      background: 'var(--ghost-white)',
      color: 'var(--deep-void)',
      borderRadius: 12,
      boxShadow: '0 4px 24px rgba(var(--neon-pink-rgb), 0.33)',
      padding: '1em 1.5em',
      fontSize: 18,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      animation: 'toast-pop 0.5s cubic-bezier(.4,1.4,.6,1)',
    }}>
      <span style={{ fontSize: 26 }}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
