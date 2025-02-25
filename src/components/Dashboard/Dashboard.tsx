// src/components/Dashboard/Dashboard.tsx
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useGetPokemonsQuery, useGetPokemonDetailsQuery } from '../../services/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../features/selectedItems/selectedItemsSlice';
import { RootState } from '../../store/store';
import type { Pokemon, PokemonDetails } from '../../types/pokemon';
import './Dashboard.css';
import SearchBar from '../SearchBar/SearchBar';
import PokemonFilter from '../PokemonFilter';
import Pagination from '../Pagination';
import PokemonDetailsPanel from '../PokemonDetailsPanel/PokemonDetailsPanel';
import { useTheme } from '../../context/ThemeContext'; // Dodany import useTheme

const Dashboard: React.FC = () => {
    const { theme, toggleTheme } = useTheme(); // Pobieramy theme i toggleTheme
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
    const [allPokemons, setAllPokemons] = useState<any[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]); // Stan przefiltrowanych
    const [displayedPokemons, setDisplayedPokemons] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [offset, setOffset] = useState(0); // Dodany stan offset
    const { data, isLoading, isError, isFetching } = useGetPokemonsQuery({
        limit: 10,
        offset: offset,
        search: ''
    });
  const { data: allData } = useGetPokemonsQuery({
      limit: 10000,
      offset: 0,
      search: ''
  }); // Pobieramy wszystkie pokemony.
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const dispatch = useDispatch();
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
    useEffect(() => {
        if (allData?.results) {
            setAllPokemons(allData.results); //Ustawiamy wszystkie dane
        }
    }, [allData]);

  useEffect(() => {
      if (search === '') {
          setAllPokemons(allData?.results || []); // Dodane resetowanie do wszystkich danych
      }
  }, [search]);
  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
      setOffset(0);
      setPage(0);
  };
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };
     const handleCheckboxChange = (e: React.MouseEvent, name: string) => {
         if (selectedItems.includes(name)) {
             dispatch(removeItem(name));
         } else {
             dispatch(addItem(name));
         }
     };
  return (
    <div className={`dashboard-container ${theme}`} style={{ position: 'relative' }}>{/* Dodane theme */}
      <div className="pokemon-list">
        <h1>Pokemon Dashboard</h1>
          <button onClick={toggleTheme}>Toggle Theme</button> {/* Dodany przycisk */}
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>
          {search && <p>Searching for: {search}</p>}
          <PokemonFilter
            search={search}
            allPokemons={allPokemons}
            setAllPokemons={setAllPokemons}
            handlePokemonClick={handlePokemonClick}
            handleCheckboxChange={handleCheckboxChange} // Dodane przekazanie funkcji handleCheckboxChange
            selectedItems={selectedItems} // Dodane przekazanie selectedItems
            filteredPokemons={filteredPokemons}
            setFilteredPokemons={setFilteredPokemons}
            setPage={setPage}
            page={page}
            hasMore={hasMore}
            isLoading={isLoading}
            isError={isError}
            displayedPokemons={displayedPokemons}
            setDisplayedPokemons={setDisplayedPokemons}
            isFetching={isFetching}
              offset={offset} //Dodano offset
            setOffset={setOffset} // Dodana funkcja setOffset
        />
          <Pagination
              page={page}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              isPreviousDisabled={page === 0}
              isNextDisabled={displayedPokemons.length < 10 && !hasMore}
          />
      </div>
        {selectedPokemon && (
            <PokemonDetailsPanel
                selectedPokemon={selectedPokemon}
                handleCloseDetails={handleCloseDetails}
            />
        )}
    </div>
  );
};

export default Dashboard;
