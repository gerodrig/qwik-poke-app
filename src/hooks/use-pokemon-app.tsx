import { useContext, useComputed$, $ } from '@builder.io/qwik';
import { PokemonAppContext } from '~/context';

export const usePokemonApp = () => {
  const pokemonApp = useContext(PokemonAppContext);

  const changePokemonId = $((value: number) => {
    pokemonApp.pokemonId = Math.max(
      1,
      Math.min(1010, pokemonApp.pokemonId + value)
    );
  });

  const toggleFlipPokemon = $(() => {
    pokemonApp.showBackImage = !pokemonApp.showBackImage;
  });

  const toggleVisiblePokemon = $(() => {
    pokemonApp.isPokemonVisible = !pokemonApp.isPokemonVisible;
  });

  return {
    pokemonId: useComputed$(() => pokemonApp.pokemonId),
    showBackImage: useComputed$(() => pokemonApp.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonApp.isPokemonVisible),
    pokemonApp,

    //methods
    nextPokemon: $(() => changePokemonId(1)),
    previousPokemon: $(() => changePokemonId(-1)),

    toggleFlipPokemon: toggleFlipPokemon,
    toggleVisiblePokemon: toggleVisiblePokemon,
  };
};
