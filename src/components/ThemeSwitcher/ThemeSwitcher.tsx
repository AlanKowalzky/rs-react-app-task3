import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeSwitcher}>
      <button className={styles.button} onClick={toggleTheme}>
        Przełącz na {theme === 'light' ? 'Ciemny' : 'Jasny'} motyw
      </button>
    </div>
  );
};

export default ThemeSwitcher;

