/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  allMovies = [
    ...new Set([
      ...nowPlayingMovies,
      ...popularMovies,
      ...topRatedMovies,
      ...upcomingMovies,
    ]),
  ];
  favoriteMoviesList: any = [];
  watchLaterMoviesList: any = [];

  constructor() {}

  getNowPlayingMovies() {
    return nowPlayingMovies;
  }

  getPopularMovies() {
    return popularMovies;
  }

  getTopRatedMovies() {
    return topRatedMovies;
  }

  getUpComingMovies() {
    return upcomingMovies;
  }

  setToFavorites(id: number) {
    const movie = this.getMovieById(id);
    if (movie) {
      const isAlreadyFavorite = this.favoriteMoviesList.some(
        (favMovie: { id: number }) => favMovie.id === id,
      );
      if (isAlreadyFavorite) {
        this.favoriteMoviesList = this.favoriteMoviesList.filter(
          (favMovie: { id: number }) => favMovie.id !== id,
        );
      } else {
        this.favoriteMoviesList.push(movie);
      }
    }
  }

  getFavoriteMovies() {
    return this.favoriteMoviesList;
  }

  deleteFromFavorites(id: number) {
    this.favoriteMoviesList = this.favoriteMoviesList.filter(
      (movie: { id: number }) => movie.id !== id,
    );
  }

  setToWatchLater(id: number) {
    const movie = this.getMovieById(id);
    if (movie) {
      const isAlreadyInWatchList = this.watchLaterMoviesList.some(
        (watchMovie: { id: number }) => watchMovie.id === id,
      );
      if (isAlreadyInWatchList) {
        this.watchLaterMoviesList = this.watchLaterMoviesList.filter(
          (watchMovie: { id: number }) => watchMovie.id !== id,
        );
      } else {
        this.watchLaterMoviesList.push(movie);
      }
    }
  }

  deleteFromWatchList(id: number) {
    this.watchLaterMoviesList = this.watchLaterMoviesList.filter(
      (movie: { id: number }) => movie.id !== id,
    );
  }

  getWatchLater() {
    return this.watchLaterMoviesList;
  }

  getMovieById(id: number) {
    return this.allMovies.find((movie) => movie.id === id);
  }
}
