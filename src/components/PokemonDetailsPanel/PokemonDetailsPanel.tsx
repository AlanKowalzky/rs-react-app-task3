// src/components/PokemonDetailsPanel/PokemonDetailsPanel.tsx
import React, { useEffect, useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styles from './PokemonDetailsPanel.module.css';

// Definiujemy interfejs dla danych z loadera
interface PokemonLoaderData {
  pokemon: {
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      other?: {
        'official-artwork'?: {
          front_default: string;
        }
      }
    };
    types: Array<{
      type: {
        name: string;
      }
    }>;
    abilities: Array<{
      ability: {
        name: string;
      }
    }>;
    base_experience: number;
  };
}

const PokemonDetailsPanel: React.FC = () => {
    // Pobieramy dane z loadera zamiast z props
    const { pokemon: pokemonDetails } = useLoaderData() as PokemonLoaderData;
    const navigate = useNavigate();
    const detailsRef = useRef<HTMLDivElement>(null);

    // Funkcja do zamykania panelu - przekierowuje na stronę główną
    const handleCloseDetails = () => {
        navigate('/');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if we're in the browser environment
            const handleClickOutside = (event: MouseEvent) => {
                if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                    handleCloseDetails();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
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