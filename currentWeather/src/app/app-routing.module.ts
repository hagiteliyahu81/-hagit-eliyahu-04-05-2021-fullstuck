import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './route/favorites/favorites.component';
import { SearchComponent } from './route/search/search.component';



const routes: Routes = [
  { path : '' , redirectTo : '/search' , pathMatch : 'full' } ,

  { path : 'search' , component : SearchComponent} ,

  { path : 'favorites' , component : FavoritesComponent } ,
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
