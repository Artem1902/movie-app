/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-favorites-movie-page',
  standalone: true,
  templateUrl: './favorites-movie-page.component.html',
  styleUrl: './favorites-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class FavoritesMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  favoritesMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.movieService.getFavoriteMoviesList().subscribe();

    this.movieService.favoriteMoviesList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.favoritesMovies = data));
  }
}
