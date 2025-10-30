import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

// Definir paletas de cores para cada tema
const THEMES = {
  default: {
    name: 'Default (Anime Aesthetic)',
    icon: '✨',
    primary: '#F72585',
    secondary: '#90A8ED',
    background: '#1A1A2E',
    text: '#E0D3F0',
    gray: '#4E4F5A',
    description: 'Tema padrão com neon pink e pastel blue'
  },
  light: {
    name: 'Light Mode',
    icon: '☀️',
    primary: '#D62E73',
    secondary: '#6B7FBD',
    background: '#F5F5F5',
    text: '#2C2C2C',
    gray: '#999999',
    description: 'Tema claro para leitura diurna'
  },
  dark: {
    name: 'Dark Mode',
    icon: '🌙',
    primary: '#FF1493',
    secondary: '#87CEEB',
    background: '#0F0F1E',
    text: '#FFFFFF',
    gray: '#505050',
    description: 'Tema escuro profundo para conforto noturno'
  },
  deuteranopia: {
    name: 'Daltonismo (Vermelho-Verde)',
    icon: '🟦',
    primary: '#004B87',
    secondary: '#F0B000',
    background: '#1A1A2E',
    text: '#E0D3F0',
    gray: '#4E4F5A',
    description: 'Otimizado para deuteranopia (deficiência de verde)'
  },
  protanopia: {
    name: 'Daltonismo (Vermelho-Cego)',
    icon: '🟨',
    primary: '#0087BE',
    secondary: '#FFB400',
    background: '#1A1A2E',
    text: '#E0D3F0',
    gray: '#4E4F5A',
    description: 'Otimizado para protanopia (deficiência de vermelho)'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');

  // Carregar tema salvo do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('yume-theme');
    if (savedTheme && Object.keys(THEMES).includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'default';
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, []);

  // Aplicar tema ao document
  const applyTheme = (themeName) => {
    const themeConfig = THEMES[themeName];
    const root = document.documentElement;

    // Aplicar variáveis CSS
    root.style.setProperty('--neon-pink', themeConfig.primary);
    root.style.setProperty('--pastel-blue', themeConfig.secondary);
    root.style.setProperty('--deep-void', themeConfig.background);
    root.style.setProperty('--ghost-white', themeConfig.text);
    root.style.setProperty('--mid-gray', themeConfig.gray);

    // Aplicar atributo para identificar tema
    root.setAttribute('data-theme', themeName);

    // Salvar tema no localStorage
    localStorage.setItem('yume-theme', themeName);
  };

  // Trocar tema
  const toggleTheme = (newTheme) => {
    if (Object.keys(THEMES).includes(newTheme)) {
      setTheme(newTheme);
      applyTheme(newTheme);
    }
  };

  // Ciclar entre temas (para atalho de teclado)
  const cycleTheme = () => {
    const themeKeys = Object.keys(THEMES);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIndex];
    toggleTheme(nextTheme);
  };

  const currentThemeConfig = THEMES[theme];

  const value = {
    theme,
    currentThemeConfig,
    THEMES,
    toggleTheme,
    cycleTheme,
    isThemeDark: theme === 'dark' || theme === 'default',
    isThemeLight: theme === 'light',
    isColorblindTheme: theme === 'deuteranopia' || theme === 'protanopia'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o contexto de temas
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
