import React from 'react';

/**
 * AccessibleEmoji Component
 * Torna emojis acessíveis para leitores de tela
 */
export const AccessibleEmoji = ({
  emoji,
  label,
  className = '',
  role = 'img',
  ariaHidden = false
}) => {
  // Se ariaHidden = true, o emoji é puramente decorativo
  if (ariaHidden) {
    return (
      <span
        className={className}
        role="presentation"
        aria-hidden="true"
        style={{
          display: 'inline-block'
        }}
      >
        {emoji}
      </span>
    );
  }

  // Caso contrário, o emoji tem significado
  return (
    <span
      className={className}
      role={role}
      aria-label={label}
      style={{
        display: 'inline-block'
      }}
    >
      {emoji}
    </span>
  );
};

export default AccessibleEmoji;
