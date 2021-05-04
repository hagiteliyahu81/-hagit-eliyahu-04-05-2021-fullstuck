import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './route/search/search.component';
import { FavoritesComponent } from './route/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrentTempComponent } from './core/current-temp/current-temp.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    CurrentTempComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
