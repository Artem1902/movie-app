/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { DetailsMovie, Movie, MovieAppModel } from '../models/movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, combineLatest, map, Observable, switchMap, take, throwError} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Store } from '@ngrx/store';
import {selectAccountId, selectSessionId} from "../store/authStore/selectors";

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  accountId$ = this.store.select(selectAccountId);
  sessionId$ = this.store.select(selectSessionId);

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {}


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
    return combineLatest([this.accountId$, this.sessionId$]).pipe(
      take(1),
      switchMap(([accountId, sessionId]) => {
        if (accountId && sessionId) {
          const url = `${environment.apiUrl}/account/${accountId}/favorite/movies${environment.apiKey}&session_id=${sessionId}`;
          return this.httpClient
            .get<MovieAppModel>(url)
            .pipe(
              map((res) => res.results),
              catchError(this.handleError)
            );
        } else {
          return throwError('Not authenticated');
        }
      })
    );
  }
  getWatchLaterMoviesList(): Observable<Movie[]> {
    return combineLatest([this.accountId$, this.sessionId$]).pipe(
      take(1),
      switchMap(([accountId, sessionId]) => {
        if (accountId && sessionId) {
          const url = `${environment.apiUrl}/account/${accountId}/watchlist/movies${environment.apiKey}&session_id=${sessionId}`;
          return this.httpClient
            .get<MovieAppModel>(url)
            .pipe(
              map((res) => res.results),
              catchError(this.handleError)
            );
        } else {
          return throwError('Not authenticated');
        }
      })
    );
  }

  updateFavorites(id: number, isFavorite: boolean) {
    return combineLatest([this.accountId$, this.sessionId$]).pipe(
      take(1),
      switchMap(([accountId, sessionId]) => {
        if (accountId && sessionId) {
          const url = `${environment.apiUrl}/account/${accountId}/favorite?session_id=${sessionId}`;

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
            })
          );
        } else {
          return throwError('Not authenticated');
        }
      })
    );
  }

  updateWatchList(id: number, isInWatchList: boolean) {
    return combineLatest([this.accountId$, this.sessionId$]).pipe(
      take(1),
      switchMap(([accountId, sessionId]) => {
        if (accountId && sessionId) {
          const url = `${environment.apiUrl}/account/${accountId}/watchlist?session_id=${sessionId}`;
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
            })
          );
        } else {
          return throwError('Not authenticated');
        }
      })
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
