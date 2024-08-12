import { Movie } from '../models/movie.model';

export interface MovieState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];

  favoriteMovies: Movie[];
  watchListMovies: Movie[];
  favoriteMoviesIds: number[];
  watchListMoviesIds: number[];
  error: string | null;
}

export const initialState: MovieState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
  favoriteMovies: [],
  watchListMovies: [],
  favoriteMoviesIds: [],
  watchListMoviesIds: [],
  error: null,
};
