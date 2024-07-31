/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { DetailsMovie, Movie, MovieAppModel } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  accountId: number | null = null;
  sessionId: string | null = null;

  favoriteMoviesList: Movie[] | null = [];
  private favoriteMovies$ = new BehaviorSubject<Movie[]>([]);
  public favoriteMoviesList$ = this.favoriteMovies$;

  watchLaterMoviesList: Movie[] | null = [];
  private watchMovies$ = new BehaviorSubject<Movie[]>([]);
  public watchLaterMoviesList$ = this.watchMovies$;

  constructor(private httpClient: HttpClient) {}

  setAccountId(id: number) {
    this.accountId = id;
  }
  setSessionId(id: string) {
    this.sessionId = id;
  }

  setToFavorites(movie: Movie) {
    if (movie && this.favoriteMoviesList) {
      const isAlreadyInFavorites = this.favoriteMoviesList.some(
        (favorMovie: { id: number }) => favorMovie.id === movie.id,
      );
      if (isAlreadyInFavorites) {
        this.favoriteMoviesList = this.favoriteMoviesList.filter(
          (favorMovie: { id: number }) => favorMovie.id !== movie.id,
        );
      } else {
        this.favoriteMoviesList.push(movie);
      }
      this.favoriteMovies$.next(this.favoriteMoviesList);
    }
  }

  getPopularMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${environment.apiUrl}/movie/popular${environment.apiKey}`,
    );
  }

  getNowPlayingMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${environment.apiUrl}/movie/now_playing${environment.apiKey}`,
    );
  }

  getTopRatedMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${environment.apiUrl}/movie/top_rated${environment.apiKey}`,
    );
  }

  getUpComingMovies(): Observable<MovieAppModel> {
    return this.httpClient.get<MovieAppModel>(
      `${environment.apiUrl}/movie/upcoming${environment.apiKey}`,
    );
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
      `${environment.apiUrl}/movie/${id}${environment.apiKey}`,
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
