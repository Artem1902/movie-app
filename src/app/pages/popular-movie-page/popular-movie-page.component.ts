/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

import { ClearObservableDirective } from '../../directives/clear-observable.directive';
import { MovieComponent } from '../../components/movie/movie.component';
import { loadPopularMovies } from '../../store/actions';
import { Store } from '@ngrx/store';
import { selectPopularMovies } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-popular-movie-page',
  standalone: true,
  templateUrl: './popular-movie-page.component.html',
  styleUrl: './popular-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent, AsyncPipe],
})
export class PopularMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  selectedMovies$ = this.store.select(selectPopularMovies);

  // popularMovies: Movie[] | null = null;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadPopularMovies());
  }
}
