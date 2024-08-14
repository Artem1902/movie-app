/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieComponent } from '../../components/movie/movie.component';
import { Store } from '@ngrx/store';
import { loadNowPlayingMovies } from '../../store/movieStore/actions';
import { selectNowPlayingMovies } from '../../store/movieStore/selectors';
import { AsyncPipe } from '@angular/common';

import { ClearObservableDirective } from '../../directives/clear-observable.directive';

@Component({
  selector: 'app-now-playing-movie-page',
  standalone: true,
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent, AsyncPipe],
})
export class NowPlayingMoviePageComponent
  extends ClearObservableDirective
  implements OnInit
{
  selectedMovies$ = this.store.select(selectNowPlayingMovies);

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(loadNowPlayingMovies());
  }
}
