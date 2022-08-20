import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
})
export class PokemonFormComponent implements OnInit {
  //avec cette ligne on demande une instanciation de Pokemon
  @Input() pokemon:Pokemon;
  types: string[];

  constructor(
    private router:Router,
    private pokemonService: PokemonService
  ) { }

  //on initialise tous les types présents dans le projet
  ngOnInit()  {
    this.types= this.pokemonService.getPokemonTypeList();
  }
  //on vérifie si le pokémon en question a un type ou non 
  //afin de pré-cocher ou non un form
  hasType(type:string):boolean {
    return this.pokemon.types.includes(type);
  }
  //vérifier si le type sélectionné dans le form est déjà présent ou non
  selectType($event: Event, type:string) {
    // le user a t'il coché la case ? 
    const isChecked:boolean = ($event.target as HTMLInputElement).checked;
    //si oui j'ajoute le type
    if(isChecked) {
      this.pokemon.types.push(type);
      //sinon je l'enlève
    }else {
      //
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string):boolean {
    //si le type inférieur  à 1 => empêche le user de décocher seulement la case
    //actuellement cochée
    if(this.pokemon.types.length == 1 && this.hasType(type))  {
      return false;
    }
    //si le user a déjà sélectionné 3 coses il faut l'empêcher de sélectionner les 
    //autres cases
    //on freeze ici SEULEMENT les autres cases pas encore cochées (l'inverse de la 
    //méthode hasType) pour que l'utilisateur puissent décocher les cochées
    if(this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
    //si l'utilisateur à déjà 3 checkbox => on empêche l'utilisateur de cocher
    //sinon on laisse 
  }
  //je redirige vers la page du pokémon maintenant modifié
  onSubmit() {
    console.log('Submit Form');
    this.router.navigate(['pokemon', this.pokemon.id]);
  }
}
