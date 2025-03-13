'use client';

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard';
import PokemonDetailsPanel from './components/PokemonDetailsPanel/PokemonDetailsPanel';

// Loader function to fetch Pokemon details
const pokemonLoader = async ({ params }: { params: { pokemonId: string } }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
  if (!response.ok) {
    throw new Error('Failed to load Pokemon details');
  }
  const pokemon = await response.json();
  return { pokemon };
};

export default function Router() {
  const [router, setRouter] = React.useState(null);

  React.useEffect(() => {
    // Create router with React Router 7 on client-side only
    const browserRouter = createBrowserRouter([
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'page/:pageNumber',
            element: <Dashboard />,
          },
          {
            path: 'pokemon/:pokemonId',
            element: <PokemonDetailsPanel />,
            loader: pokemonLoader,
          },
        ],
      },
    ]);
    setRouter(browserRouter);
  }, []);

  if (!router) return null;

  return <RouterProvider router={router} />;
}