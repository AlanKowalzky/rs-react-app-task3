// src/components/PokemonDetailsPanel/PokemonDetailsPanel.tsx
import React, { useEffect, useRef } from 'react';
import { useGetPokemonDetailsQuery } from '../../services/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './PokemonDetailsPanel.module.css';
interface PokemonDetailsPanelProps {
  selectedPokemon: string | null;
    handleCloseDetails: () => void;
}

const PokemonDetailsPanel: React.FC<PokemonDetailsPanelProps> = ({ selectedPokemon, handleCloseDetails }) => {
    const { data: pokemonDetails } = useGetPokemonDetailsQuery(selectedPokemon || '', {
        skip: !selectedPokemon,
    });
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                handleCloseDetails();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
        {pokemonDetails && (
            <div
                className={styles.pokemon_details}
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
                <button className={styles.close_button} onClick={handleCloseDetails}>
                    &times;
                </button>
                <h2>{pokemonDetails.name}</h2>
                <img
                    src={
                        pokemonDetails.sprites.other?.['official-artwork']?.front_default ||
                        pokemonDetails.sprites.front_default
                    }
                    alt={pokemonDetails.name}
                    className={styles.pokemon_image}
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
        </>
    );
};

export default PokemonDetailsPanel;
