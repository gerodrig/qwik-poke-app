import { getPokemonsApi } from '~/api/pokeApi';
import type { PokemonListResponse, SmallPokemon } from '~/interfaces';

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<SmallPokemon[]> => {
  const { data } = await getPokemonsApi<PokemonListResponse>('/pokemon', {
    params: {
      offset,
      limit,
    },
  });

  const smallPokemons = data.results.map(({ name, url }) => {
    // url looks like "https://pokeapi.co/api/v2/pokemon/11/"
    // we need to extract the id which is the last part of the url
    const segments = url.split('/');
    const id = Number(segments.at(-2));
    return {
      id,
      name,
    } as SmallPokemon;
  });

  return smallPokemons;
};
