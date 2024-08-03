/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsMovie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../directives/clear-observable.directive';
import { MovieComponent } from '../../components/movie/movie.component';

@Component({
  selector: 'app-movie-detail-page',
  standalone: true,
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
  imports: [MovieComponent],
})
export class MovieDetailPageComponent
  extends ClearObservableDirective
  implements OnInit
{
  findedMovieDetails: DetailsMovie | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = Number(params['id']);
      this.movieService
        .getDetailsMovie(movieId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((movie) => {
          this.findedMovieDetails = movie;
        });
    });
  }
}
