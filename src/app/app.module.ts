import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PokemonModule } from './pokemon/pokemon.module';

import { AppComponent } from './app.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  //*********************************WARNING******************************/
  //on fait attention aux modules qui contiennent des routes 
  //l'ordre est très important => on met les home, redirect ou 404 A LA FIN
  imports: [
    BrowserModule,
    FormsModule,
    PokemonModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
