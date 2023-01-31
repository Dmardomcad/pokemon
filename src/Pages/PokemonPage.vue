<template>
    <div>
    <h1>¿Quién es este pokemon?</h1>
      <PokemonPictures v-bind:pokemonId="pokemon.id" :showPokemon="false"/>
      <PokemonOptions/>
    </div>
  </template>
  
  <script>
  import PokemonOptions from '@/components/PokemonOptions.vue';
  import PokemonPictures from '@/components/PokemonPictures.vue';
  import getPokemonOptions from '@/helpers/getPokemonOptions.js';

  
    export default {
      components: { PokemonPictures, PokemonOptions,getPokemonOptions },
      data(){
        return  {
        pokemon: null,
        pokemonsArray: [] // aqui guardamos la respuesta de mixedpokemons
        }
      },
      methods:{
        async mixedPokemons(){
          this.pokemonsArray =await getPokemonOptions()
          const randomPokemon = Math.floor(Math.random()* 4)
          this.pokemon = this.pokemonsArray[randomPokemon]

          console.log(getPokemonOptions())
        }
      },
      mounted(){
        this.mixedPokemons()
      }
  }
  </script>
  
  <style scoped></style>