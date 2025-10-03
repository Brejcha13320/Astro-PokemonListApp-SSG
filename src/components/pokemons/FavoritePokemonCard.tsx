import type { FavoritePokemon } from '@interfaces/Pokemon';
import { Show, createSignal, type Component } from 'solid-js';

interface Props {
  pokemon: FavoritePokemon;
}

export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {
  const [isVisible, setIsVisible] = createSignal(true);

  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const deleteFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites-pokemons') ?? '[]'
    ) as FavoritePokemon[];

    const newFavorites = favorites.filter((p) => p.id !== pokemon.id);

    localStorage.setItem('favorites-pokemons', JSON.stringify(newFavorites));
    setIsVisible(false);
  };

  return (
    <Show when={isVisible()}>
      <div class="flex flex-col justify-center items-center p-2 border">

        <img
            src={imageSrc}
            alt={pokemon.name}
            width="96"
            height="96"
            style={`view-transition-name: ${pokemon.name}-pokemon`}
          />

          <span class="text-4xl text-blue-300 capitalize" >#{pokemon.id} {pokemon.name}</span>

        <div class="inline-flex p-2 gap-2">
          <a href={`/pokemons/${pokemon.name}`} class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">Nombre</a>
          <a href={`/pokemon/${pokemon.id}`} class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">Id</a>
          <button onClick={deleteFavorite} class="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20 cursor-pointer">
            Borrar
          </button>
        </div>
        
      </div>
    </Show>
  );
};