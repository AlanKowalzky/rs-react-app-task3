import React from 'react';
import { GetServerSideProps } from 'next';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Flyout from '../src/components/Flyout/Flyout';
import ThemeSwitcher from '../src/components/ThemeSwitcher/ThemeSwitcher';

export const getServerSideProps: GetServerSideProps = async () => {
  // You can fetch initial data here if needed
  return {
    props: {}, // will be passed to the page component as props
  };
};

const Home = () => {
  return (
    <>
      <ThemeSwitcher />
      <Dashboard />
      <Flyout />
    </>
  );
};

export default Home;