import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { MovieList } from '../movie-list/movie-list';
import { TopMovies } from '../top-movies/top-movies';

@Component({
  selector: 'app-main',
  imports: [SearchBar, MovieList, TopMovies],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Main {

}
