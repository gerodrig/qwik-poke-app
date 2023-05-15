import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';

import {
  PokemonAppContext,
  type PokemonAppState,
} from './pokemon-game.context';
import {
  PokemonListContext,
  type PokemonListState,
} from './pokemon-list.context';

export const PokemonProvider = component$(() => {
  //create initial stae
  const pokemonApp = useStore<PokemonAppState>({
    pokemonId: 1,
    showBackImage: false,
    isPokemonVisible: true,
  });

  //Pokemon List context
  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonAppContext, pokemonApp);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    //TODO: Read from localstorage
    const data = localStorage.getItem('pokemonApp');
    if (data) {

      const {
        isPokemonVisible = true,
        pokemonId = 25,
        showBackImage = false,
      } = JSON.parse(data) as PokemonAppState;
      
      pokemonApp.pokemonId = pokemonId;
      pokemonApp.showBackImage = showBackImage;
      pokemonApp.isPokemonVisible = isPokemonVisible;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonApp.isPokemonVisible,
      pokemonApp.pokemonId,
      pokemonApp.showBackImage,
    ]);
    localStorage.setItem('pokemonApp', JSON.stringify(pokemonApp));
  });

  return <Slot />;
});
