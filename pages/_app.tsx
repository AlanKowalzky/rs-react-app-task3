import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/context/ThemeContext';
import '../src/index.css';
import '../src/styles/theme.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;