import { component$, Slot } from '@builder.io/qwik';

import { PokemonProvider } from '~/context';
import Navbar from '~/components/shared/navbar/navbar';
import Footer from '~/components/shared/footer/footer';



export default component$(() => {

  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
  );
});
