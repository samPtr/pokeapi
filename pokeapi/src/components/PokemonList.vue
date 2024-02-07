<script setup>
import { ref, onMounted } from 'vue';

const pokemons = ref([]);
const pokemonsDetails = ref({});
const showDetailPopup = ref(false);
const showEditPopup = ref(false);
const selectedPokemon = ref({});

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
  showDetailPopup.value = true;
}

function closeDetailPopup() {
  showDetailPopup.value = false;
}

function openEditPopup(pokemon) {
  selectedPokemon.value = pokemonsDetails.value[pokemon];
  showEditPopup.value = true;
}

function closeEditPopup() {
  showEditPopup.value = false;
}

onMounted(() => {
  fetchPokemons();
});
</script>

<template>
  <div id="PokemonList">
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
      <span>{{ pokemonsDetails[pokemon.name].name }}</span>
      <button @click="openDetailPopup(pokemon.name)">Detail</button>
      <button @click="openEditPopup(pokemon.name)">Edit</button>
    </div>
  </div>
  <div v-if="showDetailPopup" id="PokemonDetailPopup">
    <div class="popup-content">
      <h2>{{ selectedPokemon.name }}</h2>
      <p>Type: {{ selectedPokemon.type }}</p>
      <p>Habilité: {{ selectedPokemon.ability }}</p>
      <img :src="selectedPokemon.image" alt="Pokemon Image" />
      <button @click="closeDetailPopup">Close</button>
    </div>
  </div>
  <div v-if="showEditPopup" id="PokemonEditPopup">
    <div class="popup-content">
      <span>Nom :</span>
      <input v-model="selectedPokemon.name" placeholder="Tapez ici">
      <span>Type :</span>
      <input v-model="selectedPokemon.type" placeholder="Tapez ici">
      <span>Habilité :</span>
      <input v-model="selectedPokemon.ability" placeholder="Tapez ici">
      <button @click="closeEditPopup">Close</button>
    </div>
  </div>
</template>  