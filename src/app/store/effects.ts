import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import {
  loadFavoritesMovies,
  loadFavoritesMoviesSuccess,
  loadNowPlayingMovies,
  loadNowPlayingMoviesFailure,
  loadNowPlayingMoviesSuccess,
  loadPopularMovies,
  loadPopularMoviesFailure,
  loadPopularMoviesSuccess,
  loadTopRatedMovies,
  loadTopRatedMoviesFailure,
  loadTopRatedMoviesSuccess,
  loadUpComingMovies,
  loadUpComingMoviesFailure,
  loadUpComingMoviesSuccess,
  loadWatchLaterMovies,
  loadWatchLaterMoviesFailure,
  loadWatchLaterMoviesSuccess,
  setFavoriteMoviesIds,
  setWatchLaterMoviesIds,
  updateFavoritesMovies,
  updateFavoritesMoviesFailure,
  updateFavoritesMoviesSuccess,
  updateWatchLaterMovies,
  updateWatchLaterMoviesFailure,
  updateWatchLaterMoviesSuccess,
} from './actions';

@Injectable()
export class MovieEffects {
  loadNowPlayingMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNowPlayingMovies),
      mergeMap(() => {
        return this.movieService.getNowPlayingMovies().pipe(
          map((movies) =>
            loadNowPlayingMoviesSuccess({
              movies: movies.results,
            }),
          ),
          catchError((error) => of(loadNowPlayingMoviesFailure({ error }))),
        );
      }),
    );
  });

  loadPopularMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPopularMovies),
      mergeMap(() => {
        return this.movieService.getPopularMovies().pipe(
          map((movies) =>
            loadPopularMoviesSuccess({
              movies: movies.results,
            }),
          ),
          catchError((error) => of(loadPopularMoviesFailure({ error }))),
        );
      }),
    );
  });

  loadTopRatedMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTopRatedMovies),
      mergeMap(() => {
        return this.movieService.getTopRatedMovies().pipe(
          map((movies) =>
            loadTopRatedMoviesSuccess({
              movies: movies.results,
            }),
          ),
          catchError((error) => of(loadTopRatedMoviesFailure({ error }))),
        );
      }),
    );
  });

  loadUpComingMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUpComingMovies),
      mergeMap(() => {
        return this.movieService.getUpComingMovies().pipe(
          map((movies) =>
            loadUpComingMoviesSuccess({
              movies: movies.results,
            }),
          ),
          catchError((error) => of(loadUpComingMoviesFailure({ error }))),
        );
      }),
    );
  });
  loadFavoritesMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFavoritesMovies),
      mergeMap(() => {
        return this.movieService.getFavoriteMoviesList().pipe(
          map((movies) => {
            const moviesIds = movies.map((movie) => movie.id);
            return [
              loadFavoritesMoviesSuccess({ movies: movies }),
              setFavoriteMoviesIds({ ids: moviesIds }),
            ];
          }),
          switchMap((actions) => actions),
          catchError((error) => of(loadNowPlayingMoviesFailure({ error }))),
        );
      }),
    );
  });
  updateFavoritesMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFavoritesMovies),
      mergeMap((props) => {
        return this.movieService
          .updateFavorites(props.movie_id, props.isFavorite)
          .pipe(
            map(() =>
              updateFavoritesMoviesSuccess({ movie_id: props.movie_id }),
            ),
            catchError((error) => of(updateFavoritesMoviesFailure({ error }))),
          );
      }),
      switchMap((action) => {
        if (this.router.url === '/favorite') {
          return [action, loadFavoritesMovies()];
        }
        return [action];
      }),
    );
  });
  loadWatchLaterMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWatchLaterMovies),
      mergeMap(() => {
        return this.movieService.getWatchLaterMoviesList().pipe(
          map((movies) => {
            const moviesIds = movies.map((movie) => movie.id);
            return [
              loadWatchLaterMoviesSuccess({ movies: movies }),
              setWatchLaterMoviesIds({ ids: moviesIds }),
            ];
          }),
          switchMap((actions) => actions),
          catchError((error) => of(loadWatchLaterMoviesFailure({ error }))),
        );
      }),
    );
  });
  updateWatchLaterMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateWatchLaterMovies),
      mergeMap((props) => {
        return this.movieService
          .updateWatchList(props.movie_id, props.isInWatchList)
          .pipe(
            map(() =>
              updateWatchLaterMoviesSuccess({ movie_id: props.movie_id }),
            ),
            catchError((error) => of(updateWatchLaterMoviesFailure({ error }))),
          );
      }),
      switchMap((action) => {
        if (this.router.url === '/watch-later') {
          return [action, loadWatchLaterMovies()];
        }
        return [action];
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private router: Router,
  ) {}
}
