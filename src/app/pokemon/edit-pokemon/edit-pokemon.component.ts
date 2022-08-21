import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="center">Editer {{pokemon?.name}}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture" alt="image pokemon"> 
    </p>
    <!-- on passe le sélecteur du composant pour l'afficher si j'ai un pokémon-->
    <!-- ce composant possède un @Input => il attend une donnée d'entrée-->
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
})
export class EditPokemonComponent implements OnInit {

  pokemon:Pokemon|undefined;
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    //je récupère l'id depuis mon url
    const pokemonId:string|null = this.route.snapshot.paramMap.get('id');
    //je vais chercher le pokémon associé 
    if(pokemonId) {
      this.pokemon = this.pokemonService.getPokemonById(+pokemonId)
    }
    //s'il n'existe pas je mets undefined
    else {
      this.pokemon = undefined;
    }
  }

}
