import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import '../../assets/themes/light.css';
import '../../assets/themes/dark.css';
import '../../assets/themes/variables.css';



const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  useEffect(() => {
    // 1. Usuń poprzednie klasy theme'u
    document.body.classList.remove('light', 'dark'); 
    // 2. Dodaj nową klasę theme'u
    document.body.classList.add(theme);
  }, [theme]);


  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;

