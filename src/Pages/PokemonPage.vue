<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else="pokemon">
    <h1>¿Quien es este pokemon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <PokemonOptions :pokemons="pokemonsArr" @selection="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <div class="btn-container">
        <button class="game-button-ng" @click="newGame">Seguir jugando</button>
        <button class="game-button-eg" @click="endGame">Terminar partida</button>
      </div>
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
      aciertos: 0,
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
        this.aciertos++
        this.message = `Correcto, es ${this.pokemon.name}, ¡llevas ${this.aciertos} aciertos!.`
      } else {
        this.message = `Error, era ${this.pokemon.name}`
      }
    },
    endGame(){
      this.message = `Se ha terminado la partida, ha tenido ${this.aciertos} aciertos en esta sesión de juego.`
      this.aciertos = 0
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

<style>
.btn-container{
  display: flex;
}
.game-button-ng{
  display: flex;
  color: blue;
  margin:auto;
  cursor:pointer;
}
.game-button-eg{
  display: flex;
  color: red;
  margin:auto;  
  cursor:pointer;
}


</style>