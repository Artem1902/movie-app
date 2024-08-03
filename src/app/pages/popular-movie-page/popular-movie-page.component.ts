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
  selector: 'app-popular-movie-page',
  standalone: true,
  templateUrl: './popular-movie-page.component.html',
  styleUrl: './popular-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class PopularMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  popularMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.movieService
      .getMoviesByCategory('popular')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.popularMovies = data.results;
      });
  }
}
