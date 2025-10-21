import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from 'rxjs';
import { ApiService, Movie } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  private router = inject(Router);
  private apiService = inject(ApiService);
  searchVal = new Subject<string>();
  data$:Observable<any> = of();
  public searchInput: any;

  ngOnInit(){
     this.data$ = this.searchVal.pipe(
      debounceTime(300),
      distinctUntilChanged(), 
      switchMap(val =>{
         if (!val?.trim()) {
          return of([]);
        }
        return this.apiService.searchMoviesByTitle(val);
      }),
    )
  }

  public onSelect(movie:any){
    this.router.navigate(['/movie', movie.imdbID]);
  } 

  public onSearchChange(val: string): void {
    this.searchVal.next(val);
  }
}
