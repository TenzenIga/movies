import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

const POPULAR_MOVIES = [
  "The Godfather",
  "The Shawshank Redemption",
  "The Dark Knight",
  "Pulp Fiction",
  "Forrest Gump",
  "Inception",
  "The Matrix",
  "Goodfellas"
]

@Component({
  selector: 'app-movie-list',
  standalone:true,
  imports:[AsyncPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MovieList {
  private apiService = inject(ApiService);
  private router = inject(Router);
  public readonly movies$ = this.apiService.getMovies(POPULAR_MOVIES);

  onMovieClick(id:string){
    this.router.navigate(['/movie', id]);
  }
}
