import { createStore } from 'vuex';

const store = createStore({
  state: {
    pokemons: [],
    pokemonsDetails: {},
    showDetailPopup: false,
    showEditPopup: false,
    selectedPokemon: {}
  },
  mutations: {
    openDetailPopup(state, pokemon) {
        state.showDetailPopup = true;
        state.selectedPokemon = state.pokemonsDetails[pokemon.name];
        console.log(state.selectedPokemon);
    },
    closeDetailPopup(state){
        state.showDetailPopup = false;
    },
    openEditPopup(state, pokemon) {
        state.selectedPokemon = state.pokemonsDetails[pokemon.name];
        state.showEditPopup = true;
    },
    closeEditPopup(state) {
        state.showEditPopup = false;
    },
    addPokemons(state, pokemons) {
        state.pokemons = pokemons;
    },
    addPokemonDetails(state, [name, details]) {
        state.pokemonsDetails[name] = details;
    }
  },
  actions: {
    async fetchPokemons({ commit }) {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon');
          const data = await response.json();
          store.commit('addPokemons', data.results)
          for (const pokemon of data.results) {
            const pokemonDetailResponse = await fetch(pokemon.url);
            const pokemonDetailData = await pokemonDetailResponse.json();
            const name = pokemonDetailData.name;
            const details = {
                name: pokemonDetailData.name,
                type: pokemonDetailData.types[0].type.name,
                ability: pokemonDetailData.abilities[0].ability.name,
                image: pokemonDetailData.sprites.front_default
            }
            commit('addPokemonDetails', [name, details]);
          }
        } catch (error) {
          console.error('Error fetching pokemons:', error);
        }
      }
  },
  getters: {
    pokemons(state) {
        return state.pokemons;
    },
    pokemonsDetails(state) {
        return state.pokemonsDetails;
    },
    showDetailPopup(state) {
        return state.showDetailPopup;
    },
    showEditPopup(state) {
        return state.showEditPopup;
    },
    selectedPokemon(state){
        return state.selectedPokemon;
    }
  }
});

export default store;