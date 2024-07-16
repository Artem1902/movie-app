/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { DetailsMovie, Movie, MovieAppModel } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiKey = '?api_key=25444bb4684472e1248b0b837cb44767';
  baseApiUrl = 'https://api.themoviedb.org/3/movie';

  favoriteMoviesList: Movie[] | null = [];
  private favoriteMovies$ = new BehaviorSubject<Movie[]>([]);
  public favoriteMoviesList$ = this.favoriteMovies$;

  watchLaterMoviesList: Movie[] | null = [];
  private watchMovies$ = new BehaviorSubject<Movie[]>([]);
  public watchLaterMoviesList$ = this.watchMovies$;

  constructor(private httpClient: HttpClient) {}

  getPopularMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${this.baseApiUrl}/popular${this.apiKey}`,
    );
  }

  getNowPlayingMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${this.baseApiUrl}/now_playing${this.apiKey}`,
    );
  }

  getTopRatedMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${this.baseApiUrl}/top_rated${this.apiKey}`,
    );
  }

  getUpComingMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${this.baseApiUrl}/upcoming${this.apiKey}`,
    );
  }

  setToFavorites(movie: Movie) {
    if (movie && this.favoriteMoviesList) {
      const isAlreadyFavorite = this.favoriteMoviesList.some(
        (favMovie: { id: number }) => favMovie.id === movie.id,
      );
      if (isAlreadyFavorite) {
        this.favoriteMoviesList = this.favoriteMoviesList.filter(
          (favMovie: { id: number }) => favMovie.id !== movie.id,
        );
      } else {
        this.favoriteMoviesList.push(movie);
      }
      this.favoriteMovies$.next(this.favoriteMoviesList);
    }
  }
  deleteFromFavorites(movieToDelete: Movie) {
    if (this.favoriteMoviesList) {
      this.favoriteMoviesList = this.favoriteMoviesList.filter(
        (movie) => movie.id !== movieToDelete.id,
      );
      this.favoriteMovies$.next(this.favoriteMoviesList);
    }
  }

  setToWatchLater(movie: Movie) {
    if (movie && this.watchLaterMoviesList) {
      const isAlreadyInWatchList = this.watchLaterMoviesList.some(
        (watchMovie: { id: number }) => watchMovie.id === movie.id,
      );
      if (isAlreadyInWatchList) {
        this.watchLaterMoviesList = this.watchLaterMoviesList.filter(
          (watchMovie: { id: number }) => watchMovie.id !== movie.id,
        );
      } else {
        this.watchLaterMoviesList.push(movie);
      }
      this.watchMovies$.next(this.watchLaterMoviesList);
    }
  }
  deleteFromWatchList(movieToDelete: Movie) {
    if (this.watchLaterMoviesList) {
      this.watchLaterMoviesList = this.watchLaterMoviesList.filter(
        (movie: { id: number }) => movie.id !== movieToDelete.id,
      );
      this.watchMovies$.next(this.watchLaterMoviesList);
    }
  }

  getDetailsMovie(id: number): Observable<DetailsMovie> {
    return this.httpClient.get<DetailsMovie>(
      `${this.baseApiUrl}/${id}${this.apiKey}`,
    );
  }

  //   getMovieById(id: number) {
  //     return this.allMovies.find((movie) => movie.id === id);
  //   }
}
