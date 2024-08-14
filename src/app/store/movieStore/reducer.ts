/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { initialState, MovieState } from './state';
import {
  loadFavoritesMoviesFailure,
  loadFavoritesMoviesSuccess,
  loadNowPlayingMoviesFailure,
  loadNowPlayingMoviesSuccess,
  loadPopularMoviesFailure,
  loadPopularMoviesSuccess,
  loadTopRatedMoviesFailure,
  loadTopRatedMoviesSuccess,
  loadUpComingMoviesFailure,
  loadUpComingMoviesSuccess,
  loadWatchLaterMoviesFailure,
  loadWatchLaterMoviesSuccess,
  setFavoriteMoviesIds,
  setWatchLaterMoviesIds,
  updateFavoritesMoviesFailure,
  updateFavoritesMoviesSuccess,
  updateWatchLaterMoviesFailure,
  updateWatchLaterMoviesSuccess,
} from './actions';

export const MovieReducer = createReducer(
  initialState,

  // ============NOW-PLAYING=================================
  on(loadNowPlayingMoviesSuccess, (state, { movies }) => {
    return { ...state, nowPlaying: movies || [] };
  }),
  on(loadNowPlayingMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

  // ============POPULAR=================================
  on(loadPopularMoviesSuccess, (state, { movies }) => {
    return { ...state, popular: movies || [] };
  }),
  on(loadPopularMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

  // ============TOP-RATED=================================
  on(loadTopRatedMoviesSuccess, (state, { movies }) => {
    return { ...state, topRated: movies || [] };
  }),
  on(loadTopRatedMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

  // ============UPCOMING=================================
  on(loadUpComingMoviesSuccess, (state, { movies }) => {
    return { ...state, upcoming: movies || [] };
  }),
  on(loadUpComingMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

  // ============FAVORITES=================================
  on(loadFavoritesMoviesSuccess, (state, { movies }) => {
    return { ...state, favoriteMovies: movies || [] };
  }),
  on(loadFavoritesMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),
  on(setFavoriteMoviesIds, (state, { ids }) => {
    return { ...state, favoriteMoviesIds: ids };
  }),
  // ============UPDATE-FAVORITES=================================
  on(updateFavoritesMoviesSuccess, (state, { movie_id }): MovieState => {
    const isFavorite = state.favoriteMoviesIds?.includes(movie_id);
    const updatedFavoriteMoviesIds = isFavorite
      ? state.favoriteMoviesIds?.filter((id) => id !== movie_id)
      : [...state.favoriteMoviesIds, movie_id];
    return { ...state, favoriteMoviesIds: updatedFavoriteMoviesIds };
  }),
  on(updateFavoritesMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

  // ============WATCH-LATER=================================
  on(loadWatchLaterMoviesSuccess, (state, { movies }) => {
    return { ...state, watchListMovies: movies || [] };
  }),
  on(loadWatchLaterMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),
  on(setWatchLaterMoviesIds, (state, { ids }) => {
    return { ...state, watchListMoviesIds: ids };
  }),
  // ============UPDATE-FAVORITES=================================
  on(updateWatchLaterMoviesSuccess, (state, { movie_id }): MovieState => {
    const isInWatchList = state.watchListMoviesIds?.includes(movie_id);
    const updatedWatchLaterMoviesIds = isInWatchList
      ? state.watchListMoviesIds?.filter((id) => id !== movie_id)
      : [...state.watchListMoviesIds, movie_id];
    return { ...state, watchListMoviesIds: updatedWatchLaterMoviesIds };
  }),
  on(updateWatchLaterMoviesFailure, (state, { error }) => {
    return { ...state, error: error };
  }),
);
