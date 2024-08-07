/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-watch-later-movie-page',
  standalone: true,
  templateUrl: './watch-later-movie-page.component.html',
  styleUrl: './watch-later-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class WatchLaterMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  watchLaterMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.movieService.getWatchLaterMoviesList().subscribe();

    this.movieService.watchLaterMoviesList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.watchLaterMovies = data));
  }
}
