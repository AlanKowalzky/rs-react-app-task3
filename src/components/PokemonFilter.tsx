// src/components/PokemonFilter.tsx
import React, { useState, useEffect } from 'react';
import { useGetPokemonsQuery } from '../services/apiSlice';

interface PokemonFilterProps {
  search: string;
  allPokemons: any[];
  setAllPokemons: (pokemons: any[]) => void;
    setFilteredPokemons: (pokemons: any[]) => void;
    handlePokemonClick: (name: string) => void;
    handleCheckboxChange: (e: React.MouseEvent, name: string) => void;
    selectedItems: string[];
    filteredPokemons: any[];
    setPage: (page: number) => void;
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    isError: boolean;
    displayedPokemons: any[];
    setDisplayedPokemons: (pokemons: any[]) => void;
    isFetching: boolean;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({ search, allPokemons, setAllPokemons, handlePokemonClick, handleCheckboxChange, selectedItems, filteredPokemons, setPage, page, hasMore, isLoading, isError, displayedPokemons, setDisplayedPokemons, isFetching }) => {
    const [offset, setOffset] = useState(0); // Dodany stan offset
    const { data } = useGetPokemonsQuery({ limit: 10, offset: offset, search: "" });

      useEffect(() => {
          if (data?.results) {
              setAllPokemons((prev) => [...prev, ...data.results]);
              if (data.results.length < 10) {
                  hasMore = false;
              }
          }
      }, [data]);

      useEffect(() => {
        const start = page * 10;
        const end = start + 10;
        setDisplayedPokemons(filteredPokemons.slice(start, end));

          if (end >= filteredPokemons.length && hasMore && !isFetching) {
              setOffset(offset + 10);
          }
      }, [page, filteredPokemons, hasMore]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
        {displayedPokemons.length === 0 && search && <p>No results found</p>}
      <ul>
          {displayedPokemons?.map((pokemon: { name: string; url: string }) => ( // Wyświetlamy filteredPokemons
              <li
                  key={pokemon.name}
                  onClick={() => handlePokemonClick(pokemon.name)}
              >
                  <input
                      type="checkbox"
                      checked={selectedItems.includes(pokemon.name)}
                      onChange={(e) => handleCheckboxChange(e as unknown as React.MouseEvent, pokemon.name)}
                  />
                  {pokemon.name}
              </li>
          ))}
      </ul>
    </>
  );
};

export default PokemonFilter;
