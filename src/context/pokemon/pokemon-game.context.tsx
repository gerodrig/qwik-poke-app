import { createContextId } from "@builder.io/qwik";

export interface PokemonAppState {
    pokemonId: number;
    showBackImage: boolean;
    isPokemonVisible: boolean;
}

export const PokemonAppContext = createContextId<PokemonAppState>('pokemon.app-context');