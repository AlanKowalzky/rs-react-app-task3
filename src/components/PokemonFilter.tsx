
import React, { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonFilterProps {
    search: string;
    allPokemons: any[];
    setAllPokemons: (pokemons: any[]) => void;
    setFilteredPokemons: (pokemons: any[]) => void;
    handlePokemonClick: (name: string) => void;
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
    handleCheckboxChange: (e: React.MouseEvent, name: string) => void;
    offset: number;
    setOffset: (offset: number) => void;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({ search, allPokemons, handlePokemonClick, selectedItems, filteredPokemons, setPage, page, hasMore, isLoading, isError, displayedPokemons, setDisplayedPokemons, isFetching, setFilteredPokemons, handleCheckboxChange, offset, setOffset }) => {

    useEffect(() => {
      const filtered = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }, [search, allPokemons]);

    useEffect(() => {
        const start = page * 10;
        const end = start + 10;
        setDisplayedPokemons(filteredPokemons.slice(start, end));
    }, [page, filteredPokemons]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
        {displayedPokemons.length === 0 && search && <p>No results found</p>}
      <ul>
          {displayedPokemons?.map((pokemon: { name: string; url: string }) => ( 
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
