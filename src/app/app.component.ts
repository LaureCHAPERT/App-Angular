import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html',
  
})
export class AppComponent implements OnInit{
  pokemonList = POKEMONS;

  ngOnInit(): void {
      console.table(this.pokemonList);
      this.selectPokemon(this.pokemonList[0]);
  }
  selectPokemon(pokemon: Pokemon){
    console.log(`Vous avez clique sur le pokémon ${pokemon.name}`);
  }
}
