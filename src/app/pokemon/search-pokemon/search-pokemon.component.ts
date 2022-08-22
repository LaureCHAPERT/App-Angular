import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {

  //Subject : stock les recherches successives : flux {..."a"...."ab".."az"}
  searchTerms = new Subject<string>();
  // recherches => {...pokemonList(a)...pokemonList(ab)....}
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router:Router,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      /*on attend un certain temps pour éviter les appels successifs
      /alors que l'utilisateur n'a pas fini de taper*/
      debounceTime(300),
      /*on attend qu'il y ait un changement dans les recherches
      on ne lance pas deux fois une recherche pour "ab" */
      distinctUntilChanged(),
      switchMap((term)=> this.pokemonService.searchPokemonList(term))
      /*concatMap / mergeMap /switchMap 
        switchMap => annuler la dernière recherche si elle est en cours
        et la rempplacer par la dernière
        on ne va pas obtenir {.....Observable<"abc>"....mais pokemonList(ab)}*/
    )
  }
  //à chaque fois que l'utilisateur va taper un caractère on appelle cette méthode
  //et on pousse son terme dans le flux de données Subject
  search(term:string) {
    this.searchTerms.next(term); 
  }
  goToDetail(pokemon:Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link)
;  }
}
