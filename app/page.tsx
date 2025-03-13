import React from 'react';
import ThemeSwitcher from '../src/components/ThemeSwitcher/ThemeSwitcher';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Flyout from '../src/components/Flyout/Flyout';

export default function Home() {
  return (
    <main>
      <ThemeSwitcher />
      <Dashboard />
      <Flyout />
    </main>
  );
}