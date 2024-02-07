<script setup>
import { ref } from 'vue';

const showPopup = ref(false);
const selectedPokemon = ref(null);

const fetchPokemonDetails = async (url) => {
    try {
    const response = await fetch(url);
    const data = await response.json();
    selectedPokemon.value = data;
    showPopup.value = true;
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
  }
};

const showDetailPopup = (url) => {
  fetchPokemonDetails(url);
};

const closePopup = () => {
    showPopup.value = false;
}
</script>

<template>
  <div v-if="showPopup" class="pokemon-detail-popup">
    <div class="popup-content">
      <h2>{{ selectedPokemon.name }}</h2>
      <p>Type: {{ selectedPokemon.types[0].type.name }}</p>
      <p>Ability: {{ selectedPokemon.abilities[0].ability.name }}</p>
      <img :src="selectedPokemon.sprites.front_default" alt="Pokemon Image" />
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>