import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hook para usar atalhos de teclado para alternar temas
 * Pressione 'T' para ciclar entre temas
 */
export const useThemeKeyboard = () => {
  const { cycleTheme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Verificar se é 'T' ou 't' e não está digitando em um input
      if ((e.key === 't' || e.key === 'T') && 
          e.ctrlKey === false && 
          e.altKey === false && 
          e.metaKey === false &&
          !isTypingInInput(e.target)) {
        e.preventDefault();
        cycleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cycleTheme]);
};

/**
 * Verificar se o usuário está digitando em um input
 */
const isTypingInInput = (target) => {
  const inputTypes = ['INPUT', 'TEXTAREA', 'SELECT'];
  return inputTypes.includes(target.tagName) || target.contentEditable === 'true';
};

export default useThemeKeyboard;
