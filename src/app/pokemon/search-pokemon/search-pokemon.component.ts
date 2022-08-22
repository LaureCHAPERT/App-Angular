import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {

  //Subject : stock les recherches successives : flux {..."a"...."ab".."az"}
  searchTerms = new Subject<string>();
  // recherches => {...pokemonList(a)...pokemonList(ab)....}
  pokemons$: Observable<Pokemon[]>;

  constructor(private router:Router) { }

  ngOnInit(): void {
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
