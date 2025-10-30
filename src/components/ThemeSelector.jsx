import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'tabler-icons-react';
import { useTheme } from '../contexts/ThemeContext';
import AccessibleEmoji from './AccessibleEmoji';

export const ThemeSelector = () => {
  const { theme, THEMES, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  const handleThemeChange = (newTheme) => {
    toggleTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <motion.div className="theme-selector-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      {/* Botão principal */}
      <motion.button
        className="theme-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Mudar tema"
        title={`Tema atual: ${THEMES[theme].name}`}
      >
        <AccessibleEmoji
          emoji={THEMES[theme].icon}
          label={`Ícone do tema: ${THEMES[theme].name}`}
          className="theme-icon"
        />
        <span className="theme-name">{THEMES[theme].name}</span>
      </motion.button>

      {/* Painel de seleção */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-panel"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="theme-panel-header">
              <h3 className="theme-panel-title">
                <Palette size={20} style={{ display: 'inline-block', marginRight: '0.5rem' }} />
                Escolha um Tema
              </h3>
              <motion.button
                className="theme-panel-close"
                onClick={() => setIsOpen(false)}
                whileHover={{ rotate: 90 }}
                aria-label="Fechar painel de temas"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="theme-options">
              {Object.entries(THEMES).map(([key, config]) => (
                <motion.button
                  key={key}
                  className={`theme-option ${theme === key ? 'active' : ''}`}
                  onClick={() => handleThemeChange(key)}
                  variants={itemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="theme-preview">
                    <div
                      className="theme-color-primary"
                      style={{ backgroundColor: config.primary }}
                      title="Cor primária"
                    />
                    <div
                      className="theme-color-secondary"
                      style={{ backgroundColor: config.secondary }}
                      title="Cor secundária"
                    />
                    <div
                      className="theme-color-bg"
                      style={{ backgroundColor: config.background }}
                      title="Fundo"
                    />
                  </div>
                  <div className="theme-info">
                    <AccessibleEmoji
                      emoji={config.icon}
                      label={`Ícone do tema: ${config.name}`}
                      className="theme-icon"
                    />
                    <div className="theme-text">
                      <span className="theme-title">{config.name}</span>
                      <span className="theme-desc">{config.description}</span>
                    </div>
                  </div>
                  {theme === key && (
                    <motion.div
                      className="theme-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="theme-footer">
              <p className="theme-footer-text">
                💡 Dica: Pressione <kbd>T</kbd> para alternar entre temas
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar ao clicar fora */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-overlay"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ThemeSelector;
