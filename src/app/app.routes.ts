import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { NotFoundPage } from './components/not-found-page/not-found-page';

export const routes: Routes = [  {path:'', component: Main},
  {path: 'movie/:id', 
    loadComponent: ()=> import('./components/movie-page/movie-page').then(m => m.MoviePage)
  },
  {path:'**', component: NotFoundPage}];
