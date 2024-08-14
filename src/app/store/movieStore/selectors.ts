import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './state';

export const selectState = createFeatureSelector<MovieState>('movies');

export const selectNowPlayingMovies = createSelector(
  selectState,
  (state) => state.nowPlaying,
);

export const selectPopularMovies = createSelector(
  selectState,
  (state) => state.popular,
);

export const selectTopRatedMovies = createSelector(
  selectState,
  (state) => state.topRated,
);

export const selectUpComingMovies = createSelector(
  selectState,
  (state) => state.upcoming,
);

export const selectFavorites = createSelector(
  selectState,
  (state) => state.favoriteMovies,
);

export const selectFavoritesIds = createSelector(
  selectState,
  (state) => state.favoriteMoviesIds,
);

export const selectIsFavorite = (movieId: number) =>
  createSelector(selectFavoritesIds, (favoritesIds: number[]) =>
    favoritesIds.includes(movieId),
  );

export const selectWatchLater = createSelector(
  selectState,
  (state) => state.watchListMovies,
);

export const selectWatchLaterIds = createSelector(
  selectState,
  (state) => state.watchListMoviesIds,
);

export const selectIsInWatchLater = (movieId: number) =>
  createSelector(selectWatchLaterIds, (watchLaterIds: number[]) =>
    watchLaterIds.includes(movieId),
  );

// export const selectFavorites = createSelector(
//   selectFavoriteState,
//   (state: FavoriteState) => state.favorites
// );

// export const isFavorite = (movieId: number) => createSelector(
//   selectFavorites,
//   (favorites: number[]) => favorites.includes(movieId)
// );
