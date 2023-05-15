import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonAppContext } from '~/context';
import { usePokemonApp } from '~/hooks/use-pokemon-app';


export const usePokemonId = routeLoader$<number>(({params, redirect}) => {    
    const id = Number(params.id);

    if (isNaN(id)) redirect(301, '/');
    if(id < 1 || id > 1010) redirect(301, '/');
    return id;
});


export default component$(() => {
    const pokemonApp = useContext( PokemonAppContext);

    const pokemonId = usePokemonId();

    const {toggleFlipPokemon, toggleVisiblePokemon} = usePokemonApp();

    return (
        <>
        <span class="text-5xl">Pokemon: {pokemonApp.pokemonId}</span>
        <PokemonImage id={pokemonId.value} size={400} backImage={pokemonApp.showBackImage} isVisible={pokemonApp.isPokemonVisible} />
        <div class="flex gap-3 mt-2">
        <button
          onClick$={toggleFlipPokemon}
          class="font-bold py-2 px-4 rounded bg-blue-500 text-white disabled:bg-blue-800 hover:bg-blue-700 hover:cursor-pointer "
        >
          Flip
        </button>
        <button
          onClick$={toggleVisiblePokemon}
          class={`font-bold py-2 px-4 w-20 rounded ${
            pokemonApp.isPokemonVisible
              ? 'bg-gray-700 text-white hover:bg-black'
              : 'bg-yellow-500'
          } text-black disabled:bg-yellow-800 hover:text-white hover:bg-yellow-700 hover:cursor-pointer `}
        >
          {pokemonApp.isPokemonVisible ? 'Hide' : 'Show'}
        </button>
        </div>
        </>
    );
});