import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { ThemeContext, ThemeProvider, useTheme } from './ThemeContext';

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

  test('useTheme hook throws error when used outside of ThemeProvider', () => {
    // Tymczasowo wycisz błędy konsoli
    const originalError = console.error;
    console.error = jest.fn();
    
    const TestComponent = () => {
      useTheme();
      return null;
    };
    
    expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');
    
    // Przywróć oryginalną funkcję console.error
    console.error = originalError;
  });
  
  test('theme is provided to children', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme-value">{theme}</div>;
    };
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
});
