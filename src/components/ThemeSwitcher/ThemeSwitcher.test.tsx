
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  test('renders theme switcher with light theme', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByText(/Switch to Dark Theme/i)).toBeInTheDocument();
  });

  test('renders theme switcher with dark theme', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: jest.fn() }}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByText(/Switch to Light Theme/i)).toBeInTheDocument();
  });
});
