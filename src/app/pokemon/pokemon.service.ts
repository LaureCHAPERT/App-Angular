import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';
import { catchError, Observable,of, tap } from 'rxjs';

//on injecte le httpCLient dans le service
@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){}

  //on va retourner un flux qui contiendra les pokémons qui arrive + tard dans le temps
  getPokemonList(): Observable<Pokemon[]>{
    /* return POKEMONS;
    la réponse contiendra un tableau 
    en param on passe une URL 
    avec pipe on passe les traitements que l'on veut faire
      on log le pokémon
      si y'a une erreur on log l'erreur et on retourne un [] vide
      pour éviter le crash de l'appli*/
      //tap = console.log pour un Observable
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList)=>console.table(pokemonList)),
      catchError((error)=>{
        console.log(error);
        return of ([]); 
      })
      )
  }

  //quand on n'a pas de pokemon on renvoie undefined
  getPokemonById(pokemonId:number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon)=>console.log(pokemon)),
      catchError((error)=>{
        console.log(error);
        return of (undefined); 
      })
    )
  }
  getPokemonTypeList():string[]{
    return [
        'Plante',
       'Feu',
       'Eau',
       'Insecte',
       'Normal',
       'Electrik',
       'Poison',
       'Fée',
       'Vol',
       'Combat',
       'Psy'
    ];
  }
  
}
