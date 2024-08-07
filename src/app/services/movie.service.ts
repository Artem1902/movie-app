/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  DetailsMovie,
  Movie,
  MovieAppModel,
  ResponseAPI,
} from '../models/movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  accountId: number | null = null;
  sessionId: string | null = null;

  private favoriteMovies$ = new BehaviorSubject<Movie[]>([]);
  public favoriteMoviesList$ = this.favoriteMovies$.asObservable();

  private watchMovies$ = new BehaviorSubject<Movie[]>([]);
  public watchLaterMoviesList$ = this.watchMovies$.asObservable();

  constructor(private httpClient: HttpClient) {}

  setAccountId(id: number) {
    this.accountId = id;
  }
  setSessionId(id: string) {
    this.sessionId = id;
  }
  getMoviesByCategory(category: string): Observable<MovieAppModel> {
    return this.httpClient
      .get<MovieAppModel>(
        `${environment.apiUrl}/movie/${category}${environment.apiKey}`,
      )
      .pipe(catchError(this.handleError));
  }

  getFavoriteMoviesList(): Observable<Movie[]> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }

    const url = `${environment.apiUrl}/account/${this.accountId}/favorite/movies${environment.apiKey}&session_id=${this.sessionId}`;
    return this.httpClient
      .get<any>(url)
      .pipe(
        map((res) => res.results),
        tap((movies) => this.favoriteMovies$.next(movies)),
      )
      .pipe(catchError(this.handleError));
  }

  setToFavorites(movie: Movie): Observable<ResponseAPI> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }
    const url = `${environment.apiUrl}/account/${this.accountId}/favorite?session_id=${this.sessionId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    });

    const body = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: true,
    };

    return this.httpClient.post<any>(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Response from API:', error);
        return throwError(error);
      }),
    );
  }

  deleteFromFavorites(movieToDelete: Movie): Observable<ResponseAPI> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }
    const url = `${environment.apiUrl}/account/${this.accountId}/favorite?session_id=${this.sessionId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    });

    const body = {
      media_type: 'movie',
      media_id: movieToDelete.id,
      favorite: false,
    };

    return this.httpClient.post<any>(url, body, { headers }).pipe(
      tap(() => {
        const updatedMovies = this.favoriteMovies$
          .getValue()
          .filter((movie) => movie.id !== movieToDelete.id);
        this.favoriteMovies$.next(updatedMovies);
      }),
      catchError((error) => {
        console.error('Response from API:', error);
        return throwError(error);
      }),
    );
  }

  getWatchLaterMoviesList(): Observable<Movie[]> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }

    const url = `${environment.apiUrl}/account/${this.accountId}/watchlist/movies${environment.apiKey}&session_id=${this.sessionId}`;
    return this.httpClient
      .get<any>(url)
      .pipe(
        map((res) => res.results),
        tap((movies) => this.watchMovies$.next(movies)),
      )
      .pipe(catchError(this.handleError));
  }

  setToWatchLater(movie: Movie): Observable<ResponseAPI> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }

    const url = `${environment.apiUrl}/account/${this.accountId}/watchlist?session_id=${this.sessionId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    });

    const body = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: true,
    };

    return this.httpClient.post<any>(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Response from API:', error);
        return throwError(error);
      }),
    );
  }
  deleteFromWatchList(movieToDelete: Movie): Observable<ResponseAPI> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }
    const url = `${environment.apiUrl}/account/${this.accountId}/watchlist?session_id=${this.sessionId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.apiToken}`,
    });

    const body = {
      media_type: 'movie',
      media_id: movieToDelete.id,
      watchlist: false,
    };

    return this.httpClient.post<any>(url, body, { headers }).pipe(
      tap(() => {
        const updatedMovies = this.watchMovies$
          .getValue()
          .filter((movie) => movie.id !== movieToDelete.id);
        this.watchMovies$.next(updatedMovies);
      }),
      catchError((error) => {
        console.error('Response from API:', error);
        return throwError(error);
      }),
    );
  }

  getDetailsMovie(id: number): Observable<DetailsMovie> {
    return this.httpClient
      .get<DetailsMovie>(
        `${environment.apiUrl}/movie/${id}${environment.apiKey}`,
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
