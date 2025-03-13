import React from 'react';
import Link from 'next/link';
import { useTheme } from '../src/context/ThemeContext';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.notFoundContainer} ${theme}`}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className={styles.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;