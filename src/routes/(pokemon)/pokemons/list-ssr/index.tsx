import { component$, useComputed$, useSignal, $, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type  DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getPokemonInformation } from '~/helpers/get-pokemon-information';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

const title = 'Pokemon Page - SSR List';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {
  
  const offset = Number(query.get('offset')) || 0;
  if(isNaN(offset)) redirect(301, pathname);
  if(offset < 0) redirect(301, pathname);

  return await getSmallPokemons(offset);
  // const { data } = await getPokemonsApi<PokemonListResponse>('/pokemon');

  // return data.results;
})

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);

  const modalPokemon = useStore({
    id: 0,
    name: '',
  })

  const pokeDexResponse = useSignal('');

  //?Modal functions
  const showModal = $((id: number, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name; 
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  //TODO: check async in useVisible Task
  useVisibleTask$(({track}) => {
    track(() => modalPokemon.name);

    pokeDexResponse.value = '';

    if(modalPokemon.name.length > 0){
      //run task and get information from openai
      getPokemonInformation(modalPokemon.name).then((response) => pokeDexResponse.value = response);
    }


  });

  const currentOffset = useComputed$<number>(() => {
    const offsetString = location.url.searchParams.get('offset');
    // const offsetString = new URLSearchParams( location.url.search );
    return Number(offsetString) || 0;
  })
  
    return (
        <>
          <div class='flex flex-col'>
            <span class="my-5 text-5xl">Status</span>
            <span>Offset: { currentOffset }</span>
            <span>Loading Page: {location.isNavigating ? 'Yes' : 'No'}</span>
          </div>
          <div class="mt-10 flex gap-2">
            <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="font-bold py-2 px-4 rounded bg-white text-black disabled:bg-gray-800 hover:bg-gray-400 hover:cursor-pointer">
              Previous
            </Link>
            <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}  class="font-bold py-2 px-4 rounded bg-red-600 text-white disabled:bg-gray-800 hover:bg-red-700 hover:cursor-pointer ">
              Next
            </Link>
          </div>

          <div class="grid grid-cols-6 mt-5">
            {
              pokemons.value.map(({name, id}) => (
                <div
                  key={name}
                  onClick$={() => showModal(id, name)}
                  class="m-5 flex flex-col justify-center items-center">
                  <PokemonImage id={id}/>
                  <span class="text-2xl capitalize">{name}</span>
                </div>
              ))

            }
          </div>

          <Modal showModal={modalVisible.value} closeFn={closeModal} persistent>
            <div q:slot='title'>{modalPokemon.name}</div>
            <div q:slot='content' class="flex flex-col justify-center items-center">
              <PokemonImage id={modalPokemon.id} />
              <span>{
                  pokeDexResponse.value === ''
                  ? 'Connecting to Pokedex Database...'
                  : pokeDexResponse
                }</span>
            </div>
          </Modal>

        </>
    );
});



export const head: DocumentHead = {
  title,
  meta: [
    {
      name: 'description',
      content: 'SSR Pokemon Page is a SSR page',
    },
  ],
};
