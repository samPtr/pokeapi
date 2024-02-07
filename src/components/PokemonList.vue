<script setup>
import { ref, onMounted } from 'vue';

const pokemons = ref([]);

const fetchPokemons = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    pokemons.value = data.results;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};

onMounted(() => {
  fetchPokemons();
});
</script>
<template>
  <div>
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
      <span>{{ pokemon.name }}</span>
      <button @click="showDetail(pokemon.url)">Detail</button>
      <button @click="showEdit(pokemon.url)">Edit</button>
    </div>
  </div>
</template>  