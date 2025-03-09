import React from 'react';
import { GetServerSideProps } from 'next';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Flyout from '../src/components/Flyout/Flyout';
import ThemeSwitcher from '../src/components/ThemeSwitcher/ThemeSwitcher';
import { ThemeProvider } from '../src/context/ThemeContext';

export const getServerSideProps: GetServerSideProps = async () => {
  // You can fetch initial data here if needed
  return {
    props: {}, // will be passed to the page component as props
  };
};

const Home = () => {
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

export default Home;