import { Component, OnInit} from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

 @Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',

})
export class ListPokemonComponent implements OnInit {

  pokemonList: Pokemon[];

  constructor(
    private router:Router,
    private pokemonService: PokemonService
  ){}

  /*ici c'est mon service qui va chercher la liste des pokémons
  si demain je veux modifier l'accès à mes données je le ferais 
  à un seul endroit : pokemon.service.ts et plus dans chacun de mes
  composants */
    
  ngOnInit(){
    //on s'abonne à l'observable pour retourner notre liste
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  
  goToPokemon(pokemon:Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }


}
