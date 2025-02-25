import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard/Dashboard';
import Flyout from './components/Flyout/Flyout';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeSwitcher />
        <Dashboard />
        <Flyout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
