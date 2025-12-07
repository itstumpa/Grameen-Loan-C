import React, { createContext, useContext, useState } from 'react';

// ========== CREATE THEME CONTEXT ==========
const ThemeContext = createContext();

// ========== CUSTOM HOOK TO USE THEME ==========
// Use this hook in any component to access theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// ========== THEME PROVIDER COMPONENT ==========
// Wrap your entire app with this in App.js
export const ThemeProvider = ({ children }) => {
  // State to manage dark/light theme
  const [isDark, setIsDark] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  // Provide theme state and toggle function to all children
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};