import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'albums',
    pathMatch: 'full'
  }, 
  {
    path: 'albums',
    loadChildren: () => import('./pages/albums/albums.module').then(m => m.AlbumsModule)
  },
   { 
    path: 'pokemon',
    loadChildren: () => import('./pages/pokem/pokem.module').then(m => m.PokemModule)
   

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
