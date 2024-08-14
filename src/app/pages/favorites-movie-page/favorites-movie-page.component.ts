/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { selectFavorites } from '../../store/movieStore/selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { loadFavoritesMovies } from '../../store/movieStore/actions';

@Component({
  selector: 'app-favorites-movie-page',
  standalone: true,
  templateUrl: './favorites-movie-page.component.html',
  styleUrl: './favorites-movie-page.component.scss',
  imports: [MovieListComponent, AsyncPipe],
})
export class FavoritesMoviePageComponent {
  selectedMovies$: Observable<Movie[]>;
  constructor(private store: Store) {
    this.selectedMovies$ = this.store.select(selectFavorites);
    this.store.dispatch(loadFavoritesMovies());
  }
}
