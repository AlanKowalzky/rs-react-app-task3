import React from 'react';
import Providers from './providers';
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}