import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface PokemonImageProps {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

const sprite_url = import.meta.env.PUBLIC_POKEMON_SPRITES_URL;

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: PokemonImageProps) => {
    const imageLoaded = useSignal(false);

    //useTask$ is used for side effects and to watch for changes on provided objects
    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => `${sprite_url}${backImage ? '/back/' : ''}${id}.png`);

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span class="animate-fadeOut">Loading...</span>}
        <img
          class={[{ hidden: !imageLoaded.value, 'animate-fadeIn': true, 'brightness-0': !isVisible }, 'transition-all']}
          src={imageUrl.value}
          alt={`pokemon ${id}${backImage && ' back'} sprite`}
          width={size}
          height={200}
          onLoad$={() => {
            imageLoaded.value = true;
            // setTimeout(() => {
            //   imageLoaded.value = true;
            // }, 2000);
          }}
        />
      </div>
    );
  }
);
