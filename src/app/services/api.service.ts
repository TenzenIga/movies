import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";

interface Rating {
  Source: string;
  Value: string;
}
// Ответ с сервера можно было бы замапить в CamelCase или не типизировать вообще
export interface Movie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl = 'https://www.omdbapi.com/';

  // Выкладывать api ключ в гит нельзя, но это бесплатный ключ с лимитом 1000 запросов, нет смысла настраивать перемнные окружения для такого проекта
  public apikey = 'bd756304';
  public httpCalls:Observable<Movie>[] = [];
  private http = inject(HttpClient);
  
  // У API https://www.omdbapi.com/ только 2 метода, поиск фильма по названию и по id. Так как в API нету фильтров и пагинации,
  //  то загружаем 10 фильмов по названию из массива.
  //  Да это костыл, но такое API.
  //  Есть API по фильмам tmdb - намного лучше, но он заблокирован для России
  public getMovies(movies:string[]){
    this.httpCalls = movies.map(item => this.http.get<Movie>(`${this.apiUrl}?t=${item}&apikey=${this.apikey}`));
     return forkJoin(this.httpCalls);
  }

  public getMovieById(id:string){
    return this.http.get(`${this.apiUrl}?i=${id}&apikey=${this.apikey}`)
  }

  public searchMoviesByTitle(title:string){
    return this.http.get<Movie[]>(`${this.apiUrl}?s=${title}&type=movie&page=1&apikey=${this.apikey}`)
  }
}


