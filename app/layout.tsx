import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/context/ThemeContext';
import '../src/index.css';
import '../src/styles/theme.css';

export const metadata = {
  title: 'Pokemon Dashboard',
  description: 'A React-based Pokemon Explorer with Theme Switching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}