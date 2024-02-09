<script setup>

import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const pokemons = computed(() => store.getters.pokemons);
const showDetailPopup = computed(() => store.getters.showDetailPopup);
const showEditPopup = computed(() => store.getters.showEditPopup);
const selectedPokemon = computed(() => store.getters.selectedPokemon);
const pokemonsDetails = computed(() => store.getters.pokemonsDetails);

const openDetailPopup = (pokemon) => {
  store.commit('openDetailPopup', pokemon);
};

const closeDetailPopup = () => {
  store.commit('closeDetailPopup');
};

const openEditPopup = (pokemon) => {
  store.commit('openEditPopup', pokemon);
};

const closeEditPopup = () => {
  store.commit('closeEditPopup');
};

onMounted(() => {
  store.dispatch('fetchPokemons');
})

</script>

<template>
  <div id="PokemonList">
    <div v-for="(pokemon, index) in pokemons" :key="index" class="pokemon-item">
      <span v-if="pokemonsDetails[pokemon.name]">{{ pokemonsDetails[pokemon.name].name }}</span>
      <button @click="openDetailPopup(pokemon)">Detail</button>
      <button @click="openEditPopup(pokemon)">Edit</button>
    </div>
  </div>
  <div id="PopupContainer">
  <div v-if="showDetailPopup" id="PokemonDetailPopup">
    <div class="popup-content">
      <h2>{{ selectedPokemon.name }}</h2>
      <p>Type: {{ selectedPokemon.type }}</p>
      <p>Habilité: {{ selectedPokemon.ability }}</p>
      <img :src="selectedPokemon.image" alt="Pokemon Image"/>
      <button @click="closeDetailPopup">Close</button>
    </div>
  </div>
  <div v-if="showEditPopup" id="PokemonEditPopup">
    <div class="popup-content">
      <p>Nom : <input v-model="selectedPokemon.name" placeholder="Tapez ici"></p>
      <p>Type : <input v-model="selectedPokemon.type" placeholder="Tapez ici"></p>
      <p>Habilité : <input v-model="selectedPokemon.ability" placeholder="Tapez ici"></p>
      <button @click="closeEditPopup">Close</button>
    </div>
  </div>
  </div>
</template>