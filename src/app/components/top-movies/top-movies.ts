import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

const TOP_MOVIES = [
  'Spider-Man',
  'Interstellar',
  'Barbie',
  'Morbius',
  'Drive',
  'The Room',
  "Fight Club",
  "The Lord of the Rings: The Return of the King",
] 

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.html',
  standalone:true,
  imports:[AsyncPipe],
  styleUrl: './top-movies.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TopMovies {
  private apiService = inject(ApiService);
  private router = inject(Router);
  public readonly movies$ = this.apiService.getMovies(TOP_MOVIES);

  public onMovieClick(id:string){
    this.router.navigate(['/movie', id]);
  }
}

