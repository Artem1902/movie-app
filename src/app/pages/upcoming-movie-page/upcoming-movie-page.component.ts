/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

import { ClearObservableDirective } from '../../directives/clear-observable.directive';
import { MovieComponent } from '../../components/movie/movie.component';
import { AsyncPipe } from '@angular/common';
import { loadUpComingMovies } from '../../store/movieStore/actions';
import { Store } from '@ngrx/store';
import { selectUpComingMovies } from '../../store/movieStore/selectors';

@Component({
  selector: 'app-upcoming-movie-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent, AsyncPipe],
})
export class UpcomingMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  selectedMovies$ = this.store.select(selectUpComingMovies);

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadUpComingMovies());
  }
}
