// src/components/Dashboard/Dashboard.tsx
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react'; // Dodane ChangeEvent i KeyboardEvent
import { useGetPokemonsQuery, useGetPokemonDetailsQuery } from '../../services/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../features/selectedItems/selectedItemsSlice';
import { RootState } from '../../store/store';
import type { Pokemon, PokemonDetails } from '../../types/pokemon';
import './Dashboard.css';
import SearchBar from '../SearchBar/SearchBar';

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetPokemonsQuery({
    limit: 10,
    offset: page * 10,
    search,
  });
  const { data: pokemonDetails } = useGetPokemonDetailsQuery(selectedPokemon || '', {
    skip: !selectedPokemon,
  });
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const dispatch = useDispatch();
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        setSelectedPokemon(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPokemon(null); // Close details panel when toggling checkbox
    if (selectedItems.includes(name)) {
      dispatch(removeItem(name));
    } else {
      dispatch(addItem(name));
    }
  };

  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.length >= 3) {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="dashboard-container" style={{ position: 'relative' }}>
      <div className="pokemon-list">
        <h1>Pokemon Dashboard</h1>
        <div className="search-container">
         <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        <ul>
          {data?.results?.map((pokemon: { name: string; url: string }) => (
            <li
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.name)}
              className={selectedPokemon === pokemon.name ? 'selected' : ''}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(pokemon.name)}
                onChange={(e) =>
                  handleCheckboxChange(e as unknown as React.MouseEvent, pokemon.name)
                }
              />
              {pokemon.name}
            </li>
          ))}
        </ul>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {selectedPokemon && pokemonDetails && (
        <div
          className="pokemon-details"
          ref={detailsRef}
          style={{
            position: 'fixed',
            right: '20px',
            top: '20px',
            bottom: '20px',
            width: '40%',
            overflowY: 'auto',
          }}
        >
          <button className="close-button" onClick={handleCloseDetails}>
            &times;
          </button>
          <h2>{pokemonDetails.name}</h2>
          <img
            src={
              pokemonDetails.sprites.other?.['official-artwork']?.front_default ||
              pokemonDetails.sprites.front_default
            }
            alt={pokemonDetails.name}
            className="pokemon-image"
          />
          <p>Height: {pokemonDetails.height / 10} m</p>
          <p>Weight: {pokemonDetails.weight / 10} kg</p>
          <p>Types: {pokemonDetails.types.map((type) => type.type.name).join(', ')}</p>
          <p>
            Abilities: {pokemonDetails.abilities.map((ability) => ability.ability.name).join(', ')}
          </p>
          <p>Base Experience: {pokemonDetails.base_experience}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
