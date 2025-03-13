

// src/components/Dashboard/Dashboard.tsx
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useGetPokemonsQuery, useGetPokemonDetailsQuery } from '../../services/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../features/selectedItems/selectedItemsSlice';
import { RootState } from '../../store/store';
import type { Pokemon, PokemonDetails } from '../../types/pokemon';
import styles from './Dashboard.module.css';
import SearchBar from '../SearchBar/SearchBar';
import PokemonFilter from '../PokemonFilter';
import Pagination from '../Pagination';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Dashboard: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const params = useParams<{ pageNumber: string }>();
    const pageNumber = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
    const [page, setPage] = useState(pageNumber - 1);
    const [search, setSearch] = useState('');
    const [allPokemons, setAllPokemons] = useState<any[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
    const [displayedPokemons, setDisplayedPokemons] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [offset, setOffset] = useState((pageNumber - 1) * 10);
    const { data, isLoading, isError, isFetching } = useGetPokemonsQuery({
        limit: 10,
        offset: offset,
        search: ''
    });
    const { data: allData } = useGetPokemonsQuery({
        limit: 10000,
        offset: 0,
        search: ''
    });
    const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
    const dispatch = useDispatch();

    // Update URL when page changes
    useEffect(() => {
        if (pageNumber !== page + 1) {
            navigate(`/page/${page + 1}`);
        }
    }, [page, navigate, pageNumber]);

    // Sync page state with URL parameter
    useEffect(() => {
        setPage(pageNumber - 1);
        setOffset((pageNumber - 1) * 10);
    }, [pageNumber]);

    useEffect(() => {
        if (allData?.results) {
            setAllPokemons(allData.results);
        }
    }, [allData]);

    useEffect(() => {
        if (search === '') {
            setAllPokemons(allData?.results || []);
        }
    }, [search]);

    const handlePokemonClick = (name: string) => {
        // Extract the Pokemon ID from the URL
        const pokemonUrl = allPokemons.find(p => p.name === name)?.url;
        if (pokemonUrl) {
            const urlParts = pokemonUrl.split('/');
            const pokemonId = urlParts[urlParts.length - 2];
            navigate(`/pokemon/${pokemonId}`);
        }
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setOffset(0);
        setPage(0);
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        navigate(`/page/${nextPage + 1}`);
    };

    const handlePreviousPage = () => {
        const prevPage = Math.max(page - 1, 0);
        setPage(prevPage);
        navigate(`/page/${prevPage + 1}`);
    };

    const handleCheckboxChange = (e: React.MouseEvent, name: string) => {
        if (selectedItems.includes(name)) {
            dispatch(removeItem(name));
        } else {
            dispatch(addItem(name));
        }
    };

    return (
        <div className={`${styles['dashboard-container']} ${theme}`} style={{ position: 'relative' }}>
            <div className={styles['pokemon-list']}>
                <h1>Pokemon Dashboard</h1>
                <div className={styles['search-container']}>
                    <SearchBar onSearch={handleSearch} />
                </div>
                {search && <p>Searching for: {search}</p>}
                <PokemonFilter
                    search={search}
                    allPokemons={allPokemons}
                    setAllPokemons={setAllPokemons}
                    handlePokemonClick={handlePokemonClick}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedItems={selectedItems}
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
                    offset={offset}
                    setOffset={setOffset}
                />
                <Pagination
                    page={page}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                    isPreviousDisabled={page === 0}
                    isNextDisabled={displayedPokemons.length < 10 && !hasMore}
                />
            </div>
        </div>
    );
};

export default Dashboard;
