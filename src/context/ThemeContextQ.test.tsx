import React from 'react';
import { render, act } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from './ThemeContext';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

describe('ThemeContext', () => {
  test('ThemeProvider should initialize with light theme', () => {
    let contextValue: ThemeContextType | undefined;
    
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(contextValue?.theme).toBe('light');
  });

  test('toggleTheme should switch between light and dark themes', () => {
    let contextValue: ThemeContextType | undefined;
    
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    act(() => {
      contextValue?.toggleTheme();
    });
    expect(contextValue?.theme).toBe('dark');

    act(() => {
      contextValue?.toggleTheme();
    });
    expect(contextValue?.theme).toBe('light');
  });
});
