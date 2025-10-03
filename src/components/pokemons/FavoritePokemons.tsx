import type { FavoritePokemon } from "@interfaces/Pokemon"
import { createSignal, For } from "solid-js";
import { FavoritePokemonCard } from "./FavoritePokemonCard";

const getLocalStorageFavoritePokemons = (): FavoritePokemon[] => {
    return JSON.parse(localStorage.getItem("favorites-pokemons") ?? '[]');
}

export const FavoritePokemons = () => {
    const [ pokemons, setPokemons ] = createSignal(getLocalStorageFavoritePokemons());
    return (
        <div class="grid grids-col-2 sm:grid-cols-4 gap-4 mt-5">
            <For each={ pokemons() } >
                { (pokemon) =>  <FavoritePokemonCard pokemon={pokemon} /> }
            </For>
        </div>
    )
}