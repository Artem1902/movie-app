/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { ClearObservableDirective } from '../../directives/clear-observable.directive';
import { MovieComponent } from '../../components/movie/movie.component';
import { Store } from '@ngrx/store';
import { selectTopRatedMovies } from '../../store/selectors';
import { loadTopRatedMovies } from '../../store/actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-rated-movie-page',
  standalone: true,
  templateUrl: './top-rated-movie-page.component.html',
  styleUrl: './top-rated-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent, AsyncPipe],
})
export class TopRatedMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  selectedMovies$ = this.store.select(selectTopRatedMovies);

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadTopRatedMovies());
  }
}
