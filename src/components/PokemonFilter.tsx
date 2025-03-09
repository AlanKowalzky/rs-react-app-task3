'use client';

import React, { useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';

interface PokemonFilterProps {
    search: string;
    allPokemons: Pokemon[];
    setAllPokemons: (pokemons: Pokemon[]) => void;
    handlePokemonClick: (name: string) => void;
    handleCheckboxChange: (e: React.MouseEvent, name: string) => void;
    selectedItems: string[];
    filteredPokemons: Pokemon[];
    setFilteredPokemons: (pokemons: Pokemon[]) => void;
    setPage: (page: number) => void;
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    isError: boolean;
    displayedPokemons: Pokemon[];
    setDisplayedPokemons: (pokemons: Pokemon[]) => void;
    isFetching: boolean;
    offset: number;
    setOffset: (offset: number) => void;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({
    search,
    allPokemons,
    handlePokemonClick,
    handleCheckboxChange,
    selectedItems,
    filteredPokemons,
    setFilteredPokemons,
    page,
    hasMore,
    isLoading,
    isError,
    displayedPokemons,
    setDisplayedPokemons,
    isFetching,
    offset,
    setOffset
}) => {
    useEffect(() => {
        if (search) {
            const filtered = allPokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPokemons(filtered);
            setDisplayedPokemons(filtered.slice(page * 10, (page + 1) * 10));
        } else {
            setFilteredPokemons([]);
            setDisplayedPokemons(allPokemons.slice(page * 10, (page + 1) * 10));
        }
    }, [search, allPokemons, page]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading Pokemon data</div>;

    return (
        <div>
            {displayedPokemons.map((pokemon: Pokemon) => (
                <div key={pokemon.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(pokemon.name)}
                        onChange={(e) => handleCheckboxChange(e as unknown as React.MouseEvent, pokemon.name)}
                    />
                    <span onClick={() => handlePokemonClick(pokemon.name)}>
                        {pokemon.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default PokemonFilter;
