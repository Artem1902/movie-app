/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { Movie } from '../models/movie.model';

// ============NOW-PLAYING=================================
export const loadNowPlayingMovies = createAction(
  '[Movie] Load NowPlaying Movies',
);
export const loadNowPlayingMoviesSuccess = createAction(
  '[Movie] Load NowPlaying Movies Success',
  props<{ movies: Movie[] | null }>(),
);
export const loadNowPlayingMoviesFailure = createAction(
  '[Movie] Load NowPlaying Movies Failure',
  props<{ error: any }>(),
);

// ============POPULAR=================================
export const loadPopularMovies = createAction('[Movie] Load Popular Movies');
export const loadPopularMoviesSuccess = createAction(
  '[Movie] Load Popular Movies Success',
  props<{ movies: Movie[] | null }>(),
);
export const loadPopularMoviesFailure = createAction(
  '[Movie] Load Popular Movies Failure',
  props<{ error: any }>(),
);

// ============TOP-RATED=================================
export const loadTopRatedMovies = createAction('[Movie] Load TopRated Movies');
export const loadTopRatedMoviesSuccess = createAction(
  '[Movie] Load TopRated Movies Success',
  props<{ movies: Movie[] | null }>(),
);
export const loadTopRatedMoviesFailure = createAction(
  '[Movie] Load TopRated Movies Failure',
  props<{ error: any }>(),
);

// ============UPCOMING=================================
export const loadUpComingMovies = createAction('[Movie] Load UpComing Movies');
export const loadUpComingMoviesSuccess = createAction(
  '[Movie] Load UpComing Movies Success',
  props<{ movies: Movie[] | null }>(),
);
export const loadUpComingMoviesFailure = createAction(
  '[Movie] Load UpComing Movies Failure',
  props<{ error: any }>(),
);

// ============FAVORITES=================================
export const loadFavoritesMovies = createAction(
  '[Movie] Load Favorites Movies',
);
export const loadFavoritesMoviesSuccess = createAction(
  '[Movie] Load Favorites Movies Success',
  props<{ movies: Movie[] | null }>(),
);
export const loadFavoritesMoviesFailure = createAction(
  '[Movie] Load Favorites Movies Failure',
  props<{ error: any }>(),
);

// ============UPDATE-FAVORITES=================================
export const updateFavoritesMovies = createAction(
  '[Movie] Update Favorites Movies',
  props<{ movie_id: number; isFavorite: boolean }>(),
);
export const updateFavoritesMoviesSuccess = createAction(
  '[Movie] Update Favorites Movies Success',
  props<{ movie_id: number }>(),
);
export const updateFavoritesMoviesFailure = createAction(
  '[Movie] Update Favorites Movies Failure',
  props<{ error: any }>(),
);

export const setFavoriteMoviesIds = createAction(
  '[Movie] Set Favorite Movies Ids',
  props<{ ids: number[] }>(),
);

// ============WATCH-LATER=================================
export const loadWatchLaterMovies = createAction(
  '[Movie] Load WatchLater Movies',
);
export const loadWatchLaterMoviesSuccess = createAction(
  '[Movie] Load WatchLater Movies Success',
  props<{ movies: Movie[] | null }>(),
);
export const loadWatchLaterMoviesFailure = createAction(
  '[Movie] Load WatchLater Movies Failure',
  props<{ error: any }>(),
);

// ============UPDATE-WATCH-LATER=================================
export const updateWatchLaterMovies = createAction(
  '[Movie] Update WatchLater Movies',
  props<{ movie_id: number; isInWatchList: boolean }>(),
);
export const updateWatchLaterMoviesSuccess = createAction(
  '[Movie] Update WatchLater Movies Success',
  props<{ movie_id: number }>(),
);
export const updateWatchLaterMoviesFailure = createAction(
  '[Movie] Update WatchLater Movies Failure',
  props<{ error: any }>(),
);

export const setWatchLaterMoviesIds = createAction(
  '[Movie] Set WatchLater Movies Ids',
  props<{ ids: number[] }>(),
);
