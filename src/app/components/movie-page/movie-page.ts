import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-page',
  imports: [AsyncPipe],
  standalone:true,
  templateUrl: './movie-page.html',
  styleUrl: './movie-page.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MoviePage {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router:Router = inject(Router);
  private apiService = inject(ApiService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  public safeVideoUrl!: SafeResourceUrl;
  public movie$!: Observable<any>;
  public movieId:string = '';
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      const movieId = routeParams['id'];
      this.movie$ = this.apiService.getMovieById(movieId)
    });
    this.generateSafeUrl();

  }  
  private generateSafeUrl(): void {
    const videoUrl = 'https://www.youtube.com/embed/KAOdjqyG37A';
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  public goHome(){
    this.router.navigate(['/'])
  }
}
