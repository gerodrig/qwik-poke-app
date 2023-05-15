import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonListContext } from '~/context/pokemon/pokemon-list.context';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

// import type { SmallPokemon } from '~/interfaces/small-pokemon';

const title = 'Pokemon Page - List Client';

// interface PokemonPageState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }

export default component$(() => {
  //use Store is to use data that is not prmitive
  //?Using Store
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   pokemons: [],
  // });

  //? Using context
  const pokemonState = useContext(PokemonListContext);

  //useVisibleTask$ is run only on the client side
  // useVisibleTask$(async ({track}) => {
  //   track(() => pokemonState.currentPage)
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);

  //   pokemonState.pokemons = pokemons;

  // });

  //useTask$ is run on the server side ont he first render and then on the client side
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    pokemonState.isLoading = true;
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    pokemonState.isLoading = false;
  });

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }
  }));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current Page: {pokemonState.currentPage}</span>
        <span>Loading Page: {pokemonState.isLoading ? 'Yes' : 'No'}</span>
      </div>
      {/* <div class="mt-10 flex gap-2">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="font-bold py-2 px-4 rounded bg-white text-black disabled:bg-gray-800 hover:bg-gray-400 hover:cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="font-bold py-2 px-4 rounded bg-red-600 text-white disabled:bg-gray-800 hover:bg-red-700 hover:cursor-pointer "
        >
          Next
        </button>
      </div> */}

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="text-2xl capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title,
  meta: [
    {
      name: 'description',
      content: 'Client Pokemon Page is a client page',
    },
  ],
};
