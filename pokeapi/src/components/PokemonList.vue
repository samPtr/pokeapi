<script setup>
import { ref, onMounted } from 'vue';

const pokemons = ref([]);
const pokemonsDetails = ref({});
const showPopup = ref(false);
const selectedPokemon = ref(null);

async function fetchPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    for (const pokemon of data.results) {
      const pokemonDetailResponse = await fetch(pokemon.url);
      const pokemonDetailData = await pokemonDetailResponse.json();
      pokemonsDetails.value[pokemon.name] = {
        name: pokemonDetailData.name,
        type: pokemonDetailData.types[0].type.name,
        ability: pokemonDetailData.abilities[0].ability.name,
        image: pokemonDetailData.sprites.front_default
      }
    }
    pokemons.value = data.results;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
}

function openDetailPopup(pokemon) {
  selectedPokemon.value = pokemonsDetails.value[pokemon];
  showPopup.value = true;
}

function closeDetailPopup() {
    showPopup.value = false;
}

onMounted(() => {
  fetchPokemons();
});
</script>

<template>
  <div id="PokemonList">
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
      <span>{{ pokemon.name }}</span>
      <button @click="openDetailPopup(pokemon.name)">Detail</button>
      <button @click="showEdit(pokemon.url)">Edit</button>
    </div>
    <div v-if="showPopup" id="PokemonDetailPopup">
    <div class="popup-content">
      <h2>{{ selectedPokemon.name }}</h2>
      <p>Type: {{ selectedPokemon.type }}</p>
      <p>Ability: {{ selectedPokemon.ability }}</p>
      <img :src="selectedPokemon.image" alt="Pokemon Image" />
      <button @click="closeDetailPopup">Close</button>
    </div>
  </div>
  </div>
</template>  