/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectWatchLater } from '../../store/selectors';
import { loadWatchLaterMovies } from '../../store/actions';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-watch-later-movie-page',
  standalone: true,
  templateUrl: './watch-later-movie-page.component.html',
  styleUrl: './watch-later-movie-page.component.scss',
  imports: [MovieListComponent, AsyncPipe],
})
export class WatchLaterMoviePageComponent {
  selectedMovies$: Observable<Movie[]>;
  constructor(private store: Store) {
    this.selectedMovies$ = this.store.select(selectWatchLater);
    this.store.dispatch(loadWatchLaterMovies());
  }
}
