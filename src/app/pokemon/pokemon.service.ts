import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      tap((response)=> this.log(response)),
      catchError((error)=>this.handleError(error,[]))
      )
  }

  //quand on n'a pas de pokemon on renvoie undefined
  getPokemonById(pokemonId:number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=>this.handleError(error,undefined))
      );
 }

 updatePokemon(pokemon:Pokemon) : Observable<null>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=>this.handleError(error, null))
    )
 }

 addPokemon(pokemon:Pokemon):Observable<Pokemon>{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
    tap((response)=> this.log(response)),
    catchError((error)=>this.handleError(error, null))
  )
 }
 deletePokemonById(pokemonId:number) : Observable<null> {
   return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
    tap((response)=> this.log(response)),
    catchError((error)=>this.handleError(error, null))
   );
 }
  private log(response: any) {
    console.table(response);
  }
  private handleError(error: Error, errorValue: any) {
    console.error(error);

    return of (errorValue);
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
  searchPokemonList(term:string):Observable<Pokemon[]>{

    if(term.length <= 1) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response)=> this.log(response)),
      catchError((error)=>this.handleError(error, []))
    )
  };
}
