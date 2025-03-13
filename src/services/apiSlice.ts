
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonListResponse, PokemonDetails } from '../types/pokemon';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonListResponse, { limit: number; offset: number; search: string }>({
      query: ({ limit = 10, offset = 0, search = '' }) => {
        if (search) {
          return `pokemon/${search.toLowerCase()}`;
        }
        return `pokemon?limit=${limit}&offset=${offset}`;
      },
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});


export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = apiSlice;
