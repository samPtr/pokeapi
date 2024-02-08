<script setup>

import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchPokemons');
})

</script>

<template>
  <div id="PokemonList">
    <div v-for="pokemon in store.state.pokemons" :key="pokemon.name" class="pokemon-item">
      <span>{{ store.state.pokemonsDetails[pokemon.name].name }}</span>
      <button @click="store.mutations.openDetailPopup(pokemon.name)">Detail</button>
      <button @click="openEditPopup(pokemon.name)">Edit</button>
    </div>
  </div>
  <div id="PopupContainer">
  <div v-if="store.state.showDetailPopup" id="PokemonDetailPopup">
    <div class="popup-content">
      <h2>{{ store.state.selectedPokemon.name }}</h2>
      <p>Type: {{ store.state.selectedPokemon.type }}</p>
      <p>Habilité: {{ store.state.selectedPokemon.ability }}</p>
      <img :src="store.state.selectedPokemon.image" alt="Pokemon Image" />
      <button @click="closeDetailPopup">Close</button>
    </div>
  </div>
  <div v-if="store.state.showEditPopup" id="PokemonEditPopup">
    <div class="popup-content">
      <p>Nom : <input v-model="store.state.selectedPokemon.name" placeholder="Tapez ici"></p>
      <p>Type : <input v-model="store.state.selectedPokemon.type" placeholder="Tapez ici"></p>
      <p>Habilité : <input v-model="store.state.selectedPokemon.ability" placeholder="Tapez ici"></p>
      <button @click="closeEditPopup">Close</button>
    </div>
  </div>
  </div>
</template>  