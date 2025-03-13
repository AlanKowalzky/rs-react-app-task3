import React from 'react';
import { Outlet } from 'react-router-dom';
import Flyout from './components/Flyout/Flyout';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';

const App: React.FC = () => {
  return (
    <>
      <ThemeSwitcher />
      <Outlet />
      <Flyout />
    </>
  );
};

export default App;