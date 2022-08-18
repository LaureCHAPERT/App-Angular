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
  }
  selectPokemon(event: MouseEvent){
    //on récupère le chiffre saisi par l'utilisateur
    //+ transforme une string en number
    const index: number = +(event.target as HTMLInputElement).value;
    console.log(`Vous avez clique sur le pokémon ${this.pokemonList[index].name}`);
  }
}
