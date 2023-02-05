<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else="pokemon">
    <h1>¿Quien es este pokemon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <PokemonOptions :pokemons="pokemonsArr" @selection="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Jugar de nuevo</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'
export default {
  components: { PokemonOptions, PokemonPicture },
  data() {
    return {
      pokemonsArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonsArr = await getPokemonOptions()
      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonsArr[rndInt]
    },
    checkAnswer(selectedId) {
      this.showPokemon = true
      this.showAnswer = true
      if (selectedId === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name}`
      } else {
        this.message = `Ups, era ${this.pokemon.name}`
      }
    },
    newGame() {
      ;(this.showPokemon = false),
        (this.showAnswer = false),
        (this.pokemonsArr = []),
        this.mixPokemonArray(),
        (this.pokemon = null)
    },
  },
  mounted() {
    this.mixPokemonArray()
  },
}
</script>

<style></style>