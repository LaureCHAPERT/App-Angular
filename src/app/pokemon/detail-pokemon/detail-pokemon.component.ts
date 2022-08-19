import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  /*propriété qui contient un pokémon pour l'utilisateur ou undefined (message à afficher =>ngif à gérer)*/
  pokemon:Pokemon|undefined;

  //Service activatedRoute injecté dans le composant via le constructeur
  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.pokemonList = POKEMONS;
    //on récupère l'id contenu dans l'url (soit une string soit null)
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    /*si mon id a bien été trouvé dans l'url, j'attribue a la propriété pokémon, le pokemon qui correspond à cet identifiant*/
    if(pokemonId) {
      this.pokemon = this.pokemonList.find(pokemon=> pokemon.id == +pokemonId)
    }
    console.log(this.pokemon);
  }

  goToPokemonList() {
    this.router.navigate(['/']);
  }
}
