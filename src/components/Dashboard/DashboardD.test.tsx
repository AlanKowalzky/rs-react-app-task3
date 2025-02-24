import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from './Dashboard';
import { useGetPokemonsQuery, useGetPokemonDetailsQuery } from '../../services/apiSlice';
import selectedItemsReducer from '../../features/selectedItems/selectedItemsSlice';

// Mock the API hooks
jest.mock('../../services/apiSlice', () => ({
  useGetPokemonsQuery: jest.fn(),
  useGetPokemonDetailsQuery: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

const mockPokemons = {
  results: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  ],
};

const mockPokemonDetails = {
  name: 'pikachu',
  height: 40,
  weight: 60,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      },
    },
  },
  types: [{ type: { name: 'electric' } }],
  abilities: [{ ability: { name: 'static' } }],
  base_experience: 112,
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockPokemons,
      isLoading: false,
      isError: false,
    });

    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      isError: false,
    });
  });

  it('renders the Dashboard component', () => {
    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('Pokemon Dashboard')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Pokemon (min 3 characters)')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('handles search input and button click', async () => {
    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search Pokemon (min 3 characters)');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'pika' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(useGetPokemonsQuery).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        search: 'pika',
      });
    });
  });

  it('handles pagination', () => {
    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(useGetPokemonsQuery).toHaveBeenCalledWith({
      limit: 10,
      offset: 10,
      search: '',
    });

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    expect(useGetPokemonsQuery).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      search: '',
    });
  });

  it('handles Pokemon selection and details display', async () => {
    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    // Find the first "pikachu" text (in the list)
    const pokemonItem = screen.getAllByText('pikachu')[0];
    fireEvent.click(pokemonItem);

    // Wait for the details panel to appear
    await waitFor(() => {
      // Check the details panel content
      expect(screen.getByRole('heading', { name: 'pikachu' })).toBeInTheDocument();
      expect(screen.getByText('Height: 4 m')).toBeInTheDocument();
      expect(screen.getByText('Weight: 6 kg')).toBeInTheDocument();
      expect(screen.getByText('Types: electric')).toBeInTheDocument();
      expect(screen.getByText('Abilities: static')).toBeInTheDocument();
      expect(screen.getByText('Base Experience: 112')).toBeInTheDocument();
    });
  });
});
