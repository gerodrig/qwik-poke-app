import { component$, $ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonApp } from '~/hooks/use-pokemon-app';

export default component$(() => {
  const nav = useNavigate();

  //navigate programmatically
  const goToPokemon = $((id: number) => {
    nav('/pokemon/' + id);
  });

  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    previousPokemon,
    toggleFlipPokemon,
    toggleVisiblePokemon,
  } = usePokemonApp();

  return (
    <>
      <span class="text-2xl">Basic Search</span>
      <span class="text-8xl">{pokemonId.value}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`} >
      </Link> */}
      <div
        class="hover:cursor-pointer"
        onClick$={() => goToPokemon(pokemonId.value)}
      >
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="flex gap-3 mt-2">
        <button
          onClick$={previousPokemon}
          class="font-bold py-2 px-4 rounded bg-white text-black disabled:bg-gray-800 hover:bg-gray-400 hover:cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick$={nextPokemon}
          class="font-bold py-2 px-4 rounded bg-red-600 text-white disabled:bg-gray-800 hover:bg-red-700 hover:cursor-pointer "
        >
          Next
        </button>
        <button
          onClick$={toggleFlipPokemon}
          class="font-bold py-2 px-4 rounded bg-blue-500 text-white disabled:bg-blue-800 hover:bg-blue-700 hover:cursor-pointer "
        >
          Flip
        </button>
        <button
          onClick$={toggleVisiblePokemon}
          class={`font-bold py-2 px-4 w-20 rounded ${
            isPokemonVisible.value
              ? 'bg-gray-700 text-white hover:bg-black'
              : 'bg-yellow-500'
          } text-black disabled:bg-yellow-800 hover:text-white hover:bg-yellow-700 hover:cursor-pointer `}
        >
          {isPokemonVisible.value ? 'Hide' : 'Show'}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'This is a pokemon app built with Qwik',
    },
  ],
};
