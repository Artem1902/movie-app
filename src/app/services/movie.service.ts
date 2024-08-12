/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { DetailsMovie, Movie, MovieAppModel } from '../models/movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  accountId: number | null = null;
  sessionId: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {}

  setAccountId(id: number) {
    this.accountId = id;
  }
  setSessionId(id: string) {
    this.sessionId = id;
  }
  getNowPlayingMovies(): Observable<MovieAppModel> {
    return this.httpClient
      .get<MovieAppModel>(
        `${environment.apiUrl}/movie/now_playing${environment.apiKey}`,
      )
      .pipe(catchError(this.handleError));
  }
  getPopularMovies(): Observable<MovieAppModel> {
    return this.httpClient
      .get<MovieAppModel>(
        `${environment.apiUrl}/movie/popular${environment.apiKey}`,
      )
      .pipe(catchError(this.handleError));
  }
  getTopRatedMovies(): Observable<MovieAppModel> {
    return this.httpClient
      .get<MovieAppModel>(
        `${environment.apiUrl}/movie/top_rated${environment.apiKey}`,
      )
      .pipe(catchError(this.handleError));
  }
  getUpComingMovies(): Observable<MovieAppModel> {
    return this.httpClient
      .get<MovieAppModel>(
        `${environment.apiUrl}/movie/upcoming${environment.apiKey}`,
      )
      .pipe(catchError(this.handleError));
  }
  getFavoriteMoviesList(): Observable<Movie[]> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }

    const url = `${environment.apiUrl}/account/${this.accountId}/favorite/movies${environment.apiKey}&session_id=${this.sessionId}`;
    return this.httpClient
      .get<MovieAppModel>(url)
      .pipe(map((res) => res.results))
      .pipe(catchError(this.handleError));
  }
  getWatchLaterMoviesList(): Observable<Movie[]> {
    if (!this.accountId || !this.sessionId) {
      return throwError('Not authenticated');
    }

    const url = `${environment.apiUrl}/account/${this.accountId}/watchlist/movies${environment.apiKey}&session_id=${this.sessionId}`;
    return this.httpClient
      .get<MovieAppModel>(url)
      .pipe(map((res) => res.results))
      .pipe(catchError(this.handleError));
  }
  updateFavorites(id: number, isFavorite: boolean) {
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
      media_id: id,
      favorite: !isFavorite,
    };
    return this.httpClient.post<any>(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Response from API:', error);
        return throwError(error);
      }),
    );
  }

  updateWatchList(id: number, isInWatchList: boolean) {
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
      media_id: id,
      watchlist: !isInWatchList,
    };
    return this.httpClient.post<any>(url, body, { headers }).pipe(
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
