/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../directives/clear-observable.directive';
import { MovieComponent } from '../../components/movie/movie.component';

@Component({
  selector: 'app-upcoming-movie-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class UpcomingMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  upComingMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.movieService
      .getMoviesByCategory('upcoming')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.upComingMovies = data.results;
      });
  }
}
